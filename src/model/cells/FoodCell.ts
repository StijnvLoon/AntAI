import { Cell, CellType } from "../Cell";
import { CustomMath } from "../../utils/CustomMath"
import { VerboseMode } from "../../utils/VerboseMode";
import { Ant } from "../entities/Ant";

export class FoodCell extends Cell {
    
    constructor(
        public readonly y: number,
        public readonly x: number,
        public readonly minfoodamount: number = 0,
        public readonly maxfoodamount: number = 10,
        public foodAmount: number = CustomMath.randomRange(-300, 100), //anything below 0 means no food is present
    ) {
        super(y, x, CellType.FOOD, (ant: Ant) => {
            this.acceptEntity(ant)
            this.takeFood(ant)
        });
        this.initFood(); //initialize food amount 
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

    public initFood() {

        if (VerboseMode.verbose) console.log('Determine food amount');
        if (this.foodAmount < 0) {
            this.foodAmount = 0;
        } else {
            this.foodAmount = CustomMath.randomRange(this.minfoodamount + 1, this.maxfoodamount)
        }
    }
}