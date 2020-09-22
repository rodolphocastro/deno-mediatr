import {
  DixtureFactory,
  InterfaceRuleSet,
  RuleSet,
  dixtureFns,
} from "../deps.ts";

const commonsFactory = new DixtureFactory();

export class Person {
  constructor(
    private name = "",
    private age = 0,
    private isAlive = false,
  ) {
  }

  public get Name() {
    return this.name;
  }

  // TODO: This shouldn't need to be public :(
  public set Name(newName: string) {
    this.name = newName;
  }

  // TODO: This shouldn't need to be public :(
  public set Age(newAge: number) {
    this.age = newAge;
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

const dateRangeKey = "IDRange";
export interface DateRange {
  starts: Date;
  ends: Date;
}

commonsFactory.addRuleSet(
  new InterfaceRuleSet<DateRange>(dateRangeKey, {
    field: "starts",
    resolve: dixtureFns.PastDate,
  }, {
    field: "ends",
    resolve: dixtureFns.FutureDate,
  }),
);

commonsFactory.addRuleSet(
  new RuleSet(Person, {
    field: "Name",
    resolve: () => dixtureFns.NamedString<Person>("Name"),
  }, {
    field: "Age",
    resolve: dixtureFns.Int,
  }),
);

export { commonsFactory };
