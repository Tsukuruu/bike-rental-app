import React, { useState, useEffect, useContext } from 'react';

import ApiService from '../../services/ApiService';
import BikesStoreContext from '../../store/BikesStoreContext';

import './NewRentForm.css';
import NewRentInputText from './NewRentInputText';
import NewRentSelect from './NewRentSelect';

const NewRentForm = props => {

    const store = useContext(BikesStoreContext);

    //fetching types for select dropdown
    const [types, setTypes] = useState([]);
    useEffect(() => {
        ApiService.fetchAllTypes().then(res => {
            setTypes(res ? res : []);
            setTypeId(res && res[0].id);
        })
    }, []);


    const [name, setName] = useState('');
    const [rentalPrice, setRentalPrice] = useState('');
    const [typeId, setTypeId] = useState('');

    const [apiError, setApiError] = useState('');
    const [fieldsError, setFieldsError] = useState({});
    const handleSubmit = event => {
        event.preventDefault();

        const parsedPrice = parseFloat(rentalPrice);

        let nameError = false;
        let typeError = false;
        let priceError = false;
        if(name.length <= 0){
            nameError = true;
        }
        if(!typeId){
            typeError = true;
        }
        if(isNaN(parsedPrice) || parsedPrice < 0){
            priceError = true;
        }

        if(typeError || priceError || nameError){
            setFieldsError({...fieldsError, price: priceError, typeId: typeError, name: nameError});
            return;
        }

        store.addBike({
            name,
            typeId,
            rentalPrice: parsedPrice
        }).catch(err => {
            console.log("here");
            setApiError(err);
            console.dir(apiError);
        })
    }
    
    return (
           <div className="form-wrapper">
               <form className={props.className + ' form shadow-card'} onSubmit={handleSubmit}>
                   <NewRentInputText id="name" name="name" label="Bike name" changeHandler={setName} errors={fieldsError} setError={setFieldsError}/>
                   <NewRentSelect id="type" name="type" label="Bike type" options={types} value={typeId} changeHandler={setTypeId} errors={fieldsError} setError={setFieldsError}/>
                   <NewRentInputText id="price" name="price" label="Bike price" small changeHandler={setRentalPrice} errors={fieldsError} setError={setFieldsError}/>
                   <button className="form__btn">Sumbit rent</button>
               </form> 
                {apiError.length > 0 && (
                    <div className="is-invalid-text">{apiError}</div>
                )}
           </div>
    )
}

export default NewRentForm;