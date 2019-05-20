import Layout from '../components/Layout'
import backend from '../lib/backend'
import useForm from 'react-hook-form'
import ReCAPTCHA from 'react-google-recaptcha'
import { withRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { useState } from 'react'
import Head from 'next/head'

const Page = (props) => {
  const { handleSubmit, register, errors } = useForm()
  const [ captcha, setCaptcha ] = useState(null)
  const [ captchaError, setCaptchaError ] = useState(null)

  const onSubmit = async (values) => {
    if (!captcha) {
      setCaptchaError('Please fill out the captcha!')
      return
    } else {
      setCaptchaError(null)
    }

    document.cookie = `username=${encodeURIComponent(values.author)}`
    const res = await fetch(`${backend}/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ ...values, captcha })
    })
    const json = await res.json()
    props.router.push(`/post?id=${json.id}`)
  }

  return <Layout goHome>
    <Head>
      <title>Bored: New Post</title>
    </Head>

    <h2>New post</h2>

    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor='title'>Post title</label>
      {errors.title && <p className='error'>{errors.title.message}</p>}
      <input
        placeholder='Hello!'
        name='title'
        id='title'
        ref={register({
          required: 'This field is required!'
        })}
      />

      <label htmlFor='body'>Post body</label>
      {errors.body && <p className='error'>{errors.body.message}</p>}
      <textarea
        placeholder='Lorem ipsum dolor sit amet...'
        name='body'
        id='body'
        ref={register({
          required: 'This field is required!'
        })}
      />

      <label htmlFor='author'>Username (optional)</label>
      <input
        placeholder='Anonymous'
        name='author'
        id='author'
        defaultValue={props.username}
        ref={register({})}
      />

      {captchaError && <p className='error'>{captchaError}</p>}
      <ReCAPTCHA
        sitekey='6LeYiqQUAAAAAGs2yfPFNjbMHCzvKbfKRX_upvOK'
        theme='dark'
        className='captcha'
        onChange={setCaptcha}
      />

      <button type='submit'>Post</button>
    </form>

    <style jsx global>{`
      ::placeholder {
        color: #B7B7B7;
      }
      .captcha {
        margin-bottom: 14px;
      }
    `}</style>
    <style jsx>{`
      h2 {
        color: #FFFFFF;
        margin-bottom: 14px;
        font-size: 1.25em;
        font-weight: 500;
      }
      label {
        display: block;
        margin-bottom: 4px;
      }
      input, textarea {
        display: block;
        background: transparent;
        border: 1px solid #DEE2E6;
        outline: none;
        padding: 10px;
        font-size: inherit;
        font-family: inherit;
        width: 500px;
        margin-bottom: 14px;
        color: #FFFFFF;
      }
      textarea {
        resize: vertical;
      }
      input:focus, textarea:focus, button:focus {
        border: 1px solid #FFFFFF;
        box-shadow: 0 0 0 3px #007BFF80;
      }
      button {
        display: block;
        background: transparent;
        border: 1px solid #DEE2E6;
        outline: none;
        padding: 10px;
        font-size: inherit;
        font-family: inherit;
        color: #FFFFFF;
        cursor: pointer;
      }
      .error {
        color: #fa5252;
        margin: 0;
        margin-bottom: 4px;
      }
    `}</style>
  </Layout>
}
Page.getInitialProps = (req) => {
  const cookies = parseCookies(req)
  return { username: cookies.username || '' }
}
export default withRouter(Page)