import { useContext } from "react"
import MyButton from "../components/UI/button/MyButton"
import MyInput from "../components/UI/input/MyInput"
import { AuthContext } from "../context"

export default function Login() {
  const { isAuth, setIsAuth } = useContext(AuthContext)

  const login = (event) => {
    event.preventDefault()
    setIsAuth(true)
    localStorage.setItem("auth", "true")
  }

  return (
    <>
      <h1>Страница для входа</h1>
      <div style={{ margin: "15px 0" }}>
        <p>Данная страница добавлена для имитации входа.</p>
        <p>
          Для доступа к остальной части сайта нажмите кнопку{" "}
          <strong>Войти</strong>
        </p>
      </div>
      <form onSubmit={login}>
        <MyInput type="text" placeholder="Введите логин" />
        <MyInput type="password" placeholder="Введите пароль" />
        <MyButton>Войти</MyButton>
      </form>
    </>
  )
}
