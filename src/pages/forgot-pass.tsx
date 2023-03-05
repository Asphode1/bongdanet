import { FormEvent, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import s from '../styles/login.module.css'
import SportsSoccerIcon from '@mui/icons-material/SportsSoccer'
import { useNavigate } from 'react-router-dom'

export default function ForgotPage() {
  const [submit, setSubmit] = useState<boolean>(false)
  const [username, setUsername] = useState<string>('')
  const [pass, setPass] = useState<string>('')
  const [newPass, setNewPass] = useState<string>('')
  const navigate = useNavigate()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className={s.container}>
      <div className={s.loginContainer}>
        <SportsSoccerIcon className={s.spin} onClick={() => navigate('/')} />
        <h1>Quên mật khẩu</h1>
        <div className={s.line}></div>
        <form onSubmit={handleSubmit}>
          <div className={s.optField}>
            <label htmlFor="usr"></label>
            <div className={s.otp}>
              <input required name="usr" type="text" className={s.input} placeholder={'SĐT'} />
              <button type="button">Gửi OTP</button>
            </div>
          </div>
          <div>
            <label htmlFor="">
              <input required name="otp" type="password" className={s.input} placeholder={'Mã OTP'} />
            </label>
          </div>

          <div>
            <label htmlFor="">
              <input required name="pss" type="password" className={s.input} placeholder={'Mật khẩu'} />
            </label>
          </div>
          <div>
            <label htmlFor="">
              <input required name="newpss" type="password" className={s.input} placeholder={'Nhập lại Mật khẩu'} />
            </label>
          </div>

          <div className={s.loginBtn}>
            <button type="submit">Lưu thay đổi</button>
          </div>
        </form>
        <div className={s.line}></div>
        <div className={s.signup}>
          <Link to="/login">Đăng nhập</Link>
        </div>
      </div>
    </div>
  )
}
