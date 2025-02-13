
import './App.css';
import { Header } from './component/Header';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import { Home } from './pages/Home';
import { Footer } from './component/Footer';
import { Cart } from './pages/Cart';
import { ProductDetails } from './pages/ProductDetails';
import { Login } from './pages/Login';
import { Singup } from './pages/Singup';
import { TraceOrder } from './pages/TraceOrder';
import { WishList } from './component/WishList';
import EditableProfile from './pages/EditableProfile';

import { MyOrder } from './pages/MyOrder';
import { Categories } from './pages/Categories';
import { Search } from './pages/Search';
import { Filter } from './pages/Filter';
import PaymentSuccess from './pages/PaymentSuccess';
import PageNotFound from './pages/PageNotFound';
import { ForgotPassword } from './pages/ForgotPassword';


function App() {
  return (
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path='/' element={<Home/>}></Route>
    <Route path='/cart' element={<Cart/>}></Route>
    <Route path='/productDetails/:productId' element={<ProductDetails/>}></Route>
    <Route path='/login' element={<Login/>}></Route>
    <Route path='/signup' element={<Singup/>}></Route>
    <Route path='/trace-order' element={<TraceOrder/>}></Route>
    <Route path='/wishlist' element={<WishList/>}></Route>
    <Route path='/profile' element={<EditableProfile/>}></Route>
    <Route path='/myorder' element={<MyOrder/>}></Route>
    <Route path='/orderdetails' element={<TraceOrder/>}></Route>
    <Route path='/filter' element={<Categories/>}></Route>
    <Route path="/paymentsuccess" element={<PaymentSuccess/>} />
    <Route path='/categoryfilter/:filter' element={<Filter/>}></Route>
    <Route path='/search/:query' element={<Search/>}></Route>
    <Route path='/notfound' element={<PageNotFound/>}></Route>
    <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
       </Routes>
   <Footer/>
   </BrowserRouter>
  );
}

export default App;
