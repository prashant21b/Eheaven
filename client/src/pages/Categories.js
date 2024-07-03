import React, { useEffect, useState } from 'react'
import './Categories.css';
import { Link } from 'react-router-dom';
import { CategoryCard } from '../component/CategoryCard';
import { useSelector } from 'react-redux';
import  {categories}  from './CategoryData';
export const Categories = () => {
    
    const product=useSelector((state)=>state.product.product);
    console.log("9",product);
    const [category,setCategory]=useState([]);
    const [brand,setBrand]=useState([]);
    function getAllUniqueCategories() {
       
        const uniqueCategories = new Set();
        product.forEach((product) => {
          uniqueCategories.add(product.category);
        });
      
       
        const uniqueCategoriesArray = Array.from(uniqueCategories);
      console.log(uniqueCategories);
        setCategory(uniqueCategoriesArray);
      }
    function getAllUniqueBrand(){
        const brands=new Set();
        product.forEach((item)=>{
            brands.add(item.brand);
        });
        setBrand(Array.from(brands));
    }
     useEffect(()=>{
        getAllUniqueCategories();
        getAllUniqueBrand();
     },[product]);
     console.log("c",category);
    return (
    <div className="py-3 py-md-5 bg-light">
    <div className="container">
        <div className="row">
            <div className="col-md-12" style={{textAlign:'center'}}>
                <h4 className="mb-4">category Filter</h4>
            </div>
        {
            category.map((item,index)=>{ 
                return <CategoryCard key={index} item={item}/>
              })
        }
            
        </div>
        <div className="row">
            <div className="col-md-12" style={{textAlign:'center'}}>
                <h4 className="mb-4">Brand Filter</h4>
            </div>
        {
            brand.map((item,index)=>{ 
                return <CategoryCard key={index} item={item}/>
              })
        }
            
        </div>
    </div>
</div>
  )
}
