export class NewMountain {
  public name: string;
  public coordinates: Array<Array<number>>;

  constructor(name: string, coordinates: Array<Array<number>>) {
    this.name = name;
    this.coordinates = coordinates;
  }
}
