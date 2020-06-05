const likesSum = (blogs) => {

    return blogs.length === 0
      ? 0
      : blogs.reduce((a,b) => a + b.likes, 0)
}

const mostLiked = (blogs) => {

    if (blogs.length === 0) {return {}}

    const maxLikes = blogs.reduce((a, b) => a > b.likes ? a : b.likes, 0)
    const mostLiked = blogs.filter((blog) => blog.likes === maxLikes)[0]

    const moreCompact = {
        title: mostLiked.title,
        author: mostLiked.author,
        likes: mostLiked.likes
    }

    return moreCompact

}


module.exports = {
  likesSum,
  mostLiked
}
