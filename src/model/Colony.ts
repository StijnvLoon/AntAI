import { Ant } from "./entities/Ant";
import { Cell } from "./Cell";
import { Grid } from "./Grid";

export class Colony {

    public ants: Ant[]

    constructor(
        public grid: Grid
    ) {
        this.ants = []
    }

    createAnt() {
        const targetCell: Cell = this.grid.getRandomCell()
        const newAnt: Ant = new Ant(targetCell)
        targetCell.entity = newAnt

        this.ants.push(newAnt)
    }
}