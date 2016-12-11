import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { JobsComponent } from './jobs/jobs.component';
import {routing} from "./app.routes";
import { DashboardComponent } from './dashboard/dashboard.component';
import {ChatService} from "./dashboard/chat-service";
import {DoughnutChartDemoComponent} from "./charts/doughtnut-chart.component";
import {ChartsModule} from "ng2-charts";

@NgModule({
  declarations: [
    AppComponent,
    JobsComponent,
    DashboardComponent,
    DoughnutChartDemoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ChartsModule
  ],
  providers: [ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
