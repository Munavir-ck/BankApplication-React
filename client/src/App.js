
import './App.css';
import { BrowserRouter, Routes ,Route} from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Home from './Components/Home';
import Deposit from './Components/Deposit';
import Withdraw from './Components/Withdraw';
import Transfer from './Components/Transfer';
import Transactions from './Components/Transactions';

function App() {
  return (
    <div className="App">
  <BrowserRouter>
   <Routes>
   <Route path="/" element={ < Login />}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path="/home" element={ < Home/>}/>
    <Route path="/deposit" element={ < Deposit/>}/>
    <Route path="/withdraw" element={ < Withdraw/>}/>
    <Route path="/transfer" element={ < Transfer/>}/>
    <Route path='/transactions'element={< Transactions />}/>
   </Routes>


  </BrowserRouter>
    </div>
  );
}

export default App;
