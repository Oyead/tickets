import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router basename="/tickets">
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* your other routes */}
      </Routes>
    </Router>
  );
}
export default App;