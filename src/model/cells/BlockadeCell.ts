import { Cell, CellType } from "../Cell";

export class BlockadeCell extends Cell {
    
    constructor(
        public readonly y: number,
        public readonly x: number,
    ) {
        super(y, x, CellType.BLOCKADE, () => {
            
        });
    }
}