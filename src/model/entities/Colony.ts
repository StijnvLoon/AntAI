import { Ant } from "./Ant";
import { Grid } from "../Grid";
import { Entity, EntityType } from "../Entity";
import { RouteCalculator } from "../RouteCalculator";
import { CellType } from "../Cell";
import { GathererAnt } from "./ants/GathererAnt";
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
            () => {
                const index: number = this.ants.indexOf(newAnt)

                delete newAnt.currentCell.entity
                delete this.ants[index]
                this.ants.splice(index, 1)
            }
        )

        this.ants.push(newAnt)
    }

    createSoldierAnt() {
        const newAnt = this.antFactory.createSoldierAnt(
            this.grid.getRandomEmptyCell(),
            this.currentCell,
            this.currentCell,
            () => {
                const test = this.grid.getNearestCellByEntity(newAnt.currentCell, EntityType.ENEMY)
                return test
            },
            () => {
                const index: number = this.ants.indexOf(newAnt)

                delete newAnt.currentCell.entity
                delete this.ants[index]
                this.ants.splice(index, 1)
            }
        )

        this.ants.push(newAnt)
    }

    turn() {
        //update ants
        this.ants.forEach((ant) => {
            if (ant.onTarget()) {
                ant.setNewRoute(this.routeCalculator.calculateAstar(ant.currentCell, ant.getNextTarget()))
            }
            ant.progressRoute()
        })

        //notify cells
        Array.from(this.grid.cellsMap.values()).forEach((cell) => {
            cell.notify()
        })
    }
}