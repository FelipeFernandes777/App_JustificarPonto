import app from "./app.js";

const server = app;
const PORT = process.env.PORT || 3333

server.listen(PORT, () => {
    console.log("Server running in port: " + PORT);
})