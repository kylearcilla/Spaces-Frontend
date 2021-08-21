export type DefaultFunction = (...args: any[]) => void;
export type AsyncFunction = (...args: any[]) => Promise<void>;
export type EventHandlerFunction = (
  e: React.ChangeEvent<HTMLInputElement>
) => void;
