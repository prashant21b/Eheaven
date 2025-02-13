import React, { useState, useEffect } from 'react';
import { ProductCard } from '../component/ProductCard';
import { Slider } from '../component/Slider';
import { Loader } from '../component/Loader';
import { useSelector } from 'react-redux';
import { Pagination } from '../component/Pagination';

export const Home = () => {
    const products = useSelector((state) => state.product.product);
    const isLoading = useSelector((state) => state.loader.isLoading);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 8;

    useEffect(() => {
        setCurrentPage(1);
    }, [products]);

    const totalPages = Math.ceil(products.length / pageSize);
    const paginatedProducts = products.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <>
            {isLoading && <Loader />}
            <Slider />
            <div className="py-3 py-md-5 bg-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                        <h4 className="mb-4 product-title">Our Products</h4>

                        </div>
                        {paginatedProducts.map((item, index) => (
                            <ProductCard key={item.id || index} item={item} />
                        ))}
                    </div>
                    {products.length > pageSize && (
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                        />
                    )}
                </div>
            </div>
        </>
    );
};
