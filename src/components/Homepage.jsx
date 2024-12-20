import React, { useEffect, useState } from "react";
import { getArticles } from "../api";
import { Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";
import "../App.css";

const HomePage = () => {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [topics] = useState(["coding", "cooking", "football"]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getArticles()
      .then((data) => {
        setFeaturedArticles(data.articles.slice(0, 3));
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setIsError(true);
      });
  }, []);

  if (isLoading)
    return (
      <div className="loading-container">
        <p>Loading featured content...</p>
      </div>
    );

  if (isError) return <p>Error loading articles.</p>;

  return (
    <div className="home-page">
      <h1>Welcome to NC News</h1>
      <section className="featured-articles">
        <h2>Featured Articles</h2>
        <div className="articles-container">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.article_id} article={article} />
          ))}
        </div>
      </section>
      <section className="topics-list">
        <h2>Topics</h2>
        <ul>
          {topics.map((topic) => (
            <li key={topic}>
              <Link to={`/articles?filter_by=${topic}`}>{topic}</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default HomePage;