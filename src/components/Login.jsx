import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
const BASE_URL = "http://localhost:5002";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(`${BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const resData = await response.json();

      if (response.ok) {
        document.cookie = `userId=${resData.id}`;
        navigate("/todolist");
      } else {
        setError(resData.message);
      }
    } catch (err) {
      console.error("エラー", err);
      setError("ログイン中にエラーが発生しました");
    }
  }

  return (
    <div className="login-container">
      <h2>ログイン</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <IoMail className="icon" />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FaLock className="icon" />
        </div>
        <div className="button-container">
          <button type="submit">ログイン</button>
        </div>
      </form>
      <div className="button-container">
        <button onClick={() => navigate("/signup")}>サインアップ画面へ</button>
      </div>
    </div>
  );
}

export default Login;
