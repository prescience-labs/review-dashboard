interface IUser {
  id: string;
  email: string;
  isActive: boolean;
  teams: Array<string>;
  createdAt: string;
  updatedAt: string;
}

export default class User implements IUser {
  public id: string;
  public email: string;
  public isActive: boolean;
  public teams: Array<string>;
  public createdAt: string;
  public updatedAt: string;

  constructor({ id, email, isActive, teams, createdAt, updatedAt }: IUser) {
    this.id = id;
    this.email = email;
    this.isActive = isActive;
    this.teams = teams;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public static fromAuthApiResponse(parsedJson) {
    return new User({
      id: parsedJson.id,
      email: parsedJson.email,
      isActive: parsedJson.is_active,
      teams: parsedJson.teams,
      createdAt: parsedJson.created_at,
      updatedAt: parsedJson.updated_at
    });
  }
}
