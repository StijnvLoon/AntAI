import { Entity } from "./Entity";
import { CustomMath } from "src/utils/CustomMath"

export class Cell {

    public entity: Entity

    constructor(
        public readonly y: number,
        public readonly x: number,
        public readonly minfoodamount : number = 0,
        public readonly maxfoodamount : number = 10,
        public foodamount: number = CustomMath.randomRange(-300, 100), //anything below 0 means no food is present
    ) { 
        this.initFood(); //initialize food amount 
    }



    public takeFood(entity) {
        console.log('attempting to take food:')
        if (this.foodamount > 0) {
            this.foodamount -= 1;
            entity.foodAmount += 1; 
            console.log('success')
        } else {
            console.log('fail')
        }
    }


    public initFood() {
        console.log('Determine food amount');
        if (this.foodamount < 0) {
            this.foodamount = 0;
        } else {
            this.foodamount = CustomMath.randomRange(this.minfoodamount+1, this.maxfoodamount)
        }
    }
}