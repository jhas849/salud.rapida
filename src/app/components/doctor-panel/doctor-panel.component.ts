import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Appointment, Doctor } from '../../models/clinic';
import { AppointmentService } from '../../services/appointment.service';
import { DateFormatPipe } from '../../pipes/date-format.pipe';

@Component({
  selector: 'app-doctor-panel',
  standalone: true,
  imports: [NgFor, NgIf, ReactiveFormsModule, DateFormatPipe],
  templateUrl: './doctor-panel.component.html',
  styleUrl: './doctor-panel.component.css',
})
export class DoctorPanelComponent implements OnInit {
  appointments: Appointment[] = [];
  doctors: Doctor[] = [];
  editingId: number | null = null;
  editForm: FormGroup;
  editSlotOptions: string[] = [];
  successMessage = '';
  editMessage = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly appointmentService: AppointmentService,
  ) {
    this.appointments = this.appointmentService.getAppointments();
    this.doctors = this.appointmentService.getDoctors();
    this.editForm = this.formBuilder.group({
      doctorId: ['', Validators.required],
      patientName: ['', [Validators.required, Validators.minLength(3)]],
      patientEmail: ['', [Validators.required, Validators.email]],
      date: ['', Validators.required],
      time: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    const navigation = window.history.state as { successMessage?: string };
    this.successMessage = navigation.successMessage ?? '';
  }

  cancelAppointment(id: number): void {
    this.appointmentService.cancelAppointment(id);
    this.appointments = this.appointmentService.getAppointments();
  }

  startEdit(appointment: Appointment): void {
    this.editingId = appointment.id;
    this.editMessage = '';
    this.editSlotOptions = this.appointmentService.getAvailableSlots(appointment.doctorId);
    this.editForm.patchValue(appointment);
  }

  cancelEdit(): void {
    this.editingId = null;
    this.editForm.reset();
  }

  updateAppointment(): void {
    if (this.editForm.invalid || this.editingId === null) {
      this.editForm.markAllAsTouched();
      return;
    }

    const value = this.editForm.getRawValue();
    const appointment = this.appointmentService.updateAppointment(this.editingId, {
      doctorId: Number(value.doctorId),
      patientName: value.patientName.trim(),
      patientEmail: value.patientEmail.trim(),
      date: value.date,
      time: value.time,
      reason: value.reason.trim(),
    });

    this.appointments = this.appointmentService.getAppointments();
    this.editMessage = `Cita de ${appointment.patientName} actualizada correctamente.`;
    this.editingId = null;
  }

  updateEditSlots(doctorId: string): void {
    this.editSlotOptions = this.appointmentService.getAvailableSlots(Number(doctorId));
    this.editForm.patchValue({ time: '' }, { emitEvent: false });
  }
}
