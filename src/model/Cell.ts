import { Entity, EntityType } from "./Entity";

export class Cell {

    public entity: Entity
    public readonly defaultCost = 50
    public costs: number = this.defaultCost

    constructor(
        public readonly y: number,
        public readonly x: number,
        public type: CellType,
        public interact,
        public notify: () => void
    ) {
    }

    acceptEntity(entity: Entity) {
        entity.currentCell.entity = undefined
        entity.currentCell = this
        this.entity = entity

        if(entity.type == EntityType.ANT && this.costs-10 > 10) {
            this.costs -= 5
        }
    }

    updateCosts() {
        if(this.costs < this.defaultCost) {
            this.costs += 1
        }
    }
}

export enum CellType {
    EMPTY,
    FOOD,
    BLOCKADE
}