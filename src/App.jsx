import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Product from './pages/Product'
import Header from './components/Header'
import Test from './pages/Test'


function App() {

  return (
    <div className=''>

      <BrowserRouter>
      <Header/>
      <Routes>

      <Route index path='/' element= {<Product/>}/>
      <Route index path='/test' element= {<Test/>}/>

      </Routes>
      
      </BrowserRouter>

    </div>


  )
}

export default App
