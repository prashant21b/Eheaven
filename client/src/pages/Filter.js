import React, { useEffect, useState } from 'react'
import './Home.css'
import { ProductCard } from '../component/ProductCard'
import { Slider } from '../component/Slider'
import {useSelector} from 'react-redux'
import { useParams } from 'react-router-dom'

export const Filter= () => {
    const  products=useSelector((state)=>state.product.product);
    const {filter}=useParams();
    console.log("11",filter);
    const [product,setProduct]=useState();
     function getAllFilteredProduct(){
        const filteredProduct=[];
        products?.forEach((item)=>{
            if (item.category===filter || item.brand===filter) {
                filteredProduct.push(item);
              }
        })
setProduct(filteredProduct);
     }
     console.log("22",product);
    //  useEffect(()=>{
    //     getAllFilteredProduct();
    //  },[]);
    useEffect(() => {
        // const savedFilter = localStorage.getItem('filter');
        // if (filter && savedFilter !== filter) {
        //   localStorage.setItem('filter', filter);
        // }
        getAllFilteredProduct();
      }, [filter,products]);
   return (
    <>
   
    <div class="py-3 py-md-5 bg-light">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <h4 class="mb-4" style={{textAlign:'center'}}>Results</h4>
            </div>
            {
                product?.map((item,index)=>{
                    return <ProductCard key={index} item={item}/>
            })
            }
        </div>
    </div>
</div>
</>
  )
}
