import PostComment, { PostCommentProps } from '../components/postPage/Comment'
import s from '../styles/postPage.module.css'
import { UserType } from '../context/user-context'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { FormEvent, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
const data = {
	title: 'Indonesia đấu Việt Nam ở AFF Cup 2022: Bức tường Jordi Amat',
	description:
		'Indonesia chuẩn bị đấu Việt Nam ở lượt đi bán kết AFF Cup 2022 với điểm tựa Jordi Amat, trung vệ nổi tiếng một thời của bóng đá Tây Ban Nha.',
	content:
		'Inaki Williams khiến mọi người ngạc nhiên khi quyết định lựa chọn đội tuyển Ghana vì không có cơ hội khoác áo Tây Ban Nha, và vừa tham dự World Cup 2022.\nBóng đá Tây Ban Nha có rất nhiều tài năng trẻ nhưng không có cơ hội thi đấu quốc tế, nên lựa chọn đội tuyển khác. Không ồn ào như Inaki, ngôi sao đang thi đấu cho Bilbao, nhưng Jordi Amat cũng rất được chú ý.\nTháng 9/2022, Jordi Amat, người từng trải qua đội U21 và các hạng mục trẻ của "La Roja", được nhận quốc tịch Indonesia và quyết định thi đấu cho đội tuyển xứ vạn đảo.\n"Đại diện cho một quốc gia có 275 triệu dân sẽ rất đặc biệt", Amat tiết lộ báo chí Tây Ban Nha về lựa chọn của mình.\nJordi Amat chưa từng thi đấu ở Indonesia. Tuy vậy, bà ngoại của anh đến từ đây.\n"Bà phải ra đi vì chiến tranh khi mới 10 tuổi, nhưng năm nào cũng về thăm gia đình. Tôi theo bà và gia đình về quê rất nhiều, rồi nên duyên với Indonesia", Amat tâm sự.\nHơn 10 năm trước, Amat là một trong những tài năng trẻ hàng đầu của Tây Ban Nha khi ra mắt chuyên nghiệp trong màu áo Espanyol, từng dự các trận derby với Barcelona.\nỞ La Liga, anh từng tự tin đối đầu với những siêu sao Lionel Messi hay Cristiano Ronaldo.',
}

const comments: PostCommentProps[] = [
	{
		comment: {
			username: 'abc',
			logo: '',
			comment: 'hmm',
			likes: 1,
		},
	},
	{
		comment: {
			username: 'abc',
			logo: '',
			comment: 'hmm',
			likes: 1,
		},
	},
]

export default function PostPage() {
	const user: UserType = {
		id: '1',
	}
	const [comment, setComment] = useState<string>('')

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
	}
	return (
		<div className={s.container}>
			<div className={s.content}>
				<h1>{data.title}</h1>
				<h3>{data.description}</h3>
				<div>
					{data.content.split('\n').map((e, index) => {
						return <p key={index}>{e}</p>
					})}
				</div>
			</div>
			<div className={s.line}></div>
			<div className={s.comments}>
				<p>Bình luận</p>
				{user ? (
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
					</div>
				) : null}
				<ul>
					{comments.map((e, index) => {
						return (
							<li key={index}>
								<PostComment comment={e.comment} />
							</li>
						)
					})}
				</ul>
			</div>
		</div>
	)
}
