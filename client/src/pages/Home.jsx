import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

export function Home() {
    const [posts, setPosts] = useState([]);

    const { search } = useLocation();

    useEffect(() => {
        (async function () {
            const { data } = await axios.get(`/posts${search || ''}`).catch(console.log);
            setPosts(data);
        }());
    }, [search]);

    const getInitialPosts = async () => {
        const { data } = await axios.get('/posts/initial-posts').catch(console.log);
        setPosts(data);
    };

    const getText = (html) => {
        const { body } = new DOMParser().parseFromString(html, 'text/html');
        return body.textContent;
    };

    return (
        <div className="home">
            <div className="posts">
                {!posts.length && <button className="initial-posts" type="button" onClick={getInitialPosts}>Get initial posts</button>}

                {posts.map((post) => (
                    <div key={post.id} className="post">
                        <div className="img">
                            <Link className="link" to={`/post/${post.id}`}>
                                <img src={`/${post.image}`} alt="Post" />
                            </Link>
                        </div>
                        <div className="content">
                            <Link className="link" to={`/post/${post.id}`}>
                                <h1>{post.title}</h1>
                            </Link>
                            <p>{getText(post.description)}</p>
                            <Link className="link" to={`/post/${post.id}`}>
                                <button type="button">Read more</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
