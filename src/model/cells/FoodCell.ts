import { Cell, CellType } from "../Cell";
import { CustomMath } from "../../utils/CustomMath"
import { VerboseMode } from "../../utils/VerboseMode";
import { Ant, AntType } from "../entities/Ant";
import { Entity, EntityType } from "../Entity";
import { GathererAnt } from "../entities/ants/GathererAnt";

export class FoodCell extends Cell {

    public readonly maxfoodamount: number = 10
    public foodAmount: number
    public turnsWithoutFood: number = 0
    private readonly maxTurnsWithoutFood = 100

    constructor(
        public readonly y: number,
        public readonly x: number,
    ) {
        super(y, x, CellType.FOOD,
            (entity: Entity) => {
                this.replaceEntity(entity)
                if (entity.entityType == EntityType.ANT) {
                    const ant = entity as Ant

                    if (ant.antType == AntType.GATHERER) {
                        const gatherer = ant as GathererAnt

                        if (gatherer.foodAmount < gatherer.maxFoodAmount) {
                            this.takeFood(gatherer)
                        }
                    }
                }
            }, () => {
                if (this.foodAmount == 0) {
                    this.addTurnWithoutFood()
                }
            });
        this.foodAmount = CustomMath.randomRange(1, this.maxfoodamount)
    }

    public takeFood(gatherer: GathererAnt) {
        if (VerboseMode.verbose) console.log('found food and obtained:')
        if (this.foodAmount > 0) {
            this.foodAmount -= 1;
            gatherer.foodAmount += 1;
            if (VerboseMode.verbose) console.log('true')
        } else {
            if (VerboseMode.verbose) console.log('false')
        }
    }

    public addTurnWithoutFood() {
        this.turnsWithoutFood = this.turnsWithoutFood + 1
        if (this.turnsWithoutFood == this.maxTurnsWithoutFood) {
            this.refillFood(CustomMath.randomRange(1, this.maxfoodamount))
        }
    }

    public refillFood(amount: number) {
        this.foodAmount = amount
        this.turnsWithoutFood = 0
    }
}