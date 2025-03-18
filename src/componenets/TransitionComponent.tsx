import { useState, useTransition } from 'react';

export const TransitionComponent = () => {
  const [input, setInput] = useState<string>('');
  const [list, setList] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e) => {
    setInput(e.target.value);

    startTransition(() => {
      const list = [];
      for (let i = 0; i < 20000; i++) {
        list.push(e.target.value);
      }
      setList(list);
    });
  };
  return (
    <div className='flex flex-col items-start'>
      <h1 className='mb-10'>Practice: useTransition</h1>
      <label htmlFor='name' className='w-full'>
        <input
          type='text'
          id='name'
          value={input}
          className='bg-gray-50 border w-full border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          name='name'
          onChange={handleChange}
        />
      </label>
      {isPending
        ? 'Loading...'
        : list.map((item, index) => <p key={index}>{item}</p>)}
    </div>
  );
};
