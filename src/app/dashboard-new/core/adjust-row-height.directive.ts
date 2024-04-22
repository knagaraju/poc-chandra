import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appAdjustRowHeight]'
})
export class AdjustRowHeightDirective {
  constructor(private el: ElementRef) { }

  ngAfterViewInit() {
    this.adjustRowHeights();
  }

  adjustRowHeights() {
    const table = this.el.nativeElement as HTMLTableElement;
    const rows = Array.from(table.rows);
    const rowHeights = rows.map(row => row.offsetHeight);
    const maxHeight = Math.max(...rowHeights);
    rows.forEach(row => {
      this.setHeight(row, maxHeight);
    });
  }

  setHeight(row: HTMLTableRowElement, height: number) {
    row.style.height = `${height}px`;
  }
}
