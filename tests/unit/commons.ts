export class Person {
  constructor(
    private name: string,
    private age: number,
    private isAlive: boolean,
  ) {
  }

  public get Name() {
    return this.name;
  }

  public get Age() {
    return this.age;
  }

  public Rename(newName: string): Person {
    if (newName == "") {
      return this;
    }
    this.name = newName;
    return this;
  }

  public Kill(): Person {
    if (!this.isAlive) {
      return this;
    }
    this.isAlive = false;
    return this;
  }

  public AgeBy(by = 1): Person {
    if (!this.isAlive) {
      return this;
    }
    this.age += by;
    return this;
  }
}

export interface DateRange {
  starts: Date;
  ends: Date;
}
