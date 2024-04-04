import React from 'react';
import './MainPageContent.css'; // CSS dosyasını import edin
import resim1 from './resim1.png';

const MainPage = () => {
    return (
        <div className="main-page-container">

            <div className='container'>
                <div className="text-container">
                    <h1>A Voice Rising with Clubs, A World Colorful with Events!</h1>
                </div>
                <div className="image-container">
                    <img src={resim1} alt="Event illustration" />

                </div>
            </div>

        </div>
    );
}

export default MainPage;
