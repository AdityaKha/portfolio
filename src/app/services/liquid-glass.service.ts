import { Injectable } from '@angular/core';

export interface LiquidGlassConfig {
  radius: number;
  bezelWidth: number;
  glassThickness: number;
  refractiveIndex: number;
  refractionScale: number;
  specularOpacity: number;
  blur: number;
  specularAngle: number;
}

const DEFAULT_CONFIG: LiquidGlassConfig = {
  radius: 16,
  bezelWidth: 14,
  glassThickness: 90,
  refractiveIndex: 1.5,
  refractionScale: 1.2,
  specularOpacity: 0.55,
  blur: 0.4,
  specularAngle: Math.PI / 3,
};

const SVG_NS = 'http://www.w3.org/2000/svg';

/**
 * Builds an SVG <filter> that refracts whatever sits behind a glass surface,
 * using Snell's-law displacement maps rendered to canvas (no WebGL).
 * Port of kube.io's liquid-glass technique: https://kube.io/blog/liquid-glass-css-svg/
 */
@Injectable({ providedIn: 'root' })
export class LiquidGlassService {
  buildFilter(
    defs: SVGDefsElement,
    filterId: string,
    width: number,
    height: number,
    config: Partial<LiquidGlassConfig> = {}
  ): void {
    if (width <= 0 || height <= 0) return;
    const cfg: LiquidGlassConfig = { ...DEFAULT_CONFIG, ...config };
    const convexSquircle = (x: number) => Math.pow(1 - Math.pow(1 - x, 4), 1 / 4);

    const profile = this.calculateRefractionProfile(
      cfg.glassThickness,
      cfg.bezelWidth,
      convexSquircle,
      cfg.refractiveIndex
    );
    const maximumDisplacement = Math.max(...profile.map(Math.abs)) || 1;

    const displacementMap = this.buildDisplacementMap(
      width,
      height,
      cfg.radius,
      cfg.bezelWidth,
      maximumDisplacement,
      profile
    );
    const specularHighlight = this.buildSpecularHighlight(
      width,
      height,
      cfg.radius,
      cfg.specularAngle
    );

    const displacementUrl = this.toDataUrl(displacementMap);
    const specularUrl = this.toDataUrl(specularHighlight);
    const scale = maximumDisplacement * cfg.refractionScale;

    while (defs.firstChild) defs.removeChild(defs.firstChild);
    defs.appendChild(
      this.assembleFilter(filterId, width, height, displacementUrl, specularUrl, scale, cfg)
    );
  }

  /** 1D refraction profile along a single radius, via Snell's Law. */
  private calculateRefractionProfile(
    glassThickness: number,
    bezelWidth: number,
    surfaceFn: (x: number) => number,
    refractiveIndex: number,
    samples = 128
  ): number[] {
    const eta = 1 / refractiveIndex;

    const refract = (normalX: number, normalY: number): [number, number] | null => {
      const dot = normalY;
      const k = 1 - eta * eta * (1 - dot * dot);
      if (k < 0) return null;
      const kSqrt = Math.sqrt(k);
      return [-(eta * dot + kSqrt) * normalX, eta - (eta * dot + kSqrt) * normalY];
    };

    const profile: number[] = [];
    for (let i = 0; i < samples; i++) {
      const x = i / samples;
      const y = surfaceFn(x);
      const dx = x < 1 ? 0.0001 : -0.0001;
      const y2 = surfaceFn(Math.max(0, Math.min(1, x + dx)));
      const derivative = (y2 - y) / dx;
      const magnitude = Math.sqrt(derivative * derivative + 1);
      const refracted = refract(-derivative / magnitude, -1 / magnitude);

      if (!refracted) {
        profile.push(0);
      } else {
        const remainingHeight = y * bezelWidth + glassThickness;
        profile.push(refracted[0] * (remainingHeight / refracted[1]));
      }
    }
    return profile;
  }

