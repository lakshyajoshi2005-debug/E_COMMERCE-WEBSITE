import {useEffect, useState} from "react";
import ProductCard from "../components/ProductCard.jsx";
import { useSearchParams } from "react-router-dom";


function ProductList(){
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    useEffect(() => {
        const params = new URLSearchParams();

        if (search) params.append("search", search);
        if (category) params.append("category", category);

        fetch(`${BASEURL}/api/products/?${params.toString()}`)
            .then((response) => {
            if (!response.ok) throw new Error("Failed to fetch products");
            return response.json();
            })
            .then((data) => setProducts(data))
            .catch((error) => setError(error.message))
            .finally(() => setLoading(false));
        }, [BASEURL, search, category]);

    if(loading){
        return <div>Loading...</div>
    }
    if(error){
        return <div>Error:{error}</div>
    }
    const fetchProducts = () => {
    const params = new URLSearchParams();

    if (search) params.append("search", search);
    if (category) params.append("category", category);

    fetch(`${BASEURL}/api/products/?${params.toString()}`)
        .then(response => response.json())
        .then(data => setProducts(data))
        .catch(error => setError(error.message));
    };
    return (
        <div className="min-h-screen bg-white">
            <h1 className="text-3xl font-bold text-center py-6 bg-black shadow-md">Product List</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {products.length >0?(
                    products.map((product)=> (
                        <ProductCard key={product.id} product={product}/>
                    ))
                ) : (
                <div className="col-span-full flex flex-col items-center py-16 text-center">
                    <h2 className="text-2xl font-bold text-slate-800">
                    No products found
                    </h2>
                    <p className="mt-2 text-slate-500">
                    Try searching with a different name or category.
                    </p>
                </div>
                )}
            </div>
        </div>
    )
}

export default ProductList;