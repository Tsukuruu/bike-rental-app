import { makeAutoObservable, runInAction } from 'mobx';
import ApiService from '../services/ApiService';

class BikesStore{
    
    availableBikes = [];
    rentedBikes = [];

    constructor(){
        makeAutoObservable(this);
        this.getAllBikes();
    }

    get totalRentedPrice(){
        return this.rentedBikes.reduce((total, bike) => total + bike.rentalPrice, 0).toFixed(2);
    }

    get availableBikesCount(){
        return this.availableBikes.length;
    }

    getAllBikes(){
        return ApiService.fetchAllBikes().then(bikes => {
            runInAction(() => {
                this.availableBikes = [];
                this.rentedBikes = [];
                bikes.forEach(bike => {
                    bike.isRented ? this.rentedBikes.push(bike) : this.availableBikes.push(bike);
                })
            });
        }).catch(err => {
            return Promise.reject(err);
        });
    }

    addBike(bike){
        return ApiService.addBike({
            name: bike.name,
            rentalPrice: bike.rentalPrice,
            typeId: bike.typeId
        }).then(added => {
            runInAction(() => {
                this.availableBikes.push(added);
            });
        }).catch(err => {
            return Promise.reject(err);
        });
    }

    deleteBike(bikeId){
        return ApiService.deleteBike(bikeId).then(res => {
            runInAction(() => {
                this.getAllBikes();
            });
        }).catch(err => {
            return Promise.reject(err);
        });
    }

    rentBike(bikeId){
        return ApiService.rentBike(bikeId).then(res => {
            runInAction(() => {
                this.getAllBikes();
            });
        }).catch(err => {
            return Promise.reject(err);
        });
    }

    cancelRent(bikeId){
        ApiService.cancelRent(bikeId).then(res => {
            runInAction(() => {
                this.getAllBikes();
            });
        }).catch(err => {
            return Promise.reject(err);
        });
    }
}

export default BikesStore;