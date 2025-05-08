import React from 'react';
import PropTypes from 'prop-types';
import Item from './Item';

function ItemList({ items, toggleItem, deleteItem, startEditItem }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-1 gap-4 w-full">
      {items.length === 0 ? (
        <p className="text-center text-lg text-gray-500">No items</p>
      ) : (
        items.map((item) => (
          <Item
            key={item.id}
            item={item}
            toggleItem={toggleItem}
            deleteItem={deleteItem}
            startEditItem={startEditItem}
          />
        ))
      )}
    </div>
  );
}

ItemList.propTypes = {
  items: PropTypes.array.isRequired,
  toggleItem: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  startEditItem: PropTypes.func.isRequired,
};

export default ItemList;