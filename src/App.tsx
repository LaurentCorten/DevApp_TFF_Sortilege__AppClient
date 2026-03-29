import './App.css';
import { Route, Routes } from 'react-router';
import HomePage from './pages/common/Home.page';
import ArenaPage from './pages/playroom/sortilege/Arena.page';
import CardListPage from './pages/playroom/sortilege/CardList.page';
import RulesPage from './pages/playroom/sortilege/Rules.page';
import RegisterPage from './pages/auth/Register.page';
import LoginPage from './pages/auth/Login.page';
import ProfilePage from './pages/common/Profile.page';
import { Toaster } from 'sonner';
import Header from './components/complex/header/Header';
import Footer from './components/complex/footer/Footer';

function App() {

  return (
    <>
      <Header />
      <main className='main-content'>
        <Toaster richColors closeButton />
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='playroom'>
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
      </main>
      <Footer />
    </>
  );
}

export default App;
