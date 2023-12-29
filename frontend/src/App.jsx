import React, { useEffect, useState } from 'react';
import './App.css';
import { Route,BrowserRouter as Switch,Routes, BrowserRouter } from 'react-router-dom';
import NavBar from './components/Navbar/NavBar';
import Home from './components/Home/Home';
import AboutUs from './components/AboutUs/AboutUs';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Patient from './components/Patient/Patient';
import Practitioner from './components/Practitioner/Practitioner';
import Shop from './components/Shop/Shop';
import Footer from './components/Footer/Footer';
import PatientCreateAppointment from './components/PatientCreateAppointment/PatientCreateAppointment';
import PatientAppointments from './components/PatientAppointments/PatientAppointments';
import PatientChat from './components/PatientChat/PatientChat';
import PatientReviews from './components/PatientReviews/PatientReviews';
import ProductPage from './components/ProductPage/ProductPage';
import PractitionerCreateAppointment from './components/PractitionerCreateAppointment/PractitionerCreateAppointment';
import PageNotFound from './components/PageNotFound/PageNotFound';
import PractitionerAppointments from './components/PractitionerAppointments/PractitionerAppointments';
import PractitionerChat from './components/PractitionerChat/PractitionerChat';
import PractitionerReviews from './components/PractitionerReviews/PractitionerReviews';
import Cart from './components/Cart/Cart';
import PatientCalendar from './components/PatientCalendar/PatientCalendar';
import PractitionerCalendar from './components/PractitionerCalendar/PractitionerCalendar';
import Admin from './components/Admin/Admin';
import AdminLogin from './components/AdminLogin/AdminLogin';
import AddPractitioner from './components/AddPractitioner/AddPractitioner';
import AddProduct from './components/AddProduct/AddProduct';
import AllProducts from './components/AllProducts/AllProducts';
import AllPractitioners from './components/AllPractitioners/AllPractitioners';
import PatientDetailsPopup from './components/PatientDetailsPopup/PatientDetailsPopup';
import ResetPassword from './components/ResetPassword/ResetPassword';
import EditPractitioner from './components/Admin/EditPractitioner';
import EditProduct from './components/Admin/EditProduct';
import AddPractitionerProfile from './components/AddPractitioner/AddPractitionerProfile';

