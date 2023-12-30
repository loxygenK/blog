import { FC, ReactNode } from "react";
import { ZodSchema, z } from "zod";

export const reactNode = z.custom<ReactNode>();

export function runtimeChecked<T extends ZodSchema>(
  componentName: string,
  schema: T,
  component: FC<z.infer<T>>,
): FC<z.infer<T>> {
  return (props) => {
    const parsed = schema.safeParse(props);
    if (!parsed.success) {
      throw new Error(
        // biome-ignore lint/style/useTemplate: The resulting string is very long
        `[${componentName}] Runtime props type check failure\n` +
          "Runtime type check for the props has failed with the following reason.\n" +
          "The error must be addressed in order to building the article.\n" +
          JSON.stringify(parsed.error.flatten(), undefined, 2) +
          "\nActual error payload is as follows:\n" +
          JSON.stringify(parsed.error, undefined, 2),
        parsed.error,
      );
    }

    try {
      return component(schema.parse(props));
    } catch (e) {
      throw new Error(
        // biome-ignore lint/style/useTemplate: The resulting string is very long
        `[${componentName}] Runtime exception thrown\n` +
          "Exception was thrown during the execution:\n" +
          e +
          "\n\nActual error payload is as follows:\n" +
          JSON.stringify(e, undefined, 2),
        e instanceof Error ? e : undefined,
      );
    }
  };
}
