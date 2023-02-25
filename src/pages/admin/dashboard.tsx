import s from '../../styles/admin/main.module.css'

const dat = [
	{
		id: 1,
		name: 'abc',
		modified_at: '01-02-2023',
	},
]

export default function Dashboard() {
	return (
		<div className={s.container}>
			<div>
				<h1>Quản lý abc</h1>
				<div className={s.table}>
					<table>
						<tr>
							<th>Id</th>
							<th>Tên</th>
							<th>Modified at</th>
							<th>Tuỳ chọn</th>
						</tr>
						{dat.map((e, index) => (
							<tr>
								<td>{e.id}</td>
								<td>{e.name}</td>
								<td>{e.modified_at}</td>
								<td>
									<button>Chỉnh sửa</button>
									<button>Xoá</button>
								</td>
							</tr>
						))}
					</table>
				</div>
			</div>
		</div>
	)
}
