import { Cell } from "./Cell";

export class Entity {
    constructor(
        public currentCell: Cell,
<<<<<<< HEAD
        public name: string,
        public movecost: number = 50
    ) { }
=======
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
>>>>>>> master
}