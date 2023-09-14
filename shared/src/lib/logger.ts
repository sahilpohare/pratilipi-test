import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class CustomLogger extends ConsoleLogger {
  constructor(context: string) {
    super();
  }

  override log(message: string) {
    super.log(`[${this.context}] ${message}`);
  }

  override error(message: string, trace: string) {
    super.error(`[${this.context}] ${message}`, trace);
  }

  override warn(message: string) {
    super.warn(`[${this.context}] ${message}`);
  }

  override debug(message: string) {
    super.debug(`[${this.context}] ${message}`);
  }

  override verbose(message: string) {
    super.verbose(`[${this.context}] ${message}`);
  }
}