import { Cell } from './Cell';
import { AntType } from './entities/Ant';
import { GathererAnt } from './entities/ants/GathererAnt';
import { SoldierAnt } from './entities/ants/SoldierAnt';
import { CaretakerAnt } from './entities/ants/CaretakerAnt';
import { async } from 'rxjs/internal/scheduler/async';

export class AntFactory {


    createGathererAnt(
        startCell: Cell,
        noTargetCell: Cell,
        colonyCell: Cell,
        getNearestFoodCell: () => Promise<Cell>,
        onKilled: () => void
    ): GathererAnt {
        const gatherer: GathererAnt = new GathererAnt(
            startCell,
            noTargetCell,
            async (onResult) => {
                if (gatherer.foodAmount == gatherer.maxFoodAmount) {
                    onResult(colonyCell)
                } else {
                    const nearestFoodCell: Cell = await getNearestFoodCell()
                    if(nearestFoodCell) {
                        onResult(nearestFoodCell)
                    } else {
                        onResult(colonyCell)
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
        getNearestEnemyCell: () => Promise<Cell>,
        onKilled: () => void
    ): SoldierAnt {
        const soldier: SoldierAnt = new SoldierAnt(
            startCell,
            noTargetCell,
            async (onResult) => {
                const nearestEnemyCell: Cell = await getNearestEnemyCell()
                if(nearestEnemyCell) {
                    onResult(nearestEnemyCell)
                } else {
                    onResult(colonyCell)
                }
            },
        )

        soldier.listener = {
            onKilled: onKilled
        }

        return soldier
    }

    createCaretakerAnt(
        startCell: Cell,
        noTargetCell: Cell,
        colonyCell: Cell,
        getRandomEmptyCell: () => Promise<Cell>,
        onKilled: () => void
    ): CaretakerAnt {
        const careTaker: CaretakerAnt = new CaretakerAnt(
            startCell,
            noTargetCell,
            async (onResult) => {

                //if there had 'createAntInterval' time passed since last ant creation
                //if so, update lastAntCreatedAt
                if(careTaker.age > (careTaker.lastAntCreatedAt + careTaker.createAntInterval)) {
                    careTaker.lastAntCreatedAt = careTaker.lastAntCreatedAt + careTaker.createAntInterval
                    onResult(colonyCell)
                } else {
                    const cell = await getRandomEmptyCell()
                    onResult(cell)
                }
            },
        )

        careTaker.listener = {
            onKilled: onKilled
        }

        return careTaker
    }
}