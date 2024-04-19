import './Home.css'
import Trending from './Trending/Trending'
export default function Home(){
    return (
        <>
        <div className="Home-container">
            <h1>Welcome to JellyFish</h1>
        </div>
        <Trending />
        </>
    )
}