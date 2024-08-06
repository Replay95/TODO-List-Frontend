import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaLock, FaUser } from "react-icons/fa";
import { IoMail } from "react-icons/io5";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const BASE_URL = "http://localhost:5002";

  async function handleSignup(e) {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      if (res.status === 409) {
        const resData = await res.text();
        setMessage(null);
        return setError(resData);
      } else if (res.status === 500) {
        const resData = await res.text();
        setMessage(null);
        return setError(resData);
      } else if (!res.ok) {
        throw new Error("アカウント作成に失敗しました");
      }
      const resData = await res.text();
      setMessage(resData);
      setError(null);
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
            type="text"
            placeholder="ユーザー名"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <FaUser className="icon" />
        </div>
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
