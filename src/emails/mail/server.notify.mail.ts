import { defaultEmailToOrganization } from "../template/default";

export async function notifyServerRestart() {
  try {
    await defaultEmailToOrganization(
      `Server Restarted`,
      `The User Authentication server has been restarted at ${new Date().toLocaleString()}.`,
      { server_notify: true }
    );
    console.log("\x1b[33m%s\x1b[0m", "Server Restart Email Sent");
  } catch (error) {
    console.log("\x1b[33m%s\x1b[0m", `Server Restart Email Error: ${error}`);
  }
}
