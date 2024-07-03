import React,{useEffect, useState} from 'react'
import { ProductCard } from '../component/ProductCard'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
export const Search = () => {
    const product=useSelector((state)=>state.product.product);
    const [filteredProduct,setFilteredProduct]=useState([]);
    const {query}=useParams();
    function getAllFilteredProduct(){
        const queryLowerCase = query.toLowerCase();
        const uniqueProducts = new Set(); 
      
        const filteredProducts = product.filter((product) => {
          const title = product.title.toLowerCase();
          const brand = product.brand.toLowerCase();
          const description = product.description.toLowerCase();
          const category = product.category.toLowerCase();
      
          // Create a unique identifier for the product
          const productIdentifier = `${title}${brand}${description}${category}`.toLowerCase();
      
          if (uniqueProducts.has(productIdentifier)) {
            
            return false;
          } else {
           
            uniqueProducts.add(productIdentifier);
      
            return (
              title.includes(queryLowerCase) ||
              brand.includes(queryLowerCase) ||
              description.includes(queryLowerCase) ||
              category.includes(queryLowerCase)
            );
          }
        });
      
        setFilteredProduct(filteredProducts);
    }
useEffect(()=>{
    getAllFilteredProduct()
},[query,product]);
  
  return (
    <div class="py-3 py-md-5 bg-light">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h4 class="mb-4" style={{textAlign:'center'}}>Our Products</h4>
            </div>
            {
                filteredProduct.map((item,index)=>{
                    return <ProductCard key={index} item={item}/>
            })
            }
        </div>
    </div>
</div>
  )
}
