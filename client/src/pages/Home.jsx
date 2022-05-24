import React from 'react'
import inventoryApp from '../resources/images/inventoryapp.png'

const Home = () => {
  return (
    <div className="content">
      <main>
        <section className="page-section d-flex align-items-center justify-content-center">
          <img src={inventoryApp} width={500} style={{borderRadius : '5px'}}/>
        </section>
      </main>
    </div>
  )
}

export default Home