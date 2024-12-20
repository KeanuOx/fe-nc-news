import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getArticles } from "../api";
import ArticleCard from "./ArticleCard";
import SortFilterBar from "./SortFilterBar";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const sort_by = searchParams.get("sort_by") || "created_at";
    const filter_by = searchParams.get("filter_by") || "";

    setIsLoading(true);
    setIsError(false);

    getArticles({ sort_by, filter_by })
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, [searchParams]);

  if (isLoading)
    return (
      <div className="loading-container">
        <p>Loading articles...</p>
      </div>
    );

  if (isError) return <p>Error loading articles. Please try again.</p>;

  return (
    <div className="article-list">
      <h2>Articles</h2>
      <SortFilterBar
        setSortBy={(sortBy) => {
          setSearchParams({ ...Object.fromEntries(searchParams), sort_by: sortBy });
        }}
        setFilterBy={(filterBy) => {
          const params = { ...Object.fromEntries(searchParams), filter_by: filterBy };
          if (!filterBy) delete params.filter_by;
          setSearchParams(params);
        }}
        filterBy={searchParams.get("filter_by") || ""}
        sortBy={searchParams.get("sort_by") || "created_at"}
      />
      <div className="articles-container">
        {articles.map((article) => (
          <ArticleCard key={article.article_id} article={article} />
        ))}
      </div>
    </div>
  );
};

export default ArticleList;