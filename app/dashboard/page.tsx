'use server'


import Dashboard from "@/components/dashboard";
import Header from "@/components/header_dashboard";

import { openDB } from "@/lib/sqlite";


export default async function Page() {
  const db = await openDB() 
  const data = await db.all("select * from funerarias")
  console.log(data)
  return (
      <div style={{ display: 'flex'}}>
        <div style={{ flexGrow: 1}}>
          <Dashboard data={data}/>
        </div>
      </div>
  )
}