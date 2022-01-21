import axios from 'axios';

class ApiService{

    constructor(){
        this.request = axios.create({
            baseURL: process.env.REACT_APP_API_URL
        });
    }

    async fetchAllTypes(){
        try{
            const res = await this.request.get('/types');
            const types = res.data.data;
            return types;
        }catch(err){
            return Promise.reject(err.response.data.data.map(err => err.msg).join(' '));
        }
    }

    async fetchAllBikes(){
        try{
            const res = await this.request.get('/bikes');
            const bikes = res.data.data;
            return bikes;
        }catch(err){
            return Promise.reject(err.response.data.data.map(err => err.msg).join(' '));
        }
    }

    async addBike(bike){
        try {
            const res = await this.request.post('/bikes', {
                name: bike.name,
                typeId: bike.typeId,
                rentalPrice: bike.rentalPrice
            });
            const added = res.data.data;
            return added;
        }catch(err){
            return Promise.reject(err.response.data.data.map(err => err.msg).join(' '));
        }
    }

    async deleteBike(bikeId){
        try {
            const res = await this.request.delete('bikes/' + bikeId);
            return res.data.data;
        }catch(err){
            return Promise.reject(err.response.data.data.map(err => err.msg).join(' '));
        }
    }

    async rentBike(bikeId){
        try {
            const res = await this.request.put('bikes/rent/' + bikeId);
            return res.data.data;
        }catch(err){
            return Promise.reject(err.response.data.data.map(err => err.msg).join(' '));
        }
    }

    async cancelRent(bikeId){
        try {
            const res = await this.request.put('bikes/rent/cancel/' + bikeId);
            return res.data.data;
        }catch(err){
            return Promise.reject(err.response.data.data.map(err => err.msg).join(' '));
        }
    }
}

export default new ApiService();