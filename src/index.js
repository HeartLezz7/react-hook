import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// step-1 : รู้ว่า user กดปุ่มไหม ?
// step-2 : Make HTTP  Request , after setState

function App() {
  const [category, SetCategory] = useState("");
  const [count, setCount] = useState(0);

  // Syntax : useEffect(setUp,dependenciesAttay)

  // # 1
  // useEffect(() => {
  //   console.log("## 1 Effect Hook - Every render, rerender");
  // }, );
  // # 2 After First render
  useEffect(() => {
    console.log("Only first render");
  }, []);

  // ### 3 : firstRender , Rerender with category change
  useEffect(() => {
    console.log("## 2 Effect Hook - category - MAKE HTTP With", category);

    // DEFINE
    // url : https://jsonplaceholder.typicode.com/<categories>
    async function fetchLists() {
      const BASE_URL = "https://jsonplaceholder.typicode.com";
      try {
        let response = await fetch(`${BASE_URL}/${category}`, {
          method: "GET",
        });
        let data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    // CALL FN
    if (category !== "") fetchLists();
  }, [category]);

  // useEffect(() => {
  //   console.log("## 3 Effect Hook - count", count);
  // }, [count]);

  console.log("render, rerender");

  return (
    <div>
      <h1>useEffect : {category || "not select"}</h1>
      <div className="button__group">
        <button onClick={() => SetCategory("posts")}>posts</button>
        <button onClick={() => SetCategory("photos")}>photos</button>
        <button onClick={() => SetCategory("todos")}>todos</button>
        <button onClick={() => SetCategory("users")}>users</button>
        <button onClick={() => setCount((c) => c + 1)}>+</button>
        <div>{count}</div>
        <button onClick={() => setCount((c) => c + -1)}>-</button>
      </div>

      <ul className="lists">
        <li className="lists__item">item-1</li>
      </ul>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
