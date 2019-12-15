import Store from 'electron-store';

class Raport {
  private raportList: Array<RaportModel> = [];
  private store = new Store();

  addNewRaport(raports: Array<RaportModel>): void{
    raports.forEach((raport) => this.raportList.push(raport))
    this.saveRaportList();
  }

  getRaport(): Array<RaportModel> {
    const rawJson = this.store.get('raport') || '[]'
    this.raportList = JSON.parse(rawJson)
    return this.raportList;
  }

  saveRaportList(): void {
    const raportJson = JSON.stringify(this.raportList);
    this.store.set('raport', raportJson);
  }

  clearStore(): void{
    this.store.clear();
  }
}

export default Raport;
