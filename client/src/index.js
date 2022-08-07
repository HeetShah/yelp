import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./routes/Home";
import { UpdatePage } from "./routes/UpdatePage";
import { RestaurantDetailPage } from "./routes/RestaurantDetailPage";
import { RestaurantContextProvider } from "./context/RestaurantContext";
import { Header } from "./components/Header";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider>
    <React.StrictMode>
      <RestaurantContextProvider>
        <Header />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/restaurants/:id/update" element={<UpdatePage />}></Route>
            <Route path="/restaurants/:id" element={<RestaurantDetailPage />}></Route>
          </Routes>
        </BrowserRouter>
      </RestaurantContextProvider>
    </React.StrictMode>
  </ChakraProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
