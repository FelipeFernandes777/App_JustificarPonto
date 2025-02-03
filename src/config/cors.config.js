import cors from "cors";

export function corsConfiguration() {
   return cors({
      origin: "http://127.0.0.1:5500", // Only allow this specific origin
      methods: "GET, POST",
      allowedHeaders: ["Content-Type", "Authorization"],
      preflightContinue: false,
      optionsSuccessStatus: 204,
   });
}
