const fetchUsers=async()=>{
    const allUsers= await fetch("http://localhost:8080/api/v3/user/all")
    .then(res=>res.json())
    .then(data=>data)
    return allUsers
 }
 export default fetchUsers