import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateDancer from './pages/CreateDancer';
import DeleteDancer from './pages/DeleteDancer';
import EditDancer from './pages/EditDancer';
import DancersHome from './pages/DancersHome';
import ShowDancer from './pages/ShowDancer';
import DanceEventsHome from './pages/DanceEventsHome';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dancers" element={<DancersHome />} />
      <Route path="/dancers/create" element={<CreateDancer />} />
      <Route path="/dancers/delete/:id" element={<DeleteDancer />} />
      <Route path="/dancers/edit/:id" element={<EditDancer />} />
      <Route path="/dancers/details/:id" element={<ShowDancer />} />
      <Route path="/dance-events" element={<DanceEventsHome />} />
    </Routes>
  );
};

export default App;
