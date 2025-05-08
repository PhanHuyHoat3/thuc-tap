import React from 'react';
import PropTypes from 'prop-types';

function Item({ item, toggleItem, deleteItem, startEditItem }) {
  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md rounded">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={item.purchased}
          onChange={() => toggleItem(item.id)}
          className="mr-2"
        />
        <span className={item.purchased ? 'line-through text-gray-500' : ''}>
          {item.name}
        </span>
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => startEditItem(item)}
          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={() => deleteItem(item.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.object.isRequired,
  toggleItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  startEditItem: PropTypes.func.isRequired,
};

export default Item;