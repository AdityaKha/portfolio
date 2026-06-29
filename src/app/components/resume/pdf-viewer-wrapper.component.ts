import { Component, input, OnInit } from '@angular/core';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import { GlobalWorkerOptions } from 'pdfjs-dist';

@Component({
  selector: 'app-pdf-viewer-wrapper',
  standalone: true,
  imports: [PdfViewerModule],
  template: `
    <pdf-viewer
      [src]="src()"
      [render-text]="false"
      [original-size]="false"
      style="display: block; width: 100%; height: min(80vh, 1050px);"
    />
  `,
})
export class PdfViewerWrapperComponent implements OnInit {
  src = input.required<string>();

  ngOnInit() {
    GlobalWorkerOptions.workerSrc = 'assets/pdf.worker.mjs';
  }
}
