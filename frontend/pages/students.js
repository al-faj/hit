import {useState} from 'react'
export default function Students(){
  const [rows, setRows] = useState(null)
  return (
    <div style={{padding:20,fontFamily:'system-ui'}}>
      <h2>Students Table</h2>
      <p>Use Upload CSV to populate data and backend will return predictions</p>
      <pre>{rows ? JSON.stringify(rows,null,2) : 'No data loaded'}</pre>
    </div>
  )
}
