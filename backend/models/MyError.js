class MyError extends Error {
  constructor(msg, code, errors = null) {
    super(msg);
    this.code = code;
    this.errors = errors;
  }
}
module.exports = MyError;
