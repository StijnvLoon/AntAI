import { GlobalVars } from 'src/utils/GlobalVars';
import { Cell } from '../../Cell';
import { Ant, AntType } from '../Ant';

export class SoldierAnt extends Ant {

    public readonly killChange: number = GlobalVars.SOLDIER_KILLCHANGE

    constructor(
        public currentCell: Cell,
        public noTargetCell: Cell,
        public getNextTarget: (onResult: (cell: Cell) => void) => void,
    ) {
        super(AntType.SOLDIER, currentCell, noTargetCell, getNextTarget);
    }
}