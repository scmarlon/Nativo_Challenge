import '../App.css';

import React, { useEffect, useState } from 'react';
import axios from 'axios';



import Button from 'react-bootstrap/Button';


function App() {
  const [link, setLink] = useState("");
  const [home, setHome] = useState();
  const [loading, setLoading] = useState(true)

  const data = async () => {
    setLoading(true);
    const data = await fetch("http://localhost:4000/home");
    const response = await data.json();

    setHome(response.url)
    setLoading(false);


  }

  const increaseVisit = async (id) => {
    try {
      await axios.post("http://localhost:4000/increase", {
        id
      })
    } catch (error) {
      console.log(error.message)
    }
    data();
  }

  useEffect(() => {
    data();

    // axios.get("http://localhost:4000/home").then(function(response){
    //   setHome(response.data)

    // }). then(console.log("SOY HOME:",home))


  }, [])



  async function postLink(e) {
    // e.preventDefault()

    try {
      await axios.post("http://localhost:4000/post_link", {
        link
      })
    } catch (error) {
      console.log(error.message)
    }

    data();
  }
  return (
    <div className="App">
      <form onSubmit={postLink}>
        <input type="text" value={link} onChange={(e) => setLink(e.target.value)} />
        <Button variant='primary' type='submit'>Generate link</Button>
      </form>

      {loading ?
        <p>Cargando urls...</p>
        :
        (<div className='lista'>
          <div className='listaTitulos'>
            <h2>Pagina</h2>
            <h2>Short Url</h2>
            <h2>Visitas</h2>
          </div>
          {home.map((url) => (
            <div key={url._id} className='listaResultados'>
              <a href={url.links} onClick={() => { increaseVisit(url._id) }}>{url.links}</a>
              <a href={url.shortLink} onClick={()=>{}}>{url.shortLink}</a>
              <p>{url.visitCount}</p>
            </div>
          ))}
        </div>)
      }
    </div>
  );
}

export default App;
