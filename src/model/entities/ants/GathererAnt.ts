import { GlobalVars } from 'src/utils/GlobalVars';
import { Cell } from '../../Cell';
import { Ant, AntType } from '../Ant';

export class GathererAnt extends Ant {

    public readonly maxFoodAmount = GlobalVars.GATHERER_MAXFOODAMOUNT

    constructor(
        public currentCell: Cell,
        public noTargetCell: Cell,
        public getNextTarget: (onResult: (cell: Cell) => void) => void,
        public foodAmount: number = 0,
    ) {
        super(AntType.GATHERER, currentCell, noTargetCell, getNextTarget);
    }
}