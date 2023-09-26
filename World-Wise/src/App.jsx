import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import Login from "./Pages/Login";
import Homepage from "./Pages/Homepage";
import AppLayout from "./Pages/AppLayout";
import PageNotFound from "./Pages/PageNotFound";
import CityList from "./Components/CityList";
import CountryList from "./Components/CountryList";
import City from "./Components/City";
import Form from './Components/Form'

const BaseURL = "http://localhost:8000";

function App() {
  // fetching from the fake API
  const [cities, setCities] = useState([]);
  const [isLodaing, setIsLoading] = useState(false);


  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BaseURL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error loading data ):");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
// to use params (storing state in URL) we need 3 steps
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        {/* nested Routes here */}
        <Route path="app" element={<AppLayout />}>
          <Route
            index
            element={<CityList cities={cities} isLodaing={isLodaing} />}
          />
          <Route
            path="cities"
            element={<CityList cities={cities} isLodaing={isLodaing} />}
          />

          {/* create new route , the id is the param */}
          <Route path="cities/:id"element={<City/>}/>
          <Route path="countries" element={<CountryList cities={cities} isLodaing={isLodaing} />} />
          <Route path="form" element={<Form/>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
