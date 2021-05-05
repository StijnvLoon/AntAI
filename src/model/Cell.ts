import { Entity } from "./Entity";

export class Cell {

    public entity: Entity

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
    }
}

export enum CellType {
    EMPTY,
    FOOD,
    BLOCKADE
}