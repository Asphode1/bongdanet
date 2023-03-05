import s from '../../styles/post.module.css'
import { PostProps } from '../../pages/NewsPage'

export interface Props {
  item?: PostProps
}

export default function Post({ item }: Props) {
  if (item === undefined) return <div>loading...</div>
  return (
    <div className={s.container}>
      <div>
        <img src={`../../../public/img/${(item.id + 1) % 10}.jpg`} alt={'alt'} />
      </div>
      <div>
        <h1>{item.title}</h1>
        <p>{item.content}</p>
      </div>
    </div>
  )
}
