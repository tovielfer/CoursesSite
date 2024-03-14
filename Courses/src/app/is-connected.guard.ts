import { CanActivateFn } from '@angular/router';
import { User } from './models/user.model';

export const isConnectedGuard: CanActivateFn = (route, state) => {
  return sessionStorage.getItem("user")!=JSON.stringify(new User())
};
