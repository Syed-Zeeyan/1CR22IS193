// Access token for authentication (replace with your actual token and keep it secure)
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzeWVkemVleWFuNDVAZ21haWwuY29tIiwiZXhwIjoxNzU2MDk1ODI3LCJpYXQiOjE3NTYwOTQ5MjcsImlzcyI6IkFmZm9yZCBNZWRpY2FsIFRlY2hub2xvZ2llcyBQcml2YXRlIExpbWl0ZWQiLCJqdGkiOiIxMmRmZDdhMS1jMzNhLTRjMzktYjZkMi00NDRlYzU3NmJmNjAiLCJsb2NhbGUiOiJlbi1JTiIsIm5hbWUiOiJzeWVkIHplZXlhbiIsInN1YiI6ImM2MzYwNDU5LTMzMDAtNGUwMi04MDY0LWQxMGE0Y2UzNDA1MyJ9LCJlbWFpbCI6InN5ZWR6ZWV5YW40NUBnbWFpbC5jb20iLCJuYW1lIjoic3llZCB6ZWV5YW4iLCJyb2xsTm8iOiIxY3IyMmlzMTkzIiwiYWNjZXNzQ29kZSI6InlVVlFYSyIsImNsaWVudElEIjoiYzYzNjA0NTktMzMwMC00ZTAyLTgwNjQtZDEwYTRjZTM0MDUzIiwiY2xpZW50U2VjcmV0IjoiaGdlVmJqc011YXh2S3N4QSJ9.4Zd9uA5v3sJtWMGF2BUL89xmRMjSPQxBXsPjYgQh2gg";
// API endpoint for sending logs
const LOG_API_ENDPOINT = "http://20.244.56.144/evaluation-service/logs";
/**
 * Send a log message to the server.
 * @param level - Log level (debug, info, warn, error, fatal)
 * @param message - The message to log
 */
export async function Log(level, message) {
    const stack = "frontend";
    const pkg = "api";
    // Check if the log level is valid
    const validLevels = ["debug", "info", "warn", "error", "fatal"];
    if (!validLevels.includes(level)) {
        console.error(`Invalid log level: ${level}. Log not sent.`);
        return;
    }
    const requestBody = {
        stack,
        level,
        package: pkg,
        message,
    };
    try {
        const response = await fetch(LOG_API_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            body: JSON.stringify(requestBody),
        });
        if (!response.ok) {
            console.error(`Log failed. Status: ${response.status}`);
            const errorData = await response.json();
            console.error("Server error:", errorData);
        }
        else {
            console.log("Log sent!");
            const responseData = await response.json();
            console.log("Log ID:", responseData.logID);
        }
    }
    catch (error) {
        console.error("Could not send log:", error);
    }
}
