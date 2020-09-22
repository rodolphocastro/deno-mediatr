import { Rhum, dixtureFns } from "../deps.ts";
import { OutRequest } from "../../src/request.ts";
import { RequestHandler } from "../../src/handler.ts";
import { DateRange, Person, commonsFactory } from "./commons.ts";

Rhum.testPlan(
  "II. Handlers",
  () => {
    Rhum.testSuite(
      "1. RequestHandler<T, K> where K extends class",
      () => {
        interface ClassRequest extends OutRequest<Person> {
          argumentoUno: number;
          argumentoDuo: string;
        }
        let request: ClassRequest;

        Rhum.beforeEach(() => {
          request = {
            argumentoUno: dixtureFns.Int(),
            argumentoDuo: dixtureFns.NamedString<ClassRequest>("argumentoDuo"),
          };
        });

        Rhum.testCase(
          "1. Should be constructable on the fly",
          async () => {
            try {
              const myHandler: RequestHandler<ClassRequest, Person> = {
                handle: async (h) => {
                  const result = commonsFactory.build(Person);
                  result.Rename(h.argumentoDuo);
                  return result;
                },
              };
              const result = await myHandler.handle(request);
              Rhum.asserts.assert(result.Name === request.argumentoDuo);
            } catch (error) {
              Rhum.asserts.fail(error);
            }
          },
        );

        Rhum.testCase(
          "2. Should be constructable when implemented by a class",
          async () => {
            class AwesomeHandler
              implements RequestHandler<ClassRequest, Person> {
              async handle(request: ClassRequest): Promise<Person> {
                const result = commonsFactory.build(Person);
                result.Rename(request.argumentoDuo);
                return result;
              }
            }
            try {
              const subject = new AwesomeHandler();
              const result = await subject.handle(request);
              Rhum.asserts.assert(result.Name === request.argumentoDuo);
            } catch (error) {
              Rhum.asserts.fail(error);
            }
          },
        );
      },
    );

    Rhum.testSuite(
      "2. RequestHandler<T, K> where K extends interface",
      () => {
        interface InterfaceRequest extends OutRequest<DateRange> {
          argumentoUno: number;
          argumentoDuo: string;
        }
        let request: InterfaceRequest;
      },
    );

    Rhum.testSuite(
      "3. RequestHandler<T, K> where K extends primitive",
      () => {
        interface PrimitiveRequest extends OutRequest<number> {
          argumentoUno: number;
          argumentoDuo: string;
        }
        let request: PrimitiveRequest;
      },
    );
  },
);

Rhum.run();
