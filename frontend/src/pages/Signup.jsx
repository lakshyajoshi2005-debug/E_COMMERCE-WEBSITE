import {useState} from "react";
import {useNavigate} from "react-router-dom";

function Signup(){
    const BASE = import.meta.env.VITE_DJANGO_BASE_URL;
    const [form, setForm] = useState({username: "", email: "", password:"", password2:""});
    const [msg, setMsg] = useState("");
    const nav = useNavigate();

    const handleChange = e => setForm({...form, [e.target.name]: e.target.value});

    const handleSubmit = async e => {
        e.preventDefault();
        setMsg("");
        try{
            const res = await fetch(`${BASE}/api/register/`, {
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if(res.ok){
                setMsg("Account created. Redirecting to login...");
                setTimeout(() => nav("/login"), 1200);
            } else {
                setMsg(data.username || data.password || JSON.stringify(data));
            }
        } catch(err){
            console.error(err);
            setMsg("Signup failed");
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center p-6">
            <div className="max-w-md w-full bg-white p-6 rounded shadow">
                <h2 className="text-2xl font-bold mb-4">Signup</h2>
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        placeholder="Username"
                        type="text"
                        autoComplete="username"
                        required
                        className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Email"
                        type="email"
                        autoComplete="email"
                        required
                        className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        placeholder="Password"
                        type="password"
                        autoComplete="new-password"
                        required
                        className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <input
                        name="password2"
                        value={form.password2}
                        onChange={handleChange}
                        placeholder="Confirm Password"
                        type="password"
                        autoComplete="new-password"
                        required
                        className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:ring-2 focus:ring-blue-500"
                    />

                    <button
                        type="submit"
                        className="md:col-span-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg"
                    >
                        Create Account
                    </button>
                </form>
                {msg && <p className="mt-3 text-sm">{msg}</p>}
            </div>
        </div>
    )
}

export default Signup;