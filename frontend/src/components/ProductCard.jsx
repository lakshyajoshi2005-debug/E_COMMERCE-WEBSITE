import {Link} from 'react-router-dom';

function ProductCard({product}){
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    return (
    <div className="h-full bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

        <Link to={`/product/${product.id}`} className="block">
            <div className="bg-white overflow-hidden">
                <img
                    src={`${BASEURL}${product.image}`}
                    alt={product.name}
                    className="w-full h-56 object-contain hover:scale-105 transition-transform duration-300"
                />
            </div>

            <div className="p-4">
                <h2 className="text-lg font-semibold text-slate-800 truncate">
                    {product.name}
                </h2>

                <p className="mt-2 text-xl font-bold text-green-600">
                    ₹{product.price}
                </p>
            </div>
        </Link>

    </div>
    );
}
export default ProductCard;