import axios from 'axios';

const OrderUrl = "http://localhost:8085/order"; 

class OrderService {
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: OrderUrl,
        });
    }

    
    
    
    createOrder = (userId, cartId, order) => {
        return this.axiosInstance.post(`/create/userid/${userId}/cartid/${cartId}`, order);
    };

    getOrderByOrderId=(orderid)=>{
        return this.axiosInstance.get(`/getById/${orderid}`);
    }
    getOrdersByUserId = (userId) => {
        return this.axiosInstance.get(`/ordersByUserId/${userId}`);
    };

    deleteOrder = (orderId) => {
        return this.axiosInstance.delete(`/delete/orderid/${orderId}`);
    };
}

export default new OrderService();
