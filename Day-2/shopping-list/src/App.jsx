import React, { useState, useEffect } from 'react';
import ItemList from './components/ItemList';
import ItemForm from './components/ItemForm';

function App() {
  const [items, setItems] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  // Thêm mặt hàng mới
  const addItem = (name) => {
    const newItem = { id: Date.now(), name, purchased: false };
    setItems([...items, newItem]);
  };

  // Đánh dấu đã mua
  const toggleItem = (id) => {
    setItems(items.map(item => item.id === id ? { ...item, purchased: !item.purchased } : item));
  };

  // Chỉnh sửa mặt hàng
  const startEditItem = (item) => setEditingItem(item);
  const saveEditItem = (id, newName) => {
    setItems(items.map(item => item.id === id ? { ...item, name: newName } : item));
    setEditingItem(null);
  };

  // Xóa mặt hàng
  const deleteItem = (id) => setItems(items.filter(item => item.id !== id));

  // Xóa tất cả mặt hàng
  const clearAll = () => setItems([]);

  useEffect(() => {
    // Đọc danh sách mặt hàng từ localStorage
    const savedItems = JSON.parse(localStorage.getItem("items")) || [];
    setItems(savedItems);
  }, []);

  useEffect(() => {
    // Lưu danh sách mặt hàng vào localStorage khi có thay đổi
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <div className="flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-4">Shopping List</h1>
      <ItemForm addItem={addItem} editItem={saveEditItem} initialData={editingItem} />
      <ItemList
        items={items}
        toggleItem={toggleItem}
        deleteItem={deleteItem}
        startEditItem={startEditItem}
      />
      <button onClick={clearAll} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 mt-4 rounded">
        Clear All
      </button>
    </div>
  );
}

export default App;