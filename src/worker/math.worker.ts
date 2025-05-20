
// Define types for our worker messages
type WorkerInput = {
  operation: 'add' | 'subtract' | 'multiply' | 'divide' | 'power' | 'sqrt' | 'factorial';
  values: number[];
};

type WorkerOutput = {
  result: number | null;
  error?: string;
};

// Math operations
const mathOperations = {
  add: (values: number[]): number => values.reduce((sum, val) => sum + val, 0),
  
  subtract: (values: number[]): number => {
    if (values.length < 2) return values[0] || 0;
    return values.slice(1).reduce((result, val) => result - val, values[0]);
  },
  
  multiply: (values: number[]): number => values.reduce((product, val) => product * val, 1),
  
  divide: (values: number[]): number | null => {
    if (values.some(val => val === 0 && values.indexOf(val) > 0)) {
      throw new Error('Division by zero');
    }
    if (values.length < 2) return values[0] || 0;
    return values.slice(1).reduce((result, val) => result / val, values[0]);
  },
  
  power: (values: number[]): number => {
    if (values.length !== 2) throw new Error('Power operation requires exactly 2 values');
    return Math.pow(values[0], values[1]);
  },
  
  sqrt: (values: number[]): number => {
    if (values.length !== 1) throw new Error('Square root operation requires exactly 1 value');
    if (values[0] < 0) throw new Error('Cannot calculate square root of a negative number');
    return Math.sqrt(values[0]);
  },
  
  factorial: (values: number[]): number => {
    if (values.length !== 1) throw new Error('Factorial operation requires exactly 1 value');
    const n = values[0];
    if (n < 0 || !Number.isInteger(n)) throw new Error('Factorial only works with non-negative integers');
    if (n === 0 || n === 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  }
};

// Worker message handler
self.onmessage = (event: MessageEvent<WorkerInput>) => {
  const { operation, values } = event.data;
  
  try {
    if (!operation || !mathOperations[operation]) {
      throw new Error(`Unsupported operation: ${operation}`);
    }
    
    const result = mathOperations[operation](values);
    
    const response: WorkerOutput = { result };
    self.postMessage(response);
  } catch (error) {
    const response: WorkerOutput = {
      result: null,
      error: error instanceof Error ? error.message : String(error)
    };
    self.postMessage(response);
  }
};