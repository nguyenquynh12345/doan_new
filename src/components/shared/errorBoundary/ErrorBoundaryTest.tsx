
/**
 * Import in component that wraped by ErrorBoundary
 */
const ErrorBoundaryTest = () => {
  throw new Error('I crashed!');
};

export default ErrorBoundaryTest;
