const decideRoute=(condition,nav,Rendereable,fallbackRoute)=>{
   if(condition){
    return <Rendereable/>
 }
 else{
nav(fallbackRoute)
    
}
}
export default decideRoute 
