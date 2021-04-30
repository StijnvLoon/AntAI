import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Colony } from 'src/model/entities/Colony';
import { Grid } from 'src/model/Grid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AntAI';

  width: number = 45
  height: number = 20
  enemyPercent: number = 4
  foodPercent: number = 10
  isPlaying: boolean = false
  delay = 1000

  colony: Colony
  timer: number = 0

  constructor() {

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

  addAnt() {
    this.colony.createAnt()
  }

  createNewColony() {
    this.timer = 0
    this.colony = new Colony(
      new Grid(
        this.width,
        this.height,
        this.foodPercent,
        this.enemyPercent)
    )
  }
}
