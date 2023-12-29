export type GetTypesStartingWithPrefix<
  Type,
  Prefix extends string
> = Type extends `${Prefix}${infer _}` ? Type : never;

export type MarkdownElement =
  | {
      type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
      content: string;
      id: string;
    }
  | {
      type: "breakpoint";
      id: string;
    };
