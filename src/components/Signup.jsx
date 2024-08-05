import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // 追加
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5002/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }), // email を含む
      });
      if (res.status === 409) {
        const resData = await res.text();
        return setError(resData);
      } else if (res.status === 500) {
        const resData = await res.text();
        return setError(resData);
      } else if (!res.ok) {
        throw new Error("アカウント作成に失敗しました");
      }
      const resData = await res.text();
      setMessage(resData);
    } catch (err) {
      console.error("作成エラー:", err);
      setError("エラーが発生しました");
    }
  };

  return (
    <div className="signup-container">
      <h2>サインアップ</h2>
      {message && <div className="message">{message}</div>}
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="ユーザー名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email" // email フィールド
          placeholder="メールアドレス"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="パスワード"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
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
