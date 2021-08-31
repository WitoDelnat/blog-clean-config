import configFiles from "config";
import { z } from "zod";

const configSchema = z.object({
  server: z.object({
    port: z.number().min(0).max(65535),
  }),
  database: z.object({
    host: z.string(),
    port: z.number().min(0).max(65535),
    name: z.string(),
    user: z.string(),
    password: z.string(),
  }),
  logger: z.object({
    level: z.enum(["error", "info", "debug"]),
  }),
  features: z.object({
    helloName: z.string(),
  }),
});

export type Config = z.infer<typeof configSchema>;
export const config: Config = configSchema.parse(configFiles.util.toObject());
