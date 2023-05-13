import axios from 'axios';
import React, { memo, useEffect, useState } from 'react'
import Header from '../Header/Header';
import Carousel from 'react-bootstrap/Carousel';


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
      axios.get("https://fakestoreapi.com/products/category/jewelery")
        .then(resp => {
          const { data } = resp
          setImg(data)
          localStorage.setItem("products", JSON.stringify(data))
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
        {/* <img width={"100%"} height={"260px"} src='homeBanner.jpg' /> */}




        <Carousel variant="dark" interval={1000} controls={false} indicators={false}>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="banner1.png"
              alt="First slide"
              width={"100%"}
              height={"250vh"}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="banner2.png"
              alt="Second slide"
              width={"100%"}
              height={"250vh"}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="banner3.png"
              alt="Third slide"
              width={"100%"}
              height={"250vh"}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="banner4.png"
              alt="Third slide"
              width={"100%"}
              height={"250vh"}
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="banner5.png"
              alt="Third slide"
              width={"100%"}
              height={"250vh"}
            />
          </Carousel.Item>
        </Carousel>



        <ul data-v-68d7bcd4="" className="list_ul" style={{ paddingInline: "2rem", marginTop: 24 }}>
          {
            [1, 2, 3].map(_ => (
              img.length > 0 ?
                img.map((item) => {
                  return (
                    <li key={item.title} data-v-68d7bcd4="" className="list_li">
                      <ol data-v-68d7bcd4="">
                        <div data-v-68d7bcd4="" className="list_img_box" style={{ position: "relative" }}>
                          <img className="list_img productImg" src={item.image} />
                        </div>
                        <div data-v-68d7bcd4="" className="van-multi-ellipsis--l3 info">
                          {item.title}
                        </div>
                        <p data-v-68d7bcd4="" className="price">$ {item.price}</p>
                      </ol>
                    </li>
                  )
                })
                : <p>{"something wrong happened"}</p>
            ))
          }
        </ul>
      </div >
    </div >
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
