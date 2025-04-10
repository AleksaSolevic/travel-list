import { useState, useEffect } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

export default function App() {

  const [items, setItems] = useState(() => {
    const storedItems = localStorage.getItem("tripItems");
    return storedItems ? JSON.parse(storedItems) : [];
  });
 
  useEffect(() => {
    localStorage.setItem("tripItems", JSON.stringify(items));
  }, [items]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  } 

  function handleDeleteItem(id) {
    setItems(items => items.filter(item => item.id !== id));
  }
  function handleToggleItem(id) {
    setItems(items => items.map(item => item.id === id ? {...item, packed: !item.packed} : item));
  }

  function handleClearList() {
    if(items.length === 0) {
      alert("List is already empty");
      return;
    }
    const confirmed = window.confirm("Are you sure you want to clear the list?");
 
    if(!confirmed) return;
    setItems([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
        onClearList={handleClearList} />
      <Stats items={items} />
    </div>
  )
}






 

 
