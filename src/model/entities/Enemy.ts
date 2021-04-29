import { Cell } from "../Cell";
import { Entity } from "../Entity";

export class Enemy extends Entity {

    constructor(currentCell: Cell) {
        super(currentCell, "Enemy");
    }
}