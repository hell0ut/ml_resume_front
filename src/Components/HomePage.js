import 'bootstrap/dist/css/bootstrap.min.css';
import img from "../backgrounds/home_background.jpg"
import {useState} from "react";
import 'axios'
import axios from "axios";

export function HomePage() {
    return (
        <div style={{backgroundImage:`url(${img})`,
            backgroundPosition:'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100vw',
            height: '180vw'}}>
            <Header></Header>
            <ImageForm/>



        </div>
    );
}

const ImageForm = ()=>{


    const [image,setImage] = useState()
    const [isFilePicked, setIsFilePicked] = useState(false);
    const [PredictionGot,setPredictionGot] = useState(false)
    const [prediction,setPrediction] = useState('')

    const changeHandler = (event) => {
        setImage(event.target.files[0]);
        setIsFilePicked(true);

    };


    const predict = ()=>{
        let formData = new FormData();
        formData.append("image", image);
        axios.post('http://127.0.0.1:8000/models_api/cats_vs_dogs/predict/',formData,{
            headers: {
                'Content-Type': 'multipart/form-data'
            }}).then(
            res =>{
                setPredictionGot(true)
                setPrediction(res.data.prediction)
            }
        ).catch(err=>{
            console.log(err)
        })
    }

    return(
        <div>
            <input type="file"
                   accept="image/jpeg,image/png,image/gif"
                   onChange={changeHandler} className={'btn-dark'}/>
            <button onClick={predict} className={'btn-danger'}>Predict</button>
            {PredictionGot ? (
                <>
                    <div style={{color:'red',fontSize:'50pt',fontWeight:'bold'}}>OH WOW IT IS A {prediction}</div>
                </>
            ): (
                <>
                </>
            )}

        </div>
    );
}



function Header(){

    return(
        <header style={{width:'100%'}} className={'d-flex p-2 justify-content-evenly m-2'}>
            <div>Projects</div>
            <div>Courses</div>


        </header>


    );
}