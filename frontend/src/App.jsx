import { Outlet } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const App = () => {

  return (
    <>
      <ToastContainer />
      <Container className='mw-100 py-0 px-0' id="main" style={{position:'fixed', minHeight:'100vh', height:'100%', overflow:'auto', display:'block', background:'rgb(0 114 255 / 7%)', width:'100%', margin:0}}>
        <Outlet />
      </Container>
    </>
  );
};

export default App;