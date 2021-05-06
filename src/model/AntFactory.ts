import { Cell } from './Cell';
import { AntType } from './entities/Ant';
import { GathererAnt } from './entities/ants/GathererAnt';
import { SoldierAnt } from './entities/ants/SoldierAnt';

export class AntFactory {


    createGathererAnt(
        startCell: Cell,
        noTargetCell: Cell,
        colonyCell: Cell,
        getNearestFoodCell: () => Cell,
        onKilled: () => void
    ): GathererAnt {
        const gatherer: GathererAnt = new GathererAnt(
            startCell,
            noTargetCell,
            () => {
                if (gatherer.foodAmount == gatherer.maxFoodAmount) {
                    return colonyCell
                } else {
                    const nearestFoodCell: Cell = getNearestFoodCell()
                    if(nearestFoodCell) {
                        return nearestFoodCell
                    } else {
                        return colonyCell
                    }
                }
            },
            0
        )

        gatherer.listener = {
            onKilled: onKilled
        }

        return gatherer
    }

    createSoldierAnt(
        startCell: Cell,
        noTargetCell: Cell,
        colonyCell: Cell,
        getNearestEnemyCell: () => Cell,
        onKilled: () => void
    ): SoldierAnt {
        const soldier: SoldierAnt = new SoldierAnt(
            startCell,
            noTargetCell,
            () => {
                const nearestEnemyCell: Cell = getNearestEnemyCell()
                if(nearestEnemyCell) {
                    return nearestEnemyCell
                } else {
                    return colonyCell
                }
            },
        )

        soldier.listener = {
            onKilled: onKilled
        }

        return soldier
    }
}