// Buffer polyfill for browser environment
import { Buffer } from 'buffer';

// Make Buffer available globally
window.Buffer = Buffer;

// Export for use in other modules
export { Buffer };