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
    const gathererData: Object[] = []
    const soldierData: Object[] = []
    const careTakerData: Object[] = []

    this.logs.results.forEach((result) => {
      const name = this.getDistributionName(result.antDistribution)

      lifetimeData.push({
        "name": name,
        "value": result.colonyLifeTime
      })

      gathererData.push({
        "name": name,
        "value": result.antDistribution.get(AntType.GATHERER)
      })

      soldierData.push({
        "name": name,
        "value": result.antDistribution.get(AntType.SOLDIER)
      })

      careTakerData.push({
        "name": name,
        "value": result.antDistribution.get(AntType.CARETAKER)
      })
    })

    const data = [
      {
        "name": "Lifetime",
        "series": lifetimeData
      },
      {
        "name": "Gatherer distribution",
        "series": gathererData
      },
      {
        "name": "Soldier distribution",
        "series": soldierData
      },
      {
        "name": "Caretaker distribution",
        "series": careTakerData
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
