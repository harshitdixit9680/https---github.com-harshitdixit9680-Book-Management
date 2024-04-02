
import './App.css';
import Book from './Component/Book';
import Bookmgmt from './Component/Bookmgmt';
import Navbar from './Component/Navbar';
import Login from './Component/Login';
import Signup from './Component/Signup';
import AddBookForm from './Component/AddBookForm';
import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import { useState } from "react";
import BookTable from './Component/BookTable';

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 1500);
}
  return (
    <>
    
    {/* <h1>Hi harshit You Are Brilliant</h1> */}
    <Navbar/>
      <Routes >
        {/* <Route exact path="/" element={<Bookmgmt />} /> */}
        {/* <Route exact path='/' element = {<Book/> }/> */}
        <Route exact path="/" element={<Bookmgmt /> } />
        <Route exact path="/Booktable" element={<BookTable /> } />
        <Route exact path="/addbook" element={<AddBookForm /> } />
        <Route exact path="/login" element={<Login showAlert = {showAlert}/> } />
        <Route exact path="/signup" element={<Signup showAlert = {showAlert} /> } />
        {/* <Route exact path="/login">
            <Login showAlert = {showAlert}/>
          </Route> 
          <Route exact path="/signup">
            <Signup showAlert = {showAlert} />
          </Route>  */}
      </Routes>
    </>
  );
}

export default App;
