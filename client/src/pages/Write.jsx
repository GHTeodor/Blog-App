import axios from 'axios';
import moment from 'moment';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function Write() {
    const { state } = useLocation();
    const [value, setValue] = useState(state?.description || '');
    const [title, setTitle] = useState(state?.title || '');
    const [file, setFile] = useState(null);
    const [category, setCategory] = useState(state?.category || '');

    const navigete = useNavigate();

    const handleCategory = ({ target }) => {
        setCategory(target.value);
    };

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            const { data } = await axios.post('/file/upload', formData);
            return data;
        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();
        const imgUrl = await upload();

        try {
            state
                ? await axios.put(`/posts/${state.id}`, {
                    title,
                    description: value,
                    image: file ? imgUrl : state.image || '',
                    category,
                })
                : await axios.post('/posts', {
                    title,
                    description: value,
                    image: file ? imgUrl : '',
                    category,
                    date: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
                });
            navigete('/');
        } catch (error) {
            console.error(error);
            if (error.response.status === 401) navigete('/login');
        }
    };

    return (
        <div className="add">
            <div className="content">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={({ target }) => setTitle(target.value)}
                />
                <div className="editorContainer">
                    <ReactQuill
                        className="editor"
                        theme="snow"
                        value={value}
                        onChange={setValue}
                    />
                </div>
            </div>

            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>
                        <b>Status: </b>
                        {' '}
                        Draft
                    </span>
                    <span>
                        <b>Visibility: </b>
                        {' '}
                        Public
                    </span>
                    <input
                        style={{ display: 'none' }}
                        type="file"
                        id="file"
                        onChange={({ target }) => setFile(target.files[0])}
                    />
                    <label className="file" htmlFor="file">UploadImage</label>
                    <div className="buttons">
                        <button type="button">Save as a draft</button>
                        <button type="button" onClick={handleClick}>Publish</button>
                    </div>
                </div>

                <div className="item">
                    <h1>Category</h1>
                    <div className="category">
                        <input
                            type="radio"
                            checked={category === 'Art'}
                            value="Art"
                            id="art"
                            onChange={handleCategory}
                        />
                        <label htmlFor="art">Art</label>
                    </div>
                    <div className="category">
                        <input
                            type="radio"
                            checked={category === 'Science'}
                            value="Science"
                            id="science"
                            onChange={handleCategory}
                        />
                        <label htmlFor="science">Science</label>
                    </div>
                    <div className="category">
                        <input
                            type="radio"
                            checked={category === 'Technology'}
                            value="Technology"
                            id="technology"
                            onChange={handleCategory}
                        />
                        <label htmlFor="technology">Technology</label>
                    </div>
                    <div className="category">
                        <input
                            type="radio"
                            checked={category === 'Cinema'}
                            value="Cinema"
                            id="cinema"
                            onChange={handleCategory}
                        />
                        <label htmlFor="cinema">Cinema</label>
                    </div>
                    <div className="category">
                        <input
                            type="radio"
                            checked={category === 'Design'}
                            value="Design"
                            id="design"
                            onChange={handleCategory}
                        />
                        <label htmlFor="design">Design</label>
                    </div>
                    <div className="category">
                        <input
                            type="radio"
                            checked={category === 'Food'}
                            value="Food"
                            id="food"
                            onChange={handleCategory}
                        />
                        <label htmlFor="food">Food</label>
                    </div>
                </div>
            </div>
        </div>
    );
}
