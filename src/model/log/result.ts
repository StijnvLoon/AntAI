import { AntType } from '../entities/Ant';

export class Result { 

    constructor(
        public antDistribution: Map<AntType, number>,
        public colonyLifeTime: number
    ) { }

}