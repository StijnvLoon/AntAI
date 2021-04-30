import { Cell } from "../Cell";
import { Entity, EntityType } from "../Entity";

export class Enemy extends Entity {

    constructor(currentCell: Cell) {
        super(currentCell, EntityType.ENEMY);
    }
}