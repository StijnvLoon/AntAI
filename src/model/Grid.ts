import { Cell } from "./Cell";
import { Entity } from "./Entity";
import { Food } from "./entities/Food";
import { Enemy } from "./entities/Enemy";

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
                const cell: Cell = new Cell(y, x)
                cell.entity = this.getEntity(cell)
                this.cellsMap.set(y + '-' + x, cell)
            }
        }
        console.log(this.cellsMap.values())
    }

    private getEntity(cell: Cell): Entity {
        if (this.randomIntFromInterval(0, 100) < this.foodPercent) {
            return new Food(cell)
        }
        if (this.randomIntFromInterval(0, 100) < this.enemyPercent) {
            return new Enemy(cell)
        }
        return undefined
    }

    public getCellAt(y: number, x: number): Cell {
        return this.cellsMap.get(y + '-' + x)
    }

    public getRandomCell(): Cell {
        const randomX = this.randomIntFromInterval(0, this.width - 1)
        const randomY = this.randomIntFromInterval(0, this.height - 1)

        return this.getCellAt(randomY, randomX)
    }

    public getRandomNeighbourCell(currentCell: Cell): Cell {
        //1: up, 2: right, 3: down, 4: left
        const direction = this.randomIntFromInterval(1, 4)

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

    public randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}