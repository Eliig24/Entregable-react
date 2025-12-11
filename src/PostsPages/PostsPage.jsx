import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance.jsx";
import CreatePost from "./CreatePost.jsx";
import PostsList from "./PostsList.jsx";

function PostsPage() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
    fetchPosts();
    }, []);

    const fetchPosts = async () => {
    setLoading(true);
    setError(null);
    try {
        const res = await axiosInstance.get("posts");
        setPosts(Array.isArray(res.data.data) ? res.data.data.map(p => ({
            ...p,
            id: p._id
        })) : []);
        } catch (err) {
        console.error("Error fetching posts:", err);
        setError("No se pudieron cargar las publicaciones.");
    } finally {
        setLoading(false);
    }
    };

    const handlePostCreated = (newPost) => {
    setPosts((prev) => [newPost, ...prev]);
    };

    const handleDelete = async (id) => {
    if (!window.confirm("¿Eliminar esta publicación?")) return;

    try {
        await axiosInstance.delete(`posts/${id}`);
        setPosts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
        console.error("Error deleting post:", err);
        alert("No se pudo eliminar la publicación.");
    }
    };

const handleUpdate = async (id, updatedData) => {
    try {
        const cleanUpdate = Object.fromEntries(
        Object.entries(updatedData).filter(([key, value]) => {
          // excluir campos de ID
            if (key === "id" || key === "_id") return false;

          // excluir campos vacíos o undefined
            if (value === "" || value === null || value === undefined) return false;

            return true;
        })
        );

        const res = await axiosInstance.put(`posts/${id}`, cleanUpdate);

        const updatedPost = res.data.data;

        const normalized = {
            ...updatedPost,
            id: updatedPost._id
        };

        setPosts(prev =>
            prev.map(p => (p.id === id ? normalized : p))
        );

    } catch (err) {
        console.error("Error updating post:", err);
        alert("No se pudo actualizar la publicación.");
    }
};


    return (
    <div className="max-w-4xl mx-auto my-6">
        <CreatePost onPostCreated={handlePostCreated} />

        <div className="mt-6">
        {loading && <div className="text-center text-gray-600">Cargando publicaciones...</div>}
        {error && <div className="text-center text-red-600">{error}</div>}

        {!loading && !error && (
            <PostsList posts={posts} onDelete={handleDelete} onUpdate={handleUpdate} />
        )}
        </div>
    </div>
    );
}

export default PostsPage;