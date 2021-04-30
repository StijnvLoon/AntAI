import { Cell } from "./Cell";

export class Entity {

    constructor(
        public currentCell: Cell,
        public type: EntityType
    ) {
        currentCell.entity = this
    }
}

export enum EntityType {
    ANT,
    COLONY,
    ENEMY,
    FOOD,
    OBSTACLE
}