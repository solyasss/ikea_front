import React from "react";
import { Link } from "react-router-dom";
import Payment from "../components/Payment/Payment";
import Headers from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function PaymentPage() {
    return (
        <>
            <Headers />
            <div>
                <Payment />
            </div>
            <Footer />
      
        </>
    );
}

export default PaymentPage;
