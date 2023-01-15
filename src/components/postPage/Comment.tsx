import s from '../../styles/postPage.module.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import { useState } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'

export interface PostCommentProps {
	comment?: {
		username: string
		logo: string
		comment: string
		likes: number
	}
}

export default function PostComment({ comment }: PostCommentProps) {
	const [count, setCount] = useState<number>(comment ? comment.likes : 0)
	const [liked, setLiked] = useState<number>(-1)
	return (
		<div className={s.commentContainer}>
			<div className={s.icon}>
				<AccountCircleIcon />
			</div>
			<div className={s.commentBlock}>
				<div className={s.commentBG}>
					<div className={s.username}>{comment ? comment.username : null}</div>
					<div>
						<span>{comment?.comment}</span>
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
