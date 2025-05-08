import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function ItemForm({ addItem, editItem, initialData }) {
  const [name, setName] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (initialData) {
      editItem(initialData.id, name); // Chỉnh sửa mặt hàng
    } else {
      addItem(name); // Thêm mặt hàng mới
    }
    setName('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full md:w-1/2 mb-4">
      <h2 className="text-xl mb-2">{initialData ? 'Edit Item' : 'Add Item'}</h2>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter item name"
        className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2"
      />
      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded"
      >
        {initialData ? 'Save Changes' : 'Add Item'}
      </button>
    </form>
  );
}

ItemForm.propTypes = {
  addItem: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};

export default ItemForm;