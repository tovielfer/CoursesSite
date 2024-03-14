import { CanActivateFn } from '@angular/router';

export const isLactureGuard: CanActivateFn = (route, state) => {
  return sessionStorage.getItem("isLacturer")==JSON.stringify(true);
};
