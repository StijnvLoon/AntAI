import { CustomMath } from 'src/utils/CustomMath';
import { Cell } from '../../Cell';
import { Ant, AntType } from '../Ant';
import { GlobalVars } from 'src/utils/GlobalVars';

export class CaretakerAnt extends Ant {

    public readonly createAntInterval: number = GlobalVars.GATHERER_CREATE_ANT_INTERVAL
    public lastAntCreatedAt: number = 0

    constructor(
        public currentCell: Cell,
        public noTargetCell: Cell,
        public getNextTarget: (onResult: (cell: Cell) => void) => void,
    ) {
        super(AntType.CARETAKER, currentCell, noTargetCell, getNextTarget);
    }
}