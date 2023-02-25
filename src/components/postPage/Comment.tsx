import s from '../../styles/postPage.module.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export interface PostCommentProps {
	userId: number
	userName: string
	commentId: number
	comment: string
	diffTime: string
}

export default function PostComment(props: PostCommentProps) {
	const [count, setCount] = useState<number>(props ? props.userId : 0)
	const [liked, setLiked] = useState<number>(-1)
	return (
		<div className={s.commentContainer}>
			<div className={s.icon}>
				<AccountCircleIcon />
			</div>
			<div className={s.commentBlock}>
				<div className={s.commentBG}>
					<div className={s.username}>{props ? props.userName : null}</div>
					<div>
						<span>{props?.comment}</span>
					</div>
					<div className={s.commentCount}>
						<ThumbUpIcon />
						<span>{count}</span>
					</div>
				</div>
				<div className={s.likeBlock}>
					<span
						data-liked={`${liked}`}
						onClick={() => {
							setCount((count) => count - liked)
							setLiked((liked) => -liked)
						}}
					>
						Thích
					</span>
				</div>
			</div>
		</div>
	)
}
