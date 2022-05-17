import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

//Initialization app
function App() {
  const [link, setLink] = useState("");
  const [home, setHome] = useState();
  const [loading, setLoading] = useState(true)

  //This arrow function makes us the request of "http.." to return a promise which has all the links in the database 
  const data = async () => {
    setLoading(true);
    const data = await fetch("http://localhost:4000/home");
    const response = await data.json();
    setHome(response.url)
    setLoading(false);
  };

  //Increase the Visits
  const increaseVisit = async (id) => {
    try {
      await axios.post("http://localhost:4000/increase", {
        id
      });
    } catch (error) {
      console.log(error.message);
    };
    
  };

  //Create a new link and save in the DB
  async function postLink(e) {
    try {
      await axios.post("http://localhost:4000/post_link", {
        link
      })
    } catch (error) {
      console.log(error.message)
    }
    data();
  }

  useEffect(() => {
    data();
  }, [])

  return (
    <div className="App">
      <form onSubmit={()=>{postLink();document.location.reload(); }}>
        <input type="url" value={link} onChange={(e) => setLink(e.target.value)} />
        <Button variant='primary' type='submit' style={{ marginLeft: "10px" }}>Generate link</Button>
      </form>
      {loading ?
        <p>Loading urls...</p>
        :
        (<div className='lista'>
          <div className='listaTitulos'>
            <h2>URL</h2>
            <h2>Short Code</h2>
            <h2>Visits</h2>
          </div>
          {home.map((url) => (
            <div key={url._id} className='listaResultados'>
              <a href={url.links} onClick={() => { increaseVisit(url._id);document.location.reload()}} target='_blank'>{url.links}</a>
              <a href={`/redirectTo/${url.shortLink}`} onClick={(e) => { increaseVisit(url._id);document.location.reload();  }} target='_blank'>{url.shortLink}</a>
              <p>{url.visitCount}</p>
            </div>
          ))}
        </div>)
      }
    </div>
  );
}
export default App;
