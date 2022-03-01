import React, { useEffect, useRef, useState } from 'react';
import PostService from "../API/PostService";
import { usePosts } from "../hooks/usePosts";
import { useFetching } from "../hooks/useFetching";
import { getPageCount } from "../utils/pages";
import { useObserver } from "../hooks/useObserver";
import MyButton from './../Components/UI/button/MyButton';
import PostForm from './../Components/PostForm';
import MyModal from './../Components/UI/MyModal/MyModal';
import PostFilter from './../Components/PostFilter';
import PostList from './../Components/PostList';
import Loader from './../Components/UI/Loader/Loader';
import Pagination from './../Components/UI/pagination/Pagination';
import MySelect from './../Components/UI/MySelect/MySelect';
import { Link } from 'react-router-dom';
import styles from '../styles/App.css'
import { usePostsTwo } from './../Components/hooks/usePosts';


function Posts() {
    const button = true;
    const [historyPosts, sethistoryPosts] = useState([])
    const [postsTwo, setPostsTwo] = useState([])
    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({ sort: '', query: '' })
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0);
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const sortedAndSearchedPostsTwo = usePostsTwo(postsTwo, filter.sortTwo, filter.queryTwo);
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
    const lastElement = useRef()

    const [fetchPosts, isPostsLoading, postError] = useFetching(async (limit, page) => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPageCount(totalCount, limit));
    })

    useObserver(lastElement, page < totalPages, isPostsLoading, () => {
        setPage(page + 1);
    })

    useEffect(() => {
        fetchPosts(limit, page)
    }, [page, limit])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    // Получаем post из дочернего компонента
    const removePost = (post) => {
        setPosts(posts.filter(p => p.id !== post.id))
        setPostsTwo([post, ...postsTwo])
        sethistoryPosts([{ state: "saved", post: post, date: Date.now() }, ...historyPosts])
        sessionStorage.setItem("historyPosts", JSON.stringify(historyPosts));

    }

    const removePostTwo = (post) => {
        setPostsTwo(postsTwo.filter(p => p.id !== post.id))
        setPosts([post, ...posts])
        sethistoryPosts([{ state: "deleted", post: post, date: Date.now() }, ...historyPosts])
        sessionStorage.setItem("historyPosts", JSON.stringify(historyPosts));
    }

    const changePage = (page) => {
        setPage(page)
    }


    return (
        <div className="App">
            <Link to="/">На главную</Link>
            <MyButton style={{ marginTop: 30 }} onClick={() => setModal(true)}>
                Создать пользователя
            </MyButton>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost} />
            </MyModal>
            <hr style={{ margin: '15px 0' }} />
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue="Кол-во элементов на странице"
                options={[
                    { value: 5, name: '5' },
                    { value: 10, name: '10' },
                    { value: 25, name: '25' },
                    { value: -1, name: 'Показать все' },
                ]}
            />
            {postError &&
                <h1>Произошла ошибка ${postError}</h1>
            }
            <div className='wrapper'>
                <div className='list'>
                    <PostList  remove={removePost} posts={sortedAndSearchedPosts} title='Общий' button={button} />
                </div>
                <div className='list'>
                    <PostList remove={removePostTwo} posts={sortedAndSearchedPostsTwo} title='Добавлено' button={!button} /></div>

            </div>

            <div ref={lastElement} style={{ height: 20 }} />
            {isPostsLoading &&
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 50 }}><Loader /></div>
            }
            <Pagination
                page={page}
                changePage={changePage}
                totalPages={totalPages}
            />
        </div>
    );
}

export default Posts;
