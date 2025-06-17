import { openDB } from "@/lib/sqlite"
import FormUpdate from "@/components/formupdate"

export default async function Page({params}) {
    const {id}=await params
    let funeraria = {}
    try {
    const db = await openDB() 
    if (db) {
    funeraria= await db.get("select * from funerarias where id = ?", [id]) 
    } else {
        funeraria = {}
    }
    } catch (e) {
        funeraria = {}
    }
    console.log(funeraria)

    return (
        <div>
            <FormUpdate data={funeraria} >
            </FormUpdate>
        </div>
    )
}