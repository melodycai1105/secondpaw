import axios from 'axios';

const url = 'http://localhost:5000/posts';

// Return all the posts in the database 
export const fetchPosts = () => axios.get(url);
