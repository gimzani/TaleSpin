/**
 * Counts the number of words in a string
 * @param {string} text - The input string to count words from
 * @returns {number} The number of words in the string
 */
export function countWords(text) {
  if (!text || typeof text !== 'string') {
    return 0;
  }
  
  // Remove extra whitespace and split by spaces
  return text.trim()
    .replace(/\s+/g, ' ')
    .split(' ')
    .filter(word => word.length > 0)
    .length;
}