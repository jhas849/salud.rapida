export interface Doctor {
  id: number;
  name: string;
  lastname: string;
  specialty: string;
  experience: number;
  rating: number;
  availability: string[];
  color: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
}

export interface Appointment {
  id: number;
  patientName: string;
  patientEmail: string;
  doctorId: number;
  doctorName: string;
  specialty: string;
  date: string;
  time: string;
  reason: string;
  status: 'Confirmada' | 'Pendiente';
  createdAt: string;
}

export interface NewAppointmentRequest {
  doctorId: number;
  patientName: string;
  patientEmail: string;
  date: string;
  time: string;
  reason: string;
}
