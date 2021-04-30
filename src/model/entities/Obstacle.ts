import { Cell } from "../Cell";
import { Entity, EntityType } from "../Entity";

export class Obstacle extends Entity {

    constructor(currentCell: Cell) {
        super(currentCell, EntityType.OBSTACLE);
    }
}