import React from 'react';

function Footer (){
    const today = new Date();
    return(
        <footer className="footer">
            <p className="footer__text">
            &copy;Маршак, {today.getFullYear()}
            </p>
            <p className="footer__text">
                Сделано студентами&#160;<a href="https://praktikum.yandex.ru/" target="_blank" className="footer__link">
                 Яндекс.Практикум
                </a>
            </p>
        </footer>
    )
}

export default Footer;