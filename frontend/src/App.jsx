import { Routes, Route } from 'react-router-dom';
import CreateDancer from './pages/CreateDancer';
import DeleteDancer from './pages/DeleteDancer';
import EditDancer from './pages/EditDancer';
import Home from './pages/Home';
import ShowDancer from './pages/ShowDancer';
import ShowDanceEvent from './pages/ShowDanceEvent';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dancers/create" element={<CreateDancer />} />
      <Route path="/dancers/delete/:id" element={<DeleteDancer />} />
      <Route path="/dancers/edit/:id" element={<EditDancer />} />
      <Route path="/dancers/details/:id" element={<ShowDancer />} />
      <Route path="/dance-events" element={<ShowDanceEvent />} />
    </Routes>
  );
};

export default App;
