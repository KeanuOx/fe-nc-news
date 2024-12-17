import React, { useEffect, useState } from "react";
import { getArticles } from "../api";
import { Link } from "react-router-dom";
import ArticleCard from "./ArticleCard";

const HomePage = () => {
  const [featuredArticles, setFeaturedArticles] = useState([]);
  const [topics] = useState(["coding", "cooking", "football"]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    getArticles()
      .then((data) => {
        const featured = data.articles.slice(0, 3);
        setFeaturedArticles(featured);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true)
      });
  }, []);

  if (isLoading) return <p>Loading featured content...</p>;
  if(isError) return <p>Error!</p>

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
              <Link to={`/articles?topic=${topic}`}>{topic}</Link>
            </li>
          ))}
        </ul>
      </section>
    </div>

    
  );
};

export default HomePage;