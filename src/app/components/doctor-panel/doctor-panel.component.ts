import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Appointment } from '../../models/clinic';
import { AppointmentService } from '../../services/appointment.service';
import { DateFormatPipe } from '../../pipes/date-format.pipe';

@Component({
  selector: 'app-doctor-panel',
  standalone: true,
  imports: [NgFor, NgIf, DateFormatPipe],
  templateUrl: './doctor-panel.component.html',
  styleUrl: './doctor-panel.component.css',
})
export class DoctorPanelComponent implements OnInit {
  appointments: Appointment[] = [];
  successMessage = '';

  constructor(private readonly appointmentService: AppointmentService) {
    this.appointments = this.appointmentService.getAppointments();
  }

  ngOnInit(): void {
    const navigation = window.history.state as { successMessage?: string };
    this.successMessage = navigation.successMessage ?? '';
  }

  cancelAppointment(id: number): void {
    this.appointmentService.cancelAppointment(id);
    this.appointments = this.appointmentService.getAppointments();
  }
}
