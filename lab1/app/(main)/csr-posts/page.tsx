"use client";

import {Post} from "@/app/interfaces/post.interface";
import {useEffect, useState} from "react";

export default function Page() {
    const [posts, setPosts] = useState<Post[]>([]);
    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch("https://jsonplaceholder.typicode.com/posts");
            const posts = await res.json();
            setPosts(posts);
        };
        fetchPosts().then();
    }, []);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            {posts.map((post: Post) => (
                <div
                    key={post.id}
                    className="bg-white shadow-md rounded-xl p-4 border hover:shadow-lg transition"
                >
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h2>
                    <p className="text-gray-600">{post.body}</p>
                </div>
            ))}
        </div>
    );
}