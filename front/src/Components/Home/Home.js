import axios from 'axios';
import React, { memo, useEffect, useState } from 'react'
import Header from '../Header/Header';

export const Products = memo(() => {
  const [img, setImg] = useState([]);
  const [err, setErr] = useState({});

  function GetData() {
    let data = localStorage.getItem("products")
    let products = JSON.parse(data);
    if (products && products.length > 0) {
      setImg(products);
    }
    else {
      axios.get('https://dummyjson.com/products')
        .then(function (response) {
          let products = response.data.products;
          setImg(products)
          localStorage.setItem("products", JSON.stringify(products))
        })
        .catch(err => {
          setErr(err)
        })
    }
  };

  useEffect(() => {
    GetData()
  }, []);

  return (
    <div data-v-68d7bcd4="" className="index_list">
      <div data-v-68d7bcd4="" className="list_content">
        <ul data-v-68d7bcd4="" className="list_ul">
          {
            img.length > 0 ?
              img?.map((item) => {
                return (
                  <li key={item.title} data-v-68d7bcd4="" className="list_li">
                    <ol data-v-68d7bcd4="">
                      <b>{item.title}</b>
                      <div data-v-68d7bcd4="" className="list_img_box">
                        <div
                          data-v-68d7bcd4=""
                          className="list_img"
                          style={{ backgroundImage: `url(${item.images[0]})` }}
                        ></div>
                      </div>
                      <div data-v-68d7bcd4="" className="van-multi-ellipsis--l3 info">
                        {item.description}
                      </div>
                      <p data-v-68d7bcd4="" className="price">₹{item.price}</p>
                    </ol>
                  </li>
                )
              })
              : <p>{"something wrong happened"}</p>
          }
        </ul>
      </div>
    </div>
  )
});

const Home = () => {
  return (
    <>
      <div id="app" data-v-app="">
        <div data-v-68d7bcd4="" className="indexs">
          <Header />
          <div data-v-68d7bcd4="" className="index_title">
            <p data-v-68d7bcd4="" className="top_title">Welcome Back</p>
            <p data-v-68d7bcd4="" className="bot_title">Quality Guarantee</p>
          </div>
          <Products />
        </div>
      </div>
    </>
  )
}

export default Home
