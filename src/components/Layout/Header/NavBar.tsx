import { Link } from 'react-router-dom'

export default function NavBar() {
	return (
		<>
			<div>
				<Link to="/">
					<span>Trang chủ</span>
				</Link>
			</div>
			<div>
				<Link to="/lich-thi-dau">
					<span>Lịch thi đấu</span>
				</Link>
			</div>
			<div>
				<Link to="/ket-qua">
					<span>Kết quả</span>
				</Link>
			</div>
			<div>
				<Link to="/du-doan">
					<span>Dự Đoán</span>
				</Link>
			</div>
		</>
	)
}
