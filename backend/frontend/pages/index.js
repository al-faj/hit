import Link from "next/link";

export default function Home() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: 24 }}>
      <h1>Haldia Institute of Technology</h1>
      <p>Student Performance Prediction</p>
      <ul>
        <li><Link href="/manual-prediction">Manual Prediction (Form)</Link></li>
        <li><Link href="/upload-csv">Upload CSV (Batch)</Link></li>
      </ul>
    </div>
  );
}
