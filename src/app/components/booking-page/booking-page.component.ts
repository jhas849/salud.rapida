import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';
import { Doctor } from '../../models/clinic';

@Component({
  selector: 'app-booking-page',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, RouterLink],
  templateUrl: './booking-page.component.html',
  styleUrl: './booking-page.component.css',
})
export class BookingPageComponent implements OnInit {
  doctors: Doctor[] = [];
  form: FormGroup;
  slotOptions: string[] = [];
  successMessage = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly appointmentService: AppointmentService,
  ) {
    this.doctors = this.appointmentService.getDoctors();
    this.form = this.formBuilder.group({
      doctorId: ['', Validators.required],
      patientName: ['', [Validators.required, Validators.minLength(3)]],
      patientEmail: ['', [Validators.required, Validators.email]],
      date: ['', Validators.required],
      time: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    this.form.get('doctorId')?.valueChanges.subscribe((doctorId) => {
      if (!doctorId) {
        this.slotOptions = [];
        this.form.patchValue({ time: '' }, { emitEvent: false });
        return;
      }

      this.slotOptions = this.appointmentService.getAvailableSlots(Number(doctorId));
      this.form.patchValue({ time: '' }, { emitEvent: false });
    });
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.successMessage = '';
      return;
    }

    const value = this.form.getRawValue();
    const patientName = value.patientName ?? '';
    const patientEmail = value.patientEmail ?? '';
    const date = value.date ?? '';
    const time = value.time ?? '';
    const reason = value.reason ?? '';

    const appointment = this.appointmentService.createAppointment({
      doctorId: Number(value.doctorId),
      patientName: patientName.trim(),
      patientEmail: patientEmail.trim(),
      date,
      time,
      reason: reason.trim(),
    });

    this.successMessage = `Cita confirmada para ${appointment.doctorName} el ${appointment.date} a las ${appointment.time}.`;
    this.form.reset();
    this.slotOptions = [];
  }
}
