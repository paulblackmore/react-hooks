import { forwardRef, useState, Ref, useImperativeHandle } from 'react';

export type CounterRef = {
  reset: () => void;
};

const ImperativeHandleComponent = (_props: unknown, ref: Ref<CounterRef>) => {
  const [count, setCount] = useState(0);

  const reset = () => setCount(0);

  useImperativeHandle(ref, () => ({ reset }), []);

  return (
    <div>
      <h1 className='mb-10'>Practice: useImperativeHandle</h1>
      <p>Count: {count}</p>
      <div className='flex gap-2 items-center justify-center'>
        <button onClick={() => setCount(count - 1)}>Decrement</button>
        <button onClick={() => setCount(count + 1)}>Increment</button>
      </div>
    </div>
  );
};

export default forwardRef(ImperativeHandleComponent);
