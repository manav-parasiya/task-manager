import { Outlet } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

// Componets import
import Header from './components/Header'
import Footer from './components/Footer'

function Layout() {
  return (
    <>
      <Header />
      <Outlet />        {/* the matched page renders here */}
      <ToastContainer />
      <Footer />
    </>
  );
}


export default Layout;