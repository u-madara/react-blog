// Buffer polyfill for browser environment
import { Buffer } from 'buffer';

// Make Buffer available globally
(window as any).Buffer = Buffer;

// Export for use in other modules
export { Buffer };