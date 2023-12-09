import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/ProductCard'
import Modal from '../components/Modal'
import { createDataFunc, updateDataFunc } from '../redux/dataSlice'
import { modalFunc } from '../redux/modalSlice'
import { useEffect, useState } from 'react'
import Input from '../components/Input'
import Button from '../components/Button'
import { useLocation, useNavigate } from 'react-router-dom'



const Product = () => {

  const { modal } = useSelector(state => state.modal)
  const { data, keyword } = useSelector(state => state.data)
  const dispatch = useDispatch()
  const location = useLocation()
  const navigate = useNavigate()
  
  const [productInfo, setProductInfo] = useState({ name: "", price: "", url: "" })

  const onChangeFunc = (e, type) => {
    if (type == "url") {
      setProductInfo(prev => ({ ...prev, [e.target.name]: URL.createObjectURL(e.target.files[0])}))

    } else {
      setProductInfo(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }
  }

  let loc = location?.search.split("=")[1]

  useEffect(() => {
    if(loc){
      setProductInfo(data.find(dt => dt.id == loc))
    }
  },[loc])


  const buttonFunc = () => { 
    dispatch(createDataFunc({...productInfo, id: data.length +1} ));
    dispatch(modalFunc());
   }

  const buttonUpdateFunc = () => {
    dispatch(updateDataFunc({...productInfo, id:loc}))
    dispatch(modalFunc());
    navigate('/')
  }

   
  const contentModal = (
    <>
      <Input
        value={loc ? productInfo.name : null}
        type={"text"}
        placeholder={"Ürün ekleyiniz"}
        name={"name"}
        id={"name"}
        onChange={e => onChangeFunc(e, "name")} />
      <Input
        value={loc ? productInfo.price : null}
        type={"text"}
        placeholder={"Fiyat ekleyiniz"}
        name={"price"}
        id={"price"}
        onChange={e => onChangeFunc(e, "price")} />
      <Input
        type={"file"}
        placeholder={"Resim seçiniz"}
        name={"url"}
        id={"url"}
        onChange={e => onChangeFunc(e, "url")} />
      <Button
        btnText={loc ? "güncelle": "Oluştur"}
        onClick={loc ? buttonUpdateFunc : buttonFunc} />
    </>
  )




  
  const filteredItems = data.filter(dt => dt.name.toLowerCase().includes(keyword))

  return (
    <div>

    <div className='flex items-center flex-wrap'>
      
    {filteredItems?.map((dt, i)=> (
      <ProductCard key={i} dt={dt} />
      ))}

    </div>

      
      {modal && <Modal
        
        title={loc ? "ürün güncelle" : "ürün oluştur"}
        content={contentModal}
      />}
    </div>
  )
}

export default Product