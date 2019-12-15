import AbstractValidator from './AbstractValidator';
import Parser from './Parser';
import Raport from './Raport'
import checkers from './checkers/index'

/**
 * SiteValidator class
 * @module SiteValidate
 */
class SiteValidate extends AbstractValidator {
  private raport: Raport;

  constructor(param: MainFormData, test = false) {
    super(param.url, param.device, test);

    this.raport = new Raport();
    this.raport.clearStore();

    if (!this.test) {
      this.getDOM();
    }
  }

  getDOM(): void {
    Parser.getDOMFromURL(this.url, this.device)
      .then((res: NightmareReturnObject) => this.processDOM(res))
      .catch((e) => {
        if (process.env.DEV_ENV) console.error(e);

        this.setError(true);
        this.setFinish(true);
      })
  }

  processDOM(html: NightmareReturnObject): void {
    const activeCheckersList = process.env.CHECKERS.split(',')

    activeCheckersList.forEach((check) => {
      const result: Array<RaportModel> = checkers[check](html)

      if (result.length > 0) this.raport.addNewRaport(result)
    })
    this.setFinish(true)
  }
}


export default SiteValidate;
