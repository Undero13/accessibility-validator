import RaportModel from '../model/RaportModel'


abstract class AbstractValidator {
  protected url: string
  protected device: string
  protected test = false;
  protected error = false;
  protected finish = false;

  constructor(url: string, device: string, test: boolean) {
    this.url = url;
    this.device = device;
    this.test = test;
  }

  abstract processDOM(): void
  abstract getDOM(): void

  getURL(): string {
    return this.url;
  }

  getError(): boolean {
    return this.error
  }

  setError(error: boolean): void{
    this.error = error;
  }

  getFinish(): boolean {
    return this.finish
  }

  setFinish(finish: boolean): void{
    this.finish = finish;
  }
}

export default AbstractValidator;
