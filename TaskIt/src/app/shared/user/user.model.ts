export class User {
  constructor(public name: string, private email: string, public imgPath: string) {}

  getEmail(): string {
    return this.email;
  }
}
