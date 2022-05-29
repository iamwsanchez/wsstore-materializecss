import './App.css';

import React, { useEffect, useState } from 'react'
import axios from 'axios'

function App(){
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState(null)

    useEffect(() => {
        setLoading(true)
        axios({
            method: 'GET',
            baseURL: 'https://fakestoreapi.com',
            url: '/products',
          })
            .then(({ data }) => {
              setData(data)
            })
            .catch(err => console.dir(err))
            .finally(() => setLoading(false))
    }, [])

    return (  
      <section className="App">
        <div className="row">
        {loading && "Cargando..."}
        {!!data && data.length > 0 ? data.map((product) => {
            return(
              <div className='col s6'>
                <div key={product.id} className="card large">
                  <div className="card-image waves-effect waves-block waves-light">
                    <img className="activator" src={product.image} alt={product.title}/>
                  </div>
                  <div className="card-content">
                    <span className="card-title activator grey-text text-darken-4" title='Click aquí para ver descripción completa'>{product.title}<i className="material-icons right">more_vert</i></span>
                    <p><a href="/">Esto es un link</a></p>
                  </div>
                  <div className="card-reveal">
                    <span className="card-title grey-text text-darken-4">{product.title}<i className="material-icons right">close</i></span>
                    <p>{product.description}</p>
                  </div>
                </div>
              </div>
            )   
          }):(<p>API no retornado ningún producto, intentalo nuevamente.</p>)
        }
        </div> 
      </section>
    )
}
export default App;