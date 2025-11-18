import Link from 'next/link'
import Image from 'next/image'
export default function Home(){
  const college = process.env.NEXT_PUBLIC_COLLEGE_NAME || 'Haldia Institute of Technology'
  return (
    <div style={{padding:24,fontFamily:'system-ui'}}>
      <div style={{display:'flex',alignItems:'center',gap:16}}>
        <Image src='/logo.png' alt='logo' width={64} height={64} />
        <h1>{college}</h1>
      </div>
      <nav style={{marginTop:20}}>
        <Link href='/upload'>Upload CSV</Link> | <Link href='/manual'>Manual Prediction</Link> | <Link href='/students'>Students</Link>
      </nav>
    </div>
  )
}
