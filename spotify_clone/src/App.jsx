import "./App.css";
import Sidebar from "./components/Sidebar";
// import Card from "./components/Card.jsx";

const App = () => {
  return (
    <div className="h-screen overflow-hidden bg-black">
      <main>
        <Sidebar />
      </main>
      <div>{/* Player */}</div>
    </div>
  );
};

export default App;
