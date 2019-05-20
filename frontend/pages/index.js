import Layout from '../components/Layout'
import Preview from '../components/Preview'
import backend from '../lib/backend'
import fetch from 'isomorphic-unfetch'
import Head from 'next/head'

const Page = (props) => <Layout newPost>
  <Head>
    <title>Bored</title>
  </Head>
  {props.posts.map((post) => (
    <Preview key={post.id} {...post} />
  ))}
</Layout>
Page.getInitialProps = async () => {
  const res = await fetch(`${backend}/posts`)
  const posts = await res.json()
  return { posts }
}
export default Page