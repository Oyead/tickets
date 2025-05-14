import { Routes, Route } from 'react-router-dom'
import TicketSuccess from './components/TicketSuccess'
import FormMain from './components/FormMain'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<FormMain />} />
      <Route path="/ticket" element={<TicketSuccess />} />
    </Routes>
  )
}