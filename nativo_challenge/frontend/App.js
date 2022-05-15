import './App.css';

import React, { useEffect, useState } from 'react';
import axios from 'axios';


function App() {
  const [link, setLink] = useState("");
  const [home, setHome] = useState("");

  useEffect( () =>{
    axios.get("http://localhost:4000/home").then(function(response){
      setHome(response.data)
    })
  }, [] )

  async function postLink(e) {
    e.preventDefault()

    try {
      await axios.post("http://localhost:4000/post_link", {
        link
      })
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className="App">
			<form onSubmit={postLink}>
				<input type="text" value={link} onChange={(e) => setLink(e.target.value)} />
				<button type="submit">Generate link</button>
			</form>
			{home}
		</div>
  );
}

export default App;
