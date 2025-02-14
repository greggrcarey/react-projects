import React, { useState } from 'react';
import Menu from './Menu';
import Categories from './Categories';
import items from './data';

const allCategories = ['all', ...new Set(items.map((item) => item.category))]

function App()
{
  const [menu, setMenu] = useState(items);
  const [categories, setCategories] = useState(allCategories);

  const filterItems = (category) =>
  {
    if (category === 'all')
    {
      setMenu(items)
      return;
    }
    const newItems = items.filter((item) => item.category === category)
    setMenu(newItems);
  }

  return <main className='container'>
    <section className="menu">
      <div className="title">
        <h2>our menu</h2>
      </div>
      <div className="underline"></div>
      <Categories categories={categories} filterItems={filterItems} />
      <Menu items={menu} />
    </section>
  </main>
}

export default App;
