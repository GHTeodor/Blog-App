import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function Menu({ category }) {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        (async function () {
            const { data } = await axios.get(`/posts/?cat=${category}`).catch(console.log);
            setPosts(data);
        }());
    }, [category]);

    return (
        <div className="menu">
            <h1>Other posts you may like</h1>
            {posts.map((post) => (
                <div className="post" key={post.id}>
                    <img src={`/${post.image}`} alt="Post" />
                    <h2>{post.title}</h2>
                    <Link className="link" to={`/post/${post.id}`}>
                        <button type="button">Read More</button>
                    </Link>
                </div>
            ))}
        </div>
    );
}
