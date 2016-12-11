/**
 * Created by HSBC on 09-12-2016.
 */
import { Component } from '@angular/core';
import { ChartsModule } from 'ng2-charts/ng2-charts';

// webpack html imports

@Component({
  selector: 'doughnut-chart-demo',
  templateUrl: './doughtnut-chart.component.html',
})
export class DoughnutChartDemoComponent {
  // Doughnut
  public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public doughnutChartData:number[] = [150, 450, 100];
  public doughnutChartType:string = 'doughnut';

  // events
  public chartClicked(e:any):void {
  //  console.log(e);
  }

  public chartHovered(e:any):void {
   // console.log(e);
  }
}
