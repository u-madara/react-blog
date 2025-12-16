// Type declarations for the marked package
declare module 'marked' {
  export function marked(src: string): string;
  export function parse(src: string): Promise<string>;
  export function use(options: any): void;
  export const Renderer: {
    new (): any;
  };
  
  const _default: {
    parse: (src: string) => Promise<string>;
    use: (options: any) => void;
    Renderer: {
      new (): any;
    };
  };
  
  export default _default;
}