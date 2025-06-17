import { openDB } from "@/lib/sqlite"
import FormUpdate from "@/components/formupdate"

export default async function Page({params}) {
    const {id}=await params
    const db=await openDB()
    const funeraria= await db.get("select * from funerarias where id = ?", [id]) 
    console.log(funeraria)

    return (
        <div>
            <FormUpdate data={funeraria} >
            </FormUpdate>
        </div>
    )
}