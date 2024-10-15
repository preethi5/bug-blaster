export default function ticketReducer(state, action) {
  switch (action.type) {
    case "ADD_TICKET":
      // copy the state using spread opertaor since state is immutable
      // order:  1.to be copied 2., 3.what we wanna change
      // return new copy of the state
      return { ...state, tickets: [...state.tickets, action.payload] };

    case "UPDATE_TICKET":
      return {
        ...state,
        tickets: state.tickets.map((tic) =>
          tic.id === action.payload.id ? action.payload : tic
        ),
      };

    case "DELETE_TICKET":
      return {
        ...state,
        tickets: state.tickets.filter((tic) => tic.id !== action.payload.id),
      };

    // Like isEdit. which ticket is being edited
    case "SET_EDIT":
      return {
        ...state,
        editTicket: action.payload,
      };

    case "CLEAR_EDIT":
      return {
        ...state,
        editTicket: null,
      };
    default:
      return state;
  }
}
