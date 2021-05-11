import { CustomMath } from 'src/utils/CustomMath';
import { Cell } from '../../Cell';
import { Ant, AntType } from '../Ant';

export class CaretakerAnt extends Ant {

    public readonly createAntInterval: number = 50
    public lastAntCreatedAt: number = 0

    constructor(
        public currentCell: Cell,
        public noTargetCell: Cell,
        public getNextTarget: () => Cell,
    ) {
        super(AntType.CARETAKER, currentCell, noTargetCell, getNextTarget, CustomMath.randomRange(180, 220));
    }
}