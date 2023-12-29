export type GetTypesStartingWithPrefix<
  Type,
  Prefix extends string
> = Type extends `${Prefix}${infer _}` ? Type : never;

export type MarkdownElement =
  | {
      type: "h1";
      content: string;
      id: string;
    }
  | {
      type: "breakpoint";
      id: string;
    };
