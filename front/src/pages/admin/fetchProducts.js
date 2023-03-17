 const fetchProducts=async()=>{
    const allProducts= await fetch("http://localhost:8080/api/v3/products/all")
    .then(res=>res.json())
    .then(data=>data)
    return allProducts
 }
 export default fetchProducts