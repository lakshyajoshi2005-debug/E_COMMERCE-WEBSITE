import {createContext, useContext, useState, useEffect} from "react";
import {authFetch, getAccessToken} from "../utils/auth";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
    const [cartItems, setCartItems] = useState([]);
    const[total, setTotal] = useState(0);

    //Fetch cart from backend
    const fetchCart = async () =>{
        try{
            const res = await authFetch(`${BASEURL}/api/cart/`)
            const data = await res.json();

            // NEW: Cart items ko variable mein store kiya
            const items = data.items || [];
            setCartItems(items);

            // NEW: Har product ka price × quantity karke total nikala
            const cartTotal = items.reduce((sum, item) => {
                const price = Number(item.product_price ?? item.price ?? 0);
                const quantity = Number(item.quantity ?? 1);

                return sum + price * quantity;
            }, 0);

            // NEW: Calculated total ko state mein save kiya
            setTotal(cartTotal);

        } catch(error){
            console.error("Error fetching cart:", error);
        }
    }

    useEffect(() => {
        fetchCart();
    }, []);

    //Add to Cart

    const addToCart = async (productId) => {
        try{
            await authFetch(`${BASEURL}/api/cart/add/`,{
                method:"POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({product_id: productId}),
            });
            
            fetchCart();
        } catch(error){
            console.error("Error adding to cart:", error);
        }
    }
        


    //Remove from cart

    const removeFromCart = async(itemId) => {
        try{
            await authFetch(`${BASEURL}/api/cart/remove/`, {
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({item_id:itemId})
            });
            fetchCart();
        } catch (error){
            console.error("Error removing from cart:", error);
        }
    };

    //Update quantity

    const updateQuantity = async(itemId, quantity) => {
        if (quantity < 1){
            await removeFromCart(itemId);
            return;
        }
        try{
            await authFetch(`${BASEURL}/api/cart/update/`, {
                method:"POST",
                headers: {
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({item_id: itemId, quantity}),
            });
            fetchCart();
        } catch(error){
            console.error("Error updating quantity:", error);
        }
    }
        
    const clearCart = () => {
        setCartItems([]);
        setTotal(0);
    }

    return (
        <CartContext.Provider
        value = {{cartItems, total, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart =  () => useContext(CartContext)