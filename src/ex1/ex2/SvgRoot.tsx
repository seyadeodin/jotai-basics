import { atom, useAtom } from 'jotai';
import { useEffect, useRef } from 'react';

type Point = [number, number];

const dotsAtom = atom<Point[]>([]);
const numberOfDotsAtom = atom(
  (get) => get(dotsAtom).length
)
//derive atom created from another atom
//we use get a function which returns a value of any atom

//fist argument is usually null
//get, set, update
//updates comes from the invocation of the update aatom

const drawingAtom = atom(false);

const handleMouseDownAtom = atom(null, (get, set) => {
  set(drawingAtom, true);
})

const handleMouseUpAtom = atom(null, (get, set) => {
  set(drawingAtom, false);
})

const handleMouseMoveAtom = atom(
  null,
  (get, set, update: Point) => {
    if (get(drawingAtom)) {
      set(dotsAtom, (prev) => [...prev, update]);
    }
  }
)

const SvgDots = () => {
  const [dots] = useAtom(dotsAtom);

  return (
    <g>
      {dots.map(([x, y]) => (
        <circle cx={x} cy={y} r="2" fill="#aaa" />
      ))}
    </g>
  )
}

export const SvgRoot = () => {
  const [, setDots] = useAtom(dotsAtom);
  const [, handleMouseMove] = useAtom(handleMouseMoveAtom);
  const [, handleMouseUp] = useAtom(handleMouseUpAtom);
  const [, handleMouseDown] = useAtom(handleMouseDownAtom);

  return (
    <>
      <svg
        width="200"
        height="200"
        viewBox="0 0 200 200"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={(e) => {
          handleMouseMove([e.clientX, e.clientY])
        }}
      >
        <rect width="200" height="200" fill='#eee' />
        <SvgDots/>
      </svg>
        <p>
          Commits: {useCommitCount()}
        </p>
    </>
  )
}

export const Stats = () => {
  // const [ dots ] = useAtom(dotsAtom);
  const [numberOfDots] = useAtom(numberOfDotsAtom);

  return (
    <ul>
      <li>Dots: {numberOfDots}</li>
    </ul>
  )
}

export const useCommitCount = () => {
  const commitCountRef = useRef(0);

  useEffect(() => {
    commitCountRef.current +=1;
  })

  return commitCountRef.current;
}