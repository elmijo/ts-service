import app from "./app"

const { SERVER_PORT = "3000" } = process.env

const server = app.listen(SERVER_PORT)

server.on("listening", () => {
  console.log(`The application is running on http://localhost:${SERVER_PORT}`)
})
