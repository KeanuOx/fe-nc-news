import axios from "axios";


const marketplaceApi = axios.create({
  baseURL: "https://my-nc-news-t6j3.onrender.com/api"
});

export const getArticles = () => {
  return marketplaceApi
    .get("/articles")
    .then((response) => {return response.data})
    
};