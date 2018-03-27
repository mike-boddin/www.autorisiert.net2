"use strict";

import {jsonFetch} from '../tools/fetchr';
import {htmlToElement} from '../tools/elementr';
import defaultNavigation from './navigation.json';


// Ice Factory
export const buildNavigation = ({   src = '',
                                    el = document.body,
                                    clickCallback = (clickedItem) => {}
                                }) => {

    const source = src;
    const element = el;
    const clickCallBack = clickCallback;
    let navigationConfig = null;

    return Object.freeze({apply});

    async function apply() {
        if (!source) {
            navigationConfig = defaultNavigation;
        } else {
            navigationConfig = await jsonFetch(source);
        }
        _appendToDom();
    }

    function _appendToDom() {
        console.log('apply navigation as class', navigationConfig);
        let items = '';
        for (let key in navigationConfig.items) {
            if (!navigationConfig.items.hasOwnProperty(key)) {
                continue;
            }
            const value = navigationConfig.items[key];
            items += `<a data-nav-target="${value}" class="nav-item nav-link" href="#">${key}</a>`;
        }
        const navEl = htmlToElement(`
<nav class="navbar navbar-expand-sm navbar-light bg-light">
  <a class="navbar-brand" href="/">${navigationConfig.brand}</a>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav" >
    ${items}
    </div>
  </div>
</nav>`);
        let nodes = navEl.querySelectorAll("[data-nav-target]");
        nodes.forEach(n => {
            let mdFile = n.getAttribute('data-nav-target');
            n.onclick = () => clickCallBack(mdFile);
        });
        element.appendChild(navEl);
    }
};
