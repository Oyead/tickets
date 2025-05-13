import { Routes, Route } from 'react-router-dom'
import FormMain from './components/FormMain';
import TicketSuccess from './components/TicketSuccess';

function App() {
  return (
    <div className="p-4">
      <Routes>
        <Route path="/" element={<FormMain/>} />
        <Route path="/ticket" element={<TicketSuccess/>} />

      </Routes>
    </div>
  )
}

export default App
