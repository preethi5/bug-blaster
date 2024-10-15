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
        editTicket: null,
      };

    case "DELETE_TICKET":
      // if we r trying to delete and edit the same ticket
      if (state.editTicket && state.editTicket.id === action.payload.id) {
        //alert("Editing ticket can't be deleted")
        return {
          ...state,
          tickets: state.tickets.filter((tic) => tic.id !== action.payload.id),
          editTicket: null,
        };
      } else {
        return {
          ...state,
          tickets: state.tickets.filter((tic) => tic.id !== action.payload.id),
        };
      }

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

    case "SET_SORT":
      return {
        ...state,
        sortPref: action.payload,
      };
    default:
      return state;
  }
}
