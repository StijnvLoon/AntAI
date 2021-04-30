import { Ant } from "./Ant";
import { Cell } from "../Cell";
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
        this.ants.push(newAnt)
    }

    turn() {
        this.ants.forEach((ant) => {
            // ant.moveTo(this.colony.grid.getRandomCell())
            ant.moveTo(this.grid.getRandomNeighbourCell(ant.currentCell))
        })
    }
}