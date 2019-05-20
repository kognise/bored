const formatDate = (when) => {
  const date = new Date(when)
  return `${date.getMonth()}/${date.getDate()}/${date.getFullYear()} at ${date.toLocaleTimeString('en-US')}`
}

export default (post) => `A post by ${post.author || 'an anonymous user'} on ${formatDate(post.when)}`