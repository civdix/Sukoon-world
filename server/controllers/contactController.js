import { sendContactEmail } from "../services/emailService.js";

export const handleContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await sendContactEmail({ name, email, subject, message });

    return res.status(200).json({ success: true, message: "Message sent" });
  } catch (err) {
    console.error("Contact handler error:", err);
    return res.status(500).json({ error: "Failed to send message" });
  }
};
