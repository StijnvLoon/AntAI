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
                switch (entity.type) {
                    case EntityType.ANT: {
                        this.handleAnt(entity as Ant)
                        break
                    }
                    case EntityType.COLONY: {
                        //handle methode maken wanneer nodig
                        break
                    }
                    case EntityType.ENEMY: {
                        //handle methode maken wanneer nodig
                        break
                    }
                }
            }, () => { });
    }

    handleAnt(ant: Ant) {
        if (this.entity) {
            switch (this.entity.type) {
                case EntityType.ANT: {
                    this.replaceEntity(ant)
                    break
                }
                case EntityType.COLONY: {
                    const colony: Colony = this.entity as Colony
                    colony.foodAmount = colony.foodAmount + ant.foodAmount
                    ant.foodAmount = 0
                    break
                }
                case EntityType.ENEMY: {
                    ant.kill()
                    break
                }
            }
        } else {
            this.replaceEntity(ant)
        }
    }

}







