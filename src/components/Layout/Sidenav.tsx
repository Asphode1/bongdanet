import { Link } from 'react-router-dom'
import s from '../../styles/sidenav.module.css'
import img from '../../assets/user.png'

const fc = ['Barcelona', 'Real Madrid']
const rc = ['Manchester United', 'Hà Nội FC']
const fp = ['Lionel Messi', 'Christiano Ronaldo']
const rp = ['Eden Hazard']

export default function Sidenav() {
	return (
		<>
			<div className={s.container}>
				<h1>Câu lạc bộ</h1>
				<section className={s.section}>
					<h3>Đang theo dõi</h3>
					<ul>
						{fc.map((e, index) => {
							return (
								<li key={index}>
									<Link to={`/cau-lac-bo/${index}?tab=chung`}>
										<img src={img} alt="logo" />
										<span>{e}</span>
									</Link>
								</li>
							)
						})}
					</ul>
					<h3>Gợi ý</h3>
					<ul>
						{rc.map((e, index) => {
							return (
								<li key={index}>
									<Link to={`/cau-lac-bo/${index}?tab=chung`}>
										<img src={img} alt="logo" />
										<span>{e}</span>
									</Link>
								</li>
							)
						})}
					</ul>
				</section>
			</div>
			<div className={s.line}></div>
			<div className={s.container}>
				<h1>Cầu thủ</h1>
				<section className={s.section}>
					<h3>Đang theo dõi</h3>
					<ul>
						{fp.map((e, index) => {
							return (
								<li key={index}>
									<Link to={`/cau-thu/${index}?tab=chung`}>
										<img src={img} alt="logo" />
										<span>{e}</span>
									</Link>
								</li>
							)
						})}
					</ul>
					<h3>Gợi ý</h3>
					<ul>
						{rp.map((e, index) => {
							return (
								<li key={index}>
									<Link to={`/cau-thu/${index}?tab=chung`}>
										<img src={img} alt="logo" />
										<span>{e}</span>
									</Link>
								</li>
							)
						})}
					</ul>
				</section>
			</div>
		</>
	)
}
