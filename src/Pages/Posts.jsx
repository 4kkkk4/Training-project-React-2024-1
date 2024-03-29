import React, { useEffect, useRef, useState } from 'react';
import { usePosts } from '../hooks/usePosts';
import { useFetching } from '../hooks/useFetching';
import PostService from '../API/PostService';
import { getPageCount } from '../utils/page';
import MyButton from '../components/UI/button/MyButton';
import MyModal from '../components/UI/modal/MyModal';
import FormPost from '../components/FormPost';
import PostFilter from '../components/PostFilter';
import Loading from '../components/UI/Loading/Loading';
import PostList from '../components/PostList';
import Pagination from '../components/UI/Pagination/Pagination';
import { useObserver } from '../hooks/useObserver';
import MySelect from '../components/UI/select/MySelect';

const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [filter, setFilter] = useState({ sort: '', query: '' });
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const lastElement = useRef();

    const [fetchPosts, isLoadingPosts, postError] = useFetching(
        async (limit, page) => {
            const response = await PostService.getALL(limit, page);
            setPosts([...posts, ...response.data]);
            const totalCount = response.headers['x-total-count'];
            setTotalPages(getPageCount(totalCount, limit));
        },
    );

    useObserver(lastElement, page < totalPages, isLoadingPosts, () => {
        setPage(page + 1);
    });

    useEffect(() => {
        fetchPosts(limit, page);
    }, [page, limit]);

    const createPost = (newPost) => {
        setPosts([...posts, newPost]);
        setModal(false);
    };

    const removePost = (post) => {
        setPosts(posts.filter((p) => p.id !== post.id));
    };

    const changePage = (page) => {
        setPage(page);
    };

    return (
        <div className="App">
            <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
                Добавление пользователя
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <FormPost create={createPost} />
            </MyModal>
            <hr style={{ margin: '15px 0' }} />
            <PostFilter filter={filter} setFilter={setFilter} />
            <MySelect
                value={limit}
                onChange={(value) => setLimit(value)}
                defaultValue="Колличество элементов на странице"
                options={[
                    { value: 1, name: '1' },
                    { value: 5, name: '5' },
                    { value: 10, name: '10' },
                    { value: 25, name: '25' },
                    { value: -1, name: 'Показать все' },
                ]}
            />
            {postError && (
                <h1 style={{ color: 'red' }}>
                    Произошла ошибка запроса...{postError}
                </h1>
            )}
            <PostList
                remove={removePost}
                posts={sortedAndSearchedPosts}
                title={'Посты про JS'}
            />
            <div ref={lastElement} style={{ height: 20, background: 'red' }} />
            {isLoadingPosts && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Loading />
                </div>
            )}
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
};

export default Posts;