  /** 2D displacement map (R=dx, G=dy) for a rounded-rect lens, sized to the element. */
  private buildDisplacementMap(
    width: number,
    height: number,
    radius: number,
    bezelWidth: number,
    maximumDisplacement: number,
    profile: number[]
  ): ImageData {
    const imageData = new ImageData(width, height);
    for (let i = 0; i < imageData.data.length; i += 4) {
      imageData.data[i] = 128;
      imageData.data[i + 1] = 128;
      imageData.data[i + 2] = 0;
      imageData.data[i + 3] = 255;
    }

    const radiusSquared = radius * radius;
    const radiusPlusOneSquared = (radius + 1) * (radius + 1);
    const radiusMinusBezelSquared = Math.max(0, (radius - bezelWidth) * (radius - bezelWidth));
    const widthBetweenRadiuses = width - radius * 2;
    const heightBetweenRadiuses = height - radius * 2;

    for (let y1 = 0; y1 < height; y1++) {
      for (let x1 = 0; x1 < width; x1++) {
        const x = x1 < radius
          ? x1 - radius
          : x1 >= width - radius
            ? x1 - radius - widthBetweenRadiuses
            : 0;
        const y = y1 < radius
          ? y1 - radius
          : y1 >= height - radius
            ? y1 - radius - heightBetweenRadiuses
            : 0;

        const distanceSquared = x * x + y * y;
        const isInBezel =
          distanceSquared <= radiusPlusOneSquared && distanceSquared >= radiusMinusBezelSquared;
        if (!isInBezel) continue;

        const distanceFromCenter = Math.sqrt(distanceSquared);
        const opacity =
          distanceSquared < radiusSquared
            ? 1
            : 1 -
              (distanceFromCenter - Math.sqrt(radiusSquared)) /
                (Math.sqrt(radiusPlusOneSquared) - Math.sqrt(radiusSquared));
        const distanceFromSide = radius - distanceFromCenter;
        const cos = distanceFromCenter > 0 ? x / distanceFromCenter : 0;
        const sin = distanceFromCenter > 0 ? y / distanceFromCenter : 0;
        const bezelRatio = Math.max(0, Math.min(1, distanceFromSide / bezelWidth));
        const bezelIndex = Math.max(
          0,
          Math.min(Math.floor(bezelRatio * profile.length), profile.length - 1)
        );
        const displacement = profile[bezelIndex] || 0;
        const dX = (-cos * displacement) / maximumDisplacement;
        const dY = (-sin * displacement) / maximumDisplacement;

        const idx = (y1 * width + x1) * 4;
        imageData.data[idx] = Math.max(0, Math.min(255, 128 + dX * 127 * opacity));
        imageData.data[idx + 1] = Math.max(0, Math.min(255, 128 + dY * 127 * opacity));
        imageData.data[idx + 2] = 0;
        imageData.data[idx + 3] = 255;
      }
    }
    return imageData;
  }

  /** Directional rim-light band that follows the lens edge. */
  private buildSpecularHighlight(
    width: number,
    height: number,
    radius: number,
    specularAngle: number
  ): ImageData {
    const imageData = new ImageData(width, height);
    const specularVector = [Math.cos(specularAngle), Math.sin(specularAngle)];
    const specularThickness = 2.0;
    const radiusSquared = radius * radius;
    const radiusPlusOneSquared = (radius + 1) * (radius + 1);
    const radiusMinusSpecularSquared = Math.max(
      0,
      (radius - specularThickness) * (radius - specularThickness)
    );
    const widthBetweenRadiuses = width - radius * 2;
    const heightBetweenRadiuses = height - radius * 2;

    for (let y1 = 0; y1 < height; y1++) {
      for (let x1 = 0; x1 < width; x1++) {
        const x = x1 < radius
          ? x1 - radius
          : x1 >= width - radius
            ? x1 - radius - widthBetweenRadiuses
            : 0;
        const y = y1 < radius
          ? y1 - radius
          : y1 >= height - radius
            ? y1 - radius - heightBetweenRadiuses
            : 0;

        const distanceSquared = x * x + y * y;
        const isNearEdge =
          distanceSquared <= radiusPlusOneSquared && distanceSquared >= radiusMinusSpecularSquared;
        if (!isNearEdge) continue;

        const distanceFromCenter = Math.sqrt(distanceSquared);
        const distanceFromSide = radius - distanceFromCenter;
        const opacity =
          distanceSquared < radiusSquared
            ? 1
            : 1 -
              (distanceFromCenter - Math.sqrt(radiusSquared)) /
                (Math.sqrt(radiusPlusOneSquared) - Math.sqrt(radiusSquared));
        const cos = distanceFromCenter > 0 ? x / distanceFromCenter : 0;
        const sin = distanceFromCenter > 0 ? -y / distanceFromCenter : 0;
        const dotProduct = Math.abs(cos * specularVector[0] + sin * specularVector[1]);
        const edgeRatio = Math.max(0, Math.min(1, distanceFromSide / specularThickness));
        const sharpFalloff = Math.sqrt(1 - (1 - edgeRatio) * (1 - edgeRatio));
        const coefficient = dotProduct * sharpFalloff;
        const color = Math.min(255, 255 * coefficient);

        const idx = (y1 * width + x1) * 4;
        imageData.data[idx] = color;
        imageData.data[idx + 1] = color;
        imageData.data[idx + 2] = color;
        imageData.data[idx + 3] = Math.min(255, color * coefficient * opacity);
      }
    }
    return imageData;
  }

