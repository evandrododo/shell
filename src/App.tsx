import { Suspense, useState } from 'react'
import './App.css'
import ShellCanvas from './ShellCanvas'

function App() {

  return (
    <Suspense fallback={null}>
      <ShellCanvas />
    </Suspense>
  );
}

export default App
