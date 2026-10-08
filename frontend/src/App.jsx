import { Routes, Route, Link } from "react-router"
import Homepage from "./Pages/Homepage";
import ChatPage from "./Pages/ChatPage";


function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element ={<Homepage/>} />
        <Route path="/chats" element ={<ChatPage/>} />
      </Routes>
    </div>
  );
}

export default App
