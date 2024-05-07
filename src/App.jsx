import React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
  let [length, setLength] =useState(8)
  let [characterAllowed, setCharacterAllowed]= useState(false)
  let [numberAllowed, setNumberAllowed]= useState(false)
  let [password, setPassword]= useState("")
  let passRef= useRef(null)

  useEffect(()=>{
    generatePassword()
  },[numberAllowed, characterAllowed, length])

  let generatePassword= useCallback(()=>{
    let str= "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklnopqrstuvwxyz"
    let pass="";
    if (numberAllowed) str+="0123456789"
    if(characterAllowed) str+="!@#$%^&*()_+=-{}[]:'<?>/"
    for (let i=0; i<length; i++)
    {
      let randomVal= Math.floor((Math.random() * str.length)+1)
      pass+=str.charAt(randomVal)
    }
    setPassword(pass)
  }, [numberAllowed, characterAllowed, length])
  
  let copyText= ()=>{
    passRef.current.select()
    window.navigator.clipboard.writeText(password)
  }
  return (
    <>
    
      <div id="transparent" className=' block  mx-auto mt-28 max-w-lg backdrop-blur-sm border border-solid border-white   p-6 rounded-lg '>
        <div id="inputArea" className='text-xl' >
        <h1 className="font-extrabold text-3xl text-white">Password Generator</h1>
        <div className=' my-3 border-solid border-orange-900 border-2 rounded-md'>
        <input type="text" name="" id="" value={password} readOnly ref={passRef} className='p-1 w-5/6' />
        <button onClick={copyText} className=' bg-orange-900 text-black p-1 w-1/6  font-semibold hover:bg-orange-800 hover:text-white'>Copy</button>
        </div>
        
        </div>
        <div className='mt-3 flex gap-x-3 items-center text-white font-semibold' id="inputArea">
  <div className=' flex gap-x-1 items-center'>
  <input type="range" defaultValue={length} name="" id="" min={3} max={20} onChange={(e)=>{setLength(e.target.value)}} className='cursor-pointer ' />
  <label> Length: {length} </label>
</div>

<div className='flex gap-x-1 items-center'>
  <input type="checkbox" name="" id="" defaultChecked={numberAllowed} onChange={()=>{setNumberAllowed((prev)=> !prev)}}/>
  <label>Numbers</label>
</div>

<div className='flex gap-x-1 items-center'>
  <input type="checkbox" name="" id="" defaultChecked={characterAllowed} onChange={()=>setCharacterAllowed((prevChar)=>!prevChar)}/>
  <label>Characters</label>
</div>
</div>
      </div>
    
    


    
      
    </>
  )
}

export default App
