import { Ant } from "./Ant";
import { Grid } from "../Grid";
import { Entity, EntityType } from "../Entity";
import { RouteCalculator } from "../RouteCalculator";
import { CellType } from "../Cell";
import { AntFactory } from "../AntFactory";

export class Colony extends Entity {

    public ants: Ant[]
    public foodAmount: number = 0
    private routeCalculator: RouteCalculator
    private antFactory: AntFactory = new AntFactory()

    constructor(
        public grid: Grid
    ) {
        super(grid.getRandomEmptyCell(), EntityType.COLONY)
        this.ants = []
        this.routeCalculator = new RouteCalculator(grid.cellsMap)
    }

    createGathererAnt() {
        const newAnt = this.antFactory.createGathererAnt(
            this.grid.getRandomEmptyCell(),
            this.currentCell,
            this.currentCell,
            () => {
                return this.grid.getNearestCellByType(newAnt.currentCell, CellType.FOOD)
            },
            () => { this.removeAnt(newAnt) }
        )

        this.ants.push(newAnt)
    }

    createSoldierAnt() {
        const newAnt = this.antFactory.createSoldierAnt(
            this.grid.getRandomEmptyCell(),
            this.currentCell,
            this.currentCell,
            () => {
                return this.grid.getNearestCellByEntity(newAnt.currentCell, EntityType.ENEMY)
            },
            () => { this.removeAnt(newAnt) }
        )

        this.ants.push(newAnt)
    }

    private removeAnt(ant: Ant) {
        const index: number = this.ants.indexOf(ant)

        delete this.ants[index]
        this.ants.splice(index, 1)
    }

    turn() {
        //update ants
        this.ants.forEach((ant) => {
            if (ant.onTarget()) {
                ant.setNewRoute(this.routeCalculator.calculateAstar(ant.currentCell, ant.getNextTarget()))
            }
            ant.progressRoute()
            ant.increaseAge()
        })

        //notify cells
        Array.from(this.grid.cellsMap.values()).forEach((cell) => {
            cell.notify()
        })
    }
}