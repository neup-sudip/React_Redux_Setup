import React from "react";
import { useDispatch } from "react-redux";
import { ApiServices } from "./httpServices/httpServices";

const App = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    const payload = {
      url: "/user/post",
      data: { name: "sudip", email: "Sudip@gmail.com" },
    };
    dispatch(ApiServices.post(payload));
  };
  return (
    <div>
      App
      <button onClick={handleClick}>Click</button>
    </div>
  );
};

export default App;
