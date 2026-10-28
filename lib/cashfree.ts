import { Cashfree, CFEnvironment } from "cashfree-pg";

const clientId = process.env.CASHFREE_APP_ID || "";
const clientSecret = process.env.CASHFREE_SECRET_KEY || "";

export const cashfree = new Cashfree(CFEnvironment.PRODUCTION, clientId, clientSecret);
