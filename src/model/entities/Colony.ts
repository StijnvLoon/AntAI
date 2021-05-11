import { Ant, AntType } from "./Ant";
import { Grid } from "../Grid";
import { Entity, EntityType } from "../Entity";
import { RouteCalculator } from "../RouteCalculator";
import { CellType } from "../Cell";
import { AntFactory } from "../AntFactory";
import { GlobalVars } from "src/utils/GlobalVars";

export class Colony extends Entity {

    public ants: Ant[]
    public foodAmount: number = GlobalVars.COLONY_START_FOODAMOUNT
    private routeCalculator: RouteCalculator
    private antFactory: AntFactory = new AntFactory()

    constructor(
        public grid: Grid,
        public antDistributionMap: Map<AntType, number>,
        antAmount: number
    ) {
        super(grid.getRandomEmptyCell(), EntityType.COLONY)
        this.routeCalculator = new RouteCalculator(grid.cellsMap)
        this.ants = []

        antDistributionMap.forEach((percent: number, type: AntType) => {
            const amount: number = Math.round((percent / 100) * antAmount)

            for(let i = 0; i < amount; i++) {
                switch(type) {
                    case AntType.GATHERER: {
                        this.createGathererAnt()
                        break
                    }
                    case AntType.SOLDIER: {
                        this.createSoldierAnt()
                        break
                    }
                    case AntType.CARETAKER: {
                        this.createCaretakerAnt()
                        break
                    }
                }
            }
        });
    }

    createGathererAnt() {
        const newAnt = this.antFactory.createGathererAnt(
            this.grid.getRandomEmptyCell(),
            this.currentCell,
            this.currentCell,
            () => {
                return this.grid.getNearestCellByType(newAnt.currentCell, CellType.FOOD)
            },
            () => { this.removeAnt(newAnt) }
        )

        this.ants.push(newAnt)
    }

    createSoldierAnt() {
        const newAnt = this.antFactory.createSoldierAnt(
            this.grid.getRandomEmptyCell(),
            this.currentCell,
            this.currentCell,
            () => {
                return this.grid.getNearestCellByEntity(newAnt.currentCell, EntityType.ENEMY)
            },
            () => { this.removeAnt(newAnt) }
        )

        this.ants.push(newAnt)
    }

    createCaretakerAnt() {
        const newAnt = this.antFactory.createCaretakerAnt(
            this.grid.getRandomEmptyCell(),
            this.currentCell,
            this.currentCell,
            () => {
                return this.grid.getRandomEmptyCell()
            },
            () => { this.removeAnt(newAnt) }
        )

        this.ants.push(newAnt)
    }

    calculateNeededAntType(): AntType {
        var neededType: AntType = AntType.GATHERER
        var sortageAmount: number = 0

        this.antDistributionMap.forEach((percent: number, type: AntType) => {
            const antAmount = this.ants.filter((ant) => ant.antType == type).length
            const neededAntsAmount = Math.round((percent/100) * this.ants.length)
            const sortage = neededAntsAmount - antAmount

            if(sortage > sortageAmount) {
                sortageAmount = sortage
                neededType = type
            }
        })

        return neededType
    }
    
    private removeAnt(ant: Ant) {
        const index: number = this.ants.indexOf(ant)

        delete this.ants[index]
        this.ants.splice(index, 1)
    }

    turn() {
        //check if there are any ants
        if(this.ants.length == 0) {
            this.kill()
        }

        //update ants
        this.ants.forEach((ant) => {
            if (ant.onTarget()) {
                ant.setNewRoute(this.routeCalculator.calculateAstar(ant.currentCell, ant.getNextTarget()))
            }
            ant.progressRoute()
            ant.increaseAge()
        })

        //notify cells
        Array.from(this.grid.cellsMap.values()).forEach((cell) => {
            cell.notify()
        })
    }
}