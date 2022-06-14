import { useEffect, useRef, useState } from "react";
import { atom, useAtom } from 'jotai';

const countAtom = atom(0);
const count2Atom = atom(0);
//atom creates thee configuration for our atom
//in case we use the same atom for both useAtoms they both will share the same valaue
//const count2Atom = countAtom will also share both values


export const Counter1 = () => {
  const [count, setCount] = useAtom(countAtom);
  //functions as an useState 

  return(
    <div>
      {count}
      <button
        onClick={() => setCount((c) => c + 1)}
      >
        +1
      </button>
    </div>
  )

}

export const Counter2 = () => {
  const [count, setCount] =  useAtom(count2Atom);

  return(
    <div>
      {count}
      <button
        onClick={() => setCount((c) => c + 1)}
      >
        +1
      </button>
    </div>
  )

}
