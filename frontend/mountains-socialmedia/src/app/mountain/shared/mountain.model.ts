import {NewMountain} from './newMountain.model';

export class Mountain extends NewMountain {
  public id: string;
  public stories: string;

  constructor(name?: string,
              coordinates?: Array<Array<number>>,
              id?: string,
              stories?: string)
  {
    super(name, coordinates);
    this.id = id;
    this.stories = stories;
  }
}
