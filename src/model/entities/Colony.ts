import { Ant } from "./Ant";
import { Grid } from "../Grid";
import { Entity, EntityType } from "../Entity";
import { RouteCalculator } from "../RouteCalculator";

export class Colony extends Entity {

    public ants: Ant[]
    private routeCalculator: RouteCalculator

    constructor(
        public grid: Grid
    ) {
        super(grid.getRandomEmptyCell(), EntityType.COLONY)
        this.ants = []
        this.routeCalculator = new RouteCalculator(grid.cellsMap)
    }

    createAnt() {
        const newAnt: Ant = new Ant(this.grid.getRandomEmptyCell())
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
        this.ants.forEach((ant) => {
            if(ant.onTarget()) {
                //Tijdelijk naar colony lopen (this.currentCell)
                ant.setNewRoute(this.routeCalculator.calculateAstar(ant.currentCell, this.currentCell))
            }
            ant.progressRoute()
            // ant.moveTo(this.grid.getRandomNeighbourCell(ant.currentCell))
        })
    }
}