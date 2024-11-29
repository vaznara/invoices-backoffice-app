import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { map } from 'rxjs';

export const loggedInGuard: CanActivateFn = () => {
  const userService = inject(UserService);
  const router = inject(Router);
  return userService.currentUser$.pipe(
    map((user) => {
      return !!user ? router.parseUrl('/') : true;
    }),
  );
};
