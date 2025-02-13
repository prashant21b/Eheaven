import React, { useEffect, useState } from 'react';
import { ProductCard } from '../component/ProductCard';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Fuse from 'fuse.js';
import { Pagination } from '../component/Pagination';

export const Search = () => {
    const product = useSelector((state) => state.product.product);
    const [filteredProduct, setFilteredProduct] = useState([]);
    const { query } = useParams();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 2;

    function getAllFilteredProduct() {
        const fuse = new Fuse(product, {
            keys: ['title', 'brand', 'description', 'category'],
            threshold: 0.3,
            includeScore: true,
        });

        if (!query.trim()) {
            setFilteredProduct(product);
            return;
        }

        const results = fuse.search(query);
        setFilteredProduct(results.map(result => result.item));
    }

    useEffect(() => {
        getAllFilteredProduct();
        setCurrentPage(1); // Reset to first page on new search
    }, [query, product]);

    const totalPages = Math.ceil(filteredProduct.length / pageSize);
    const paginatedProducts = filteredProduct.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    return (
        <div className="py-3 py-md-5 bg-light">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h4 className="mb-4" style={{ textAlign: 'center' }}>Our Products</h4>
                    </div>
                    {paginatedProducts.map((item, index) => (
                        <ProductCard key={item.id || index} item={item} />
                    ))}
                </div>
                {filteredProduct.length > pageSize && (
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        setCurrentPage={setCurrentPage}
                    />
                )}
            </div>
        </div>
    );
};
