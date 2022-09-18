import fs from 'fs/promises'
import Link from 'next/link';
import path from 'path'
 function Home(props) {
  console.log("Re-generate")
  const { products } = props
  return (
    <div>
      <h1>Hello Next World</h1>
      <ul>
        {products.map((p)=>{
          return (
            
            <li key={p.id}><Link  href={"/product/"+p.id}>{p.name}</Link></li>
          )
        })}
      </ul>
    </div>
  );
}
export default Home

export async  function getStaticProps(context){
  const filePath = path.join(process.cwd() , "dummy-products.json")
  const jsonData = await fs.readFile(filePath)
  const Data = JSON.parse(jsonData);

  if(Data.products.length === 0){
    return {notFound : true}
  }

  return {
    props : {
      products : Data.products
    },
    revalidate : 10,
  }
}
