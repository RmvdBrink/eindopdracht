import { Routes, Route} from "react-router-dom";
import './App.css';
import Home from "./pages/Home/Home"
import Calculator from "./pages/calculator/Calculator";
import Contact from "./pages/contact/Contact";
import Disclaimer from"./pages/discalimer/Disclaimer";
import Faq from "./pages/F-A-Q/Faq";
import Favourite from "./pages/favourite/Favourite";
import Search from "./pages/search/Search";
import SignIn from "./pages/sign-in/SignIn";
import SignUp from "./pages/sign-up/SignUp";
import WorkTogether from "./pages/work-together/WorkTogether";
import NotFound from "./pages/not-found/NotFound";
import SearchCard from "./components/search-card/SearchCard";
import CalculatorCard from "./components/calculator-card/CalculatorCard";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Logo from "./assets/logo-bewerkt.png"
import React from "react";


function App() {
  return (
      <>

          <Header/>
          <img className="logo" alt="logo"  width="250px" src={Logo}/>

        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/kcal-calculator" element={<Calculator/>}/>
            <Route path="/kcal-calculator/card/id" element={<CalculatorCard/>}/>
          <Route path="/contact" element={<Contact/>}/>
          <Route path="/disclaimer" element={<Disclaimer/>}/>
          <Route path="/f-a-q" element={<Faq/>}/>
          <Route path="/favourite" element={<Favourite/>}/>
          <Route path="/search" element={<Search/>}/>
            <Route path="/search-card/id" element={<SearchCard/>}/>
          <Route path="/sign-in" element={<SignIn/>}/>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/work-together" element={<WorkTogether/>}/>
          <Route path="*" element={<NotFound/>}/>


        </Routes>
        <Footer/>
      </>
  );
}

export default App;
