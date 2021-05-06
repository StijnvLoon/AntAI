import { Cell } from "../Cell";
import { Entity, EntityType } from "../Entity";

export class Ant extends Entity {

    private route: Cell[] = []

    constructor(
        public antType: AntType,
        public currentCell: Cell,
        public noTargetCell: Cell,
        public getNextTarget: () => Cell
    ) {
        super(currentCell, EntityType.ANT);
    }

    progressRoute() {
        this.moveTo(this.route.shift())
    }

    setNewRoute(route: Cell[]) {
        this.route = route
    }

    onTarget(): boolean {
        return this.route.length == 0
    }
}

export enum AntType {
    GATHERER,
    SOLDIER
}