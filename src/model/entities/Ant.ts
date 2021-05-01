import { Cell } from "../Cell";
import { Entity, EntityType } from "../Entity";

export class Ant extends Entity {

    private route: Cell[] = []

    constructor(
        public currentCell: Cell,
        public foodAmount: number = 0,
        public listener?: AntListener
    ) {
        super(currentCell, EntityType.ANT);
    }

    progressRoute() {
        this.moveTo(this.route.shift())
    }

    moveTo(targetCell: Cell) {
        targetCell.interact(this)
    }

    setNewRoute(route: Cell[]) {
        this.route = route
    }

    onTarget(): boolean {
        return this.route.length == 0
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