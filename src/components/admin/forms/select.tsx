import axios from 'axios'
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'
import useDebounce from '../../../hooks/useDebounce'
import useUser from '../../../hooks/useUser'
import s from '../../../styles/admin/modals.module.css'

export interface SelectNameProps {
	id: number
	name: string
}

export interface SelectFNameProps {
	id: number
	full_name: string
}

export interface SelectProps {
	id?: number | null
	isView?: boolean
	setSelected: Dispatch<SetStateAction<number | null>>
}

export function SelectClub({ id, isView, setSelected }: SelectProps) {
	const [expand, setExpand] = useState(false)
	const [search, setSearch] = useState('')
	const [data, setData] = useState<SelectFNameProps[]>([])

	const { user } = useUser()
	const optRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClick = (e: Event) => {
			if (optRef.current && !optRef.current.contains(e.target)) {
				setExpand(false)
			}
		}

		document.addEventListener('mousedown', handleClick)
		return () => document.removeEventListener('mousedown', handleClick)
	}, [optRef])

	useEffect(() => {
		if (id !== undefined) {
			axios
				.post(
					'http://football.local.com:80/api/admin/club/detail',
					{ clubId: id },
					{
						headers: { Authorization: `Bearer ${user?.api_token}` },
					}
				)
				.then((res) => {
					if (res.data.full_name) setSearch(res.data.full_name)
				})
		}
	}, [])

	const searchKey = useDebounce(search, 200)

	useEffect(() => {
		if (searchKey !== undefined && searchKey.length && expand) {
			axios
				.post(
					'http://football.local.com:80/api/admin/club/search',
					{ searchKey },
					{
						headers: { Authorization: `Bearer ${user?.api_token}` },
					}
				)
				.then((res) => setData(res.data.data as SelectFNameProps[]))
		} else setData([])
	}, [searchKey, expand])

	return (
		<div ref={optRef} className={s.selectBox}>
			<input
				type="text"
				onFocus={(e) => {
					setExpand(true)
					e.target.select()
				}}
				className={s.selected}
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				readOnly={isView !== undefined && isView}
			/>
			{expand ? (
				<div className={s.selection}>
					<ul>
						{data?.map((e) => (
							<li
								key={e.id}
								onClick={() => {
									setExpand(false)
									setSelected(e.id)
									setSearch(e.full_name)
								}}
							>
								{e.full_name}
							</li>
						))}
					</ul>
				</div>
			) : null}
		</div>
	)
}

export function SelectLeague({ id, isView, setSelected }: SelectProps) {
	const [expand, setExpand] = useState(false)
	const [search, setSearch] = useState('')
	const [data, setData] = useState<SelectNameProps[]>([])
	const { user } = useUser()
	const optRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleClick = (e: Event) => {
			if (optRef.current && !optRef.current.contains(e.target)) {
				setExpand(false)
			}
		}

		document.addEventListener('mousedown', handleClick)
		return () => document.removeEventListener('mousedown', handleClick)
	}, [optRef])

	useEffect(() => {
		if (id !== undefined) {
			axios
				.post(
					'http://football.local.com:80/api/admin/league/detail',
					{ leagueId: id },
					{
						headers: { Authorization: `Bearer ${user?.api_token}` },
					}
				)
				.then((res) => {
					if (res.data.name) {
						console.log(res.data.name)
						setSearch(res.data.name)
					}
				})
		}
	}, [])

	const searchKey = useDebounce(search, 200)

	useEffect(() => {
		if (searchKey !== undefined && searchKey.length && expand) {
			axios
				.post(
					'http://football.local.com:80/api/admin/league/search',
					{ searchKey },
					{
						headers: { Authorization: `Bearer ${user?.api_token}` },
					}
				)
				.then((res) => setData(res.data.data as SelectNameProps[]))
		} else setData([])
	}, [searchKey, expand])

	return (
		<div className={s.selectBox} ref={optRef}>
			<input
				type="text"
				onFocus={(e) => {
					e.target.select()
					setExpand(true)
				}}
				className={s.selected}
				value={search}
				readOnly={isView !== undefined && isView}
				onChange={(e) => setSearch(e.target.value)}
			/>
			{expand ? (
				<div className={s.selection}>
					<ul>
						{data?.map((e) => (
							<li
								key={e.id}
								onClick={() => {
									setExpand(false)
									setSelected(e.id)
									setSearch(e.name)
								}}
							>
								{e.name}
							</li>
						))}
					</ul>
				</div>
			) : null}
		</div>
	)
}
