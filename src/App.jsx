// in the components folder under src, I added SignUpForm.jsx and Authenticate.jsx files

import './App.css';
import SignUpForm from './components/SignUpForm';
import Authenticate from './components/Authenticate';
import React, { useState } from "react";

export default function App() {

  const [token, setToken] = useState(null);

return (
  <>
  {/* Pass the setToken function to your SignUpForm component then pass the token value to your Authenticate component */}
    <SignUpForm token={token} setToken={setToken} />
    <Authenticate token={token} setToken={setToken} />
  </>
);
}