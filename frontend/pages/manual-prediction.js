import { useState } from "react";

export default function ManualPrediction() {
  const [form, setForm] = useState({
    marks1: "",
    marks2: "",
    attendance: "",
    other: ""
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      setResult(data);
    } catch (error) {
      setResult({ error: "API request failed" });
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Manual Prediction</h2>

      <form onSubmit={handleSubmit}>
        <label>Marks 1:</label><br />
        <input name="marks1" onChange={handleChange} /><br /><br />

        <label>Marks 2:</label><br />
        <input name="marks2" onChange={handleChange} /><br /><br />

        <label>Attendance:</label><br />
        <input name="attendance" onChange={handleChange} /><br /><br />

        <label>Other:</label><br />
        <input name="other" onChange={handleChange} /><br /><br />

        <button type="submit">
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      <h3>Result:</h3>
      <pre>{result ? JSON.stringify(result, null, 2) : "No Result Yet"}</pre>
    </div>
  );
}
