export class Student {
  constructor(id, name, email) {
    this.id = id;
    this.name = name;
    this.email = email;
  }

  updateEmail(newEmail) {
    this.email = newEmail;
  }

  static copyWithNewEmail(student, newEmail) {
    return { ...student, email: newEmail };
  }
}