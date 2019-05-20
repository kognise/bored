import Link from 'next/link'
import format from '../lib/format'

export default (props) => (
  <article>
    <h2>
      <Link href={`/post?id=${props.id}`}>
        <a>{props.title}</a>
      </Link>
    </h2>
    <div>{format(props)}</div>
    <style jsx>{`
      h2 {
        margin-bottom: 14px;
        font-size: 1.25em;
        font-weight: 500;
      }
      h2 a {
        color: #FFFFFF;
        text-decoration: none;
      }
      h2 a:hover {
        text-decoration: underline;
      }
      div {
        margin-bottom: 30px;
      }
    `}</style>
  </article>
)