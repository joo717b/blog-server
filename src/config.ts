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

export const config = {
  host: {
    port: typeof port === "number" ? port : parseInt(port),
  },
};
