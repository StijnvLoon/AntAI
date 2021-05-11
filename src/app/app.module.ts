import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridComponent } from './components/grid/grid.component';
import { CellComponent } from './components/cell/cell.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { ReactiveFormsModule } from '@angular/forms';
import { CellDialog } from './dialogs/cellDialog/Cell.dialog';
import { EntityComponent } from './components/cell/entity/entity.component';
import { AntComponent } from './components/cell/entity/ant/ant.component';
import { LogsComponent } from './components/logs/logs.component';
import { NgxChartsModule }from '@swimlane/ngx-charts';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    CellComponent,
    CellDialog,
    EntityComponent,
    AntComponent,
    LogsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatGridListModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    ReactiveFormsModule,
    NgxChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
