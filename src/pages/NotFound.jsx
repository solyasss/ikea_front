import React from "react";
import {Link} from "react-router-dom";
import Headers from "../components/Header/Header.jsx";
import Footer from "../components/Footer/Footer.jsx";

import sadCat from '../assets/img/not-found/sad-cat.png';


function NotFound() {

    const pageStyle = {
        minHeight: '80vh',
        backgroundImage: `url(${sadCat})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        position: 'relative',
        overflow: 'hidden',
    };

    const overlayStyle = {
        position: 'absolute',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.55)',
        zIndex: 0,
    };

    const contentStyle = {
        position: 'relative',
        zIndex: 1,
        color: '#fff',
    };


    return (
        <>
            <Headers/>

            <style>{`
        .btn-soft-green {
          background-color: #839D9A;
          border-color: #839D9A;
          color: #fff;
        }
        .btn-soft-green:hover,
        .btn-soft-green:focus {
          background-color: #5d706e;
          border-color: #5d706e;
          color: #fff;
        }
      `}</style>

            <main
                className="mt-3 d-flex flex-column justify-content-center align-items-center text-center"
                style={pageStyle}
            >
                <div style={overlayStyle}/>

                <div style={contentStyle}>
                    <h1 className="display-4 fw-bold mb-3">Упс! 404</h1>
                    <p className="lead mb-4">
                        Здається, ви звернули не туди — такої сторінки не існує 😿
                    </p>

                    <Link to="/" className="btn btn-soft-green px-4">
                        Повернутися на головну
                    </Link>
                </div>
            </main>

            <Footer/>

        </>

    );
}

export default NotFound;
