import axios from "axios";


const ncNewsApi = axios.create({
  baseURL: "https://my-nc-news-t6j3.onrender.com/api"
});

export const getArticles = () => {
  return ncNewsApi
    .get("/articles")
    .then((response) => {return response.data})
    
};

export const getArticleById = (article_id) => {
  return ncNewsApi
    .get(`/articles/${article_id}`)
    .then((response) => {return response.data})
};