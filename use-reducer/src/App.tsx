import "./App.css";

import { useReducer, ChangeEvent, FormEvent } from "react";

/* ------------------ State ------------------ */

type Status = "idle" | "submitting" | "success" | "error";

type FormState = {
  name: string;
  email: string;
  status: Status;
  error: string | null;
};

const initialState: FormState = {
  name: "",
  email: "",
  status: "idle",
  error: null,
};

/* ------------------ Actions ------------------ */

type FormAction =
  | {
      type: "FIELD_CHANGE";
      field: "name" | "email";
      value: string;
    }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_ERROR"; error: string }
  | { type: "RESET" };

/* ------------------ Reducer ------------------ */

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "FIELD_CHANGE":
      return {
        ...state,
        [action.field]: action.value,
      };

    case "SUBMIT_START":
      return {
        ...state,
        status: "submitting",
        error: null,
      };

    case "SUBMIT_SUCCESS":
      return {
        ...state,
        status: "success",
      };

    case "SUBMIT_ERROR":
      return {
        ...state,
        status: "error",
        error: action.error,
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

/* ------------------ Component ------------------ */

export default function App() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  function handleChange(field: "name" | "email") {
    return (e: ChangeEvent<HTMLInputElement>) =>
      dispatch({
        type: "FIELD_CHANGE",
        field,
        value: e.target.value,
      });
  }

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    dispatch({ type: "SUBMIT_START" });

    fakeApiCall()
      .then(() => {
        dispatch({ type: "SUBMIT_SUCCESS" });
      })
      .catch((err: Error) => {
        dispatch({ type: "SUBMIT_ERROR", error: err.message });
      });
  }

  return (
    <form onSubmit={submit} className="form">
      <h2>Signup</h2>

      <input
        className="input"
        placeholder="Name"
        value={state.name}
        onChange={handleChange("name")}
        disabled={state.status === "submitting"}
      />

      <br />
      <br />

      <input
        className="input"
        placeholder="Email"
        value={state.email}
        onChange={handleChange("email")}
        disabled={state.status === "submitting"}
      />

      <button className="button" disabled={state.status === "submitting"}>
        {state.status === "submitting" ? "Submitting…" : "Submit"}
      </button>

      {state.status === "error" && (
        <p className="message error">{state.error}</p>
      )}

      {state.status === "success" && (
        <p className="message success">✅ Submitted successfully</p>
      )}
    </form>
  );
}

/* ------------------ Fake API ------------------ */

function fakeApiCall(): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5
        ? resolve()
        : reject(new Error("Something went wrong"));
    }, 1000);
  });
}
