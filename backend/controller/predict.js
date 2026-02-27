const ort = require("onnxruntime-node");
const path = require("path");

const MODEL_PATH = path.join(__dirname, "../models", "model.onnx");

const SCALER_MEAN = [
  54.54208754208754, 0.6767676767676768, 3.1582491582491583, 131.69360269360268,
  247.35016835016836, 0.1447811447811448, 0.9966329966329966, 149.5993265993266,
  0.3265993265993266, 1.0555555555555556, 1.6026936026936027, 0.6767676767676768,
  4.730639730639731,
];
const SCALER_SCALE = [
  9.034487589926636, 0.4677105819309182, 0.9632336979027394,
  17.73287743823472, 51.909970707892114, 0.35188004333438117,
  0.99323745892929, 22.90290733792757, 0.4689693022620916,
  1.1641579568929132, 0.6171451736665773, 0.9373824451006205,
  1.9353622047234418,
];
const FEATURE_ORDER = [
  "age", "sex", "cp", "trestbps", "chol", "fbs", "restecg",
  "thalach", "exang", "oldpeak", "slope", "ca", "thal"
];

function manualScale(body) {
  return FEATURE_ORDER.map((k, i) => (body[k] - SCALER_MEAN[i]) / SCALER_SCALE[i]);
}

let session;

async function loadModel() {
  try {
    session = await ort.InferenceSession.create(MODEL_PATH);
    console.log("🎯 Model loaded successfully!");
  } catch (err) {
    console.error("❌ Model load failed:", err);
  }
}
loadModel();

const predict = async (req, res) => {
    try {
        if (!session) {
            return res.status(503).json({ error: "Model still loading, try again…" });
        }

        const scaled = manualScale(req.body);
        const input = new ort.Tensor("float32", Float32Array.from(scaled), [1, 13]);

        const out = await session.run({ float_input: input });
        const p = Array.from(out.probabilities.data);

        let prob = p.length === 2 ? p[1] : 1 / (1 + Math.exp(-p[0]));
        prob = Math.min(Math.max(prob, 0), 1);

        const risk =
            prob < 0.35 ? "Low" : prob < 0.65 ? "Moderate" : "High";

        res.json({
            probability: +prob.toFixed(4),
            riskLevel: risk,
        });
    } catch (err) {
        console.error("❌ Inference Error:", err);
        res.status(500).json({ error: "Prediction failed." });
    }
}

module.exports = { predict };