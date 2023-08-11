import React from "react";
import { CategoryItem, categories } from "./components";

// import './styles/App.styles.scss';

function App() {
    return (
        <>
            <h1>What's on your mind?</h1>
            <div className="categories-container">
                {categories.map(item => {
                    return (
                        <CategoryItem 
                            key={item.id} 
                            {...item} 
                        />
                    );
                })}
            </div>
        </>
    );
}

export default App;
