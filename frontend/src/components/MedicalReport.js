"use client";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";

/** =========================
 *  CONFIG & LABELS
 * ========================= */
const REPORT_TITLE = "Cardiovascular Risk Assessment Report";
const BRAND = "Cardiovascular Risk Predictor";
const ORDER = [
  "age","sex","cp","trestbps","chol","fbs","restecg","thalach","exang","oldpeak","slope","ca","thal"
];

const LABEL = {
  age: "Age (years)",
  sex: "Sex",
  cp: "Chest Pain Type",
  trestbps: "Resting BP (mm Hg)",
  chol: "Cholesterol (mg/dl)",
  fbs: "Fasting Blood Sugar",
  restecg: "Resting ECG",
  thalach: "Max Heart Rate (bpm)",
  exang: "Exercise-induced Angina",
  oldpeak: "ST Depression",
  slope: "ST Slope",
  ca: "Smoking Index (0–3)",
  thal: "Thalassemia",
};

const RANGE = {
  age: "20–100",
  sex: "Female / Male",
  cp: "0–3",
  trestbps: "90–140",
  chol: "< 200",
  fbs: "0–1",
  restecg: "0–2",
  thalach: "100–200",
  exang: "0–1",
  oldpeak: "0.0–2.0",
  slope: "0–2",
  ca: "0–3",
  thal: "0–3",
};

const mapValue = (k, v) => {
  if (k === "sex") return Number(v) === 1 ? "Male" : "Female";
  if (k === "fbs") return Number(v) === 1 ? "Yes" : "No";
  if (k === "exang") return Number(v) === 1 ? "Yes" : "No";
  if (k === "cp") {
    const m = ["Typical angina","Atypical angina","Non-anginal pain","Asymptomatic"];
    return m[Number(v)] ?? v;
  }
  if (k === "restecg") {
    const m = ["Normal","ST-T abnormality","LV hypertrophy"];
    return m[Number(v)] ?? v;
  }
  if (k === "slope") {
    const m = ["Upsloping","Flat","Downsloping"];
    return m[Number(v)] ?? v;
  }
  if (k === "thal") {
    const m = ["Normal","Fixed defect","Reversible defect","Unknown"];
    return m[Number(v)] ?? v;
  }
  return String(v);
};

const isAbnormal = (k, vNum) => {
  const v = Number(vNum);
  if (Number.isNaN(v)) return false;
  if (k === "trestbps") return v > 140;
  if (k === "chol") return v > 200;
  if (k === "thalach") return v < 100;
  if (k === "oldpeak") return v > 2.0;
  if (k === "exang") return v === 1;
  if (k === "fbs") return v === 1;
  return false;
};

/** =========================
 *  VISUAL HELPERS
 * ========================= */
const riskColors = (level) => {
  if (level.includes("High")) return { bg: [255, 235, 235], text: [185, 28, 28], pill: [220,38,38] };
  if (level.includes("Moderate")) return { bg: [255, 248, 225], text: [161, 98, 7], pill: [250,204,21] };
  return { bg: [232, 255, 240], text: [22, 163, 74], pill: [34,197,94] };
};

const riskPill = (doc, x, y, level) => {
  const txt = level.toUpperCase();
  const { pill } = riskColors(level);
  const w = doc.getTextWidth(txt) + 10;
  doc.setFillColor(...pill);
  doc.roundedRect(x, y, w, 8, 4, 4, "F");
  doc.setTextColor(255,255,255);
  doc.setFont("helvetica","bold"); doc.setFontSize(10);
  doc.text(txt, x + 5, y + 6);
  doc.setTextColor(0,0,0);
};

async function addGradientHeader(doc, y, h) {
  const pageW = doc.internal.pageSize.getWidth();
  const scale = 4;
  const canvas = document.createElement("canvas");
  canvas.width = Math.floor(pageW * scale);
  canvas.height = Math.floor(h * scale);
  const ctx = canvas.getContext("2d");

  const grad = ctx.createLinearGradient(0, 0, canvas.width, 0);
  grad.addColorStop(0, "#2563EB"); // blue-600
  grad.addColorStop(1, "#06B6D4"); // cyan-500
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // subtle diagonal stripes
  ctx.strokeStyle = "rgba(255,255,255,0.08)";
  ctx.lineWidth = 2;
  for (let i = -canvas.height; i < canvas.width; i += 40) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i + canvas.height, canvas.height);
    ctx.stroke();
  }

  const img = canvas.toDataURL("image/png");
  doc.addImage(img, "PNG", 0, y, pageW, h);

  // Title on top
  doc.setTextColor(255,255,255);
  doc.setFont("helvetica","bold"); doc.setFontSize(16);
  doc.text(REPORT_TITLE, 14, y + 10);
  doc.setFont("helvetica","normal"); doc.setFontSize(11);
  doc.text(`${BRAND}`, 14, y + 18);
  doc.setTextColor(0,0,0);
}

/** Generate persistent Patient ID by name */
export function getOrCreatePatientId(fullName) {
  const key = `crp-pid:${(fullName||"").trim().toLowerCase()}`;
  try {
    const existing = localStorage.getItem(key);
    if (existing) return existing;
    const now = new Date();
    const id = `CRP-${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${Math.floor(Math.random()*1e6).toString().padStart(6,"0")}`;
    localStorage.setItem(key, id);
    return id;
  } catch {
    const now = new Date();
    return `CRP-${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,"0")}-${Math.floor(Math.random()*1e6).toString().padStart(6,"0")}`;
  }
}

