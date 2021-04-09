import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';

const Index = () => {
    const [example, setExample] = useState();

    const foo = async () => {
        try {
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setExample(res);
        } catch (error) {
            console.error("Error: ", error);
        }
    }
    useEffect(() => {
        document.title = 'React UI Kit'
        foo();
    }, []);

    return (
        <>
            <h1>Base React UI Kit</h1>
            {example && example.data && example.data.length ?
                <ol>
                    {example.data.map((item, idx) => {
                        return (
                            <li
                                key={idx} //required
                                className="mb-1"
                            >
                                <span>{item.body}</span>
                            </li>
                        )
                    })}
                </ol>
                : <span>test</span>
            }
        </>
    )
}

export default withRouter(Index);
