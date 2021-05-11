import { Component, Input, OnInit } from '@angular/core';
import { Logs } from 'src/model/log/logs';
import { Result } from 'src/model/log/result';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  @Input() logs: Logs

  chartData: any[] = []

  constructor() { }

  ngOnInit(): void {
    this.logs.listener = {
      onResultAdded: (result: Result) => {
        this.chartData = this.getChartData()
      }
    }
  }

  getChartData() {
    const lifetimeData: Object[] = []

    this.logs.results.forEach((result) => {
      lifetimeData.push({
        "name": this.logs.results.indexOf(result),
        "value": result.colonyLifeTime
      })
    })

    const data = [
      {
        "name": "Lifetime",
        "series": lifetimeData
      }
    ]

    return data
  }

}
