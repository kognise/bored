export default process.env.NODE_ENV === 'development'
  ? 'http://localhost:3001/backend'
  : 'https://bored.pwnsquad.net/backend'