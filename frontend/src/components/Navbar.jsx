import {Link, useNavigate} from 'react-router-dom';
import {useCart} from '../context/CartContext.jsx';
import {clearTokens, getAccessToken} from '../utils/auth.js';
import {useState} from "react";



function Navbar(){
    const {cartItems} = useCart();
    const navigate=useNavigate();
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

    const isLoggedIn = !!getAccessToken();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const handleLogout = () => {
        clearTokens();
        navigate('/login');
    };

    return (
        <nav className="bg-white px-6 py-3 flex flex-wrap items-center justify-between gap-4 fixed top-0 inset-x-0 z-50">

            <Link to="/" className="text-2xl font-bold text-blue-600 shrink-0">
                🛍️ ShopCart
            </Link>

            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    navigate(`/?search=${encodeURIComponent(search)}&category=${encodeURIComponent(category)}`);
                }}
                className="flex flex-1 items-center gap-2 max-w-2xl"
            >
                <input
                    type="text"placeholder="🔍Search products..."
                    
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-white text-black-600 flex-1 min-w-0 border border-slate-300 rounded-full px-4 py-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                />

                

                <select
                    value={category}
                    onChange={(e) => {
                    const selectedCategory = e.target.value;
                    setCategory(selectedCategory);

                    navigate(`/?search=${encodeURIComponent(search)}&category=${encodeURIComponent(selectedCategory)}`);
                    }}
                    className="text-sm text-gray-500 max-w-40 border border-slate-300 rounded-full px-3 py-2.5 bg-white outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Categories</option>
                    <option value="Electric">Electric</option>
                    <option value="HouseHold">HouseHold</option>
                    <option value="Wooden">Wooden</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Home Decor">Home Decor</option>
                    <option value="Mobiles">Mobiles</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Mobile Accessories">Mobile Accessories</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Electronics">Electronics</option>
                </select>
            </form>
            {isLoggedIn && (
            <Link
                to="/my-orders"
                className="text-slate-700 font-medium hover:text-blue-600 transition whitespace-nowrap"
            >
                My Orders
            </Link>
            )}
            <div className="flex items-center gap-3 shrink-0">
                {!isLoggedIn ? (
                    <>
                        <Link
                            to="/login"
                            className="text-slate-700 px-2 py-2 font-medium hover:text-blue-600"
                        >
                            Login
                        </Link>

                        <Link
                            to="/signup"
                            className="bg-blue-600 text-white px-4 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition"
                        >
                            Sign Up
                        </Link>
                    </>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="text-slate-700 font-medium hover:text-red-600 transition"
                    >
                        Logout
                    </button>
                )}

                <Link
                    to="/cart"
                    className="relative flex items-center gap-2 px-3 py-2.5 rounded-xl font-semibold text-slate-700 hover:bg-blue-50 transition"
                >
                    🛒 Cart

                    {cartCount > 0 && (
                        <span className="bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                            {cartCount}
                        </span>
                    )}
                </Link>
            </div>
        </nav>
    );
}
export default Navbar
