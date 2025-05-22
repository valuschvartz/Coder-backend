// utils/customError.js
import { errorDictionary } from './errorDictionary.js';

export class CustomError extends Error {
  constructor(codeKey) {
    const errorInfo = errorDictionary[codeKey] || errorDictionary.UNKNOWN_ERROR;
    super(errorInfo.message);
    this.statusCode = errorInfo.code;
  }
}