/** Draw a borderless (modern) table with subtle row dividers */
function drawModernTable(doc, rows, x, y, colXs, rowH = 7) {
  doc.setDrawColor(230); // light dividers
  rows.forEach((r, idx) => {
    // texts
    doc.setFont("helvetica", idx === 0 ? "bold" : "normal");
    doc.setFontSize(10);

    // columns: Parameter | Value | Range | Status
    doc.text(r[0], colXs[0], y + 5);
    doc.text(r[1], colXs[1], y + 5);
    doc.text(r[2], colXs[2], y + 5);

    // Status colored
    const status = r[3];
    if (status === "Abnormal") doc.setTextColor(185,28,28);
    else doc.setTextColor(22,163,74);
    doc.text(status, colXs[3], y + 5);
    doc.setTextColor(0,0,0);

    // divider line (skip after header)
    if (idx > 0) {
      doc.setLineWidth(0.1);
      doc.line(x, y, x + (colXs[3] + 36 - x), y);
    }
    y += rowH;
  });

  return y;
}

/** =========================
 *  MAIN PDF BUILDER
 * ========================= */
export async function downloadReport(patient, gaugeElement) {
  const doc = new jsPDF("p","mm","a4");
  const pageW = doc.internal.pageSize.getWidth();
  let y = 10;

  const prob = Number(patient?.probability ?? 0);
  const pct  = Math.round(prob * 100);
  const level = prob <= 0.30 ? "Low Risk" : prob <= 0.60 ? "Moderate Risk" : "High Risk";
  const colors = riskColors(level);
  const pid = getOrCreatePatientId(patient?.fullName || "Patient");

  // Gradient header
  await addGradientHeader(doc, y, 26);
  y += 26 + 8;

  // Top: Patient summary & risk pill
  doc.setFont("helvetica","bold"); doc.setFontSize(12);
  doc.text("Patient Summary", 14, y);
  riskPill(doc, pageW - 14 - 40, y - 6, level);
  y += 8;

  doc.setFont("helvetica","normal"); doc.setFontSize(11);
  const colLeft = 14, colRight = pageW / 2 + 4;

  doc.text(`Name: ${patient?.fullName || "-"}`, colLeft, y);
  doc.text(`Patient ID: ${pid}`, colRight, y);
  y += 6;
  doc.text(`Probability: ${pct}%`, colLeft, y);
  doc.text(`Generated: ${new Date().toLocaleString()}`, colRight, y);
  y += 10;

  // Alert Panel (borderless box, soft background)
  doc.setFillColor(...colors.bg);
  doc.roundedRect(14, y, pageW - 28, 18, 3, 3, "F");
  doc.setTextColor(...colors.text);
  doc.setFont("helvetica","bold"); doc.setFontSize(11);
  const alertTitle =
    level === "High Risk" ? "⚠ Elevated cardiovascular risk detected."
    : level === "Moderate Risk" ? "⚠ Moderate indicators present."
    : "✅ No abnormal indicators detected.";
  doc.text(alertTitle, 18, y + 7);
  doc.setFont("helvetica","normal");
  const alertSub =
    level === "High Risk"
      ? "Please consult a healthcare professional soon."
      : level === "Moderate Risk"
      ? "Adopt healthy habits and consider a routine check-up."
      : "Maintain healthy lifestyle and routine screenings.";
  doc.text(alertSub, 18, y + 13);
  doc.setTextColor(0,0,0);
  y += 18 + 8;

  // (Optional) Gauge snapshot on the right side of section title
  // We'll draw the section title first, then the image if available.
  doc.setFont("helvetica","bold"); doc.setFontSize(12);
  doc.text("Clinical Parameters", 14, y);
  if (gaugeElement) {
    try {
      const canvas = await html2canvas(gaugeElement, { scale: 2, backgroundColor: null });
      const img = canvas.toDataURL("image/png");
      doc.addImage(img, "PNG", pageW - 14 - 40, y - 6, 40, 20);
    } catch {
      /* ignore snapshot failure */
    }
  }
  y += 8;

  // Build rows: header + each feature
  const rows = [
    ["Parameter", "Value", "Reference", "Status"],
    ...ORDER.map((k) => {
      const vRaw = patient[k];
      const vShow = mapValue(k, vRaw);
      const bad = isAbnormal(k, vRaw);
      return [LABEL[k], String(vShow), RANGE[k] || "-", bad ? "Abnormal" : "Normal"];
    }),
  ];

  // Draw table in borderless style with subtle dividers
  const startX = 14;
  const colXs = [startX, 86, 126, 170]; // x positions for columns
  y = drawModernTable(doc, rows, startX, y, colXs, 7);

  // Footer note
  y += 10;
  doc.setFont("helvetica","italic"); doc.setFontSize(9);
  doc.text(
    "Note: This document is auto-generated for informational purposes and is not a medical diagnosis.",
    14,
    y
  );
  y += 5;
  doc.setFont("helvetica","normal"); doc.setFontSize(9);
  doc.text(`${BRAND} • © ${new Date().getFullYear()}`, 14, y);

  doc.save(`${patient?.fullName || "Patient"}_Heart_Report.pdf`);
}
