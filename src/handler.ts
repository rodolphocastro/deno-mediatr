import { OutRequest } from "./request.ts";

export interface RequestHandler<
  RequestType extends OutRequest<OutputType>,
  OutputType,
> {
  handle(request: RequestType): Promise<OutputType>;
}
