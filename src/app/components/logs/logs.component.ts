import { Component, Input, OnInit } from '@angular/core';
import { Logs } from 'src/model/log/logs';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  @Input() logs: Logs
  chartData: Object[] = []

  constructor() { }

  ngOnInit(): void {
  }

  getChartData() {
    const data: Object[] = []
    const lifetimeData: Object[] = []

    this.logs.results.forEach((result) => {
      lifetimeData.push({
        "name": "test",
        "value": result.colonyLifeTime
      })
    })

    data.push({
      "name": "Lifetime",
      "series": lifetimeData
    })

    return data
  }

}
