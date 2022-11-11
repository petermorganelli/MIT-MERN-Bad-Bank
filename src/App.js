
import { Outlet, } from "react-router-dom";
import MyNavbar from './components/MyNavbar';
import { BankProvider } from './utils/BankContext';

function App() {
  return (
    <div>
        <BankProvider>
          <MyNavbar />
          <Outlet />
        </BankProvider>
    </div>
   
  );
}

export default App;
