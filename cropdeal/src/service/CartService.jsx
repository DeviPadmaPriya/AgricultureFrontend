import React from 'react';
import axios from "axios";



const CartUrl = "http://localhost:8084/cart";

class CartService{

    constructor() {
        this.axiosInstance = axios.create({
          baseURL: CartUrl,
        });

    }

    addToCart = (userId, cartItem,cropId ) => {
        return this.axiosInstance.post(`/add/dealer/${userId}/crop/${cropId}`, cartItem);

     
    };


  updateCart = (id, cart) => {
    return this.axiosInstance.put(`/update/${id}`, cart);
  };

  getCartByUserId = (userId) => {
    return this.axiosInstance.get(`/getByUserId/${userId}`);
  };

  checkoutCart = (cartId, cart) => {
    return this.axiosInstance.post(`/checkout/${cartId}`, cart);
};

getCartItemsByCartId=(cartId)=>{
    return this.axiosInstance.get(`/getById/${cartId}`);
}


  getCartById=(cartId)=>{
    return this.axiosInstance.get(`/getById/${cartId}`);
  }
  removeCartItem = (cartId, cropId) => {
    return this.axiosInstance.delete(`/removeCartItem/${cartId}/${cropId}`);
  };


  deleteCart = (id) => {
    return this.axiosInstance.delete(`/delete/${id}`);
  };



 

}

export default new CartService();