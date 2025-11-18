import {useState} from 'react'
import axios from 'axios'
export default function Manual(){
  const [resp, setResp] = useState(null)
  const [form, setForm] = useState({student_id:'',attendance_percent:80,avg_marks_last_term:65,extra_curricular_hours_per_week:2,behavior_warnings:0,previous_failures:0,homework_submission_rate:90})
  const api = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'
  const submit = async () => {
    try{
      const r = await axios.post(api + '/api/predict', {student: form})
      setResp(JSON.stringify(r.data,null,2))
    }catch(e){
      setResp('Error: '+e.message)
    }
  }
  return (
    <div style={{padding:20,fontFamily:'system-ui'}}>
      <h2>Manual Prediction</h2>
      <div style={{maxWidth:500}}>
        {Object.keys(form).map(k => (
          <div key={k} style={{marginBottom:8}}>
            <label style={{display:'block'}}>{k}</label>
            <input value={form[k]} onChange={e=>setForm({...form,[k]: Number(e.target.value)})} style={{width:'100%'}} />
          </div>
        ))}
        <button onClick={submit}>Predict</button>
        <h3>Response</h3>
        <pre>{resp}</pre>
      </div>
    </div>
  )
}
