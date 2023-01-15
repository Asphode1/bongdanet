import { Link } from 'react-router-dom'
import data from '../assets/test'
import Post from '../components/newspage/Post'
import s from '../styles/newspage.module.css'

export default function NewsPage() {
	return (
		<div className={s.container}>
			<ul>
				{data.map((e, index) => {
					return (
						<li key={index}>
							<Link to={`/bai-viet/${index}`}>
								<Post item={e} />
							</Link>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
