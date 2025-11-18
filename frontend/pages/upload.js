import {useState} from 'react'
import axios from 'axios'
export default function Upload(){
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const api = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8000'
  const handleFile = async e => {
    const f = e.target.files[0]
    if(!f) return
    const text = await f.text()
    const rows = text.split('\n').slice(0,11).join('\n')
    setPreview(rows)
  }
  const send = async e => {
    const f = e.target.files?.[0]
    if(!f){
      setResult('no file chosen')
      return
    }
    const form = new FormData()
    form.append('file', f)
    const r = await axios.post(api + '/api/batch_predict', form, {headers:{'Content-Type':'multipart/form-data'}})
    setResult(JSON.stringify(r.data,null,2))
  }
  return (
    <div style={{padding:20,fontFamily:'system-ui'}}>
      <h2>Upload CSV</h2>
      <input type='file' accept='.csv' onChange={handleFile} id='file' />
      <div style={{marginTop:12}}>
        <button onClick={send}>Send to Backend</button>
      </div>
      <h3>Preview</h3>
      <pre>{preview}</pre>
      <h3>Result</h3>
      <pre>{result}</pre>
    </div>
  )
}
