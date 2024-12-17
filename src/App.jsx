import './App.css';
import { Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import ArticleList from "./components/ArticleList.jsx";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/articles" element={<ArticleList />} />
      </Routes>
    </>
  );
}

export default App;