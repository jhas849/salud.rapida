import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Appointment, Doctor } from '../../models/clinic';
import { AppointmentService } from '../../services/appointment.service';
import { DoctorNamePipe } from '../../pipes/doctor-name.pipe';
import { DateFormatPipe } from '../../pipes/date-format.pipe';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [NgFor, ReactiveFormsModule, RouterLink, DoctorNamePipe, DateFormatPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  doctors: Doctor[] = [];
  appointments: Appointment[] = [];
  selectedDoctor: Doctor | null = null;
  bookingForm: FormGroup;
  slotOptions: string[] = [];
  bookingMessage = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly appointmentService: AppointmentService,
    private readonly router: Router,
  ) {
    this.doctors = this.appointmentService.getDoctors();
    this.appointments = this.appointmentService.getAppointments().slice(0, 4);
    this.bookingForm = this.formBuilder.group({
      patientName: ['', [Validators.required, Validators.minLength(3)]],
      date: ['', Validators.required],
      time: ['', Validators.required],
    });
  }

  selectDoctor(doctor: Doctor): void {
    this.selectedDoctor = doctor;
    this.slotOptions = this.appointmentService.getAvailableSlots(doctor.id);
    this.bookingMessage = '';
    this.bookingForm.reset();
  }

  closeBooking(): void {
    this.selectedDoctor = null;
    this.slotOptions = [];
    this.bookingMessage = '';
  }

  submitBooking(): void {
    if (!this.selectedDoctor) {
      return;
    }

    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      this.bookingMessage = '';
      return;
    }

    const value = this.bookingForm.getRawValue();
    const appointment = this.appointmentService.createAppointment({
      doctorId: this.selectedDoctor.id,
      patientName: value.patientName.trim(),
      patientEmail: '',
      date: value.date,
      time: value.time,
      reason: 'Consulta general',
    });

    this.appointments = this.appointmentService.getAppointments().slice(0, 4);
    this.router.navigate(['/panel'], {
      state: { successMessage: `Cita creada para ${appointment.patientName}.` },
    });
  }
}
