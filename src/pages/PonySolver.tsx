import React from "react";
import { createRoot } from "react-dom/client";

import divToBody from "../global/util/divToBody";
import { Header } from "../features/navigation/components/container/header";
import { Footer } from "../features/navigation/components/container/footer";

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import '../global/css/global.css';
import { GameSolverUi } from "../features/ponySolver";
import { Provider } from "react-redux";
import store from "../global/redux/store";

function PonySolver() {
    return (
        <Provider store={store} >
        <div className='footer-container'>
            <div>
                <Header />
                <GameSolverUi />
            </div>
            <Footer />
        </div>
        </Provider>
    );
}

const reactContainer = divToBody();
if (reactContainer) {
    const reactRoot = createRoot(reactContainer);
    reactRoot.render(<PonySolver />);
}
else {
    console.log('Failed to load PonySolver into the DOM');
}
