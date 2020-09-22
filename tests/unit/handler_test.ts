import { Rhum, dixtureFns } from "../deps.ts";
import { OutRequest } from "../../src/request.ts";
import { RequestHandler } from "../../src/handler.ts";
import { DateRange, Person, commonsFactory, dateRangeKey } from "./commons.ts";

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
                async handle(h) {
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

        Rhum.beforeEach(() => {
          request = {
            argumentoUno: dixtureFns.Int(),
            argumentoDuo: dixtureFns.NamedString<InterfaceRequest>(
              "argumentoDuo",
            ),
          };
        });

        Rhum.testCase(
          "1. Should be constructable on the fly",
          async () => {
            try {
              const myHandler: RequestHandler<InterfaceRequest, DateRange> = {
                handle: async () =>
                  commonsFactory.build<DateRange>(dateRangeKey),
              };
              const result = await myHandler.handle(request);
              Rhum.asserts.assert(result != null);
            } catch (error) {
              Rhum.asserts.fail(error);
            }
          },
        );

        Rhum.testCase(
          "2. Should be constructable when implemented by a class",
          async () => {
            class AwesomeHandler
              implements RequestHandler<InterfaceRequest, DateRange> {
              async handle(_request: InterfaceRequest): Promise<DateRange> {
                return commonsFactory.build<DateRange>(dateRangeKey);
              }
            }
            try {
              const subject = new AwesomeHandler();
              const result = await subject.handle(request);
              Rhum.asserts.assert(result != null);
            } catch (error) {
              Rhum.asserts.fail(error);
            }
          },
        );
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

        Rhum.beforeEach(() => {
          request = {
            argumentoUno: dixtureFns.Int(),
            argumentoDuo: dixtureFns.NamedString<PrimitiveRequest>(
              "argumentoDuo",
            ),
          };
        });

        Rhum.testCase(
          "1. Should be constructable on the fly",
          async () => {
            try {
              const myHandler: RequestHandler<PrimitiveRequest, number> = {
                handle: async (r) => r.argumentoUno,
              };
              const result = await myHandler.handle(request);
              Rhum.asserts.assert(result === request.argumentoUno);
            } catch (error) {
              Rhum.asserts.fail(error);
            }
          },
        );

        Rhum.testCase(
          "2. Should be constructable when implemented by a class",
          async () => {
            class AwesomeHandler
              implements RequestHandler<PrimitiveRequest, number> {
              async handle(request: PrimitiveRequest): Promise<number> {
                return request.argumentoUno;
              }
            }
            try {
              const subject = new AwesomeHandler();
              const result = await subject.handle(request);
              Rhum.asserts.assert(result === request.argumentoUno);
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
