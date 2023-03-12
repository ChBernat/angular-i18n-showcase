declare module 'xliff/cjs' {
  interface Translation {
    node: string | string[];
    source: Source;
    target?: Target;
  }

  export type Source = string | SpanOrStandaloneOrString[];
  export type Target = string | SpanOrStandaloneOrString[];

  export type SpanOrStandaloneOrString = Span | Standalone | string;

  export interface Span {
    Span: {
      id: string;
      equivStart: string;
      equivEnd: string;
      type: string;
      dispStart: string;
      dispEnd: string;
      contents: string;
    };
  }
  export interface Standalone {
    Standalone: {
      id: string;
      equiv: string;
      disp: string;
    };
  }

  interface Result {
    sourceLanguage: string;
    resources: Record<string, Translation>;
  }

  export function xliff2js(str: string, callback: (error: any, result: Result) => void): void;
}
