"use strict";

import {buildNavigation} from './navi/navi';

export class Main {
    static main() {
        const navigationComponent = buildNavigation({clickCallback: clickOnNavi});
        navigationComponent.apply();
    }
}

const clickOnNavi = (item) => {
    console.log('click on navi item', item);
};

window.Main = Main;
if (!!(window.addEventListener))
    window.addEventListener("DOMContentLoaded", Main.main);
else // MSIE
    window.attachEvent("onload", Main.main);