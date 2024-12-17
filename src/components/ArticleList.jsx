import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import SortFilterBar from "./SortFilterBar";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [sortBy, setSortBy] = useState("created_at");
  const [filterBy, setFilterBy] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const topicParam = searchParams.get("topic");
    if (topicParam) {
      setFilterBy(topicParam);
    }
  }, [searchParams]);
  
  useEffect(() => {
    if (filterBy !== undefined) {
      setIsLoading(true);
      getArticles(sortBy, filterBy)
        .then((data) => {
          setArticles(data.articles);
          setIsLoading(false);
        })
        .catch(() => {
          setIsError(true);
          setIsLoading(false);
        });
    }
  }, [sortBy, filterBy]);

  if (isLoading) return <p>Loading articles...</p>;
  if (isError) return <p>Error loading articles. Please try again.</p>;

  return (
    <div className="article-list">
      <h2>Articles</h2>
      <SortFilterBar setSortBy={setSortBy} setFilterBy={setFilterBy} filterBy={filterBy} sortBy={sortBy} />
      <div className="articles-container">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;