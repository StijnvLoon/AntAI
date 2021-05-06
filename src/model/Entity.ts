import { Cell } from "./Cell";

export class Entity {

    constructor(
        public currentCell: Cell,
        public entityType: EntityType,
        public listener?: EntityListener
    ) {
        currentCell.entity = this
    }

    moveTo(targetCell: Cell) {
        targetCell.interact(this)
    }

    kill() {
        if(this.listener) {
            this.listener.onKilled()
        }
    }
}

export interface EntityListener {
    onKilled()
}

export enum EntityType {
    ANT,
    COLONY,
    ENEMY,
}