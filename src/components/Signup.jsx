import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
const BASE_URL = "http://localhost:5002";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const resData = await res.json();

      if (res.status === 409) {
        setMessage(null);
        return setError(resData.message);
      } else if (res.status === 500) {
        setMessage(null);
        return setError(resData.message);
      } else if (!res.ok) {
        throw new Error("アカウント作成に失敗しました");
      }

      document.cookie = `userId=${resData.data.id}`;

      setMessage(resData.message);
      setError(null);
      navigate("/todolist");
    } catch (err) {
      console.error("作成エラー:", err);
      setMessage(null);
      setError("エラーが発生しました");
    }
  }

  return (
    <div className="signup-container">
      <h2>サインアップ</h2>
      {message && <div className="message">{message}</div>}
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSignup}>
        <div className="input-group">
          <input
            type="email"
            placeholder="メールアドレス"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <IoMail className="icon" />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="パスワード"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>
        <div className="button-container">
          <button type="submit">サインアップ</button>
        </div>
      </form>
      <div className="button-container">
        <button onClick={() => navigate("/")}>ログイン画面へ</button>
      </div>
    </div>
  );
}

export default Signup;
