import { Pipe, PipeTransform } from '@angular/core';
import { Doctor } from '../models/clinic';

@Pipe({
  name: 'doctorName',
  standalone: true,
})
export class DoctorNamePipe implements PipeTransform {
  transform(value: Doctor | string | null | undefined): string {
    if (!value) {
      return 'Sin médico asignado';
    }

    if (typeof value === 'string') {
      return value;
    }

    return `Dr. ${value.name} ${value.lastname}`;
  }
}
