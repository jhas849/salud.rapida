import { UserService } from './user.service';
import { describe, expect, it } from 'vitest';

describe('UserService', () => {
  it('registers and logs in a user', () => {
    const service = new UserService();

    const result = service.register('Laura Méndez', 'LAURA@example.com', 'secreto123');

    expect(result.user?.email).toBe('laura@example.com');
    expect(service.login('laura@example.com', 'secreto123')?.name).toBe('Laura Méndez');
    expect(service.getCurrentUser()?.name).toBe('Laura Méndez');
  });

  it('rejects duplicate emails and invalid credentials', () => {
    const service = new UserService();
    service.register('Laura Méndez', 'laura@example.com', 'secreto123');

    expect(service.register('Otra persona', 'LAURA@example.com', 'otra123').error).toContain('Ya existe');
    expect(service.login('laura@example.com', 'incorrecta')).toBeNull();
  });
});
