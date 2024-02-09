import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Confirm {{deletionType}}</h4>
      <button type="button" class="btn " aria-label="Close" (click)="activeModal.dismiss()">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    Are you sure you want to {{restoreOrDelete}} {{entity}} #{{ id }}?
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.dismiss()">Cancel</button>
      <button type="button" class="btn btn-danger" (click)="confirm()">{{restoreOrDelete | titlecase}}</button>
    </div>
  `
})
export class ConfirmModalComponent {
  @Input() id: any;
  @Input() entity: any;
  @Input() deletionType: any
  @Input() restoreOrDelete: any
  constructor(public activeModal: NgbActiveModal) { }
  confirm() {
    this.activeModal.close('confirm');
  }
}
