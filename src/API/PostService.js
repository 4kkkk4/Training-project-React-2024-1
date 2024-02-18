import axios from 'axios';

export default class PostService {
    static async getALL(limit, page) {
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts',
            {
                params: {
                    _limit: limit,
                    _page: page,
                },
            },
        );
        return response;
    }
    static async getPostId(id) {
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts/' + id,
        );
        return response;
    }
    static async getPostIdComments(id) {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
        );
        return response;
    }
}
