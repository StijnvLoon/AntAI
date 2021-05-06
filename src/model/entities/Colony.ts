import { Ant } from "./Ant";
import { Grid } from "../Grid";
import { Entity, EntityType } from "../Entity";
import { RouteCalculator } from "../RouteCalculator";
import { CellType } from "../Cell";

export class Colony extends Entity {

    public ants: Ant[]
    public foodAmount: number = 0
    private routeCalculator: RouteCalculator

    constructor(
        public grid: Grid
    ) {
        super(grid.getRandomEmptyCell(), EntityType.COLONY)
        this.ants = []
        this.routeCalculator = new RouteCalculator(grid.cellsMap)
    }

    createAnt() {
        const newAnt: Ant = new Ant(
            this.grid.getRandomEmptyCell(),
            0,
            this.currentCell,
            () => {
                if (newAnt.foodAmount == newAnt.maxFoodAmount) {
                    return this.currentCell
                } else {
                    return this.grid.getNearestCellByType(newAnt, CellType.FOOD)
                }
            })
        newAnt.listener = {
            onKilled: () => {
                const index: number = this.ants.indexOf(newAnt)

                delete newAnt.currentCell.entity
                delete this.ants[index]
                this.ants.splice(index, 1)
            }
        }
        this.ants.push(newAnt)
    }

    turn() {
        //update ants
        this.ants.forEach((ant) => {
            if (ant.onTarget()) {
                var nextTarget = ant.getNextTarget()
                ant.setNewRoute(this.routeCalculator.calculateAstar(
                    ant.currentCell,
                    nextTarget ? nextTarget : ant.noTargetCell
                ))
            }
            ant.progressRoute()
        })

        //notify cells
        Array.from(this.grid.cellsMap.values()).forEach((cell) => {
            cell.notify()
        })
    }
}