import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TicketSuccess from './components/TicketSuccess';
import FormMain from './components/FormMain';
function App() {
  return (
    <Router basename="/tickets">
      <Routes>
        <Route path="/" element={<FormMain/>} />
        <Route path='ticket' element={<TicketSuccess/>} />
      </Routes>
    </Router>
  );
}
export default App;