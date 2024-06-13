import { createStore } from "redux";
import todoReducer from "./reducer";

//This below code function is knows as persistant Storage using redux
//plus point is we dont need to use useEffect hook to store the values
//which can improve performance if used by multiple users parallely

// Function to load state from localStorage
const loadState = () => {
  try {
    const serializedState = localStorage.getItem("todos");
    if (serializedState === null) {
      //to initialize since it will always be undefined and hence will show error if not handled like this
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

// Function to save state to localStorage
const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("todos", serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};

const persistedState = loadState();

const store = createStore(todoReducer, persistedState);

// Save state to localStorage whenever the state changes
store.subscribe(() => {
  saveState(store.getState());
});

export default store;
