import React from 'react'
import '../pages/Categories.css'
import { Link } from 'react-router-dom'
export const CategoryCard = ({item}) => {
  return (
    <div className="col-6 col-md-3">
    <div className="category-card">
        <Link to={`/categoryfilter/${item}`}>
            <div className="category-card-body">
                <h5>{item}</h5>
            </div>
        </Link>
    </div>
</div>
  )
}
