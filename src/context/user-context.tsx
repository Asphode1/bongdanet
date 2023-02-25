import React, { Dispatch, SetStateAction, useEffect } from 'react'

export type UserType = {
	id: number
	api_token: string
	phone: string
	user_name: string
}

export type UserContextType = {
	user: UserType | null
	setUser: Dispatch<SetStateAction<UserType | null>>
}

export const UserContext = React.createContext<UserContextType | null>(null)

interface UserProviderProps {
	children: React.ReactNode[] | React.ReactNode
}

export default function UserProvider({ children }: UserProviderProps) {
	const [user, setUser] = React.useState<UserType | null>(null)
	useEffect(() => {
		const usr = localStorage.getItem('user')
		if (usr) setUser(JSON.parse(usr))
	}, [])
	return <UserContext.Provider value={{ user: user, setUser: setUser }}>{children}</UserContext.Provider>
}