  private toDataUrl(imageData: ImageData): string {
    const canvas = document.createElement('canvas');
    canvas.width = imageData.width;
    canvas.height = imageData.height;
    canvas.getContext('2d')!.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
  }

  private assembleFilter(
    filterId: string,
    width: number,
    height: number,
    displacementUrl: string,
    specularUrl: string,
    scale: number,
    cfg: LiquidGlassConfig
  ): SVGFilterElement {
    const filter = document.createElementNS(SVG_NS, 'filter') as SVGFilterElement;
    filter.setAttribute('id', filterId);
    filter.setAttribute('x', '0');
    filter.setAttribute('y', '0');
    filter.setAttribute('width', '100%');
    filter.setAttribute('height', '100%');
    filter.setAttribute('color-interpolation-filters', 'sRGB');

    const feImageDisp = document.createElementNS(SVG_NS, 'feImage');
    feImageDisp.setAttribute('href', displacementUrl);
    feImageDisp.setAttribute('x', '0');
    feImageDisp.setAttribute('y', '0');
    feImageDisp.setAttribute('width', `${width}`);
    feImageDisp.setAttribute('height', `${height}`);
    feImageDisp.setAttribute('result', 'displacement_map');

    const feDisp = document.createElementNS(SVG_NS, 'feDisplacementMap');
    feDisp.setAttribute('in', 'SourceGraphic');
    feDisp.setAttribute('in2', 'displacement_map');
    feDisp.setAttribute('scale', `${scale}`);
    feDisp.setAttribute('xChannelSelector', 'R');
    feDisp.setAttribute('yChannelSelector', 'G');
    feDisp.setAttribute('result', 'refracted');

    const feBlur = document.createElementNS(SVG_NS, 'feGaussianBlur');
    feBlur.setAttribute('in', 'refracted');
    feBlur.setAttribute('stdDeviation', `${cfg.blur}`);
    feBlur.setAttribute('result', 'blurredRefracted');

    const feImageSpec = document.createElementNS(SVG_NS, 'feImage');
    feImageSpec.setAttribute('href', specularUrl);
    feImageSpec.setAttribute('x', '0');
    feImageSpec.setAttribute('y', '0');
    feImageSpec.setAttribute('width', `${width}`);
    feImageSpec.setAttribute('height', `${height}`);
    feImageSpec.setAttribute('result', 'specular_raw');

    const feComponentTransfer = document.createElementNS(SVG_NS, 'feComponentTransfer');
    feComponentTransfer.setAttribute('in', 'specular_raw');
    feComponentTransfer.setAttribute('result', 'specular');
    const feFuncA = document.createElementNS(SVG_NS, 'feFuncA');
    feFuncA.setAttribute('type', 'linear');
    feFuncA.setAttribute('slope', `${cfg.specularOpacity}`);
    feComponentTransfer.appendChild(feFuncA);

    const feBlend = document.createElementNS(SVG_NS, 'feBlend');
    feBlend.setAttribute('in', 'blurredRefracted');
    feBlend.setAttribute('in2', 'specular');
    feBlend.setAttribute('mode', 'screen');

    filter.append(feImageDisp, feDisp, feBlur, feImageSpec, feComponentTransfer, feBlend);
    return filter;
  }
}
