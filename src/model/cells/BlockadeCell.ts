import { Cell, CellType } from "../Cell";
import { Entity } from "../Entity";

export class BlockadeCell extends Cell {

    constructor(
        public readonly y: number,
        public readonly x: number,
    ) {
        super(y, x, CellType.BLOCKADE,
            (entity: Entity) => { },
            () => { }
        );
    }
}