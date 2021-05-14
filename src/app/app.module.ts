import { BrowserModule } from '@angular/platform-browser';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
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
import { LogsComponent } from './components/logs/logs.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SideNavComponent } from './side-nav/side-nav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { PageIntroComponent } from './side-nav/pages/page-intro/page-intro.component';
import { PageEntitiesComponent } from './side-nav/pages/page-entities/page-entities.component';
import { PageAntsComponent } from './side-nav/pages/page-ants/page-ants.component';
import { PageAlgorithmsComponent } from './side-nav/pages/page-algorithms/page-algorithms.component';
import { PageCellsComponent } from './side-nav/pages/page-cells/page-cells.component';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    CellComponent,
    CellDialog,
    LogsComponent,
    SideNavComponent,
    ToolbarComponent,
    PageIntroComponent,
    PageEntitiesComponent,
    PageAntsComponent,
    PageAlgorithmsComponent,
    PageCellsComponent
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
    MatSidenavModule,
    NgxChartsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
