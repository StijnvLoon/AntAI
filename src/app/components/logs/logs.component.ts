import { Component, Input, OnInit } from '@angular/core';
import { Logs } from 'src/model/log/logs';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  @Input() logs: Logs

  constructor() { }

  ngOnInit(): void {
  }

}
