import { BrowserRouter, Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import Auth from "./pages/Auth"
import Home from "./pages/Home"
import SharedBrain from "./pages/SharedBrain"


function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/auth" element={<Auth/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/shared/:hash" element={<SharedBrain/>}/>



    </Routes>
    </BrowserRouter>
  )
}

export default App
