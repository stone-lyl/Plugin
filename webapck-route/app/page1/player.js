import React from 'react';
import { Link } from 'react-router-dom';

const Player = (props) => {
    let num = parseInt(props.match.params.number, 10);
    console.log(props);
    if (num === 3) {
        return <h3> i know you are three! </h3>
    } else {
        return (
            <div>
                <h3> i don't know it! </h3>
                <p> haha, this is {num} son</p>
                <Link to="/page1"> Back </Link>
            </div>
        );
    }
}


export default Player;