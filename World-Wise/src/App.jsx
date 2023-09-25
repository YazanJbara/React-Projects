import { BrowserRouter, Route, Routes } from "react-router-dom";
import Product from "./Pages/Product";
import Pricing from "./Pages/Pricing";
import Login from "./Pages/Login";
import Homepage from "./Pages/Homepage";
import AppLayout from "./Pages/AppLayout";
import PageNotFound from "./Pages/PageNotFound";
import CityList from "./Components/CityList";
import { useEffect, useState } from "react";

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
          <Route path="countries" element={<p>Countries</p>} />
          <Route path="form" element={<p>Form</p>} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
