import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);

export const sendWhatsApp = async (phone, hotelName, date, code) => {
  try {
    await client.messages.create({
      from: process.env.TWILIO_WHATSAPP,
      to: `whatsapp:${phone}`,
      body: `✅ Réservation confirmée !\n🏨 Hôtel: ${hotelName}\n📅 Date: ${date}\n🔐 Code: ${code}`
    });
  } catch (err) {
    console.error("WhatsApp error:", err.message);
  }
};