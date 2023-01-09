import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import DOMPurify from 'dompurify';

import Edit from '../images/edit.png';
import Delete from '../images/delete.png';
import { Menu } from '../components';
import { AuthContext } from '../context';

export function Single() {
    const [post, setPost] = useState({
        image: '', username: '', title: '', description: '', category: '', date: '', userImg: '',
    });
    const navigate = useNavigate();
    const { pathname } = useLocation();
    const postId = pathname.split('/').pop();

    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        (async function () {
            const { data } = await axios.get(`/posts/${postId}`).catch(console.log);
            setPost(data);
        }());
    }, [postId]);

    const handleDelete = async () => {
        await axios.delete(`/posts/${postId}`).catch(console.log);
        navigate('/');
    };

    return (
        <div className="single">
            <div className="content">
                <img src={`/${post?.image}`} alt={post.title} />
                <div className="user">
                    {post?.userImg
                        && <img src={`/${post.userImg}`} alt="User" />}
                    <div className="info">
                        <span>{post.username}</span>
                        <p>
                            Posted:&nbsp;
                            {moment(post.date).fromNow()}
                        </p>
                    </div>
                    {currentUser?.username === post.username
                        && (
                            <div className="edit">
                                <Link to="/write?edit=2" state={post}>
                                    <img src={Edit} alt="Edit" />
                                </Link>

                                <img onClick={handleDelete} src={Delete} alt="Delete" />
                            </div>
                        )}
                </div>
                <h1>{post.title}</h1>
                <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.description) }} />
            </div>
            <Menu category={post.category} />
        </div>
    );
}
