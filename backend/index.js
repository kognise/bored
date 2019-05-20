const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
const uid = require('uid-promise')

const posts = []

app.use(cors())
app.use(bodyParser.json())

app.get('/backend/posts', (req, res) => {
  res.json(posts)
})
app.get('/backend/post/:id', (req, res) => {
  const post = posts.find((post) => post.id === req.params.id)
  if (!post) return res.sendStatus(404)
  res.json(post)
})
app.post('/backend/submit', async (req, res) => {
  const id = await uid(10)
  posts.push({
    ...req.body,
    id, when: Date.now()
  })
  res.json({ id })
})

app.listen(3001, () => console.log('> Ready on port 3001'))