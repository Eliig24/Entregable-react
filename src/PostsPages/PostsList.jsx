import { useState } from "react";

function PostsList({ posts = [], onDelete, onUpdate }) {
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ title: "", content: "", author: "" });

    const startEdit = (post) => {
    setEditingId(post.id);
    setForm({ title: post.title || "", content: post.content || "", author: post.author || "" });
    };

    const cancelEdit = () => {
    setEditingId(null);
    setForm({ title: "", content: "", author: "" });
    };

    const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const saveEdit = async (id) => {
    const updated = { title: form.title.trim(), content: form.content.trim(), author: form.author.trim() };
    await onUpdate(id, updated);
    cancelEdit();
    };

    return (
    <div className="max-w-4xl mx-auto my-8 space-y-4">
        {posts.length === 0 && <div className="text-center text-gray-600">No hay publicaciones aún.</div>}

        {posts.map((post) => (
        <div key={post.id} className="bg-white rounded-2xl p-4 shadow-2xl">
            {editingId === post.id ? (
            <div className="space-y-3">
                <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full p-2 border rounded-2xl"
                placeholder="Título"
                />
                <textarea
                name="content"
                value={form.content}
                onChange={handleChange}
                className="w-full p-2 border rounded-2xl"
                rows={4}
                placeholder="Contenido"
                />
                <input
                name="author"
                value={form.author}
                onChange={handleChange}
                className="w-full p-2 border rounded-2xl"
                placeholder="Autor"
                />

                <div className="flex gap-2 mt-2">
                <button
                    onClick={() => saveEdit(post.id)}
                    className="px-4 py-2 bg-green-500 text-white rounded-2xl hover:bg-green-600"
                >
                    Guardar
                </button>
                <button
                    onClick={cancelEdit}
                    className="px-4 py-2 bg-gray-300 text-black rounded-2xl hover:bg-gray-400"
                >
                    Cancelar
                </button>
                </div>
            </div>
            ) : (
            <div>
                <h2 className="text-red-600 font-bold text-lg">{post.title}</h2>
                <p className="text-gray-700 my-2">{post.content}</p>
                <p className="text-sm text-gray-500">Autor: {post.author}</p>

                <div className="flex gap-2 mt-3">
                <button
                    onClick={() => startEdit(post)}
                    className="px-3 py-1 bg-green-500 text-white rounded-2xl hover:bg-green-600"
                >
                    Editar
                </button>
                <button
                    onClick={() => onDelete(post.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-2xl hover:bg-red-700"
                >
                    Eliminar
                </button>
                </div>
            </div>
            )}
        </div>
        ))}
    </div>
    );
}

export default PostsList;