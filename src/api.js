import axios from "axios";


const ncNewsApi = axios.create({
  baseURL: "https://my-nc-news-t6j3.onrender.com/api"
});

export const getArticles = ({ sort_by = "created_at", filter_by = "" } = {}) => {
  const params = {};
  if (sort_by) params.sort_by = sort_by;
  if (filter_by) params.topic = filter_by;

  return ncNewsApi
    .get("/articles", { params })
    .then((response) => response.data)
};

export const getArticleById = (article_id) => {
  return ncNewsApi
    .get(`/articles/${article_id}`)
    .then((response) => {return response.data})
};

export const getCommentsByArticleId = (article_id) => {
  return ncNewsApi
    .get(`/articles/${article_id}/comments`)
    .then((response) => { return response.data})
}

export const patchArticleVotes = (article_id, incVotes) => {
  return ncNewsApi
    .patch(`/articles/${article_id}`, { inc_votes: incVotes })
    .then((response) => {return response.data})
};

export const postComment = (article_id, commentData) => {
  return ncNewsApi
    .post(`/articles/${article_id}/comments`, commentData)
    .then((response) => {
      return response.data });
};

export const deleteComment = (comment_id) => {
  return ncNewsApi.delete(`/comments/${comment_id}`);
};