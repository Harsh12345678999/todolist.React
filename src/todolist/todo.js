import React, { useEffect, useState } from 'react';
import "./style.css"

const getLocalStorage = () => {
    const lists = localStorage.getItem("mytodo");
    if (lists) {
        return JSON.parse(lists)
    } else {
        return [];
    }
}
const Todom = () => {
    const [inputValue, setInputValue] = useState("");
    const [items, setItems] = useState(getLocalStorage());
   
    const addItems = () => {
        if (!inputValue) {
            alert("please fill data")
        } else {
            const myNewInput = {
                id: new Date().getTime().toString(),
                name: inputValue,
            }
            setItems([...items, myNewInput])
            setInputValue([]);
        
        }
    }
    useEffect(() => {
        localStorage.setItem("mytodo", JSON.stringify(items));
    }, [items]);
    const deleteItems = (index) => {
        const deleted = items.filter((curElem) => {
            return curElem.id !== index
        });
        setItems(deleted);
    }
    const editItems = (index) => {
        const edited = items.find((curElem) => {
            return curElem.id === index;
        });
        setInputValue(edited.name);
   
    }
    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    <figure>
                        <figcaption>Add Your Todo Items ✌️</figcaption>
                    </figure>
                    <div className='input'>
                        <input type="text" placeholder='Add Item ✍️' className='form-control'
                            value={inputValue}
                            onChange={(event) => setInputValue(event.target.value)}
                        />
                        <i className='fa fa-check add-btn' onClick={addItems}></i>
                    </div>
                    <div className='showItems'>
                        {items.map((curElem) => {
                            return (
                                <>
                                    <div className='eachItem' key={curElem.id}>
                                        <h2>{curElem.name}</h2>
                                        <div className='todo-btn'>
                                            <i className='fas fa-edit add-btn' onClick={() => editItems(curElem.id)}></i>
                                            <i className='fas fa-trash-alt add-btn' onClick={() => deleteItems(curElem.id)}></i>
                                        </div>
                                    </div>
                                </>
                            )
                        })}

                    </div>
                </div>
            </div>

        </>
    )
}

export default Todom
