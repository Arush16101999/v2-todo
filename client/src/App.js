import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./containers/Home";
import AddTodo from "./containers/AddTodo";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        <Toaster position="bottom-right" reverseOrder={false} />
        <BrowserRouter>
          <Routes>
            <Route path="/" Component={Home} />
            <Route path="/addTodo" Component={AddTodo} />
            <Route path="/updateTodo/:id" Component={AddTodo} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
