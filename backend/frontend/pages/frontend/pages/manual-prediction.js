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
      const payload = {
        marks1: Number(form.marks1||0),
        marks2: Number(form.marks2||0),
        attendance: Number(form.attendance||0),
        other: form.other || ""
      };
      const res = await fetch(`${API_BASE}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      setResult(data);
    } catch (err) {
      setResult({ error: err.message || "Network error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24, fontFamily: "Arial, sans-serif" }}>
      <h2>Manual Prediction</h2>
      <form onSubmit={onSubmit} style={{ maxWidth: 500 }}>
        <label>Marks 1<br/>
          <input name="marks1" value={form.marks1} onChange={onChange} />
        </label><br/><br/>
        <label>Marks 2<br/>
          <input name="marks2" value={form.marks2} onChange={onChange} />
        </label><br/><br/>
        <label>Attendance (%)<br/>
          <input name="attendance" value={form.attendance} onChange={onChange} />
        </label><br/><br/>
        <label>Other (optional)<br/>
          <input name="other" value={form.other} onChange={onChange} />
        </label><br/><br/>
        <button type="submit" disabled={loading}>{loading? "Predicting..." : "Predict"}</button>
      </form>

      <div style={{ marginTop: 20 }}>
        <h3>Result</h3>
        <pre>{result ? JSON.stringify(result, null, 2) : "No result yet"}</pre>
      </div>
    </div>
  );
}
