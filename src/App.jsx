import './App.css';
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ArticleList from "./components/ArticleList.jsx";
import SingleArticle from './components/SingleArticle.jsx';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/articles" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<SingleArticle />} />
      </Routes>
    </>
  );
}

export default App;