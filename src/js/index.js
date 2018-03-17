import navi from './navi/navi.js';

export class Main {
    static main() {
        navi({
            clickCallback: clickOnNavi
        }).then(f => f.apply());
    }
}

const clickOnNavi = (item) => {
    console.log('HELLO ', item);
};

window.Main = Main;
if (!!(window.addEventListener))
    window.addEventListener("DOMContentLoaded", Main.main);
else // MSIE
    window.attachEvent("onload", Main.main);