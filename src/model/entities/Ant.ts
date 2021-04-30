import { Cell } from "../Cell";
import { Entity, EntityType } from "../Entity";

export class Ant extends Entity {

    constructor(
        public currentCell: Cell,
        public foodAmount: number = 0,
        public listener?: AntListener
    ) {
        super(currentCell, EntityType.ANT);
    }

    moveTo(targetCell: Cell) {
        targetCell.interact(this)
    }

    kill() {
        if(this.listener) {
            this.listener.onAntKilled()
        }
    }
}

export interface AntListener {
    onAntKilled()
}