import './App.css';
import { Route, Routes } from 'react-router';
import HomePage from './pages/common/Home.page';
import CardListPage from './pages/playroom/sortilege/CardList.page';
import RulesPage from './pages/playroom/sortilege/Rules.page';
import RegisterPage from './pages/auth/Register.page';
import LoginPage from './pages/auth/Login.page';
import ProfilePage from './pages/common/Profile.page';
import { Toaster } from 'sonner';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import SortilegePage from "./pages/playroom/sortilege/Sortilege.page";
import SortilegeLobbyPage from "./pages/playroom/sortilege/SortilegeLobby.page";
import SortilegeGamePage from "./pages/playroom/sortilege/SortilegeGame.page";

function App() {

  return (
    <>
      <Header />
      <main className='main-content'>
        <Toaster richColors closeButton />
        <Routes>
          <Route index element={<HomePage />} />
          <Route >
            <Route path='playroom' element={<SortilegePage />} >
              <Route index element={<SortilegeLobbyPage />} />
              <Route path=":roomId" element={<SortilegeGamePage />} />
            </Route>
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
