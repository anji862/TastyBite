import React, { useState,useEffect } from 'react';
import {connect} from 'react-redux';
import {removeFromCart} from './redux/Food/food-actions';
import Header from './project/food/header';
import "./cart.css"
import Footer from './project/food/Footer'

const Cart=({cart,removeFromCart})=>{
    const [total, setTotal] = useState(0);
    const [len, setLen] = useState(0);

    // let len = 0;
    useEffect(()=>{
        let price = 0;
        let count = 0;
        cart.forEach((item) => {
           count+= item.qty;
           price=price+item.qty*parseInt(item.price);
        })
        setTotal(price);
        setLen(count);
    },[cart,total,len,setLen,setTotal])
    return <>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css"/>
        <Header />
        <div className="cart">
            <section className="heading">
                <h1>Items in your Cart({len}) </h1>
            </section>
             <span>
                <h4>Item</h4>
                <h4>Price</h4>
                <h4>Qty</h4>
                <h4>Subtotal</h4>
                        
            </span>

         
        {
            cart.map((cItem)=>{
                return <>
                    <div className="outer">
                    <div className="imgtitle">
                        <img className="cart-img" src={cItem.img} alt="varun" />
                            <h4>{cItem.title}</h4>
                    </div>
                        {/* <div className="title-price"> */}
                    <div className="cart-item">
                        <h4>Rs.{cItem.price}</h4>
                        <div className="iconn" >
                            <h4>{cItem.qty}</h4>
                            <a href="#" ><i className="fa fa-trash" onClick={()=>removeFromCart(cItem.id)}></i></a>
                        </div>
                        <h4>Rs.{cItem.price * cItem.qty}</h4>
                    </div>
                    </div>
                </>
            })
            
            }
            <div className="total">
                <h4>Total Amount: Rs.{total}</h4>
                <button className="btnn" onClick={()=>alert("THANKYOU")}>Proceed to Pay</button>
            </div>
        </div>
        <Footer/>
    </>
}
const mapDispatchToProps=dispatch=>{
    return{
        removeFromCart:(id)=>dispatch(removeFromCart(id)),
    }
}
const mapStateToProps=state=>{
    return{
        cart:state.food.cart,
    };
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart);