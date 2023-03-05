import PostComment, { PostCommentProps } from '../components/postPage/Comment'
import s from '../styles/postPage.module.css'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { FormEvent, useState } from 'react'
import ReactTextareaAutosize from 'react-textarea-autosize'
import useUser from '../hooks/useUser'
import axios from 'axios'
import useSWR from 'swr'
import { addComment, getComment, getLikeUrl, likeUrl } from '../utils/Urls'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt'

const post = {
  title: 'Indonesia đấu Việt Nam ở AFF Cup 2022: Bức tường Jordi Amat',
  description:
    'Indonesia chuẩn bị đấu Việt Nam ở lượt đi bán kết AFF Cup 2022 với điểm tựa Jordi Amat, trung vệ nổi tiếng một thời của bóng đá Tây Ban Nha.',
  content:
    'Inaki Williams khiến mọi người ngạc nhiên khi quyết định lựa chọn đội tuyển Ghana vì không có cơ hội khoác áo Tây Ban Nha, và vừa tham dự World Cup 2022.\nBóng đá Tây Ban Nha có rất nhiều tài năng trẻ nhưng không có cơ hội thi đấu quốc tế, nên lựa chọn đội tuyển khác. Không ồn ào như Inaki, ngôi sao đang thi đấu cho Bilbao, nhưng Jordi Amat cũng rất được chú ý.\nTháng 9/2022, Jordi Amat, người từng trải qua đội U21 và các hạng mục trẻ của "La Roja", được nhận quốc tịch Indonesia và quyết định thi đấu cho đội tuyển xứ vạn đảo.\n"Đại diện cho một quốc gia có 275 triệu dân sẽ rất đặc biệt", Amat tiết lộ báo chí Tây Ban Nha về lựa chọn của mình.\nJordi Amat chưa từng thi đấu ở Indonesia. Tuy vậy, bà ngoại của anh đến từ đây.\n"Bà phải ra đi vì chiến tranh khi mới 10 tuổi, nhưng năm nào cũng về thăm gia đình. Tôi theo bà và gia đình về quê rất nhiều, rồi nên duyên với Indonesia", Amat tâm sự.\nHơn 10 năm trước, Amat là một trong những tài năng trẻ hàng đầu của Tây Ban Nha khi ra mắt chuyên nghiệp trong màu áo Espanyol, từng dự các trận derby với Barcelona.\nỞ La Liga, anh từng tự tin đối đầu với những siêu sao Lionel Messi hay Cristiano Ronaldo.',
}

interface LikeFProps {
  url: string
  postId: number
}

interface LikeProps {
  count: number
  users: string[]
}

export default function PostPage() {
  const { pId } = useParams()
  const [comment, setComment] = useState<string>('')
  const { user } = useUser()
  const postCommentFetcher = (url: string) => axios.post(url, { postId: pId }).then((res) => res.data.data)

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
  return (
    <div className={s.container}>
      <div className={s.content}>
        <h1>{post.title}</h1>
        <h3>{post.description}</h3>
        <div>
          {post.content.split('\n').map((e, index) => {
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
