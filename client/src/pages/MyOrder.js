import React, { useEffect, useState } from 'react'
import OrderCard from '../component/OrderCard'
import './Cart.css'
import './TraceOrder.css';
import {BiArrowBack} from 'react-icons/bi'
import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import { Link, useNavigate } from 'react-router-dom';

const containerStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '50vh',
};

const iconStyles = {
  fontSize: '2rem',
};

export const MyOrder = () => {
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token)
  const navigate=useNavigate();
  const [order, setOrder] = useState([]);
  const [products, setProduct] = useState();
  async function getOrder() {
    try {
      const response = await axios.post('/api/v1/getorder', {
        user: decodedToken.id,
      })
      console.log("18", response.data.data)
      setOrder(response.data.data)
    }
    catch (error) {
      console.log('24', error);
    }
  }

  useEffect(() => {
    getOrder()
  }, [])
  console.log("28", order)

  // const dateObject = new Date(itm?.createdAt);

  // const year = dateObject.getFullYear();
  // const month = dateObject.getMonth() + 1;
  // const day = dateObject.getDate();
  // const dateobject1=new Date(order?.updatedAt)
  // const year1=dateobject1.getFullYear();
  // const month1=dateobject1.getMonth()+1;
  // const day1=dateobject1.getDate();
  return (
    <>{
    order.length===0?(<div style={containerStyles}>
        <BiArrowBack className='icons' onClick={()=>navigate('/')} style={iconStyles}/>
        <div className='text'>Place your first order</div>

    </div>):(
      <section className="gradient-custom-2">
        <div className="container py-5">
          <div className="row d-flex justify-content-center align-items-center h-100">
            {
              order.map((itm) => {
                console.log("49", itm)
                const formattedDate = new Date(itm.createdAt).toLocaleDateString();
                return (
                  <div className="col-md-10 col-lg-8 col-xl-6">
                    <div className="card card-stepper" style={{ borderRadius: "16px" }}>
                      <div className="card-header p-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <p className="text-muted mb-2"> Order ID <span className="fw-bold text-body">{itm.orderNumber}</span></p>

                            {/* <p className="text-muted mb-0"> Place On <span className="fw-bold text-body">{`${new Date(itm?.createdAt.getDate)}-${ new Date(itm?.createdAt.getMonth+1)}-${new Date(itm?.createdAt.getFullYear)}`}</span> </p> */}

                            <p className="text-muted mb-0"> Place On <span className="fw-bold text-body">{formattedDate}</span> </p>
                            <p className="text-muted mb-0">Payment Method <span className="fw-bold text-body">{itm.paymentMethod
                            }</span> </p>
                            <p className="text-muted mb-0">Order status <span className="fw-bold text-body">{itm.orderStatus
                            }</span> </p>
                          </div>
                        </div>
                      </div>

                      {
                        itm.products?.map((item) => {
                          return <div className="card-body p-4">
                            <div className="d-flex flex-row mb-4 pb-2">
                              <div className="flex-fill">
                                <h5 className="bold">{item['product'].title}</h5>
                                <p className="text-muted"> Qt: {item.quantity}</p>
                                <h4 className="mb-3"> $ {item['product'].price} </h4>
                                <p className="text-muted">Tracking Staus Last Updated  on: <span className="text-body">{formattedDate}</span></p>
                              </div>
                              <div>
                                <img className="align-self-center img-fluid"
                                  src={item['product'].thumbnail} width="250" />
                              </div>
                            </div>

                            <li className="step0 active" id="step1"><span
                              style={{ marginLeft: "22px", marginTop: "12px" }}> {order?.orderStatus}</span></li>

                            {/* <ul id="progressbar-1" className="mx-0 mt-0 mb-5 px-0 pt-0 pb-4">
                           
                         <li className="step0 active" id="step1"><span
                             style={{ marginLeft: "22px", marginTop: "12px" }}> {order?.orderStatus}</span></li>
                           <li className="step0 active text-center" id="step2"><span></span></li>
                           <li className="step0 text-muted text-end" id="step3"><span
                             style={{ marginRight: "22px" }}>Shipped</span></li>
                             <li className="step0 text-muted text-end" id="step4"><span
                             style={{ marginRight: "22px" }}>DELIVERED</span></li>
                             <li className="step0 text-muted text-end" id="step5"><span
                             style={{ marginRight: "22px" }}>Cancelled</span></li> 
                            
                         </ul> */}

                            <div className="card-footer p-4">
                              <div className="d-flex justify-content-between">
                                <div className="border-start h-100"></div>
                                <h5 className="fw-normal mb-0"><Link to="#!">Cancel</Link></h5>
                              </div>
                            </div>
                          </div>

                        })

                      }
                    </div>
                  </div>
                )
              })
            }

          </div>
        </div>
      </section>
    )
          }
    </>
  )
          
}
