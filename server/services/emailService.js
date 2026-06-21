import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Prefer explicit verification credentials for Sukoon-specific emails,
// otherwise fall back to the general EMAIL_USER / EMAIL_PASS used elsewhere.
const verificationUser =
  process.env.EMAIL_SUKOON_VERIFICATION || process.env.EMAIL_USER;
const verificationPass =
  process.env.PASS_SUKOON_VERIFICATION || process.env.EMAIL_PASS;
const emailService = process.env.EMAIL_SERVICE || "gmail";

const transporter = nodemailer.createTransport({
  service: emailService, // provider
  auth: {
    user: verificationUser,
    pass: verificationPass,
  },
});

// Expose a helper to verify credentials (can be called on startup or manually)
export const verifySukoonEmailCredentials = async () => {
  try {
    await transporter.verify();
    console.log("Sukoon email transporter verified");
    return true;
  } catch (err) {
    console.warn(
      "Sukoon email transporter verification failed:",
      err && err.message ? err.message : err,
    );
    return false;
  }
};

export const sendBookingConfirmationEmail = async (bookingDetails) => {
  try {
    const {
      email,
      name,
      sessionType,
      date,
      time,
      amount,
      phone,
      notes,
      meetLink,
      hostName,
      hostEmail,
    } = bookingDetails;

    // Replace variables in Template A (For the Booker)
    const bookerHtml = `
<div style="font-family: 'Segoe UI', system-ui, sans-serif; background:#f4f7fb; padding:30px 10px;">
  <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:20px;box-shadow:0 10px 30px rgba(0,0,0,0.08);overflow:hidden;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#4a7bd9,#6fa8ff);padding:30px;text-align:center;">
      <img src="https://blogger.googleusercontent.com/img/a/AVvXsEhljdcGUYJ2TKhUE4HJnWu0_X59BOWHQYqBMrjF48IbU3bGW11LqkhzeiRRPRTVPZWq2KDm9NRglnOukhT-7rV0nKhxIAuO2HEw4nhl-zIcqMXiF2U4aNHYwj2VULZombHFlDS0Ds_xtbnyOcqcBRagGuDP8-2SWv9AjKi4UWWnm41-BsNvVUMCLPm8rFwf"
           style="height:50px;margin-bottom:10px;">
      <h2 style="color:#ffffff;margin:0;font-weight:600;">
        SukoonWorld
      </h2>
      <p style="color:#eaf1ff;margin:5px 0 0;font-size:14px;">
        Your session is confirmed
      </p>
    </div>

    <!-- Body -->
    <div style="padding:30px;color:#333;">
      
      <h1 style="font-size:22px;margin-top:0;">
        Booking Confirmed ✅
      </h1>

      <p style="color:#555;font-size:15px;">
        Hi <strong>${name}</strong>,<br><br>
        Your session with <strong>SukoonWorld</strong> has been successfully booked.  
        We’re excited to have you with us 💙
      </p>

      <!-- Booking Card -->
      <div style="background:#f7faff;border-radius:12px;padding:20px;margin:20px 0;">
        <p style="margin:8px 0;"><strong>📅 Date & Time:</strong> ${date}${time ? " at " + time : ""}</p>
        <p style="margin:8px 0;"><strong>👤 Host:</strong> ${hostName || "SukoonWorld Team"}</p>
        <p style="margin:8px 0;"><strong>🌐 Website:</strong> 
          <a href="https://sukoonworld.org" style="color:#4a7bd9;text-decoration:none;">
            sukoonworld.org
          </a>
        </p>
      </div>

      <!-- CTA -->
      <div style="text-align:center;margin:25px 0;">
        <a href="${meetLink}" 
           style="display:inline-block;padding:14px 28px;background:linear-gradient(135deg,#4a7bd9,#6fa8ff);color:#fff;text-decoration:none;border-radius:30px;font-size:15px;font-weight:500;box-shadow:0 6px 15px rgba(74,123,217,0.4);">
          Join Your Session
        </a>
      </div>

      <p style="font-size:14px;color:#666;text-align:center;">
        Please join a few minutes before your scheduled session.
      </p>

    </div>

    <!-- Footer -->
    <div style="padding:20px;text-align:center;background:#f9fbff;">
      <p style="margin:5px 0;color:#555;">Need help or have questions?</p>

      <p style="margin:5px 0;">
        📞 
        <a href="tel:8447579022" style="color:#4a7bd9;text-decoration:none;font-weight:500;">
          8447579022
        </a>
      </p>

      <p style="margin:5px 0;">
        👤 Founder: <strong>Rohit Kumar Tiwari</strong>
      </p>

      <p style="margin-top:15px;font-size:12px;color:#888;">
        © SukoonWorld • All rights reserved
      </p>
    </div>

  </div>
</div>
    `;

    // Replace variables in Template B (For the Host)
    const hostHtml = `
<div style="font-family: 'Segoe UI', system-ui, sans-serif; background:#f4f7fb; padding:30px 10px;">
  <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:20px;box-shadow:0 10px 30px rgba(0,0,0,0.08);overflow:hidden;">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#4a7bd9,#6fa8ff);padding:25px;text-align:center;">
      <img src="https://blogger.googleusercontent.com/img/a/AVvXsEhljdcGUYJ2TKhUE4HJnWu0_X59BOWHQYqBMrjF48IbU3bGW11LqkhzeiRRPRTVPZWq2KDm9NRglnOukhT-7rV0nKhxIAuO2HEw4nhl-zIcqMXiF2U4aNHYwj2VULZombHFlDS0Ds_xtbnyOcqcBRagGuDP8-2SWv9AjKi4UWWnm41-BsNvVUMCLPm8rFwf"
           style="height:45px;margin-bottom:8px;">
      <h2 style="color:#ffffff;margin:0;font-weight:600;">
        New Session Request 🔔
      </h2>
    </div>

    <!-- Body -->
    <div style="padding:30px;color:#333;">

      <h3 style="margin-top:0;">You’ve received a new booking request</h3>

      <p style="color:#555;font-size:15px;">
        A new session has been requested on <strong>SukoonWorld</strong>.
      </p>

      <!-- Request Details Card -->
      <div style="background:#f7faff;border-radius:12px;padding:20px;margin:20px 0;">

        <p style="margin:8px 0;"><strong>👤 Name:</strong> ${name}</p>
        <p style="margin:8px 0;"><strong>📧 Email:</strong> ${email}</p>
        <p style="margin:8px 0;"><strong>📞 Phone:</strong> ${phone}</p>
        <p style="margin:8px 0;"><strong>📅 Preferred Time:</strong> ${date}${time ? " at " + time : ""}</p>
         <p style="margin:8px 0;"><strong>💻 Meeting Link:</strong> ${meetLink}</p>

        <!-- Optional -->
        <p style="margin:8px 0;"><strong>📝 Notes:</strong> ${notes || "N/A"}</p>

      </div>

      <p style="font-size:13px;color:#777;text-align:center;">
        Please respond quickly to ensure a great experience.
      </p>

    </div>

    <!-- Footer -->
    <div style="padding:20px;text-align:center;background:#f9fbff;">
      <p style="margin:5px 0;color:#555;">SukoonWorld Admin Panel</p>

      <p style="margin:5px 0;">
        📞 
        <a href="tel:8447579022" style="color:#4a7bd9;text-decoration:none;">
          8447579022
        </a>
      </p>

      <p style="margin:5px 0;">
        🌐 
        <a href="https://sukoonworld.org" style="color:#4a7bd9;text-decoration:none;">
          sukoonworld.org
        </a>
      </p>

      <p style="margin-top:10px;font-size:12px;color:#999;">
        © SukoonWorld
      </p>
    </div>

  </div>
</div>
    `;

    // 1. Send Email to Booker
    const bookerOptions = {
      from: `"SukoonWorld" <${verificationUser}>`,
      to: email,
      subject: `Booking Confirmed - SukoonWorld`,
      html: bookerHtml,
    };

    // 2. Send Email to Host/Admin
    const hostOptions = {
      from: `"SukoonWorld" <${verificationUser}>`,
      to: hostEmail || process.env.VITE_HOST_EMAIL || "sukoonworld.org@gmail.com",
      cc: "sukoonworld.org@gmail.com",
      subject: `New Booking: ${name}`,
      html: hostHtml,
    };

    await Promise.all([
      transporter.sendMail(bookerOptions),
      transporter.sendMail(hostOptions),
    ]);

    console.log("Emails sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

export const sendContactEmail = async ({ name, email, subject, message }) => {
  try {
    const supportEmail = process.env.SUPPORT_EMAIL || "sukoonworld.org@gmail.com";

    const userAckHtml = `
      <p>Hi ${name},</p>
      <p>Thanks for contacting SukoonWorld. We received your message and will get back to you shortly.</p>
      <p><strong>Your Message:</strong></p>
      <blockquote>${message}</blockquote>
      <p>Best regards,<br/>SukoonWorld Team</p>
    `;

    const hostHtml = `
      <h3>New Contact Message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <blockquote>${message}</blockquote>
    `;

    const userOptions = {
      from: `"SukoonWorld" <${verificationUser}>`,
      to: email,
      subject: `Thanks for contacting SukoonWorld`,
      html: userAckHtml,
    };

    const hostOptions = {
      from: `"SukoonWorld" <${verificationUser}>`,
      to: supportEmail,
      cc: "sukoonworld.org@gmail.com",
      subject: `Website Contact: ${subject} - ${name}`,
      html: hostHtml,
    };

    // send both emails (ack to user + notify support)
    await Promise.all([
      transporter.sendMail(userOptions),
      transporter.sendMail(hostOptions),
    ]);
    console.log("Contact emails sent");
    return true;
  } catch (err) {
    console.error("Error in sendContactEmail:", err);
    throw err;
  }
};

export const sendVerificationEmail = async ({ email, name, otp }) => {
  try {
    const verificationHtml = `
      <div style="font-family:Arial,sans-serif;padding:20px;background:#f4f7fb">
        <div style="max-width:600px;margin:auto;background:#fff;border-radius:8px;padding:24px;text-align:left">
          <h2 style="margin-top:0">Verify your email</h2>
          <p>Hi ${name || ""},</p>
          <p>Use the following One Time Password (OTP) to verify your email for SukoonWorld. This code expires in 10 minutes.</p>
          <div style="font-size:22px;font-weight:700;margin:18px 0;padding:14px;background:#f0f6ff;border-radius:6px;text-align:center">${otp}</div>
          <p>If you didn't request this, you can safely ignore this email.</p>
          <p style="color:#888;font-size:12px;margin-top:18px">SukoonWorld</p>
        </div>
      </div>
    `;

    const options = {
      from: `"SukoonWorld" <${verificationUser}>`,
      to: email,
      subject: "Verify your SukoonWorld email",
      html: verificationHtml,
    };

    await transporter.sendMail(options);
    console.log("Verification email sent to", email);
    return true;
  } catch (err) {
    console.error("Error sending verification email:", err);
    throw err;
  }
};
