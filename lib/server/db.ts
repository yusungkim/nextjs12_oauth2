import { PrismaClient } from "@prisma/client";

declare global {
  var dbClient: PrismaClient | undefined;
}

const isProduction = process.env.NODE_ENV === "production";

const dbClient =
  global.dbClient ||
  new PrismaClient({
    log: isProduction
      ? ["warn", "error"]
      : ["info", "warn", "error", "query"],
  });

if (!isProduction) global.dbClient = dbClient;

export default dbClient;
