import axios from 'axios'
const baseUrl = '/api/blogs'
import storage from '../utils/storage'

const getConfig = () => {
  return {
    headers: { Authorization: `bearer ${storage.loadUser().token}` },
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getConfig())
  return response.data
}

const update = async (updateObject) => {
  const response = await axios.put(
    `${baseUrl}/${updateObject.id}`,
    updateObject
  )
  return response.data
}

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfig())
  return response.data
}

const comment = async (id, content) => {
  const request = axios.post(`${baseUrl}/${id}/comments`, { content })
  const response = await request
  return response.data
}

export default { getAll, create, update, remove, comment }
