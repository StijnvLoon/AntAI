import { Cell, CellType } from "../Cell";
import { CustomMath } from "../../utils/CustomMath"
import { VerboseMode } from "../../utils/VerboseMode";
import { Ant } from "../entities/Ant";
import { Entity, EntityType } from "../Entity";

export class FoodCell extends Cell {

    public readonly maxfoodamount: number = 10
    public foodAmount: number

    constructor(
        public readonly y: number,
        public readonly x: number,
    ) {
        super(y, x, CellType.FOOD, (entity: Entity) => {
            this.acceptEntity(entity)
            if (entity.type == EntityType.ANT) {
                const ant = entity as Ant

                if(ant.foodAmount < ant.maxFoodAmount) {
                    this.takeFood(ant)
                }
            }
        });
        this.foodAmount = CustomMath.randomRange(1, this.maxfoodamount)
    }

    public takeFood(ant: Ant) {
        if (VerboseMode.verbose) console.log('found food and obtained:')
        if (this.foodAmount > 0) {
            this.foodAmount -= 1;
            ant.foodAmount += 1;
            if (VerboseMode.verbose) console.log('true')
        } else {
            if (VerboseMode.verbose) console.log('false')
        }
    }
}