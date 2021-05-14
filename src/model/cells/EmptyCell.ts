import { CustomMath } from "src/utils/CustomMath";
import { GlobalVars } from "src/utils/GlobalVars";
import { Cell, CellType } from "../Cell";
import { Ant, AntType } from "../entities/Ant";
import { GathererAnt } from "../entities/ants/GathererAnt";
import { SoldierAnt } from "../entities/ants/SoldierAnt";
import { Colony } from "../entities/Colony";
import { Entity, EntityType } from "../Entity";

export class EmptyCell extends Cell {

    constructor(
        public readonly y: number,
        public readonly x: number,
    ) {
        super(y, x, CellType.EMPTY,
            (entity: Entity) => {
                switch (entity.entityType) {
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
            }, () => { this.updateCosts(); });
    }

    handleAnt(ant: Ant) {
        if (this.entity) {
            switch (this.entity.entityType) {
                case EntityType.ANT: {
                    this.replaceEntity(ant)
                    break
                }
                case EntityType.COLONY: {

                    if(ant.antType == AntType.GATHERER) {
                        const gatherer = ant as GathererAnt
                        const colony: Colony = this.entity as Colony
                        colony.foodAmount = colony.foodAmount + gatherer.foodAmount
                        gatherer.foodAmount = 0
                    }

                    if(ant.antType == AntType.CARETAKER) {
                        const colony: Colony = this.entity as Colony
                        if(colony.foodAmount - GlobalVars.GATHERER_CREATE_ANT_FOOD_COSTS > 0) {
                            colony.foodAmount -= GlobalVars.GATHERER_CREATE_ANT_FOOD_COSTS

                            switch(colony.calculateNeededAntType()) {
                                case AntType.GATHERER: {
                                    colony.createGathererAnt()
                                    break
                                }
                                case AntType.SOLDIER: {
                                    colony.createSoldierAnt()
                                    break
                                }
                                case AntType.CARETAKER: {
                                    colony.createCaretakerAnt()
                                    break
                                }
                            }
                            
                        }
                    }
                    break
                }
                case EntityType.ENEMY: {

                    switch(ant.antType) {
                        case AntType.SOLDIER: {
                            const soldier = ant as SoldierAnt
                            
                            if(CustomMath.randomRange(0, 100) < soldier.killChange) {
                                this.entity.kill()
                            } else {
                                soldier.kill()
                            }

                            break
                        }
                        default: {
                            ant.kill()
                        }
                    }

                    break
                }
            }
        } else {
            this.replaceEntity(ant)
        }
    }
}







