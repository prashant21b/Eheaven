import React from 'react'
import './Home.css'
import { ProductCard } from '../component/ProductCard'
import { Slider } from '../component/Slider'
import {useSelector} from 'react-redux'


export const Home = () => {
    const  products=useSelector((state)=>state.product.product);
    
  return (
    <>
    <Slider/>
    <div className="py-3 py-md-5 bg-light">
    <div className="container">
        <div className="row">
            <div className="col-md-12">
                <h4 className="mb-4" style={{textAlign:'center'}}>Our Products</h4>
            </div>
            {
                products.map((item,index)=>{
                    return <ProductCard key={index} item={item}/>
            })
            }
        </div>
    </div>
</div>
</>
  )
}
