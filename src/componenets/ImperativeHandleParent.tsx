import { useRef } from 'react';
import ImperativeHandleComponent, {
  CounterRef,
} from './ImperativeHandleComponent';

export const ImperativeHandleParent = () => {
  const counterRef = useRef<CounterRef | null>(null);
  return (
    <div>
      <ImperativeHandleComponent ref={counterRef} />
      <button onClick={() => counterRef.current?.reset()}>Reset</button>
    </div>
  );
};
