import { Cell, CellType } from "../Cell";
import { Ant } from "../entities/Ant";
import { Colony } from "../entities/Colony";
import { Entity, EntityType } from "../Entity";

export class EmptyCell extends Cell {

    constructor(
        public readonly y: number,
        public readonly x: number,
    ) {
        super(y, x, CellType.EMPTY,
            (entity: Entity) => {

            if(this.entity) {
                switch(this.entity.type) {
                    case EntityType.ENEMY: {
                        entity.kill()
                        break
                    }
                    case EntityType.COLONY: {
                        const colony: Colony = this.entity as Colony

                        if(entity.type == EntityType.ANT) {
                            const ant: Ant = entity as Ant
                            colony.foodAmount = colony.foodAmount + ant.foodAmount
                            ant.foodAmount = 0
                        }
                        break
                    }
                    default: {
                        this.acceptEntity(entity)
                    }
                }
            } else {
                this.acceptEntity(entity)
            }
        }, () => {
            this.updateCosts()
        });
    }

}







