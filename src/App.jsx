import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ChessOffline from './components/ChessOffline/ChessOffline'

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-navBlue">
        <Header />
            <div className="flex-grow flex items-center justify-center">
                <ChessOffline />
            </div>
        <Footer />
    </div>
  )
}

export default App
