import { useState } from "react";

export default function ManualPrediction() {
  const [form, setForm] = useState({
    marks1: "", marks2: "", attendance: "", other: ""
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

  function onChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          marks1: form.marks1,
          marks2: form.marks2,
          attendance: form.attendance,
          extra: form.other,
        }),
      });

      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: err.message });
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Manual Prediction</h2>
      <form onSubmit={onSubmit}>
        <label>Marks 1</label><br />
        <input name="marks1" onChange={onChange} /><br /><br />

        <label>Marks 2</label><br />
        <input name="marks2" onChange={onChange} /><br /><br />

        <label>Attendance</label><br />
        <input name="attendance" onChange={onChange} /><br /><br />

        <label>Other</label><br />
        <input name="other" onChange={onChange} /><br /><br />

        <button type="submit">{loading ? "Predicting..." : "Predict"}</button>
      </form>

      <h3>Result:</h3>
      <pre>{result ? JSON.stringify(result, null, 2) : "No result yet"}</pre>
    </div>
  );
}
