import dotenv from "dotenv";

dotenv.config();

function required(key: string, defaultValue?: string | number) {
  const value = process.env[key] || defaultValue;
  if (value == null) {
    throw new Error(`Key ${key} is undefined`);
  }
  return value;
}

const port = required("HOST_PORT");

export const config: {
  host: { port: number };
  db: {
    host: string;
    user: string;
    database: string;
    password: string;
  };
} = {
  host: {
    port: typeof port === "number" ? port : parseInt(port),
  },
  db: {
    host: required("DB_HOST") as string,
    user: required("DB_USER") as string,
    database: required("DB_DATABASE") as string,
    password: required("DB_PASSWORD") as string,
  },
};
