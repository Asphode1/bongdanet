import PostComment, { PostCommentProps } from '../components/postPage/Comment'
import s from '../styles/postPage.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { FormEvent, useEffect, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import useUser from '../hooks/useUser'
import axios from 'axios'
import useSWR from 'swr'
import { addComment, getComment, getLikeUrl, likeUrl } from '../utils/Urls'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'

interface LikeFProps {
	url: string
	postId: number
}

interface LikeProps {
	count: number
	users: string[]
}

interface PostProps {
	id: number
	title: string
	content: string
}

export default function PostPage() {
	const { pId } = useParams()
	const [comment, setComment] = useState<string>('')
	const { user } = useUser()
	const postCommentFetcher = (url: string) => axios.post(url, { postId: pId }).then((res) => res.data.data)

	const postFetcher = (url: string) => axios.post(url, { postId: pId }).then((res) => res.data.data)

	const { data: post, mutate: postMutate } = useSWR<PostProps>(
		'http://football.local.com:80/api/post/get_post_detail',
		postFetcher
	)

	const getLikeFetcher = ({ url, postId }: LikeFProps) => axios.post(url, { postId }).then((res) => res.data.data)

	const { data: like, mutate: likeMutate } = useSWR<LikeProps>({ url: getLikeUrl, postId: pId }, getLikeFetcher)

	const { data, mutate } = useSWR<PostCommentProps[]>(getComment, postCommentFetcher)

	const likeFetcher = () => axios.post(likeUrl, { postId: pId, userId: user?.id })

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setComment('')
		axios
			.post(addComment, { userId: user?.id, postId: pId, comment: comment })
			.then(() => mutate(data))
			.catch((err) => console.error(err))
	}

	useEffect(() => {
		postMutate(post)
	}, [pId])
	return (
		<div className={s.container}>
			<div className={s.content}>
				<h1>{post?.title}</h1>
				<div>
					{post?.content.split('\r\n').map((e, index) => {
						return <p key={index}>{e}</p>
					})}
				</div>
			</div>
			<div className={s.reaction}>
				<button
					type="button"
					data-liked={like?.users.includes(user?.user_name!)}
					disabled={user === null}
					onClick={() => likeFetcher().then(() => likeMutate(like))}
				>
					<ThumbUpAltIcon />
					<span>{like?.count ?? 0}</span>
				</button>
				<button
					type="button"
					onClick={() => document.getElementById('binh-luan')?.scrollIntoView({ behavior: 'smooth' })}
				>
					Bình luận
				</button>
			</div>
			<div className={s.line}></div>
			<div className={s.comments}>
				<p id="binh-luan">Bình luận</p>
				<div className={s.userComment}>
					<div>
						<AccountCircleIcon />
					</div>
					<form onSubmit={handleSubmit}>
						<ReactTextareaAutosize
							value={comment}
							onChange={(e) => setComment(e.target.value)}
							placeholder={'Nhập bình luận...'}
							className={s.userCommentText}
						/>
						<button type="submit" className={s.btn}>
							Gửi
						</button>
					</form>
					{user ? null : (
						<div className={s.noUserOverlay}>
							<p>
								<Link to="/login">Đăng nhập</Link> để tham gia bình luận
							</p>
						</div>
					)}
				</div>
				<ul>
					{data?.map((e, index) => {
						return (
							<li key={index}>
								<PostComment {...e} />
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}
