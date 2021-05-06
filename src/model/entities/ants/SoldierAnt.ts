import { Cell } from '../../Cell';
import { Ant, AntType } from '../Ant';

export class SoldierAnt extends Ant {

    constructor(
        public currentCell: Cell,
        public noTargetCell: Cell,
        public getNextTarget: () => Cell,
    ) {
        super(AntType.SOLDIER, currentCell, noTargetCell, getNextTarget);
    }
}