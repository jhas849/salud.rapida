import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true,
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string | Date | null | undefined): string {
    if (!value) {
      return 'Sin fecha';
    }

    const parsedDate = value instanceof Date ? value : new Date(value);

    if (Number.isNaN(parsedDate.getTime())) {
      return 'Fecha inválida';
    }

    return new Intl.DateTimeFormat('es-PE', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(parsedDate);
  }
}
