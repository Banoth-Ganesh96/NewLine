import React, { useState,Suspense } from "react";
import Navbar from "./Components/Navbar";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const News = React.lazy(() => import('./Components/News'));
const App = () => {
  const pageSize = 8;
  const apiKey = import.meta.env.VITE_NEWS_API;

  const [progress,setProgress]=useState(0)

    return (
      <>
        <Router>
          <Navbar />
          <LoadingBar height={3} color="#f11946" progress={progress} />
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Navigate to="/general" />} />
              <Route exact path="/general" element={<News setProgress={setProgress} apiKey={apiKey} key="general" pageSize={pageSize} country="us" category="general" />} />
              <Route exact path="/business" element={<News setProgress={setProgress} apiKey={apiKey} key="business" pageSize={pageSize} country="us" category="business" />} />
              <Route exact path="/entertainment" element={<News setProgress={setProgress} apiKey={apiKey} key="entertainment" pageSize={pageSize} country="us" category="entertainment" />} />
              <Route exact path="/health" element={<News setProgress={setProgress} apiKey={apiKey} key="health" pageSize={pageSize} country="us" category="health" />} />
              <Route exact path="/science" element={<News setProgress={setProgress} apiKey={apiKey} key="science" pageSize={pageSize} country="us" category="science" />} />
              <Route exact path="/sports" element={<News setProgress={setProgress} apiKey={apiKey} key="sports" pageSize={pageSize} country="us" category="sports" />} />
              <Route exact path="/technology" element={<News setProgress={setProgress} apiKey={apiKey} key="technology" pageSize={pageSize} country="us" category="technology" />} />
            </Routes>
          </Suspense>
        </Router>
      </>
    );
  }

export default App;
