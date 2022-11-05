import React, { useState } from 'react';

import * as ReactDOM from 'react-dom';

export default function Teste() {
    const [inputFields, setInputFields] = useState([
        { name: '', age: '' }
    ])

    const handleFormChange = (index, event) => {
        let data = [...inputFields];
        data[index][event.target.name] = event.target.value;
        setInputFields(data);
    }

    const addFields = (event) => {
        if (event.key === 'Tab') {
            let newfield = { name: '', age: '' }
            setInputFields([...inputFields, newfield])
        }
    }

    const submit = (e) => {
        e.preventDefault();
        console.log(inputFields)
    }

    const removeFields = (index) => {
        let data = [...inputFields];
        data.splice(index, 1)
        setInputFields(data)
    }

    return (
        <>
            <form onSubmit={submit}>
                {inputFields.map((input, index) => {
                    return (

                        <div key={index}>
                            <h6>{input.name}</h6>
                            <input
                                name='name'
                                placeholder='Nome'
                                value={input.name}
                                onChange={event => handleFormChange(index, event)}
                            />
                            <select name='age'
                                placeholder='Categoria'
                                value={input.age}
                                onChange={event => handleFormChange(index, event)}
                                onKeyDown={event => addFields(event)}    >
                                <option>aaaaaa</option>
                                <option>b</option>
                                <option>c</option>

                            </select>

                        </div>
                    )
                })}
                <button onClick={submit}>Submit</button>
            </form>
        </>


    );
}