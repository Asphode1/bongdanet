import s from '../../styles/admin/main.module.css'

const dat = [
	{
		id: 1,
		name: 'abc',
		modified_at: '01-02-2023',
	},
]

export default function AdminClub() {
	return (
		<div className={s.container}>
			<div>
				<h1>Quản lý CLB</h1>
				<div className={s.table}>
					<table>
						<thead>
							<tr>
								<th>Id</th>
								<th>Tiêu đề</th>
								<th>Nội dung</th>
								<th>Tuỳ chọn</th>
							</tr>
						</thead>
						<tbody>
							{dat.map((e, index) => (
								<tr key={index}>
									<td>{e.id}</td>
									<td>{e.name}</td>
									<td>{e.modified_at}</td>
									<td>
										<button>Chi tiết</button>
										<button>Chỉnh sửa</button>
										<button>Xoá</button>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	)
}
