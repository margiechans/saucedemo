module.exports = [
  {
    username: "standard_user",
    password: "secret_sauce",
    expected: "success",
    expectedErrorMsg: null,
  },
  {
    username: "locked_out_user",
    password: "secret_sauce",
    expected: "fail",
    expectedErrorMsg: "Sorry, this user has been locked out.",
  },
  {
    username: "wrong_username",
    password: "secret_sauce",
    expected: "fail",
    expectedErrorMsg: "Username and password do not match",
  },
  {
    username: "standard_user",
    password: "wrong_password",
    expected: "fail",
    expectedErrorMsg: "Username and password do not match",
  },
  {
    username: "problem_user",
    password: "secret_sauce",
    expected: "success",
    expectedErrorMsg: null,
  },
  {
    username: "",
    password: "secret_sauce",
    expected: "fail",
    expectedErrorMsg: "Username is required",
  },
  {
    username: "standard_user",
    password: "",
    expected: "fail",
    expectedErrorMsg: "Password is required",
  },
];
