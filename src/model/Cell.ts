import { Entity } from "./Entity";

export class Cell {

    public entity: Entity

    constructor(
        public readonly y: number,
        public readonly x: number,
        public readonly type: CellType,
        public interact
    ) {
    }

    acceptEntity(entity: Entity) {
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