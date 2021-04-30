import { Cell } from "../Cell";
import { Entity, EntityType } from "../Entity";

export class Ant extends Entity {

    constructor(currentCell: Cell) {
        super(currentCell, EntityType.ANT);
    }

    moveTo(targetCell: Cell) {
        this.currentCell.entity = undefined
        this.currentCell = targetCell
        targetCell.entity = this
    }
}