import './App.css';
import { Route, Routes } from 'react-router';
import HomePage from './pages/common/Home.page';
import ArenaPage from './pages/game/Arena.page';
import CardListPage from './pages/game/CardList.page';
import RulesPage from './pages/game/Rules.page';
import RegisterPage from './pages/auth/Register.page';
import LoginPage from './pages/auth/Login.page';
import ProfilePage from './pages/common/Profile.page';
import { Toaster } from 'sonner';

function App() {

  return (
    <>
      <Toaster richColors closeButton />
      <Routes>
        <Route index element={<HomePage />} />
        <Route path='game'>
          <Route index element={<ArenaPage />} />
          <Route path='cardList' element={<CardListPage />} />
          <Route path='rules' element={<RulesPage />} />
        </Route>
        <Route path='auth'>
          <Route index element={<LoginPage />} />
          <Route path='register' element={<RegisterPage />} />
        </Route>
        <Route path='profile' element={<ProfilePage />} />
      </Routes>
    </>
  );
}

export default App;
