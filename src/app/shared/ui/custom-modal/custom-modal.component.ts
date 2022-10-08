import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-modal',
  templateUrl: './custom-modal.component.html',
  styleUrls: ['./custom-modal.component.sass'],
})
export class CustomModalComponent {
  @Input() isOpen = true;
  constructor() {}
}
