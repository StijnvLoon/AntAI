import { Cell } from "../Cell";
import { Entity, EntityType } from "../Entity";

export class Ant extends Entity {

    constructor(
        currentCell: Cell,
        foodAmount: number = 0) {
        super(currentCell, EntityType.ANT);
    }

    moveTo(targetCell: Cell) {
        this.currentCell.entity = undefined
        this.currentCell = targetCell
        targetCell.entity = this
        targetCell.takeFood(this) //if the cell contains food the ant will take 1 from the pool
    }
}