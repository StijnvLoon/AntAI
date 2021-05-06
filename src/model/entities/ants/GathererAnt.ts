import { Cell } from '../../Cell';
import { Ant, AntType } from '../Ant';

export class GathererAnt extends Ant {

    public readonly maxFoodAmount = 2

    constructor(
        public currentCell: Cell,
        public noTargetCell: Cell,
        public getNextTarget: () => Cell,
        public foodAmount: number = 0,
    ) {
        super(AntType.GATHERER, currentCell, noTargetCell, getNextTarget);
    }
}