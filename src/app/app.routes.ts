import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BookingPageComponent } from './components/booking-page/booking-page.component';
import { DoctorPanelComponent } from './components/doctor-panel/doctor-panel.component';

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'citas', component: BookingPageComponent },
  { path: 'panel', component: DoctorPanelComponent },
  { path: '**', redirectTo: '' },
];