function App() {
  const [userAdmin, setUserAdmin] = useState(true);
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('loggedIn'));
  const [userType, setUserType] = useState(localStorage.getItem('userType'));
  const [products, setProducts] = useState([]);
  const [userPatient, setUserPatient] = useState('');
  const [userPractitioner, setUserPractitioner] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [productQuantity, setProductQuantity] = useState({});
  const [cartWarning, setCartWarming] = useState(false);
  const [cartAddSuccess, setCartSuccess] = useState(false);
  const [sortProducts, setSortedProducts] = useState('');
  let [dosage, setDosage] = useState([]);
  const [sortAsc] = useState('');
  const [sortDesc] = useState('price-desc');
  const [productCategories] = useState([]);
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("cartItems") || false) || []
  )


  // console.log(loggedIn);
  // Initializing the value of each product with value 1
  // Products are identified by their ids (ids are used as keys)
  useEffect(() => {
    const newProductQuantity = {};
    cart.forEach((product) => {
      newProductQuantity[product.id] = 1;
    });

    setProductQuantity(newProductQuantity);
  }, []);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      // const response = await fetch('https://fakestoreapi.com/products');
      const response = await fetch('http://127.0.0.1:3000/products');
      const results = await response.json();

      // Sort Products Logic on shop page
      sortProducts === 'price-asc'
        ? setProducts(
          results &&
          results.sort((a, b) => (a.price_in_2dp > b.price_in_2dp ? 1 : -1))
        )
        : sortProducts === 'price-desc'
          ? setProducts(
            results &&
            results.sort((a, b) => (a.price_in_2dp < b.price_in_2dp ? 1 : -1))
          )
          : setProducts(results);

      // Render products based on search
      setSearchQuery(results);
      localStorage.setItem("products", JSON.stringify(results))

      setLoading(false);
    };
    fetchProducts();
  }, [sortProducts]);

  // Handle search feature
  const handleSearch = (e) => {
    setProducts(
      searchQuery.filter((product) => {
        return product.name
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      })
    );
    return products;
  };

  const handleAddToCart = (item) => {
    // CHECK IF ITEM EXISTS IN CART
    let exist = false;
    cart.forEach((product) => {
      if (product.id === item.id) {
        exist = true;
        setCartWarming(true);
        setTimeout(() => {
          setCartWarming(false);
        }, 3500);
      }
    });
    if (!exist) {
      cart.unshift(item);
      setCartCount(cart.length);
      setCartSuccess(true);
      setTimeout(() => {
        setCartSuccess(false);
      }, 3500);
    }
  };

  // // Quantity Add Button on Product Page
  function handleAddQty(product) {
    setProductQuantity((productQuantity) => {
      if (!productQuantity[product.id]) {
        return { ...productQuantity, [product.id]: 1 };
      } else {
        const newQuantity = productQuantity[product.id] + 1;
        return { ...productQuantity, [product.id]: newQuantity };
      }
    });
  }

  // Quantity Reduce Button on Product Page
  function handleReduceQty(product) {
    if (productQuantity[product.id] <= 1) {
      alert("Quantity cannot be less than 1");
    } else {
      setProductQuantity((prevQuantity) => {
        const newQuantity = prevQuantity[product.id] - 1;
        return { ...prevQuantity, [product.id]: newQuantity };
      });
    }
  }

  // Get & Store all product categories
  useEffect(() => {
    fetch(`http://127.0.0.1:3000/products`)
      .then((res) => res.json())
      .then((data) => {
        data.map((d) => productCategories.push(d.category));
      });
  }, []);

  // Removes duplicates in array
  const uniqueCategoryArray = [...new Set(productCategories)];
  // console.log(uniqueCategoryArray);

  return (
      <BrowserRouter>
      <div className="App">
      <NavBar
        loggedIn={loggedIn}
        setLoggedIn={setLoggedIn}
        userType={userType}
        setUserType={setUserType}
        // userPatient={userPatient}
        // userPractitioner={userPractitioner}
        // setUserPatient={setUserPatient}
        // setUserPractitioner={setUserPractitioner}
        cartItems={cartItems}
      />
      <Routes>
        <Route exact path="/signup" element={<SignUp
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            userType={userType}
            setUserType={setUserType}
            setCartItems={setCartItems}
          />}>
        </Route>
        <Route exact path="/login" element={<Login
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            userType={userType}
            setUserType={setUserType}
            setCartItems={setCartItems}
          />}>
        </Route>
        <Route exact path="/reset-password" element={<ResetPassword loggedIn={loggedIn} userType={userType} />}>
        </Route>
        {/* == PATIENT ROUTES */}
        <Route exact path="/patients/me" element={<Patient loggedIn={loggedIn} userType={userType} />}>
        </Route>
        <Route exact path="/patients/me/create-appointment" element={<PatientCreateAppointment loggedIn={loggedIn} userType={userType} />}>
        </Route>
        <Route exact path="/patients/me/appointments" element={<PatientAppointments loggedIn={loggedIn} userType={userType} />}>
        </Route>
        <Route exact path="/patients/me/chat" element={<PatientChat loggedIn={loggedIn} userType={userType} />}>
        </Route>
        <Route exact path="/patients/me/reviews" element={<PatientReviews loggedIn={loggedIn} userType={userType} />}>
        </Route>
        <Route exact path="/patients/me/calendar" element={<PatientCalendar loggedIn={loggedIn} userType={userType} />}>
        </Route>
        <Route exact path="/patients/details-popup" element={<PatientDetailsPopup loggedIn={loggedIn} userType={userType} />}>
        </Route>
        {/* == PATIENT ROUTES */}
        {/* == PRACTITIONER ROUTES */}
        <Route exact path="/practitioners/me" element={<Practitioner loggedIn={loggedIn} userType={userType} />}>
        </Route>
        <Route exact path="/practitioners/me/create-appointment" element={<PractitionerCreateAppointment
            loggedIn={loggedIn}
            userType={userType}
          />}>
        </Route>
        <Route exact path="/practitioners/me/appointments" element={<PractitionerAppointments loggedIn={loggedIn} userType={userType} />}>
        </Route>
        <Route exact path="/practitioners/me/chat" element={<PractitionerChat loggedIn={loggedIn} userType={userType} />}>
        </Route>
        <Route exact path="/practitioners/me/reviews" element={<PractitionerReviews loggedIn={loggedIn} userType={userType} />}>
        </Route>
        <Route exact path="/practitioners/me/calendar" element={<PractitionerCalendar loggedIn={loggedIn} userType={userType} />}>
        </Route>
        {/* == PRACTITIONER ROUTES */}
        <Route exact path="/about" element={<AboutUs />}></Route>
        <Route exact path="/products" element={<Shop
            setCartSuccess={setCartSuccess}
            setCartWarming={setCartWarming}
            cartItems={cartItems}
            setCartItems={setCartItems}
            products={products}
            handleSearch={handleSearch}
            loading={loading}
            setCart={setCart}
            handleAddToCart={handleAddToCart}
            cartWarning={cartWarning}
            cartAddSuccess={cartAddSuccess}
            sortAsc={sortAsc}
            sortDesc={sortDesc}
            sortProducts={sortProducts}
            setSortedProducts={setSortedProducts}
          />}>
        </Route>
        {/* == BOTH PRACTITIONER & PATIENT Routes */}
        <Route path={`/products/:productID`} element={userType == "practitioner" || userType == "patient" ? (
            <ProductPage
              handleAddToCart={handleAddToCart}
              productQuantity={productQuantity}
              setProductQuantity={setProductQuantity}
              cartWarning={cartWarning}
              handleAddQty={handleAddQty}
              handleReduceQty={handleReduceQty}
              loggedIn={loggedIn}
              userType={userType}
              dosage={dosage}
              setDosage={setDosage}
            />
          ) : (
            ""
          )}>
        </Route>
        <Route exact path="/cart" element={userType == "practitioner" || userType == "patient" ? (
            <Cart
              cart={cart}
              setCart={setCart}
              cartCount={cartCount}
              setCartCount={setCartCount}
              productQuantity={productQuantity}
              products={products}
              cartItems={cartItems}
              setCartItems={setCartItems}
              handleAddQty={handleAddQty}
              handleReduceQty={handleReduceQty}
              loggedIn={loggedIn}
              userType={userType}
            />
          ) : (
            ""
          )}>
        </Route>
        {/* == BOTH PRACTITIONER & PATIENT Routes */}
        {/* == ADMIN ROUTES == */}
        <Route exact path="/admin/practitioner/edit/:id" element={<EditPractitioner loggedIn={loggedIn} userType={userType} />}></Route>
        <Route exact path="/admin/product/edit/:id" element={<EditProduct loggedIn={loggedIn} userType={userType} />}></Route>
        <Route exact path="/admin/login" element={<AdminLogin
            loggedIn={loggedIn}
            setLoggedIn={setLoggedIn}
            userType={userType}
            setUserType={setUserType}
          />}>
        </Route>
        <Route exact path="/admin/me" element={userAdmin ? (
            <Admin loggedIn={loggedIn} userType={userType} />
          ) : (
            <AdminLogin
              setUserAdmin={setUserAdmin}
              loggedIn={loggedIn}
              userType={userType}
            />
          )}>
        </Route>
        <Route exact path="/admin/all-practitioners" element={userAdmin ? (
            <AllPractitioners loggedIn={loggedIn} userType={userType} />
          ) : (
            <AdminLogin
              setUserAdmin={setUserAdmin}
              loggedIn={loggedIn}
              userType={userType}
            />
          )}>
        </Route>
        <Route exact path="/admin/add-practitioner" element={userAdmin ? (
            <AddPractitioner loggedIn={loggedIn} userType={userType} />
          ) : (
            <AdminLogin
              setUserAdmin={setUserAdmin}
              loggedIn={loggedIn}
              userType={userType}
            />
          )}>
        </Route>
        <Route exact path='/admin/add-practitioner-profile' element={userAdmin ? (
            <AddPractitionerProfile loggedIn={loggedIn} userType={userType} />
          ) : (
            <AdminLogin
              setUserAdmin={setUserAdmin}
              loggedIn={loggedIn}
              userType={userType}
            />
          )}>
        </Route>
        <Route exact path='/admin/products' element={userAdmin ? (
            <AllProducts
              loggedIn={loggedIn}
              userType={userType}
              handleSearch={handleSearch}
            />
          ) : (
            <AdminLogin
              setUserAdmin={setUserAdmin}
              loggedIn={loggedIn}
              userType={userType}
            />
          )}>
        </Route>
        <Route exact path="/admin/add-product" element={userAdmin ? (
            <AddProduct
              loggedIn={loggedIn}
              userType={userType}
              uniqueCategoryArray={uniqueCategoryArray}
            />
          ) : (
            <AdminLogin
              setUserAdmin={setUserAdmin}
              loggedIn={loggedIn}
              userType={userType}
            />
          )}>
        </Route>
        {/* == ADMIN ROUTES == */}
        <Route exact path="/" element={ <Home loggedIn={loggedIn} userType={userType} />}></Route>
        <Route exact path="*" element={<PageNotFound loggedIn={loggedIn} userType={userType} />}></Route>
        </Routes>
      <Footer />
    </div>
      </BrowserRouter>
  );
}

export default App;
