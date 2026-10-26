
import { useEffect, useState } from "react";
import { authFetch } from "../utils/auth";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  useEffect(() => {
    authFetch(`${BASEURL}/api/orders/my-orders/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load orders");
        }
        return response.json();
      })
      .then((data) => setOrders(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [BASEURL]);

  if (loading) return <p className="p-6">Loading orders...</p>;

  if (error) {
    return <p className="p-6 text-red-600">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <h1 className="mb-6 text-3xl font-bold text-slate-800">
        My Orders
      </h1>

      {orders.length === 0 ? (
        <p className="text-slate-500">You haven't placed any orders yet.</p>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border bg-white p-5 shadow-sm"
            >
              <div className="flex flex-wrap justify-between gap-2">
                <h2 className="font-bold">Order #{order.id}</h2>
                <span className="text-sm text-slate-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </span>
              </div>

              <div className="my-4 space-y-2">
                {order.items.map((item, index) => (
                  <div
                    key={index}
                     className="flex items-center justify-between gap-4 border-b border-slate-100 py-2 text-slate-600"
                  >
                    <span>{item.product_name} × {item.quantity}</span>
                    <span>₹{Number(item.price).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-3 text-right font-bold">
                Total: ₹{Number(order.total_amount).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyOrders;
