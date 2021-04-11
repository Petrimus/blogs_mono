/**
 * @jest-environment jsdom
 */

import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  test('renders content', () => {
    const blog = {
      title: 'testing title',
      author: 'me, myself and i',
      likes: 5,
      url: 'www.whatever.ever',
    }

    const component = render(<SimpleBlog blog={blog} />)

    expect(component.container).toHaveTextContent('testing title me, myself and i')

    const element = component.getByText('blog has 5 likes')
    expect(element).toBeDefined()
  })

  test('like button pressed twice, event function called twice', () => {
    const blog = {
      title: 'testing title',
      author: 'me, myself and i',
      likes: 5,
      url: 'www.whatever.ever',
    }
    const mockHandler = jest.fn()

    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={mockHandler} />
    )

    const likeButton = getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
