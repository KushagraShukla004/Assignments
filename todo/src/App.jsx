// import { Provider } from "react-redux";
import { Provider } from "react-redux";
import "./App.css";
import Todo from "./components/Todo";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <div className="container max-w-3xl mx-auto mt-20 px-8">
        <Todo />
      </div>
    </Provider>
  );
};

export default App;
