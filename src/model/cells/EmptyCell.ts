import { Cell, CellType } from "../Cell";
import { Ant } from "../entities/Ant";
import { Entity, EntityType } from "../Entity";

export class EmptyCell extends Cell {

    constructor(
        public readonly y: number,
        public readonly x: number,
    ) {
        super(y, x, CellType.EMPTY, (entity: Entity) => {
            if(this.entity) {
                if(this.entity.type == EntityType.ENEMY) {
                    entity.kill()
                } else {
                    this.acceptEntity(entity)
                }
            } else {
                this.acceptEntity(entity)
            }
        });
    }

}







