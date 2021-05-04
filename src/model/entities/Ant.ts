import { Cell } from "../Cell";
import { Entity, EntityListener, EntityType } from "../Entity";

export class Ant extends Entity {

    private route: Cell[] = []
    public readonly maxFoodAmount = 2

    constructor(
        public currentCell: Cell,
        public foodAmount: number = 0,
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