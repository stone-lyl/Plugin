import React from 'react';
import { Link } from 'react-router-dom';


const Page1List = () => {
    let obj = [
        { num: 1, name: 'one' },
        { num: 2, name: 'two' },
        { num: 3, name: 'three' },
        { num: 4, name: 'four' },
    ];
    return (
        <div>
            <h2> page1 list </h2>
            <ul>
                {
                    obj.map(ele => (
                        <li key={ele.num} >
                            <Link to={`/page1/${ele.num}`} >
                                {ele.name} page 
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default Page1List;