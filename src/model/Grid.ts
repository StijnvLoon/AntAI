import { Cell, CellType } from "./Cell";
import { Entity, EntityType } from "./Entity";
import { FoodCell } from "./cells/FoodCell";
import { EmptyCell } from "./cells/EmptyCell";
import { BlockadeCell } from "./cells/BlockadeCell";
import { Enemy } from "./entities/Enemy";
import { CustomMath } from "src/utils/CustomMath";
import { VerboseMode } from "src/utils/VerboseMode";

export class Grid {

    public cellsMap: Map<string, Cell>
    //colony dependent, ref changes with new colony
    public inAccessibleCells: Cell[] = []

    constructor(
        public readonly width: number,
        public readonly height: number,
        private readonly foodPercent: number,
        private readonly enemyPercent: number,
        private readonly blockadePercent: number,
    ) {
        this.cellsMap = new Map()
        for (var y = 0; y < height; y++) {
            for (var x = 0; x < width; x++) {
                this.cellsMap.set(y + '-' + x, this.getCell(y, x))
            }
        }
        if (VerboseMode.verbose) console.log(this.cellsMap.values())
    }

    private getCell(y: number, x: number): Cell {
        //set food
        if (CustomMath.randomRange(0, 100) < this.foodPercent) {
            return new FoodCell(y, x)
        }
        //set enemy
        if (CustomMath.randomRange(0, 100) < this.enemyPercent) {
            const cell = new EmptyCell(y, x)
            this.createEnemy(cell)
            return cell
        }
        //set blockade
        if (CustomMath.randomRange(0, 100) < this.blockadePercent) {
            return new BlockadeCell(y, x)
        }

        return new EmptyCell(y, x)
    }

    private createEnemy(cell: Cell) {
        const enemy = new Enemy(cell)
        enemy.listener = {
            onKilled: () => {
                this.createEnemy(this.getRandomEmptyCell())
                delete enemy.currentCell.entity
            }
        }
    }

    public createCellByType(y: number, x: number, type: CellType): Cell {
        switch (type) {
            case CellType.EMPTY: {
                return new EmptyCell(y, x)
            }
            case CellType.FOOD: {
                return new FoodCell(y, x)
            }
            case CellType.BLOCKADE: {
                return new BlockadeCell(y, x)
            }
        }
    }

    public getCellAt(y: number, x: number): Cell {
        return this.cellsMap.get(y + '-' + x)
    }

    public getRandomCell(): Cell {
        const randomX = CustomMath.randomRange(0, this.width - 1)
        const randomY = CustomMath.randomRange(0, this.height - 1)

        return this.getCellAt(randomY, randomX)
    }

    public getRandomEmptyCell(): Cell {
        var emptyCell

        while (emptyCell == undefined) {
            const pickedCell = this.getRandomCell()

            if (pickedCell.type == CellType.EMPTY && !pickedCell.entity) {
                if(!this.inAccessibleCells.includes(pickedCell)) {
                    emptyCell = pickedCell
                }
            }
        }

        return emptyCell
    }

    public getRandomNeighbourCell(currentCell: Cell): Cell {
        var direction
        var goodDirectionFound = false

        while (!goodDirectionFound) {
            //1: up, 2: right, 3: down, 4: left
            direction = CustomMath.randomRange(1, 4)

            if (!(
                (currentCell.y == 0 && direction == 1) ||
                (currentCell.y == this.height - 1 && direction == 3) ||
                (currentCell.x == 0 && direction == 4) ||
                (currentCell.x == this.width - 1 && direction == 2))
            ) {
                goodDirectionFound = true
            }
        }

        switch (direction) {
            case 1:
                return this.getCellAt(currentCell.y - 1, currentCell.x)
            case 2:
                return this.getCellAt(currentCell.y, currentCell.x + 1)
            case 3:
                return this.getCellAt(currentCell.y + 1, currentCell.x)
            case 4:
                return this.getCellAt(currentCell.y, currentCell.x - 1)
        }
    }

    public getRandomEmptyNeighbourCell(currentCell: Cell): Cell {
        var emptyCell: Cell

        while (emptyCell == undefined) {
            const pickedCell = this.getRandomNeighbourCell(currentCell)

            if (pickedCell.type == CellType.EMPTY) {
                emptyCell = pickedCell
            }
        }

        return emptyCell
    }

    public async getNearestCellByType(cell: Cell, cellType: CellType): Promise<Cell> {
        var cells: Cell[]

        if (cellType == CellType.FOOD) {
            cells = Array.from(this.cellsMap.values()).filter((cell) => {
                const foodCell = cell as FoodCell
                return cell.type == cellType && foodCell.foodAmount > 0 && !this.inAccessibleCells.includes(cell)
            })
        } else {
            cells = Array.from(this.cellsMap.values()).filter(
                (cell) => cell.type == cellType && !this.inAccessibleCells.includes(cell)
                )
        }

        return this.sortCellsByDistanceToCell(cell, cells)[0]
    }

    public async getNearestCellByEntity(cell: Cell, entityType: EntityType): Promise<Cell> {
        const cells = Array.from(this.cellsMap.values()).filter((cell) =>
            cell.entity && cell.entity.entityType == entityType && !this.inAccessibleCells.includes(cell)
        )

        return this.sortCellsByDistanceToCell(cell, cells)[0]
    }

    public clearEntities() {
        Array.from(this.cellsMap.values()).forEach((cell) => {
            if (cell.entity) {
                cell.entity.kill()
            }
        })
    }

    private sortCellsByDistanceToCell(targetCell: Cell, cells: Cell[]): Cell[] {
        return cells.sort((a, b) => {
            const ayDiff = Math.abs(targetCell.y - a.y)     //5
            const axDiff = Math.abs(targetCell.x - a.x)     //2
            const byDiff = Math.abs(targetCell.y - b.y)     //6
            const bxDiff = Math.abs(targetCell.x - b.x)     //1

            if ((ayDiff + axDiff) > (byDiff + bxDiff)) {
                return 1
            }
            if ((ayDiff + axDiff) < (byDiff + bxDiff)) {
                return -1
            }
            return 0
        })
    }
}