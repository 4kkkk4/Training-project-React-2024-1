import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import Loading from '../components/UI/Loading/Loading';

const PageIdPost = () => {
    const params = useParams();
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([]);

    const [fetchPostsId, isLoadingPostId, error] = useFetching(async () => {
        const response = await PostService.getPostId(params.id);
        setPost(response.data);
    });

    const [fetchPostsIdComm, isLoadingPostIdComm, commError] = useFetching(
        async () => {
            const response = await PostService.getPostIdComments(params.id);
            setComments(response.data);
        },
    );

    useEffect(() => {
        fetchPostsId(params.id);
        fetchPostsIdComm(params.id);
    }, []);
    return (
        <div>
            <h1>вы перешли на страницу поста с ID = {params.id}</h1>
            {isLoadingPostId ? (
                <Loading />
            ) : (
                <div>
                    {post.id}. {post.title}
                </div>
            )}
            <h1>Комментарии</h1>
            {isLoadingPostIdComm ? (
                <Loading />
            ) : (
                <div>
                    {comments.map((comm) => (
                        <div key={comm.email} style={{ marginTop: 15 }}>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PageIdPost;
