import RaportModel from '../model/RaportModel'

abstract class AbstractValidator {
  private url: string
  private devices: string
  private raport: Array<RaportModel>

  constructor(url: string, devices: string) {
    this.url = url
    this.devices = devices
    this.raport = []
  }

  abstract processDOM(): void

  getURL(): string {
    return this.url;
  }

  getRaport(): Array<RaportModel> {
    return this.raport;
  }

  setRaport(data: RaportModel): void {
    this.raport.push(data);
  }
}

export default AbstractValidator;
