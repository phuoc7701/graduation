import React from "react";
import "./InviteCard.css";

function InviteCard({ inviter, guest, avatar, time, location }) {
  return (
    <div className="invite-card-container">
      <div className="card invite-card shadow-lg">
        <div className="card-body text-center">
          <img
            src={avatar}
            alt="Avatar"
            className="rounded-circle mb-3 avatar-img"
            width={100}
            height={100}
          />
          <h2 className="mb-1 text-success">Thiệp Mời Tốt Nghiệp</h2>
          <h4 className="mb-2">Kính gửi: <span className="text-primary">{guest}</span></h4>
          <p className="mb-2">
            Trân trọng kính mời bạn tới dự lễ tốt nghiệp của <b>{inviter}</b>.
          </p>
          <p>
            <i className="bi bi-calendar-event"></i> <strong>Thời gian:</strong> {time}
          </p>
          <p>
            <i className="bi bi-geo-alt"></i> <strong>Địa điểm:</strong> {location}
          </p>
          <div className="mt-3">
            <span className="badge bg-warning text-dark px-3 py-2">
              Mong bạn đến dự chung vui!
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InviteCard;