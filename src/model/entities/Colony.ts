import { Ant } from "./Ant";
import { Grid } from "../Grid";
import { Entity, EntityType } from "../Entity";
import { RouteCalculator } from "../RouteCalculator";
import { Cell, CellType } from "../Cell";
import { FoodCell } from "../cells/FoodCell";

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
                ant.setNewRoute(this.routeCalculator.calculateAstar(ant.currentCell, ant.getNextTarget()))
            }
            ant.progressRoute()
        })

        //notify cells
        Array.from(this.grid.cellsMap.values()).forEach((cell) => {
            cell.notify()
        })
        // const cells = Array.from(this.grid.cellsMap.values()).filter((cell) => {
        //     return cell.type == CellType.FOOD
        // })

        // cells.forEach((cell) => {
        // const foodCell: FoodCell = cell as FoodCell

        // if(foodCell.foodAmount == 0) {
        //     foodCell.addTurnWithoutFood()
        // }
        // })
    }
}