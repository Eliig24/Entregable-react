import { useState } from "react";
import axiosInstance from "../axiosInstance.jsx"

function CreatePost({ onPostCreated }) {
    const [form, setForm] = useState({ title: "", content: "", author: "" });

    const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await axiosInstance.post("posts", form);
        const newPost = res.data;
        onPostCreated(newPost);
        setForm({ title: "", content: "", author: "" });
    };

    return (
        <div className="max-w-xl mx-auto my-12 rounded-2xl justify-center items-center p-2">
    <form onSubmit={handleSubmit} className="space-y-6 px-6 bg-red-300 rounded-2xl p-4 flex flex-col shadow-2xl">
        <input
        name="title"
        placeholder="Título"
        value={form.title}
        onChange={handleChange}
        className="text-red-600 font-bold border border-white rounded-2xl p-2 bg-white shadow-2xl"
        />
        <textarea
        name="content"
        placeholder="Contenido"
        value={form.content}
        onChange={handleChange}
        className="text-red-600 font-bold border border-white rounded-2xl p-2 bg-white shadow-2xl"
        />
        <input
        name="author"
        placeholder="Autor"
        value={form.author}
        onChange={handleChange}
        className="text-red-600 font-bold border border-white rounded-2xl p-2 bg-white shadow-2xl"
        />
        <button type="submit" className="text-white bg-red-500 p-2 max-w-lg mx-auto my-4 rounded-2xl shadow-2xl hover:bg-red-700">Crear publicación</button>
    </form>
    </div>
    );
}

export default CreatePost;