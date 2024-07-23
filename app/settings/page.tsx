'use client';
import React from 'react';
import { Items } from '../types/Items';
import { useStore as itemSettingStore } from '../store/itemSettingStore';
import { useStore as itemsStore } from '../store/itemStore';
import { useRouter } from 'next/navigation';
import ColorComboBox from '../components/ColorComboBox';

const Page = () => {
  const router = useRouter();

  const {
    items,
    name,
    bg,
    color,
    weight,
    updateName,
    updateBg,
    updateColor,
    updateWeight,
    addItem,
    removeItem,
    updateItem,
  } = itemSettingStore();

  const adaptaionItems = itemsStore().updateItems;

  const handleAdaptation = () => {
    items ? adaptaionItems(items) : {};
    router.push('/gamble');
  };

  const handleAddItem = () => {
    const newItem: Items = { id: Date.now(), name, bg, color, weight };
    addItem(newItem);
  };

  const handleRemoveItem = (id: number) => {
    removeItem(id);
  };

  const handleUpdateItem = (id: number) => {
    const updatedItem: Items = { id, name, bg, color, weight };
    updateItem(id, updatedItem);
  };

  return (
    <div>
      <h1>設定ページ</h1>
      <button onClick={handleAdaptation}>反映</button>
      <div className='m-2'>
        <div>
          <label>
            値:
            <input
              className='m-2'
              type='text'
              value={name}
              onChange={(e) => updateName(e.target.value)}
            />
          </label>
        </div>
        <div className='object-center'>
          <ColorComboBox label='背景色:' value={bg} updateValue={updateBg} />
          <ColorComboBox
            label='文字色:'
            value={color}
            updateValue={updateColor}
          />
        </div>
        <div className='m-2'>
          <label>
            範囲:
            <input
              type='number'
              className='min-w-min'
              value={weight || 0}
              onChange={(e) => updateWeight(Number(e.target.value))}
            />
          </label>
        </div>
      </div>
      <button className='m-2' onClick={handleAddItem}>
        アイテムを追加
      </button>
      <ul>
        {items?.map((item) => (
          <li key={item.id}>
            {item.name}
            <button
              className='m-2'
              onClick={() => (item.id ? handleRemoveItem(item.id) : {})}
            >
              削除
            </button>
            <button onClick={() => (item.id ? handleUpdateItem(item.id) : {})}>
              更新
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
