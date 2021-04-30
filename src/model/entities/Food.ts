import { Cell } from "../Cell";
import { Entity, EntityType } from "../Entity";

export class Food extends Entity {
    constructor(
        public currentCell: Cell,
        public amount: number = CustomMath.randomRange(5,100)
        ) {
        super(currentCell, EntityType.FOOD);
    }
}