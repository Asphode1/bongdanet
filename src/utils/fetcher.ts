import axios from 'axios'

export const getFetcher = (url: string) => {
	return axios.get(`http://127.0.0.1:80/api${url}`).then((res) => res.data)
}

export const postFetcher = (url: string) => {
	return axios.post(`http://127.0.0.1:80/api${url}`).then((res) => res.data)
}
