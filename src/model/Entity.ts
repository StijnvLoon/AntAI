import { Cell } from "./Cell";

export class Entity {
    constructor(
        public currentCell: Cell,
        public name: string,
        public movecost: number = 50
    ) { }
}