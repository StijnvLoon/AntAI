import { Ant } from "./Ant";
import { Grid } from "../Grid";
import { Entity, EntityType } from "../Entity";

export class Colony extends Entity {

    public ants: Ant[]

    constructor(
        public grid: Grid
    ) {
        super(grid.getRandomCell(), EntityType.COLONY)
        this.ants = []
    }

    createAnt() {
        const newAnt: Ant = new Ant(this.grid.getRandomCell())
        newAnt.listener = {
            onAntKilled: () => {
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
            ant.moveTo(this.grid.getRandomNeighbourCell(ant.currentCell))
        })
    }
}