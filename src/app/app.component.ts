import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Colony } from 'src/model/entities/Colony';
import { Grid } from 'src/model/Grid';
import { ColonyService } from 'src/app/services/colony.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AntAI';

  width: number = 45
  height: number = 20
  enemyPercent: number = 2
  foodPercent: number = 10
  blockadePercent: number = 10
  isPlaying: boolean = false
  delay = 50

  colony: Colony
  timer: number = 0

  constructor(private colonyService: ColonyService) {

  }

  ngOnInit() {
    this.createNewColony()
  }

  togglePlaying() {
    this.isPlaying = !this.isPlaying
    if (this.isPlaying) {
      this.loop()
    }
  }

  loop() {
    setTimeout(() => {

      this.makeTurn()
      this.timer = this.timer + 1

      if (this.isPlaying) {
        this.loop()
      }
    }, this.delay)
  }

  makeTurn() {
    this.colony.turn()
  }

  createNewColony() {
    this.timer = 0
    this.colony = new Colony(
      new Grid(
        this.width,
        this.height,
        this.foodPercent,
        this.enemyPercent,
        this.blockadePercent
      )
    )
    this.colonyService.colony = this.colony
  }
}
