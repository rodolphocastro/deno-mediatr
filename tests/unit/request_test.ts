import { Rhum } from "../deps.ts";
import { OutRequest } from "../../src/request.ts";
import { DateRange, Person } from "./commons.ts";

Rhum.testPlan(
  "I. Requests",
  () => {
    Rhum.testSuite(
      "1. OutRequest<T>",
      () => {
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
