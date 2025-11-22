import { useState } from "react";

export default function UploadCSV() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

  async function submit(e) {
    e.preventDefault();
    if (!file) return alert("Select a CSV file first!");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/upload-csv`, {
        method: "POST",
        body: formData
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
      <h2>Upload CSV</h2>
      <form onSubmit={submit}>
        <input
          type="file"
          accept=".csv"
          onChange={e => setFile(e.target.files[0])}
        />
        <br /><br />
        <button type="submit">{loading ? "Uploading..." : "Upload & Predict"}</button>
      </form>

      <h3>Response:</h3>
      <pre>{result ? JSON.stringify(result, null, 2) : "No response yet"}</pre>
    </div>
  );
}
