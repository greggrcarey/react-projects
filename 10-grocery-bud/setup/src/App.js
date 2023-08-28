import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'

function App()
{
  const [name, setName] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [alert, setAlert] = useState({ show: false, msg: '', type: '' })

  const handleSubmit = (e) =>
  {
    e.preventDefault();
    if (!name)
    {
      //display alert
      showAlert(true, 'danger', 'please enter a value')
    }
    else if (name && isEditing)
    {
      //deal with edit
      setList(list.map((item) => {
        if(item.id === editId){
          return {...item, title: name}
        }
        return item
      }))
      setName('');
      setEditId(null);
      setIsEditing(false);
      showAlert(true, 'success', 'value changed');
    }
    else
    {
      showAlert(true, 'success', 'item added');
      //show alert
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName('');
    }
  }

  const showAlert = (show = false, type = "", msg = "") =>
  {
    setAlert({ show, type, msg })
  }

  const clearList = () =>
  {
    showAlert(true, 'danger', 'empty list');
    setList([]);
  }

  const removeItem = (id) =>
  {
    showAlert(true, 'danger', 'item removed');
    setList(list.filter((item) => item.id !== id));
  }

  const updateItem = (id) =>
  {
    const itemToUpdate = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditId(id)
    setName(itemToUpdate.title)
  }


  return <section className="section-center">
    <div className="grocery-form">
      <form onSubmit={handleSubmit} className="grocery-form">
        {alert.show && <Alert {...alert} removeAlert={showAlert} list={list} />}
        <h3>grocery buddy</h3>
        <div className="form-control">
          <input type="text" className='grocery' placeholder='you know, eggs?' value={name} onChange={(e) => setName(e.target.value)} />
          <button type='submit' className="submit-btn">
            {isEditing ? 'edit' : 'submit'}
          </button>
        </div>
      </form>
      {list.length > 0 && (<div className="grocery-container">
        <List items={list} removeItem={removeItem} updateItem={updateItem} />
        <button className="clear-btn" onClick={clearList}>
          clear items
        </button>
      </div>)}

    </div>
  </section>
}

export default App
