import React from 'react'
import { useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Link,
} from '@material-ui/core'

const BlogsView = () => {
  const blogs = useSelector((state) => state.blogs).sort(
    (b1, b2) => b2.likes - b1.likes
  )

  return (
    <div>
      <h2>Blogs</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link className='blog' component={RouterLink} to={`/blog/${blog.id}`}>
                    {blog.title}
                  </Link>
                </TableCell>
                <TableCell>{blog.user.name}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogsView