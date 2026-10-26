import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";

function ProductDetails() {
    const { id } = useParams();
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { addToCart } = useCart();

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`${BASEURL}/api/product/${id}/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch product details");
                }
                return response.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [id, BASEURL]);

    const handleAddToCart = () => {
        if (!localStorage.getItem("access_token")) {
            window.location.href = "/login";
            return;
        }

        addToCart(product.id);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-lg text-gray-600">Loading product...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
                <p className="text-red-600">Error: {error}</p>
                <Link to="/" className="text-blue-600 hover:underline">
                    Back to Home
                </Link>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-600">No product found.</p>
            </div>
        );
    }

    const imageUrl = product.image
        ? product.image.startsWith("http")
            ? product.image
            : `${BASEURL}${product.image.startsWith("/") ? "" : "/"}${product.image}`
        : null;

    const formattedPrice = new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
        maximumFractionDigits: 2,
    }).format(Number(product.price));

    const description = (product.description || "")
        .replace(/\*\*/g, "")
        .split(/\r?\n|•/)
        .map((item) => item.trim())
        .filter(Boolean);

    return (
        <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <Link
                    to="/"
                    className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-blue-600"
                >
                    <span aria-hidden="true">←</span> Back to Home
                </Link>

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="grid grid-cols-1 gap-8 p-5 sm:p-8 md:grid-cols-2 md:gap-12 lg:p-10">
                        <div className="flex min-h-72 items-center justify-center rounded-xl bg-gray-50 p-6 sm:min-h-96">
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt={product.name}
                                    className="max-h-96 w-full object-contain"
                                />
                            ) : (
                                <div className="text-gray-400">
                                    No image available
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col py-2">
                            <p className="mb-3 text-sm font-medium uppercase tracking-wider text-blue-600">
                                Product Details
                            </p>

                            <h1 className="text-2xl font-bold leading-tight text-gray-900 sm:text-3xl lg:text-4xl">
                                {product.name}
                            </h1>

                            <div className="mt-5 border-b border-gray-100 pb-6">
                                <p className="text-3xl font-bold text-gray-900">
                                    {formattedPrice}
                                </p>
                                <p className="mt-2 text-sm text-gray-500">
                                    Inclusive of all taxes
                                </p>
                            </div>

                            <div className="mt-6">
                                <h2 className="mb-4 text-lg font-semibold text-gray-900">
                                    Product Description
                                </h2>

                                {description.length > 0 ? (
                                    <ul className="space-y-3">
                                        {description.map((item, index) => (
                                            <li
                                                key={index}
                                                className="flex items-start gap-3 text-sm leading-6 text-gray-600 sm:text-base"
                                            >
                                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-gray-500">
                                        No description available.
                                    </p>
                                )}
                            </div>

                            <div className="mt-8">
                                <button
                                    onClick={handleAddToCart}
                                    className="w-full rounded-xl bg-blue-600 px-6 py-3.5 font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    Add to Cart 🛒
                                </button>

                                <p className="mt-3 text-center text-xs text-gray-500">
                                    Quality products, convenient shopping.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
