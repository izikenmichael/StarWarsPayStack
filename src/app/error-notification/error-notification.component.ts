import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-error-notification',
  templateUrl: './error-notification.component.html',
  styleUrls: ['./error-notification.component.scss']
})
export class ErrorNotificationComponent implements OnInit {
  @Input() errorMessage: string;
  constructor() { }

  ngOnInit() {
  }

  refresh() {
    window.location.reload(true);
  }

}
