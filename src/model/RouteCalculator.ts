import { Cell, CellType } from './Cell';
import { Grid } from './Grid';

export class RouteCalculator {

    constructor(
        private availableCells: Map<string, Cell>
    ) { }

    calculateAstar(startCell: Cell, targetCell: Cell): Cell[] {
        const startItem = new GridItem(startCell, 0, 0, 0)
        const targetItem = new GridItem(targetCell, 0, 0, 0)

        const openItems: GridItem[] = []
        const closedCells: Cell[] = []

        openItems.push(startItem)

        while (openItems.length >= 0) {
            var currentItem = openItems[0]
            var currentIndex: number = 0

            //get current cell
            for (let i = 0; i < openItems.length; i++) {
                if (openItems[i].f < currentItem.f) {
                    currentItem = openItems[i]
                    currentIndex = i
                }
            }

            if(
                currentItem == undefined ||
                closedCells.length == Array.from(this.availableCells.entries()).length
                ) {
                //no route possible
                return undefined
            }

            //move currentcell to closedCells
            openItems.splice(currentIndex, 1)
            closedCells.push(currentItem.cell)

            //if target is found
            if (currentItem.cell == targetItem.cell) {
                const route: Cell[] = []
                let current: GridItem = currentItem

                while (current !== undefined) {
                    route.push(current.cell)
                    current = current.parent
                }
                return route.reverse()
            }

            //generate children
            const surroundingCells: Cell[] = [
                this.availableCells.get((currentItem.cell.y - 1) + '-' + currentItem.cell.x),
                this.availableCells.get(currentItem.cell.y + '-' + (currentItem.cell.x + 1)),
                this.availableCells.get((currentItem.cell.y + 1) + '-' + currentItem.cell.x),
                this.availableCells.get(currentItem.cell.y + '-' + (currentItem.cell.x - 1))
            ]

            const children: GridItem[] = []
            surroundingCells.forEach(cell => {

                //add exceptions, like blockades, here!
                if (cell !== undefined && cell.type !== CellType.BLOCKADE) {
                    const childItem = new GridItem(cell, 0, 0, 0)
                    childItem.parent = currentItem
                    children.push(childItem)
                }
            });

            //loop through children & update f, g, h
            for (let i = 0; i < children.length; i++) {
                const childItem = children[i]

                //go to next child if child is not in closedcells
                if (!closedCells.includes(childItem.cell)) {

                    //greate f, g, h
                    childItem.g = currentItem.g + 1
                    childItem.h = Math.pow(currentItem.cell.x - targetItem.cell.x, 2) + Math.pow(currentItem.cell.y - targetItem.cell.y, 2)
                    childItem.f = childItem.g + childItem.h + childItem.cell.costs

                    //add child to openlist if not already
                    if (!openItems.includes(childItem)) {
                        openItems.push(childItem)
                    }
                }
            }
        }
        return []
    }
}

export class GridItem {

    public parent: GridItem

    constructor(
        public cell: Cell,
        public f: number,
        public g: number,
        public h: number
    ) { }
}