const LOG_API_ENDPOINT = "http://20.244.56.144/evaluation-service/logs";
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzeWVkemVleWFuNDVAZ21haWwuY29tIiwiZXhwIjoxNzU2MDk3NzQ0LCJpYXQiOjE3NTYwOTY4NDQsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiJkNjQ2NTk4Ni1iZmViLTQyYWMtOGU0OC1hNmU1ZWRhNjM5NTEiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzeWVkIHplZXlhbiIsInN1YiI6ImM2MzYwNDU5LTMzMDAtNGUwMi04MDY0LWQxMGE0Y2UzNDA1MyJ9LCJlbWFpbCI6InN5ZWR6ZWV5YW40NUBnbWFpbC5jb20iLCJuYW1lIjoic3llZCB6ZWV5YW4iLCJyb2xsTm8iOiIxY3IyMmlzMTkzIiwiYWNjZXNzQ29kZSI6InlVVlFYSyIsImNsaWVudElEIjoiYzYzNjA0NTktMzMwMC00ZTAyLTgwNjQtZDEwYTRjZTM0MDUzIiwiY2xpZW50U2VjcmV0IjoiaGdlVmJqc011YXh2S3N4QSJ9.7VpXNXqxRJmn2W1-WQqUNKZgvXz679e_ypBvABE9cws"; // Keep this here for reference

async function Log(level, message) {

  const stack = "frontend";
  const pkg = "api";
  const logEntry = {
    timestamp: new Date().toISOString(),
    stack,
    level,
    package: pkg,
    message
  };

  console.log("Mocking API Log Request (CORS Issue Detected):", logEntry);
}

export { Log };