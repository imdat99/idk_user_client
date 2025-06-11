// Type definitions for math worker

export type MathOperation =
  | 'add'
  | 'subtract'
  | 'multiply'
  | 'divide'
  | 'power'
  | 'sqrt'
  | 'factorial';

export interface MathWorkerInput {
  operation: MathOperation;
  values: number[];
}

export interface MathWorkerOutput {
  result: number | null;
  error?: string;
}

// Declaration for importing the worker
declare module '*.worker.ts' {
  class WebpackWorker extends Worker {
    constructor();
  }

  export default WebpackWorker;
}
