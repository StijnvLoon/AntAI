import { Cell } from "../Cell";
import { Entity } from "../Entity";

export class Ant extends Entity {

    constructor(currentCell: Cell) {
        super(currentCell, "Ant");
    }

    moveTo(targetCell: Cell) {
        this.currentCell.entity = undefined
        this.currentCell = targetCell
        targetCell.entity = this
    }
}