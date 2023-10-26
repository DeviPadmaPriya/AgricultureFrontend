import axios from 'axios';

const PaymentUrl = "http://localhost:8086/payment"; 

class PaymentService {
    constructor() {
        this.axiosInstance = axios.create({
            baseURL: PaymentUrl,
        });
    }

    addPayment = (paymentData, userId, orderid) => {
        return this.axiosInstance.post(`/add/user/${userId}/order/${orderid}`, paymentData);
    };

    getPaymentByOrderId = (orderId) => {
        return this.axiosInstance.get(`/getPaymentByOrderId/${orderId}`);
    }


}

export default new PaymentService();
