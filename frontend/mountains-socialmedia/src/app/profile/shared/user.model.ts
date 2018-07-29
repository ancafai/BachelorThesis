import {NewUser} from './newUser.model';

export class User extends NewUser {
  public id: string;
  public points: number;
  public profilePicture: string;
  public mapType: string;
  public description: string;

  constructor(firstName?: string,
              lastName?: string,
              mail?: string,
              username?: string,
              password?: string,
              id?: string,
              points?: number,
              profilePicture?: string,
              description?: string,
              mapType?: string
  ) {
    super(firstName, lastName, mail, username, password);
    this.id = id;
    this.points = points;
    this.mapType = mapType;
    this.description = description;
    this.profilePicture = profilePicture;
  }
}
