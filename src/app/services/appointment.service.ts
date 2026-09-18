import { Injectable } from '@angular/core';
import { Appointment, Doctor, NewAppointmentRequest } from '../models/clinic';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private readonly doctors: Doctor[] = [
    {
      id: 1,
      name: 'Ana',
      lastname: 'García',
      specialty: 'Cardiología',
      experience: 12,
      rating: 4.9,
      availability: ['09:00', '09:30', '10:00', '11:30', '15:00', '16:30'],
      color: '#3b82f6',
    },
    {
      id: 2,
      name: 'Luis',
      lastname: 'Ramírez',
      specialty: 'Dermatología',
      experience: 8,
      rating: 4.8,
      availability: ['08:30', '10:30', '12:00', '14:00', '17:00'],
      color: '#10b981',
    },
    {
      id: 3,
      name: 'María',
      lastname: 'Pérez',
      specialty: 'Pediatría',
      experience: 10,
      rating: 4.9,
      availability: ['09:15', '10:45', '13:00', '15:30', '18:00'],
      color: '#f59e0b',
    },
    {
      id: 4,
      name: 'Javier',
      lastname: 'Castro',
      specialty: 'Neurología',
      experience: 15,
      rating: 4.7,
      availability: ['08:00', '09:00', '11:00', '13:30', '16:00'],
      color: '#ef4444',
    },
  ];

  private appointments: Appointment[] = [
    {
      id: 1,
      patientName: 'Sofía Torres',
      patientEmail: 'sofia@email.com',
      doctorId: 1,
      doctorName: 'Ana García',
      specialty: 'Cardiología',
      date: '2026-09-17',
      time: '09:30',
      reason: 'Control cardiaco',
      status: 'Confirmada',
      createdAt: '2026-09-15T09:00:00',
    },
    {
      id: 2,
      patientName: 'Diego Morales',
      patientEmail: 'diego@email.com',
      doctorId: 3,
      doctorName: 'María Pérez',
      specialty: 'Pediatría',
      date: '2026-09-18',
      time: '15:30',
      reason: 'Revisión general',
      status: 'Pendiente',
      createdAt: '2026-09-14T10:30:00',
    },
    {
      id: 3,
      patientName: 'Elena Ruiz',
      patientEmail: 'elena@email.com',
      doctorId: 2,
      doctorName: 'Luis Ramírez',
      specialty: 'Dermatología',
      date: '2026-09-20',
      time: '14:00',
      reason: 'Consulta de piel',
      status: 'Confirmada',
      createdAt: '2026-09-13T14:10:00',
    },
  ];

  getDoctors(): Doctor[] {
    return [...this.doctors];
  }

  getDoctorById(id: number): Doctor | undefined {
    return this.doctors.find((doctor) => doctor.id === id);
  }

  getAppointments(): Appointment[] {
    return [...this.appointments].sort(
      (a, b) => new Date(a.date + 'T' + a.time).getTime() - new Date(b.date + 'T' + b.time).getTime(),
    );
  }

  getAvailableSlots(doctorId: number): string[] {
    const doctor = this.getDoctorById(doctorId);
    return doctor?.availability ?? [];
  }

  createAppointment(request: NewAppointmentRequest): Appointment {
    const doctor = this.getDoctorById(request.doctorId);

    if (!doctor) {
      throw new Error('El médico seleccionado no existe.');
    }

    const createdAt = new Date().toISOString();
    const newAppointment: Appointment = {
      id: Date.now(),
      patientName: request.patientName,
      patientEmail: request.patientEmail,
      doctorId: doctor.id,
      doctorName: `${doctor.name} ${doctor.lastname}`,
      specialty: doctor.specialty,
      date: request.date,
      time: request.time,
      reason: request.reason,
      status: 'Confirmada',
      createdAt,
    };

    this.appointments = [newAppointment, ...this.appointments];
    return newAppointment;
  }

  cancelAppointment(id: number): void {
    this.appointments = this.appointments.filter((appointment) => appointment.id !== id);
  }
}
