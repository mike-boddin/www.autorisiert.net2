import {jsonFetch} from '../tools/fetchr';
import {htmlToElement} from '../tools/elementr';
import defaultNavigation from './navigation.json';

let element;
let navigationConfig;
let callback;

export default function ({source, el, clickCallback} = {
    source: '', el: document.body, clickCallback: (clickedItem) => {
    }
}) {
    // noinspection JSAnnotator
    element = el || document.body;
    callback = clickCallback || ((clickedItem) => {
        console.log('click on navi-item', clickedItem)
    });
    window.navcallback = callback;
    const ret = {apply: apply};

    return new Promise(function (resolve, reject) {
        if (!source) {
            navigationConfig = defaultNavigation;
            resolve(ret);
        } else {
            jsonFetch(source).then(val => {
                navigationConfig = val;
                resolve(ret);
            }, error => {
                reject(error);
            });
        }
    });
};

const apply = () => {
    console.log('apply navigation', navigationConfig);
    let items = '';
    for (let key in navigationConfig.items) {
        const value = navigationConfig.items[key];
        items += `<a onclick="navcallback('${value}');" class="nav-item nav-link" href="#">${key}</a>`;
    }
    const navEl = htmlToElement(`<nav class="navbar navbar-expand-sm navbar-light bg-light">
  <a class="navbar-brand" href="/">${navigationConfig.brand}</a>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">
    ${items}
    </div>
  </div>
</nav>`);
    element.appendChild(navEl);
};