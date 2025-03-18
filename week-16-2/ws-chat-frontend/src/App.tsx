import { ConnectToWS } from './ConnectToWs';
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/*" element={<ConnectToWS />} />
    </Routes>
  </BrowserRouter>
}

export default App
