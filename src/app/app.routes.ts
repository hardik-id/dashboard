import {JobsComponent} from "./jobs/jobs.component";
import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";


// Route Configuration
export const routes: Routes = [
  { path: 'jobs', component:  JobsComponent},
  { path: 'dashboard', component:  DashboardComponent}
];

// Deprecated provide
// export const APP_ROUTER_PROVIDERS = [
//   provideRouter(routes)
// ];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
