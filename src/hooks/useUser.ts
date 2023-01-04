import { useContext } from 'react'
import { UserContext } from '../context/user-context'

export default function useUser() {
	const { user, setUser } = useContext(UserContext)!

	return {
		user: user,
		setUser: setUser,
	}
}
