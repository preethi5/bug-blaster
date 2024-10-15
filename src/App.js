import "./App.css";
import "./styles.css";
import TicketForm from "./components/TicketForm";
import { useReducer } from "react";
import ticketReducer from "./reducers/ticketReducer";
import TicketList from "./components/TicketList";
import { sortTicket } from "./utils/sortingUtil";

function App() {
  const initialState = {
    tickets: [],
    editTicket: null,
    sortPref: "High to Low",
  };

  // declare/register reducer
  const [state, dispatch] = useReducer(ticketReducer, initialState);
  const sortedTickets = sortTicket(state.tickets, state.sortPref);

  return (
    <div className="App">
      <div className="container">
        <h1>Bug Blaster</h1>
        <TicketForm
          dispatch={dispatch}
          editTicket={state.editTicket}
        ></TicketForm>
        {/* if and then --> && this is not Logical AND */}
        {state.tickets.length > 0 && (
          <div className="results">
            <h2>All Tickets</h2>

            <select
              value={state.sortPref}
              onChange={(e) =>
                dispatch({ type: "SET_SORT", payload: e.target.value })
              }
            >
              <option value="High to Low">High to Low</option>
              <option value="Low to High">Low to High</option>
            </select>
            <TicketList
              tickets={sortedTickets}
              dispatch={dispatch}
            ></TicketList>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
