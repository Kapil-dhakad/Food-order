// import React, { useState } from "react";
// import "./LoginPopup.css";
// import { assets } from "../../assets/assets";

// const LoginPopup = ({ setShowLogin }) => {
//   const [currState, setCurrState] = useState("Login");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [name, setName] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Define the API endpoint based on the current state
//     const apiUrl =
//       currState === "Login"
//         ? "http://localhost:3000/api/users/login"
//         : "http://localhost:3000/api/users/register";
//     const payload =
//       currState === "Login" ? { email, password } : { name, email, password };

//     // Example API request
//     fetch(apiUrl, {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(payload),
//     })
//       .then((response) => response.json())
      
//       .then(data => {
//     if (data.success) {
//         localStorage.setItem("token", data.accessToken);
//         setShowLogin(false); // Hide the popup
//     }
// })
//       .catch((error) => console.error("Error:", error));
//   };

//   return (
//     <div className="login-popup">
//       <form className="login-popup-container" onSubmit={handleSubmit}>
//         <div className="login-popup-title">
//           <h2>{currState}</h2>
//           <img
//             onClick={() => setShowLogin(false)}
//             src={assets.cross_icon}
//             alt=""
//           />
//         </div>
//         <div className="login-popup-inputs">
//           {currState === "Sign Up" && (
//             <input
//               type="text"
//               placeholder="Your name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               required
//             />
//           )}
//           <input
//             type="email"
//             placeholder="Your email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button type="submit">
//           {currState === "Sign Up" ? "Create account" : "Login"}
//         </button>
//         <div className="login-popup-condition">
//           <input type="checkbox" required />
//           <p>By continuing, I agree to the Terms of Use & Privacy Policy.</p>
//         </div>
//         {currState === "Login" ? (
//           <p>
//             Create a new account?{" "}
//             <span onClick={() => setCurrState("Sign Up")}>Click here</span>
//           </p>
//         ) : (
//           <p>
//             Already have an account?{" "}
//             <span onClick={() => setCurrState("Login")}>Login here</span>
//           </p>
//         )}
//       </form>
//     </div>
//   );
// };

// export default LoginPopup;


import React, { useState } from "react";
import "./LoginPopup.css";
import { assets } from "../../assets/assets";
import { use } from "react";
import { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios";

const LoginPopup = ({ setShowLogin }) => {
  const {url, setToken} = useContext(StoreContext)
  const [currState, setCurrState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  
  const onChangeHandle = (e) => {
    const name = e.target.name
    const value = e.target.value
    setData({...data, [name]: value})
  }
 
  const onLogin = async(e) => {
      e.preventDefault()
      let newUrl = url;
      if(currState==="Login"){
        newUrl += "/api/users/login"
      }else{
        newUrl += "/api/users/register"
      }
      console.log("Sending to backend:", data)
      const response = await axios.post(newUrl, data)
      console.log(response.data)
      if(response.data.success){

        setToken(response.data.token)
        localStorage.setItem("token", response.data.token)
        setShowLogin(false)

      }
      else{
          alert(response.data.message)
     
      }
  }

  
  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container" >
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>
        <div className="login-popup-inputs">
          {currState === "Sign Up" && (
            <input
              type="text"
              placeholder="Your name"
              name="name"
              value={data.name}
              onChange={onChangeHandle}
              required
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Your email"
            value={data.email}
            onChange={onChangeHandle}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={data.password}
            onChange={onChangeHandle}
            required
          />
        </div>
        <button type="submit">
          {currState === "Sign Up" ? "Create account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continuing, I agree to the Terms of Use & Privacy Policy.</p>
        </div>
        {currState === "Login" ? (
          <p>
            Create a new account?{" "}
            <span onClick={() => setCurrState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span onClick={() => setCurrState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopup;

