import React, { Dispatch, SetStateAction } from 'react'

export type UserType = {
	id: number
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
	const [user, setUser] = React.useState<UserType | null>({ id: 1 })
	return <UserContext.Provider value={{ user: user, setUser: setUser }}>{children}</UserContext.Provider>
}
