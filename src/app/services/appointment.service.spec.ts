import { AppointmentService } from './appointment.service';
import { describe, expect, it } from 'vitest';

describe('AppointmentService', () => {
  it('creates an appointment for an existing doctor', () => {
    const service = new AppointmentService();

    const appointment = service.createAppointment({
      doctorId: 1,
      patientName: 'Laura Méndez',
      patientEmail: 'laura@example.com',
      date: '2026-10-01',
      time: '10:00',
      reason: 'Control general',
    });

    expect(appointment.patientName).toBe('Laura Méndez');
    expect(appointment.doctorName).toBe('Ana García');
    expect(service.getAppointmentById(appointment.id)).toEqual(appointment);
  });

  it('updates and cancels an appointment', () => {
    const service = new AppointmentService();
    const appointment = service.createAppointment({
      doctorId: 1,
      patientName: 'Laura Méndez',
      patientEmail: 'laura@example.com',
      date: '2026-10-01',
      time: '10:00',
      reason: 'Control general',
    });

    const updated = service.updateAppointment(appointment.id, {
      doctorId: 2,
      patientName: 'Laura Méndez',
      patientEmail: 'laura@example.com',
      date: '2026-10-02',
      time: '12:00',
      reason: 'Seguimiento dermatológico',
    });

    expect(updated.doctorName).toBe('Luis Ramírez');
    expect(updated.date).toBe('2026-10-02');

    service.cancelAppointment(appointment.id);
    expect(service.getAppointmentById(appointment.id)).toBeUndefined();
  });
});
