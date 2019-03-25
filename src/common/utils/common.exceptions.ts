class EmailAlreadyExists extends Error {
    code = 1000;
    message = this.message ||
      'User already registered using this email address!';
}

export { EmailAlreadyExists }