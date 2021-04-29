import { Cell } from "../Cell";
import { Entity } from "../Entity";

export class Food extends Entity {

    constructor(currentCell: Cell) {
        super(currentCell, "Food");
    }
}