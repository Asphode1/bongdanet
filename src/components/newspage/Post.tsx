import s from '../../styles/post.module.css'

export interface PostItemProps {
	imgsrc: string
	header: string
	content: string
}

export interface PostProps {
	item: PostItemProps
}

export default function Post({ item }: PostProps) {
	return (
		<div className={s.container}>
			<div className={s.img}>
				<img src={item.imgsrc} alt={'alt'} />
			</div>
			<div className={s.content}>
				<h1>{item.header}</h1>
				<p>{item.content}</p>
			</div>
		</div>
	)
}
