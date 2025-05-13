import {Post} from "@/app/interfaces/post.interface";
import {sleep} from "@/app/(main)/sleep";

export default async function Page() {
    await sleep(2000);
    const res = await fetch("https://jsonplaceholder.typicode.com/postss");
    const posts = await res.json();
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