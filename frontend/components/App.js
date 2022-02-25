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
  const redirectToArticles = () => { navigate(articlesUrl); }

  const logout = () => {
    // ✨ implement
    // If a token is in local storage it should be removed,
    // and a message saying "Goodbye!" should be set in its proper state.
    // In any case, we should redirect the browser back to the login screen,
    // using the helper above.
    localStorage.removeItem('token');
    setMessage('GoodBye!');
    redirectToLogin();
  }

  const login = ({ username, password }) => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch a request to the proper endpoint.
    // On success, we should set the token to local storage in a 'token' key,
    // put the server success message in its proper state, and redirect
    // to the Articles screen. Don't forget to turn off the spinner!
    setMessage('')
    setSpinnerOn(true)
    axiosWithAuth()
    .post(loginUrl, { username, password })
    .then((res) => {
      localStorage.setItem('token', res.data.token);
      redirectToArticles();
      setSpinnerOn(false);
    })
    .catch((err) => {
      console.log(err, "login")
    })

  }

  const getArticles = () => {
    // ✨ implement
    // We should flush the message state, turn on the spinner
    // and launch an authenticated request to the proper endpoint.
    // On success, we should set the articles in their proper state and
    // put the server success message in its proper state.
    // If something goes wrong, check the status of the response:
    // if it's a 401 the token might have gone bad, and we should redirect to login.
    // Don't forget to turn off the spinner!
    
    setMessage('');
    setSpinnerOn(true);

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
        } else {
          console.log(err)
        }
      })
  }

  const postArticle = article => {
     
    // ✨ implement
    // The flow is very similar to the `getArticles` function.
    // You'll know what to do! Use log statements or breakpoints
    // to inspect the response from the server.
    setMessage('');
    setSpinnerOn(true);

    axiosWithAuth()
      .post(articlesUrl)
      .then(res => {
        setArticles(res.data.articles)
        setSpinnerOn(false)
        setMessage(res.data.message)
    })
      .catch(err => {
          console.log(err, 'postarticle');
        }
      )
  }

  const updateArticle = ({ article_id, article }) => {
 
  }

  const deleteArticle = article_id => {
     
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
          <Route path="articles" element={
            <>
              <ArticleForm 
                postArticle={ postArticle } 
                updateArticle={ updateArticle }
                setCurrentArticleId={ setCurrentArticleId } 
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
