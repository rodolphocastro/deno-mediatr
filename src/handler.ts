import { OutRequest } from "./request.ts";

export interface RequestHandler<
  RequestType extends OutRequest<OutputType>,
  OutputType = RequestType extends OutRequest<infer _T> ? _T : never,
> {
  handle(request: RequestType): Promise<OutputType>;
}
