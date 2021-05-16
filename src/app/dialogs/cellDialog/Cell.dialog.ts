import { Component, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ColonyService } from 'src/app/services/colony.service';
import { CellType } from 'src/model/Cell';
import { AntType } from 'src/model/entities/Ant';

export interface DialogData {
    y: number
    x: number
    startCellType: number
}

@Component({
    selector: 'cell-dialog',
    templateUrl: './cell.dialog.html',
    styleUrls: ['./cell.dialog.scss']
})
export class CellDialog {

    cellTypeControl: FormControl = new FormControl(this.data.startCellType + '')

    constructor(
        public dialogRef: MatDialogRef<CellDialog>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private colonyService: ColonyService
    ) {}

    submit() {
        this.colonyService.replaceCell(
            this.data.y,
            this.data.x,
            CellType[CellType[this.cellTypeControl.value]]
        )

        this.dialogRef.close()   
    }

    close() {
        this.dialogRef.close()
    }

    placeAnt(type: AntType) {
        switch(type) {
            case AntType.GATHERER: {
                this.colonyService.colony.createGathererAnt(this.colonyService.colony.grid.getCellAt(this.data.y, this.data.x))
                break
            }
            case AntType.SOLDIER: {
                this.colonyService.colony.createSoldierAnt(this.colonyService.colony.grid.getCellAt(this.data.y, this.data.x))
                break
            }
            case AntType.GATHERER: {
                this.colonyService.colony.createCaretakerAnt(this.colonyService.colony.grid.getCellAt(this.data.y, this.data.x))
                break
            }
        }
    }
}