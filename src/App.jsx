import Dummy from './Dummy'
import './App.css'
import Web3Provider from './context/Web3Provider'

function App() {
  return (
    <>
     <Web3Provider>
       <Dummy></Dummy>
     </Web3Provider>
    </>
  )
}

export default App
