// https://github.com/udacity/reactnd-contacts-complete/blob/master/src/utils/ContactsAPI.js

const api = process.env.REACT_APP_CONTACTS_API_URL || "http://localhost:5001"

let token = localStorage.token

if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  "Accept": "application/json",
  "Authorization": token
}

export const getAll = () =>
  fetch(`${api}/marcadores`, { headers })
    .then(res => res.json())
    .then(data => data.marcadores)

export const remove = (marcador) =>
  fetch(`${api}/marcadores/${marcador.id}`, { method: "DELETE", headers })
    .then(res => res.json())
    .then(data => data.marcador)

export const create = (body) =>
  fetch(`${api}/marcadores`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
}).then(res => res.json())