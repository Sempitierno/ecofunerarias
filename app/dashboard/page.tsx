'use server'


import Dashboard from "@/components/dashboard";
import Header from "@/components/header_dashboard";
import Sidebar from "@/components/sidebar";
import { openDB } from "@/lib/sqlite";


export default async function Page() {
  const db = await openDB() 
  const data = await db.all("select * from funerarias")
  console.log(data)
  return (
      <div style={{ display: 'flex'}}>
        <Sidebar/>
        <div style={{ flexGrow: 1}}>
          <Header />
          <Dashboard data={data}/>
        </div>
      </div>
  )
}