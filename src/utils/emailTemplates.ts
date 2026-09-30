// src/utils/emailTemplates.ts
export const resetPasswordTemplate = (
  name: string,
  resetLink: string,
): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
</head>
<body style="margin:0; padding:0; background-color:#f6f6fb; font-family: Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 0;">
    <tr>
      <td align="center">
        <table width="480" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:12px; border:1px solid #ddd9f4; overflow:hidden;">
          <tr>
            <td style="background-color:#6d5ae8; padding:24px; text-align:center;">
              <span style="color:#ffffff; font-size:20px; font-weight:bold;">PocketLedger</span>
            </td>
          </tr>
          <tr>
            <td style="padding:32px;">
              <h2 style="color:#1a1b2e; margin:0 0 12px;">Reset your password</h2>
              <p style="color:#52546e; font-size:14px; line-height:1.5; margin:0 0 24px;">
                Hi ${name}, we received a request to reset your PocketLedger password. Click the button below to set a new one. This link expires in 1 hour.
              </p>
              <table cellpadding="0" cellspacing="0">
                <tr>
                  <td style="background-color:#6d5ae8; border-radius:8px;">
                    <a href="${resetLink}" style="display:inline-block; padding:12px 28px; color:#ffffff; text-decoration:none; font-size:14px; font-weight:bold;">
                      Reset Password
                    </a>
                  </td>
                </tr>
              </table>
              <p style="color:#8b8da6; font-size:12px; margin:24px 0 0;">
                If you didn't request this, you can safely ignore this email.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
