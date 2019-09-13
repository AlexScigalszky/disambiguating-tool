import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConsoleService {
  static readonly LOG_ENABLED = true;// environment.production;

  log(message?: any, ...optionalParams: any[]): void {
    if (ConsoleService.LOG_ENABLED) console.log(message, optionalParams);
  }
  info(message?: any, ...optionalParams: any[]): void {
    if (ConsoleService.LOG_ENABLED) console.info(message, optionalParams);
  }
  debug(message?: any, ...optionalParams: any[]): void {
    if (ConsoleService.LOG_ENABLED) console.debug(message, optionalParams);
  }
  error(message?: any, ...optionalParams: any[]): void {
    if (ConsoleService.LOG_ENABLED) console.error(message, optionalParams);
  }

}
