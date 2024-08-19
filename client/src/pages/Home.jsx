import React from "react";
import Header from "../components/Header";
import PlayZone from "../components/PlayZone";

const Home = () => {
    return (
        <div>
            <Header></Header>
            <PlayZone timeMode={5000}></PlayZone>
        </div>
    );

}
export default Home;