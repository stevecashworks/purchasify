import { ApiEntry } from "../../../App"
const fetchUsers=async()=>{
    const allUsers= await fetch(`${ApiEntry}/user/all`)
    .then(res=>res.json())
    .then(data=>data)
    return allUsers
 }
 export default fetchUsers