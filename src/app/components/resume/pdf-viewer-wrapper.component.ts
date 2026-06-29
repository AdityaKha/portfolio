import { Component, input, OnInit } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { GlobalWorkerOptions } from 'pdfjs-dist';

@Component({
  selector: 'app-pdf-viewer-wrapper',
  standalone: true,
  imports: [PdfViewerModule],
  template: `
    <div class="h-[52vh] sm:h-[85vh] overflow-hidden">
      <pdf-viewer
        [src]="src()"
        [render-text]="false"
        [original-size]="false"
        [zoom-scale]="'page-fit'"
        style="display: block; width: 100%; height: 100%;"
      />
    </div>
  `,
})
export class PdfViewerWrapperComponent implements OnInit {
  src = input.required<string>();

  ngOnInit() {
    GlobalWorkerOptions.workerSrc = 'assets/pdf.worker.mjs';
  }
}
