import React from "react";

export function Footer() {

    return (
        <footer className="pt-2 mt-5 vy-on-secondary-text" >
            <div className="container d-flex flex-md-row flex-column justify-content-between" >
                <div className="d-flex flex-column order-md-1 mb-2">
                    <div className="fs-7 mt-2 fs-small">
                        Designed and developed by:
                        <br />
                        <a className="vy-on-secondary-text" target="_blank" href="https://github.com/Vyrcrezen">Vyrcrezen</a> 
                    </div>
                </div>
            </div>
        </footer>
    );
}
