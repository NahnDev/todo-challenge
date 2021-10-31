// import logo from './logo.svg';
import React from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import { Header, Menu } from "semantic-ui-react";
import MainPage from "./pages/MainPage";

function App() {
    return (
        <div className="App">
            <header>
                <Menu inverted style={{ borderRadius: 0, background: "teal" }}>
                    <Header
                        as="h1"
                        style={{ color: "white", margin: "0 0.5em" }}
                    >
                        Todo challenges
                    </Header>
                </Menu>
            </header>
            <MainPage></MainPage>
        </div>
    );
}

export default App;
