"use client";
import { useEffect, useEffectEvent, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import useUser from "../hooks/useUser";

const ORDER = [
  "age",
  "sex",
  "cp",
  "trestbps",
  "chol",
  "fbs",
  "restecg",
  "thalach",
  "exang",
  "oldpeak",
  "slope",
  "ca",
  "thal",
];

function Field({ label, name, children, hint }) {
  return (
    <div className="space-y-1">
      <label className="flex items-center gap-2 text-sm opacity-90">
        <span className="font-medium">{label}</span>
        {hint && (
          <span className="text-xs opacity-200 ">
            ({hint})
          </span>
        )}
      </label>
      {children}
    </div>
  );
}
export default function InputForm({ onSubmit, isLoading }) {
  const [step, setStep] = useState(1);
  const {user} = useUser();
  const [form, setForm] = useState({
    fullName: user?.username ? user?.username.split("@")[0] : "",
    age: "",
    sex: "1",
    cp: "0",
    trestbps: "",
    chol: "",
    fbs: "0",
    restecg: "0",
    thalach: "",
    exang: "0",
    oldpeak: "",
    slope: "0",
    ca: "0",
    thal: "0",
  });
  const [error, setError] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    if (!form.fullName) return "Please enter full name.";
    if (
      !form.age ||
      !form.trestbps ||
      !form.chol ||
      !form.thalach ||
      form.oldpeak === ""
    )
      return "Please fill all required fields.";
    return null;
  };

  const goSubmit = () => {
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    const payload = { fullName: form.fullName };
    ORDER.forEach((k) => {
      payload[k] = Number(form[k]);
    });
    onSubmit(payload);
  };

  const presets = {
    low: {
      fullName: "Priya Sharma",
      age: "45",
      sex: "0",
      cp: "1",
      trestbps: "120",
      chol: "200",
      fbs: "0",
      restecg: "1",
      thalach: "180",
      exang: "0",
      oldpeak: "0.5",
      slope: "2",
      ca: "0",
      thal: "1",
    },
    moderate: {
      fullName: "Arjun Kumar",
      age: "55",
      sex: "1",
      cp: "2",
      trestbps: "135",
      chol: "240",
      fbs: "0",
      restecg: "1",
      thalach: "160",
      exang: "0",
      oldpeak: "1.2",
      slope: "1",
      ca: "1",
      thal: "2",
    },
    high: {
      fullName: "Neha Singh",
      age: "68",
      sex: "1",
      cp: "3",
      trestbps: "160",
      chol: "300",
      fbs: "1",
      restecg: "2",
      thalach: "120",
      exang: "1",
      oldpeak: "3.2",
      slope: "0",
      ca: "2",
      thal: "3",
    },
  };

  // to control user can be able to select prefilled info
  //  if user is filling the form or not if user is filling the form
  // then user can not select prefilled info and if user is not filling the form then user can select prefilled info
  const [onFullName, setOnFullName] = useState(false);
  // useEffect(() => {
  //   const isFullNamePresent = form.fullName.trim() !== "";
  //   if (isFullNamePresent) {
  //     setOnFullName(true);
  //   } else {
  //     setOnFullName(false);
  //   }
  //   return () => {
  //     setOnFullName(false);
  //   };
  // }, [form.fullName]);
  return (
// NEW LINE 125:
<div className="rounded-3xl shadow-xl hover:shadow-2xl transition-all backdrop-blur-lg bg-zinc-900 text-white dark:bg-white dark:text-black border border-white/30 p-8">      {/* Step indicator */}
      <div className="flex justify-center mb-4 text-sm opacity-70">
  Step {step} of 3
</div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="s1"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-bold text-inherit">
  Personal Information
</h2>
            <Field label="Full name" name="fullName">
              <input
                name="fullName"
                type="text"
                placeholder="Enter Your Full Name "
                value={form.fullName}
                onChange={onChange}
               className="w-full bg-white/10 dark:bg-black/5 text-inherit border border-white/20 dark:border-black/10 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400 outline-none transition-all"
              />
            </Field>
            {form.fullName && (
              <div className="text-sm opacity-80">
  Hey <span className="font-semibold">{form.fullName}</span> — let’s check your heart.
</div>
            )}
            <Field label="Age" name="age" hint="years">
              <input
                name="age"
                type="number"
                value={form.age}
                onChange={onChange}
                className="w-full bg-white/10 dark:bg-black/5 text-inherit border border-white/20 dark:border-black/10 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400 outline-none transition-all"
              />
            </Field>
            <Field label="Sex" name="sex">
              <select
                name="sex"
                value={form.sex}
                onChange={onChange}
                className="w-full bg-white/10 dark:bg-black/5 text-inherit border border-white/20 dark:border-black/10 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400 outline-none transition-all [&>option]:text-black"
              >
                <option value="1">Male</option>
                <option value="0">Female</option>
              </select>
            </Field>
          </motion.div>
        )}
        {/* Step 2: Clinical Information */}
        {step === 2 && (
          <motion.div
            key="s2"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
            <h2 className="text-xl font-bold text-inherit">
              Clinical Information
            </h2>
            {[
              {
                label: "Chest Pain Type (cp)",
                name: "cp",
                hint: "0–3",
                options: [
                  "Typical angina",
                  "Atypical angina",
                  "Non-anginal pain",
                  "Asymptomatic",
                ],
              },
              {
                label: "Resting Blood Pressure",
                name: "trestbps",
                type: "number",
                hint: "mm Hg",
              },
              {
                label: "Serum Cholesterol",
                name: "chol",
                type: "number",
                hint: "mg/dl",
              },
              {
                label: "Fasting Blood Sugar (fbs)",
                name: "fbs",
                hint: ">120 mg/dl: 1 yes, 0 no",
                options: ["No", "Yes"],
              },
              {
                label: "Resting ECG (restecg)",
                name: "restecg",
                hint: "0–2",
                options: ["0", "1", "2"],
              },
              {
                label: "Max Heart Rate (thalach)",
                name: "thalach",
                type: "number",
                hint: "bpm",
              },
            ].map((f) => (
              <Field key={f.name} label={f.label} name={f.name} hint={f.hint}>
                {f.options ? (
                  <select
                    name={f.name}
                    value={form[f.name]}
                    onChange={onChange}
                    className="w-full bg-white/10 dark:bg-black/5 text-inherit border border-white/20 dark:border-black/10 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400 outline-none transition-all [&>option]:text-black"
                  >
                    {f.options.map((o, i) => (
                      <option key={i} value={i}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    name={f.name}
                    type={f.type}
                    value={form[f.name]}
                    onChange={onChange}
                    className="w-full bg-white/10 dark:bg-black/5 text-inherit border border-white/20 dark:border-black/10 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400 outline-none transition-all"
                  />
                )}
              </Field>
            ))}
          </motion.div>
        )}
        Step 3: Lifestyle
        {step === 3 && (
          <motion.div
            key="s3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25 }}
            className="space-y-4"
          >
<h2 className="text-xl font-bold text-inherit">              Lifestyle & Test Results
            </h2>
            {[
              {
                label: "Exercise-induced Angina (exang)",
                name: "exang",
                hint: "1 yes, 0 no",
                options: ["No", "Yes"],
              },
              {
                label: "ST Depression (oldpeak)",
                name: "oldpeak",
                type: "number",
                step: "0.1",
              },
              {
                label: "Slope of Peak Exercise ST",
                name: "slope",
                hint: "0–2",
                options: ["0", "1", "2"],
              },
              {
                label: "Smoking (placeholder uses ca)",
                name: "ca",
                hint: "0–3",
                options: ["0", "1", "2", "3"],
              },
              {
                label: "Thalassemia (thal)",
                name: "thal",
                hint: "0–3",
                options: ["0", "1", "2", "3"],
              },
            ].map((f) => (
              <Field key={f.name} label={f.label} name={f.name} hint={f.hint}>
                {f.options ? (
                  <select
                    name={f.name}
                    value={form[f.name]}
                    onChange={onChange}
className="w-full bg-white/10 dark:bg-black/5 text-inherit border border-white/20 dark:border-black/10 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400 outline-none transition-all [&>option]:text-black"                  >
                    {f.options.map((o, i) => (
                      <option key={i} value={i}>
                        {o}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    name={f.name}
                    type={f.type}
                    step={f.step}
                    value={form[f.name]}
                    onChange={onChange}
className="w-full bg-white/10 dark:bg-black/5 text-inherit border border-white/20 dark:border-black/10 rounded-lg px-3 py-2 focus:ring-2 focus:ring-amber-400 outline-none transition-all"                  />
                )}
              </Field>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Error display */}
      {error && <div className="mt-4 text-red-500 text-sm">{error}</div>}

      {/* ⚙️ Quick Presets */}
      <div
        className={`mt-5 flex items-center gap-2 text-sm opacity-70`}
      >
        <span>Quick fill examples:</span>
        <select
          onChange={(e) => {
            const v = e.target.value;
            if (!v) return;
            setForm((prev) => ({ ...prev, ...presets[v] }));
          }}
className="bg-white/10 dark:bg-black/5 text-inherit border border-white/20 dark:border-black/10 rounded-lg px-2 py-1 focus:ring-2 focus:ring-amber-400 outline-none transition [&>option]:text-black"        >
          <option value="low">Low </option>
          <option value="moderate">Moderate</option>
          <option value="high">High</option>
        </select>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-between">
        <button
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          className="px-4 py-2 rounded-lg bg-white/80 dark:bg-neutral-800/70 text-neutral-800 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 hover:bg-white/90 dark:hover:bg-neutral-700 disabled:opacity-50 active:scale-95 transition"
        >
          Back
        </button>
        {step < 3 ? (
          <button
            onClick={() => setStep((s) => Math.min(3, s + 1))}
            className="px-4 py-2 rounded-lg bg-amber-400 text-black hover:bg-amber-300 active:scale-95 transition shadow"
          >
            Next
          </button>
        ) : (
          <button
            onClick={goSubmit}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-emerald-400 text-black hover:bg-emerald-300 disabled:opacity-50 active:scale-95 transition shadow"
          >
            {isLoading ? "Analyzing..." : "Predict"}
          </button>
        )}
      </div>
    </div>
  );
}
