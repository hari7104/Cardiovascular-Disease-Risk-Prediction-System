import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function generateMedicalPDF(result) {
  const doc = new jsPDF();

  const percent = Math.round(result.probability * 100);
  const riskLabel =
    percent > 65 ? "High Risk" :
    percent > 30 ? "Moderate Risk" :
    "Low Risk";

  // ✅ Header
  doc.setFontSize(18);
  doc.text("Heart Risk Assessment Report", 14, 18);

  doc.setFontSize(10);
  doc.text(`Patient ID: ${result.patientId || "N/A"}`, 14, 26);
  doc.text(`Name: ${result.fullName}`, 14, 32);

  doc.text(`Predicted Risk: ${percent}%`, 14, 42);
  doc.text(`Risk Category: ${riskLabel}`, 14, 48);

  // ✅ Table of Features
  const data = Object.entries(result)
    .filter(([k]) => !["probability", "fullName", "prediction", "patientId"].includes(k))
    .map(([k, v]) => [k, v]);

  autoTable(doc, {
    head: [["Feature", "Value"]],
    body: data,
    startY: 60,
    theme: "grid",
    headStyles: { fillColor: [22, 160, 133] },
  });

  doc.save(`${result.fullName}_Heart_Report.pdf`);
}
