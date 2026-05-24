import PDFDocument from "pdfkit";
import fs from "fs";

export const generateInvoice = (booking) => {
  const doc = new PDFDocument();

  const filePath = `invoice_${booking.transaction_id}.pdf`;

  doc.pipe(fs.createWriteStream(filePath));

  doc.fontSize(20).text("FACTURE DE RÉSERVATION", { align: "center" });

  doc.moveDown();

  doc.fontSize(12).text(`Hôtel: ${booking.hotel_name}`);
  doc.text(`Montant: ${booking.amount}`);
  doc.text(`Client: ${booking.user_name}`);
  doc.text(`Statut: ${booking.status}`);
  doc.text(`Code: ${booking.transaction_id}`);

  doc.end();

  return filePath;
};