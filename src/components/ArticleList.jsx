import React, { useEffect, useState } from "react";
import { getArticles } from "../api.js";
import ArticleCard from "./ArticleCard";
import SortFilterBar from "./SortFilterBar";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sortBy, setSortBy] = useState("created_at");
  const [filterBy, setFilterBy] = useState("");
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getArticles()
      .then((data) => {
        let filteredArticles = data.articles;

        if (filterBy) {
         filteredArticles = filteredArticles.filter(
            (article) => article.topic === filterBy
          );
        }

        filteredArticles = filteredArticles.toSorted((a, b) => b[sortBy] - a[sortBy]);

        setArticles(filteredArticles);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true)
      });
  }, [sortBy, filterBy]);

  if (isLoading) return <p>Loading articles...</p>;
  if (isError) return <p>Error!</p>

  return (
    <div className="article-list">
      <h2>Articles</h2>
      <SortFilterBar setSortBy={setSortBy} setFilterBy={setFilterBy} />
      <div className="articles-container">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;