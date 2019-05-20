import Layout from '../components/Layout'
import backend from '../lib/backend'
import format from '../lib/format'
import fetch from 'isomorphic-unfetch'
import Error from 'next/error'
import Head from 'next/head'

const Page = (props) => {
  if (!props.post) return <Error statusCode={404} />
  return <Layout goHome newPost>
    <Head>
      <title>Bored: {props.post.title}</title>
    </Head>

    <h2>{props.post.title}</h2>
    <p>
      {props.post.body.split('\n').map((item, index) => (
        <span key={index}>{item}<br/></span>
      ))}
    </p>
    <div>{format(props.post)}</div>

    <style jsx>{`
      h2 {
        color: #FFFFFF;
        margin-bottom: 14px;
        font-size: 1.25em;
        font-weight: 500;
      }
    `}</style>
  </Layout>
}
Page.getInitialProps = async (req) => {
  const res = await fetch(`${backend}/post/${req.query.id}`)
  if (res.status === 404) {
    if (req.res) res.statusCode = 404
    return { post: null }
  }
  const post = await res.json()
  return { post }
}
export default Page