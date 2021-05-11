import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Colony } from 'src/model/entities/Colony';
import { Grid } from 'src/model/Grid';
import { ColonyService } from 'src/app/services/colony.service';
import { GlobalVars } from 'src/utils/GlobalVars';
import { AntType } from 'src/model/entities/Ant';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AntAI';

  width: number = GlobalVars.GRID_WIDTH
  height: number = GlobalVars.GRID_HEIGHT
  enemyPercent: number = GlobalVars.GRID_ENEMY_PERCENTAGE
  foodPercent: number = GlobalVars.GRID_FOODCELL_PERCENTAGE
  blockadePercent: number = GlobalVars.GRID_BLOCKADECELL_PERCENTAGE
  isPlaying: boolean = false
  delay = GlobalVars.GRID_DELAY

  ants: number = GlobalVars.COLONY_START_ANTAMOUNT
  gathererPercentage: number = 40
  soldierPercentage: number = 20
  caretakerPercentage: number = 40

  colony: Colony
  grid: Grid
  timer: number = 0

  constructor(private colonyService: ColonyService) { }

  ngOnInit() {
    this.createNewGrid()
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

  createNewGrid() {
    this.timer = 0
    this.grid = new Grid(
      this.width,
      this.height,
      this.foodPercent,
      this.enemyPercent,
      this.blockadePercent
    )
  }

  createNewColony() {
    this.timer = 0
    this.grid.clearEntities()
    this.colony = new Colony(
      this.grid,
      new Map([
        [AntType.GATHERER, 40],
        [AntType.SOLDIER, 20],
        [AntType.CARETAKER, 40]
      ]),
      this.ants
    )
    this.colonyService.colony = this.colony
  }
}
