import { Cell } from "../Cell";
import { Entity, EntityType } from "../Entity";

export class Food extends Entity {

    constructor(currentCell: Cell) {
        super(currentCell, EntityType.FOOD);
    }
}