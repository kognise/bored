import Link from 'next/link'

export default (props) => <>
  <h1>Bored</h1>

  <ul className='navigation'>
    {props.newPost && <li className='primary'>
      <Link href='/new'>
        <a>New post</a>
      </Link>
    </li>}
    {props.goHome && <li>
      <Link href='/'>
        <a>Go home</a>
      </Link>
    </li>}
  </ul>
  {props.children}

  <style jsx global>{`
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap');
    body {
      margin: 0 auto;
      padding: 15px;
      max-width: 800px;
      background: #212529;
      color: #DEE2E6;
      font-family: 'Roboto', sans-serif;
    }
  `}</style>
  <style jsx>{`
    h1 {
      color: #FFE066;
      font-size: 1.875em;
      font-weight: 500;
    }
    .navigation {
      list-style-type: none;
      margin: 0;
      padding: 0;
    }
    .navigation li {
      display: inline-block;
      margin-right: 14px;
    }
    .navigation li a {
      color: #DEE2E6;
      padding: 8px;
      text-decoration: none;
    }
    .navigation li a:hover {
      color: #FFFFFF;
      text-decoration: underline;
    }
    .navigation li.primary a {
      background: #1c7ed6;
    }
  `}</style>
</>