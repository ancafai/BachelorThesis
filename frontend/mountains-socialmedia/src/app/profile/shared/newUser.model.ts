export class NewUser {
  public firstName: string;
  public lastName: string;
  public mail: string;
  public username: string;
  public password: string;

  constructor(firstName: string, lastName: string, mail: string, username: string, password: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.mail = mail;
    this.username = username;
    this.password = password;
  }
}
