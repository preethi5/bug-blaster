import { type } from "@testing-library/user-event/dist/type";
import React from "react";

export default function TicketItem({ ticket, dispatch }) {
  const { id, title, desc, priority } = ticket;
  // to apply colors
  const priorityClass = {
    1: "priority-low",
    2: "priority-medium",
    3: "priority-high",
  };

  return (
    <div className="ticket-item">
      <div className={`priority-dot ${priorityClass[ticket.priority]}`}></div>
      <h3>{title}</h3>
      <p>{desc}</p>

      <button
        className="button"
        onClick={() =>
          dispatch({
            type: "DELETE_TICKET",
            payload: { id },
          })
        }
      >
        Delete
      </button>

      <button
        className="button"
        onClick={() =>
          dispatch({
            type: "SET_EDIT",
            payload: ticket,
          })
        }
      >
        Edit
      </button>
    </div>
  );
}
