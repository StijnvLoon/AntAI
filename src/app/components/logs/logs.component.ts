import { Component, Input, OnInit } from '@angular/core';
import { AntType } from 'src/model/entities/Ant';
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
        "name": this.getDistributionName(result.antDistribution),
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

  private getDistributionName(antDistribution: Map<AntType, number>): string {
    var string: string = ''
    antDistribution.forEach((percent: number, type: AntType) => {
      string += percent + '%, '
    })
    return string
  }

}
