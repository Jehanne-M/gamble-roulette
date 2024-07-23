'use client';
import { useRouter } from 'next/navigation';
import { useStore as itemsStore } from '../store/itemStore';
import { invoke } from '@tauri-apps/api/tauri';
import { Items } from '../types/Items';
import { Roulette, useRoulette } from 'react-hook-roulette';

const Gamble = () => {
  const { items, updateItems } = itemsStore();
  const { roulette, onStart, onStop, result } = useRoulette({ items });

  const router = useRouter();

  const onSetting = async () => {
    // NextJSでビルドする時にダイアログとWindow系がSSRの問題で、ビルドエラーになるので、動的にインポートしてる
    const { open } = await import('@tauri-apps/api/dialog');
    const path = open({
      title: '設定ファイルの選択',
      multiple: false,
      directory: false,
      filters: [
        {
          name: 'json File',
          extensions: ['json'],
        },
      ],
    });

    path
      .then((result) => {
        if (Array.isArray(result)) {
          return;
        } else {
          fetchItems(result);
        }
      })
      .catch((error) => {
        alert(error);
      });
  };

  const fetchItems = async (path: string | null) => {
    if (path === null) {
      return;
    }
    await invoke<Items[]>('read_settings', { path })
      .then((result) => {
        updateItems(result);
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className='mt-2 vstack items-center container'>
      <Roulette roulette={roulette} />
      <div className='hstack'>
        <button type='button' onClick={onStart}>
          Start
        </button>
        <button className='m-2' type='button' onClick={onStop}>
          Stop
        </button>
        <button
          onClick={() => {
            router.push('/settings');
          }}
        >
          設定
        </button>
        <button className='m-2' onClick={onSetting}>
          設定読み込み
        </button>
      </div>
      <p>結果は....{result}!!</p>
    </div>
  );
};
export default Gamble;
