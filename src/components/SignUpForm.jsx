import React, { useState } from "react";

export default function SignUpForm({ setToken }) {
    // create three state variables for our form inputs: username, password, and error w/ default values being "", "" and null
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState(null);

// form validation state variables
const [usernameError, setUsernameError] = useState(null);
const [passwordError, setPasswordError] = useState(null);

// define an async function called handleSubmit. Define this function to take an event & call preventDefault() on it
async function handleSubmit(event) {
event.preventDefault();

// form validation: username
if (username.length < 6) {
  setUsernameError("Username must be at least 6 characters in length");
  return;
} else {
  setUsernameError(null);
}

// form validation: password
if (password.length < 8) {
  setPasswordError("Password must be at least 8 characters in length");
  return;
} else {
  setPasswordError(null);
}

try {
    const response = await fetch('https://fsa-jwt-practice.herokuapp.com/signup', {
        // send a POST request passing along the username and password state values in the request body
        method: "POST",
        body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    // Pass the token property of our API response to setToken
    setToken(result.token);
    console.log(result);
} catch (error) {
    // In your catch block, pass the error.message to your setError function - this allows us to store a server error in the app state and display it
    setError(error.message);
}
}

// create a form element w/ two inputs & button with the text "submit" nested inside
// To keep the application accessible to screen readers, nest your input tags inside a parent label tag w/ appropriate text

return (
    <div>
      <h2>Sign Up!</h2>

{/* Conditionally render your error message in a p tag, based on if the error property in your state is truthy / falsy. */}
{error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>

        <label style ={{fontSize:"15px", margin: "5px", fontWeight:"bold"}}>
            {/* Assign each value property of your input to its corresponding state value. Similarly, pass each onChange property to a callback function. These callback functions should be defined to take an event, and pass the event.target.value to the corresponding useState setter. */}
          Username: <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>

        {/* form validation: username */}
        {usernameError && <p style={{ color: "red"}}>{usernameError}</p>}

        <label style ={{fontSize:"15px", margin: "5px", fontWeight:"bold"}}>
          Password: <input placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>

        {/* form validation: password */}
        {passwordError && <p style={{ color: "red"}}>{passwordError}</p>}

        <button style={{width: "80px", height: "37px", padding: "10px", fontSize:"15px"}}>Submit</button>
      </form>
    </div>
  );
}