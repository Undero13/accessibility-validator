import RaportModel from '../model/RaportModel'


abstract class AbstractValidator {
  protected url: string
  protected device: string
  protected raport: Array<RaportModel>
  protected test = false;
  protected error = false;
  protected finish = false;

  constructor(url: string, device: string, test: boolean) {
    this.url = url;
    this.device = device;
    this.test = test;
    this.raport = [];
  }

  abstract processDOM(): void
  abstract getDOM(): void

  getURL(): string {
    return this.url;
  }

  getRaport(): Array<RaportModel> {
    return this.raport;
  }

  setRaport(data: RaportModel): void {
    this.raport.push(data);
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
