import {ApiEntry} from '../../App'
const fetchProducts=async()=>{
    const allProducts= await fetch(`${ApiEntry}/api/v3/products/all`)
    .then(res=>res.json())
    .then(data=>data)
    return allProducts
 }
 export default fetchProducts