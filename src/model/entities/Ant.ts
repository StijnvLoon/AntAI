import { CustomMath } from "src/utils/CustomMath";
import { GlobalVars } from "src/utils/GlobalVars";
import { Cell } from "../Cell";
import { Entity, EntityType } from "../Entity";

export class Ant extends Entity {

    private route: Cell[] = []
    public age: number = 0

    constructor(
        public antType: AntType,
        public currentCell: Cell,
        public noTargetCell: Cell,
        public getNextTarget: (onResult: (cell: Cell) => void) => void,
        private maxAge: number = CustomMath.randomRange(GlobalVars.ANT_MAXAGE_MIN, GlobalVars.ANT_MAXAGE_MAX)
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

    increaseAge() {
        this.age += 1
        if(this.age == this.maxAge) {
            this.kill()
        }
    }
}

export enum AntType {
    GATHERER,
    SOLDIER,
    CARETAKER
}