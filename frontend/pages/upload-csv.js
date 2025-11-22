import { useState } from "react";

export default function UploadCSV() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "";

  async function handleUpload(e) {
    e.preventDefault();

    if (!file) {
      alert("Please select a CSV file!");
      return;
    }

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
      setResult({ error: "CSV upload failed" });
    }

    setLoading(false);
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload CSV & Predict</h2>

      <form onSubmit={handleUpload}>
        <input
          type="file"
          accept=".csv"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br /><br />

        <button type="submit">
          {loading ? "Uploading..." : "Upload CSV"}
        </button>
      </form>

      <h3>Response:</h3>
      <pre>{result ? JSON.stringify(result, null, 2) : "No Response Yet"}</pre>
    </div>
  );
}
