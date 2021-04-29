import { Entity } from "./Entity";

export class Cell {

    public entity: Entity

    constructor(
        public readonly y: number,
        public readonly x: number
    ) { }
}