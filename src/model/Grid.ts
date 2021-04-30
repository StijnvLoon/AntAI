import { Cell } from "./Cell";
import { Entity } from "./Entity";
import { FoodCell } from "./cells/FoodCell";
import { EmptyCell } from "./cells/EmptyCell";
import { BlockadeCell } from "./cells/BlockadeCell";
import { Enemy } from "./entities/Enemy";
import { CustomMath} from "src/utils/CustomMath";
import { VerboseMode } from "src/utils/VerboseMode";

export class Grid {

    public cellsMap: Map<string, Cell>

    constructor(
        public readonly width: number,
        public readonly height: number,
        public readonly foodPercent: number,
        public readonly enemyPercent: number
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
        if (CustomMath.randomRange(0, 100) < this.foodPercent) {
            return new FoodCell(y, x)
        }
        if (CustomMath.randomRange(0, 100) < this.enemyPercent) {
            const cell = new EmptyCell(y, x)
            cell.entity = new Enemy(cell)
            return cell
        }

        return new EmptyCell(y, x)
    }

    public getCellAt(y: number, x: number): Cell {
        return this.cellsMap.get(y + '-' + x)
    }

    public getRandomCell(): Cell {
        const randomX = CustomMath.randomRange(0, this.width - 1)
        const randomY = CustomMath.randomRange(0, this.height - 1)

        return this.getCellAt(randomY, randomX)
    }

    public getRandomNeighbourCell(currentCell: Cell): Cell {
        //1: up, 2: right, 3: down, 4: left
        const direction = CustomMath.randomRange(1, 4)

        if(
            (currentCell.y == 0 && direction == 1) ||
            (currentCell.y == this.height-1 && direction == 3) ||
            (currentCell.x == 0 && direction == 4) ||
            (currentCell.x == this.width-1 && direction == 2)
            ) {
            return currentCell
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
}