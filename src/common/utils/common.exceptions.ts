/**
 * Exception email already exists
 */
class EmailAlreadyExists extends Error {
    code = 1000;
    message = this.message ||
      'User already registered using this email address!';
}

/**
 * Exception invalid token 
 */
class InvalidToken extends Error{
  code = 1001
  message = this.message || 
    'Invalid token!'
}

export { 
  EmailAlreadyExists,
  InvalidToken
 }