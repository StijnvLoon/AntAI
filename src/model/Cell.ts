import { GlobalVars } from "src/utils/GlobalVars";
import { Entity, EntityType } from "./Entity";

export class Cell {

    public entity: Entity
    public costs: number = GlobalVars.CELL_COSTS

    constructor(
        public readonly y: number,
        public readonly x: number,
        public type: CellType,
        public interact: (entity: Entity) => void,
        public notify: () => void
    ) {
    }
    
    replaceEntity(entity: Entity) {
        entity.currentCell.entity = undefined
        entity.currentCell = this
        this.entity = entity

        if(entity.entityType == EntityType.ANT && this.costs-10 > 10) {
            this.costs -= 5
        }
    }

    updateCosts() {
        if(this.costs < GlobalVars.CELL_COSTS) {
            this.costs += 1
        }
    }
}

export enum CellType {
    EMPTY,
    FOOD,
    BLOCKADE
}