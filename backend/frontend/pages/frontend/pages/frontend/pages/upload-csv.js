import { useState } from "react";

export default function UploadCSV() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState(null);
  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

  async function onUpload(e) {
    e.preventDefault();
    if (!file) return alert("Select CSV file first");
    setLoading(true);
    setResp(null);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const url = `${API_BASE}/upload-csv`;
      const res = await fetch(url, {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      setResp(data);
    } catch (err) {
      setResp({ error: err.message || "Network error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ padding: 24, fontFamily: "Arial, sans-serif" }}>
      <h2>Upload CSV for Batch Prediction</h2>
      <form onSubmit={onUpload}>
        <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])} />
        <br/><br/>
        <button type="submit" disabled={loading}>{loading ? "Uploading..." : "Upload & Predict"}</button>
      </form>

      <div style={{ marginTop: 20 }}>
        <h3>Response</h3>
        <pre>{resp ? JSON.stringify(resp, null, 2) : "No response yet"}</pre>
      </div>
    </div>
  );
}
