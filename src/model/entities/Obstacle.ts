import { Cell } from "../Cell";
import { Entity } from "../Entity";

export class Obstacle extends Entity {

    constructor(currentCell: Cell) {
        super(currentCell, "Obstacle");
    }
}