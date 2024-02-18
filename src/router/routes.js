import Posts from '../Pages/Posts';
import About from '../Pages/About';
import PageIdPost from '../Pages/PageIdPost';
import Login from '../Pages/login';

export const privateRoutes = [
    { path: '/posts', component: Posts, exact: true },
    { path: '/about', component: About, exact: true },
    { path: '/posts/:id', component: PageIdPost, exact: true },
];
export const publicRoutes = [{ path: '/login', component: Login, exact: true }];
