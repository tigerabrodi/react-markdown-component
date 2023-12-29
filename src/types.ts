export type GetTypesStartingWithPrefix<
  Type,
  Prefix extends string
> = Type extends `${Prefix}${infer _}` ? Type : never;

type Tag = {
  type: "normal" | "bold";
  content: string;
};

export type MarkdownElement =
  | {
      type: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
      content: Array<Tag>;
      id: string;
    }
  | {
      type: "breakpoint";
      id: string;
    };
