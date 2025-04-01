import Transporter from "../transporter";
import { emails, transporter } from "../../config/env.config";

export async function defaultEmail(
  receiver: string,
  title: string,
  body: string
) {
  await Transporter.sendMail({
    from: transporter.auth.user,
    to: receiver,
    subject: title,
    html: body,
  });
}

/**
 * Sends an email to the organization with the specified title and body.
 * Optionally, it can notify server administrators if the `server_notify` option is enabled.
 *
 * @param title - The subject of the email.
 * @param body - The HTML content of the email.
 * @param options - Optional configuration for the email.
 * @param options.server_notify - If true, includes server administrators in the recipient list.
 *
 * @throws Will throw an error if the email fails to send.
 */
export async function defaultEmailToOrganization(
  title: string,
  body: string,
  options?: { server_notify?: boolean }
) {
  let receiver: string[] = [];
  if (options?.server_notify) receiver.push(...emails.server_notify);
  if (receiver.length === 0) receiver.push(emails.organization);
  await Transporter.sendMail({
    from: transporter.auth.user,
    to: receiver,
    subject: title,
    html: body,
  });
}
