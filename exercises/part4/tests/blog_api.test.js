const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')
const Blog = require('../models/blog')



beforeEach(async () => {
  await Blog.deleteMany({})

  const blogObjects = helper.initialBlogs
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})


test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a valid blog can be added', async () => {
  const newBlog =  { id: "5a422a851b54a676234d17fd", title: "Test thing", author: "Alex", url: "https://reactpatterns.com/", likes: 3 }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const authors = blogsAtEnd.map(blog => blog.author)

  expect(authors).toContain(
    'Alex'
  )
})

test('deleting blog is successful', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToDelete = blogsAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  expect(blogsAtEnd).toHaveLength(
    helper.initialBlogs.length - 1
  )

  const ids = blogsAtEnd.map(blog => blog.id)
  expect(ids).not.toContain(blogToDelete.id)
})


test('updating blog is successful', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToUpdate = blogsAtStart[0]
  blogToUpdate.likes = 123456

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd[0].likes).toEqual(123456)
})


afterAll(() => {
  mongoose.connection.close()
})
