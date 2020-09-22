import { Rhum } from "../deps.ts";
import { OutRequest } from "../../src/request.ts";

Rhum.testPlan(
  "I. Requests",
  () => {
    Rhum.testSuite(
      "1. OutRequest<T>",
      () => {
        class Person {
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
        interface DateRange {
          starts: Date;
          ends: Date;
        }

        Rhum.testCase(
          "1. Should be constructable with a Class parameter",
          () => {
            try {
              const myRequest: OutRequest<Person> = {
                id: 1,
                named: "Rodolpho",
                age: 27,
                isDead: false,
              };
              Rhum.asserts.assert(myRequest != null);
            } catch (error) {
              Rhum.asserts.fail(error);
            }
          },
        );

        Rhum.testCase(
          "2. Should be constructable with an Interface parameter",
          () => {
            try {
              const myRequest: OutRequest<DateRange> = {
                id: 1,
                someRandomInput: "pudding!",
              };
              Rhum.asserts.assert(myRequest != null);
            } catch (error) {
              Rhum.asserts.fail(error);
            }
          },
        );

        Rhum.testCase(
          "3. Should be constructable with a primitive parameter",
          () => {
            try {
              const myRequest: OutRequest<number> = {
                id: 1,
                target: { id: "123-321-000", alias: "Coyote" },
              };
              Rhum.asserts.assert(myRequest != null);
            } catch (error) {
              Rhum.asserts.fail(error);
            }
          },
        );
      },
    );
  },
);

Rhum.run();
