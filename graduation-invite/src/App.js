import { useState, useEffect, useRef } from "react";
import confetti from "canvas-confetti";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

export default function App() {
  const [guestName, setGuestName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [envelopeOpened, setEnvelopeOpened] = useState(false);
  const [showInvitation, setShowInvitation] = useState(false);
  const audioRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (guestName.trim()) {
      setSubmitted(true);
    } else {
      setError("⚠️ Vui lòng nhập tên trước khi vào thiệp mời.");
    }
  };

  useEffect(() => {
    if (envelopeOpened) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [envelopeOpened]);

  const theme = guestName.includes("Lan")
    ? { bgColor: "#e5d4ed" }
    : guestName.includes("Hoàng")
      ? { bgColor: "#fff8dc" }
      : { bgColor: "#001f3f" };

  // Giao diện nhập tên
  if (!submitted) {
    return (
      <div className="intro-form d-flex justify-content-center align-items-center">
        <form
          onSubmit={handleSubmit}
          className="p-4 rounded bg-light shadow w-100"
          style={{ maxWidth: "400px" }}
        >
          <h3 className="mb-3 text-center">
            Chào mừng bạn đến với Thiệp Mời Tốt Nghiệp 🎓
          </h3>
          <div className="mb-3">
            <input
              type="text"
              className={`form-control ${error ? "is-invalid" : ""}`}
              placeholder="Nhập tên của bạn..."
              value={guestName}
              onChange={(e) => {
                setGuestName(e.target.value);
                setError("");
              }}
            />
            {error && <div className="invalid-feedback">{error}</div>}
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Vào xem thiệp 🎉
          </button>
        </form>
      </div>
    );
  }

  // Giao diện phong thư
  if (submitted && !showInvitation) {
    return (
      <div className="envelope-container">
        <div
          className={`envelope ${envelopeOpened ? "opened" : ""}`}
          onClick={() => {
            const audio = audioRef.current;
            if (audio) {
              audio.muted = false;
              audio.play().catch((err) =>
                console.warn("Autoplay bị chặn:", err)
              );
            }
            if (!envelopeOpened) {
              setEnvelopeOpened(true);



              // ✅ Chờ vài giây rồi chuyển sang thiệp
              setTimeout(() => {
                setShowInvitation(true);
              }, 2500);
            }
          }}
        >
          <div className="flap" />
          <div className="body" />
          <div className="letter">
            🎓 <strong>Thiệp Mời Tốt Nghiệp</strong> <br />
            Xin mời bạn kéo lá thư lên!
          </div>
          {/* Nhúng thẻ audio ở đây luôn */}
        </div>
      </div>
    );
  }

  // Danh sách các ngôi sao rơi
  const fallingStars = Array.from({ length: 30 }).map((_, i) => ({
    left: Math.random() * 100 + "%",
    delay: Math.random() * 10 + "s",
    duration: 5 + Math.random() * 5 + "s",
  }));

  // Giao diện thiệp mời chính
  return (

    <div
      className="invitation-page"
      style={{ backgroundColor: theme.bgColor }}
    >
      <div className="stars">
        {Array.from({ length: 60 }).map((_, index) => (
          <div
            key={index}
            className="star"
            style={{
              left: Math.random() * 100 + "%",
              animationDelay: Math.random() * 10 + "s",
              animationDuration: 5 + Math.random() * 5 + "s",
            }}
          />
        ))}
      </div>

      <div className="container text-center text-white py-4">
        <img src="/img/avatar.jpg" alt="Avatar" className="avatar mb-3" />
        <h1 className="mb-3">🎓 Thiệp Mời Tốt Nghiệp 🎉</h1>
        <p className="lead">Trân trọng kính mời</p>
        <h2 className="guest-name">{guestName}</h2>
        <p className="lead">đến tham dự buổi lễ tốt nghiệp của chúng tôi.</p>
        <p className="mt-4">
          <strong>⏰ Thời gian:</strong> 10:00 - 11:00, ngày 05/07/2025
        </p>
        <p>
          <strong>📍 Địa điểm:</strong> 1 Điện Biên Phủ, Thành Phố Huế
        </p>
        <p className="mt-4">Người mời: Nguyễn Văn Phước</p>
        <p className="mt-2 fst-italic">🥰 Rất mong bạn sẽ đến chung vui cùng Phước trong ngày đặc biệt này nhé! 🥳</p>
      </div>
      <audio ref={audioRef} src="/audio/music.mp3" loop autoPlay />

    </div>
  );
}
