import './App.css'
import TitleBar from './titlebar';
import Explorer from './explorer';
import Sidebar from './sidebar';
import Editor from './Editor/editor';
function App() {

  return (
    <>
    <div className='h-screen flex flex-col overflow-hidden'>
        <TitleBar/>
      <div className='w-full h-full flex flex-1 overflow-hidden'>
        <Sidebar/>
        <Explorer/>
        <Editor/>
      </div>
    </div>
    </>
  )
}

export default App
