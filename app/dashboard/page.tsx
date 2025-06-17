'use server'


import Dashboard from "@/components/dashboard";
import Header from "@/components/header_dashboard";

import { openDB } from "@/lib/sqlite";


export default async function Page() {
  let data = []
  try {
  const db = await openDB() 
  if (db) {
  data = await db.all("select * from funerarias")
  } else {
    data = []
  }
  } catch (e) {
    data = []
  }
  console.log(data)
  return (
      <div style={{ display: 'flex'}}>
        <div style={{ flexGrow: 1}}>
          <Dashboard data={data}/>
        </div>
      </div>
  )
}