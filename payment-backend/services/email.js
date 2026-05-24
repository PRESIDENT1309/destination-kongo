import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS // ⚠️ App Password Gmail obligatoire
  }
});

export const sendEmail = async (email, hotelName, amount, code = "") => {
  try {
    await transporter.sendMail({
      from: `"Destination Kongo" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎉 Confirmation de réservation - Destination Kongo",

      html: `
        <div style="font-family:Arial;padding:20px;background:#f5f5f5">
          
          <div style="max-width:600px;margin:auto;background:white;border-radius:12px;overflow:hidden">

            <div style="background:black;color:white;padding:20px;text-align:center">
              <h2 style="margin:0">DESTINATION KONGO</h2>
              <p style="opacity:0.7">Confirmation de réservation</p>
            </div>

            <div style="padding:20px">

              <h3>Votre réservation est confirmée 🎉</h3>

              <p><b>🏨 Hôtel :</b> ${hotelName}</p>
              <p><b>💰 Montant :</b> ${amount} CDF</p>

              ${code ? `<p><b>🔐 Code :</b> ${code}</p>` : ""}

              <hr />

              <p style="color:#555">
                Merci pour votre confiance 🙏<br/>
                Destination Kongo — L’hospitalité royale au cœur du Kongo
              </p>

            </div>

          </div>
        </div>
      `
    });

  } catch (err) {
    console.error("Email error:", err.message);
  }
};