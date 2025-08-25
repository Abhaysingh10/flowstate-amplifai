import React from 'react';
import { useSelector } from 'react-redux';
import { increment, decrement, reset } from './exampleSlice';
import useAppDispatch from '../../hooks/useAppDispatch';

const ExampleCounter = () => {
  const dispatch = useAppDispatch();
  const count = useSelector((state) => state.example.count);

  return (
    <div style={{ padding: 16 }}>
      <h2>Example Counter</h2>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button onClick={() => dispatch(decrement())}>-</button>
        <span>{count}</span>
        <button onClick={() => dispatch(increment())}>+</button>
        <button onClick={() => dispatch(reset())}>Reset</button>
      </div>
    </div>
  );
};

export default ExampleCounter;





