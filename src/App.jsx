import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [isNumberAllow, setIsnumberAllow] = useState(false);
  const [isCharAllow, setIsCharAllow] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (isNumberAllow) str += '0123456789';
    if (isCharAllow) str += '!@#$&*?%';

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, isCharAllow, isNumberAllow, setPassword]); // setPassword is for optimization

  useEffect(passwordGenerator, [length, isCharAllow, isNumberAllow, passwordGenerator]);

  const copyPassToClip = useCallback(() => {

    // The 'window' object is safely accessible in React because it runs entirely on the client-side.
    // Note: In Next.js, direct window access should be handled carefully due to server-side rendering (SSR).

    passwordRef.current?.select(); // for select effect
    passwordRef.current?.setSelectionRange(0, length);

    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      {/* outer wrap div */}
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-6 py-4 my-8 mt-20 bg-gray-700 text-orange-400'>
        {/* Title text */}
        <h1 className='text-center text-2xl my-3'>Password Generator</h1>
        {/* input box outer div*/}
        <div className='flex shadow rounded-lg mb-4 bg-black'>
          {/* input box */}
          <input type="text"
            value={password}
            className='outline-none w-full py-1 px-3'
            placeholder='Password'
            readOnly
            ref={passwordRef}
          />
          {/* copy button */}
          <button className='bg-amber-600 text-xl hover:bg-amber-500 hover:duration-200 text-white p-3 rounded-r-lg cursor-pointer' onClick={copyPassToClip}>Copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          {/* Password Range */}
          <div className='flex items-center gap-x-2'>
            <input type="range" min={8} max={32} value={length} className='cursor-pointer' onChange={(e) => { setLength(e.target.value) }} />
            <label>Length {length} </label>
          </div>
          {/* number checkbox */}
          <div className='flex items-center gap-x-2'>
            <input type="checkbox" defaultChecked={isNumberAllow} onChange={() => setIsnumberAllow((prev) => !prev)} />
            <label >Numbers</label>
          </div>
          {/* Character checkbox */}
          <div className='flex items-center gap-x-2'>
            <input type="checkbox" defaultChecked={isCharAllow} onChange={() => setIsCharAllow((prev) => !prev)} />
            <label>Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
