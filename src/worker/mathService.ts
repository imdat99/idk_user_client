import { MathOperation, MathWorkerInput, MathWorkerOutput } from './math.worker.d';
/**
 * A class to interact with the Math Worker
 */
class MathService {
  private worker: Worker;

  constructor() {
    this.worker = new Worker(new URL('./math.worker.ts', import.meta.url));
  }

  /**
   * Perform a math operation using the worker
   * @param operation The math operation to perform
   * @param values The values to operate on
   * @returns A promise that resolves with the result
   */
  performOperation(operation: MathOperation, values: number[]): Promise<number> {
    return new Promise((resolve, reject) => {
      // Set up the message handler
      const handleMessage = (event: MessageEvent<MathWorkerOutput>) => {
        this.worker.removeEventListener('message', handleMessage);
        
        const { result, error } = event.data;
        
        if (error) {
          reject(new Error(error));
        } else {
          resolve(result as number);
        }
      };

      // Listen for the response
      this.worker.addEventListener('message', handleMessage);

      // Send the message to the worker
      const message: MathWorkerInput = { operation, values };
      this.worker.postMessage(message);
    });
  }

  /**
   * Add numbers
   * @param values Numbers to add
   */
  add(values: number[]): Promise<number> {
    return this.performOperation('add', values);
  }

  /**
   * Subtract numbers
   * @param values First number followed by numbers to subtract
   */
  subtract(values: number[]): Promise<number> {
    return this.performOperation('subtract', values);
  }

  /**
   * Multiply numbers
   * @param values Numbers to multiply
   */
  multiply(values: number[]): Promise<number> {
    return this.performOperation('multiply', values);
  }

  /**
   * Divide numbers
   * @param values First number divided by the rest
   */
  divide(values: number[]): Promise<number> {
    return this.performOperation('divide', values);
  }

  /**
   * Calculate power
   * @param base The base number
   * @param exponent The exponent
   */
  power(base: number, exponent: number): Promise<number> {
    return this.performOperation('power', [base, exponent]);
  }

  /**
   * Calculate square root
   * @param value The number to find the square root of
   */
  sqrt(value: number): Promise<number> {
    return this.performOperation('sqrt', [value]);
  }

  /**
   * Calculate factorial
   * @param value The number to calculate factorial for
   */
  factorial(value: number): Promise<number> {
    return this.performOperation('factorial', [value]);
  }

  /**
   * Terminate the worker when no longer needed
   */
  terminate(): void {
    this.worker.terminate();
  }
}
const mathService = new MathService();
export default mathService;