import { Cell, CellType } from "../Cell";
import { Ant } from "../entities/Ant";
import { EntityType } from "../Entity";

export class EmptyCell extends Cell {

    constructor(
        public readonly y: number,
        public readonly x: number,
    ) {
        super(y, x, CellType.EMPTY, (ant: Ant) => {
            if(this.entity) {
                if(this.entity.type == EntityType.ENEMY) {
                    ant.kill()
                } else {
                    this.acceptEntity(ant)
                }
            } else {
                this.acceptEntity(ant)
            }
        });
    }

}







