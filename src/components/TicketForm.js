import React, { useState, useEffect } from "react";

export default function TicketForm({ dispatch, editTicket }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [priority, setPriority] = useState("1"); //default val is low

  // set existing data to edit a ticket
  useEffect(() => {
    if (editTicket) {
      setTitle(editTicket.title);
      setDesc(editTicket.desc);
      setPriority(editTicket.priority);
    } else {
      clearForm();
    }
  }, [editTicket]);

  const priorityLabels = {
    1: "Low",
    2: "Medium",
    3: "High",
  };

  const clearForm = () => {
    setTitle("");
    setDesc("");
    setPriority("1");
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // to avoid default reload after submit
    // set object to capture form data
    const ticketData = {
      // if edit yes, take edit id else new
      id: editTicket ? editTicket.id : new Date().toISOString(),
      title,
      desc,
      priority,
    };

    dispatch({
      type: editTicket ? "UPDATE_TICKET" : "ADD_TICKET",
      payload: ticketData,
    });

    console.log(ticketData);
    clearForm();
  };

  return (
    <form className="ticket-form" onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          className="form-input"
          onChange={(e) => setTitle(e.target.value)}
        ></input>
      </div>

      <div>
        <label>Description</label>
        <textarea
          type="text"
          value={desc}
          className="form-input"
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
      </div>

      <fieldset className="priority-fieldset">
        <legend>Priority</legend>
        {Object.entries(priorityLabels).map(([value, label]) => (
          <label kay={value} className="priority-label">
            <input
              type="radio"
              value={value}
              checked={priority === value}
              className="priority-input"
              onChange={(e) => setPriority(e.target.value)}
            ></input>
            {label}
          </label>
        ))}
      </fieldset>
      <button type="submit" className="button">
        Submit
      </button>
    </form>
  );
}
