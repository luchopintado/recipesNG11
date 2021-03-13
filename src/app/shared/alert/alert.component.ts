import {Component, Input, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-alert',
  templateUrl: 'alert.component.html',
  styleUrls: ['alert.component.css']
})
export class AlertComponent {
  @Input() message: string | null = null;
  @Output() close = new EventEmitter();

  onClose(): void {
    this.close.emit();
  }
}
