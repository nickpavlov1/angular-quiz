import { Component, ElementRef, HostListener, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-box',
  template: `
  <div #dialogContainer class="dialog-container">
    <mat-dialog-content class="mat-typography">
      {{ data.msg }}
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>No</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Yes</button>
    </mat-dialog-actions>
  </div>
  `,
  styleUrls: ['./dialog-box.component.scss']
})
export class DialogBoxComponent {
  public msg!: string;
  @ViewChild('dialogContainer') dialogContainer!: ElementRef;
  
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogBoxComponent,
    private dialogRef: MatDialogRef<DialogBoxComponent>
  ) {}

  @HostListener('document:click', ['$event.target'])
  onClickOutside(target: EventTarget): void {
      if (target && !this.dialogContainer.nativeElement.contains(target)) {
        this.closeDialog();
      }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
