import React, { useState } from 'react'
import { NavLink, Routes, Route, useNavigate } from 'react-router-dom'
import Articles from './Articles'
import LoginForm from './LoginForm'
import Message from './Message'
import ArticleForm from './ArticleForm'
import Spinner from './Spinner'
// import axios from 'axios'
import axiosWithAuth from '../axios'

// import { set } from 'msw/lib/types/context'

const articlesUrl = 'http://localhost:9000/api/articles'
const loginUrl = 'http://localhost:9000/api/login'

export default function App() {
  // ✨ MVP can be achieved with these states
  const [message, setMessage] = useState('')
  const [articles, setArticles] = useState([])
  const [currentArticleId, setCurrentArticleId] = useState()
  const [spinnerOn, setSpinnerOn] = useState(false)

  // ✨ Research `useNavigate` in React Router v.6
  const navigate = useNavigate();
  const redirectToLogin = () => { navigate('/'); }
  const redirectToArticles = () => { 
    navigate("/articles"); 
    console.log("work!")
  }

  const logout = () => {
    localStorage.removeItem('token');
    setMessage('GoodBye!');
    redirectToLogin();
  }

  const login = ({ username, password }) => {
      setMessage('')
    setSpinnerOn(true)
    axiosWithAuth()
    .post(loginUrl, { username, password })
    .then((res) => {
      console.log(res);
      localStorage.setItem('token', res.data.token);
      setSpinnerOn(false);
      redirectToArticles();
    })
    .catch((err) => {
      console.log({ err })
    })
  };

  const getArticles = () => {    
    setMessage('');
    setSpinnerOn(true);
    console.log('getarticles');
    axiosWithAuth()
      .get(articlesUrl)
      .then(res => {
        setArticles(res.data.articles)
        setSpinnerOn(false)
        setMessage(res.data.message)
    })
      .catch(err => {
        if(err.response.status == 401) {
          redirectToLogin();
          console.log({err})
        } else {
          console.log(err, "error message get")
        }
      })
  }

  const postArticle = (article) => {
    setMessage('');
    setSpinnerOn(true);

    axiosWithAuth()
      .post(articlesUrl, article)
      .then(res => {
        setArticles(res.data.articles)
        setSpinnerOn(false)
        setMessage(res.data.message)
    })
    .catch(err =>{
      if (err.response.status == 401) {
        navigate('/')
      } else {
        console.log(err, "error message post")
      }
    })
  };
  const updateArticle = ({ article_id, article }) => {
    axiosWithAuth()
      .put (`${articlesUrl}/${article_id}`, article)
      .then (res => {
        setArticles(articles.map(post => {
          return (post.article_id == article.article_id)? res.data.article: post
        }))
      })
      .catch (err => console.log({err}));
  }

  const deleteArticle = article_id => {
    axiosWithAuth()
    .delete (`${articlesUrl}/${article_id}`)
    .then(res =>{
      setArticles(res.filter(post=>{
        return (post.id != article_id)
      }))
    })
  }

  return (
    // ✨ fix the JSX: `Spinner`, `Message`, `LoginForm`, `ArticleForm` and `Articles` expect props ❗
    <React.StrictMode>
      <Spinner  on={ spinnerOn } />
      <Message message={ message }/>
      <button id="logout" onClick={ logout }>Logout from app</button>
      <div  id="wrapper" style={{ opacity: spinnerOn ? "0.25" : "1" }}> { '' }{/* <-- do not change this line */}
        <h1>Advanced Web Applications</h1>
        <nav>
          <NavLink id="loginScreen" to="/">Login</NavLink>
          <NavLink id="articlesScreen" to="/articles">Articles</NavLink>
        </nav>
        <Routes>
          <Route path="/" element={<LoginForm login= { login } />} />
          <Route path="/articles" element={
            <> 
              <ArticleForm 
                postArticle={ postArticle } 
                updateArticle={ updateArticle }
                setCurrentArticleId={ setCurrentArticleId } 
                article={articles.find((art => {
                  return art.article_id === currentArticleId
                }))}
              />
              <Articles 
                getArticles={ getArticles }
                articles={ articles }
                deleteArticle={ deleteArticle }
                setCurrentArticleId={ setCurrentArticleId }
              />
            </>
          } />
        </Routes>
        <footer>Bloom Institute of Technology 2022</footer>
      </div>
    </React.StrictMode>
  )
}
