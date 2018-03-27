import {jsonFetch} from '../tools/fetchr';
import {htmlToElement} from '../tools/elementr';
import defaultNavigation from './navigation.json';




// would be nice to return a Navigation-Class-Object, which is also registered in `window`
export class Navigation{
    "use strict;";

    constructor ({src = '', el = document.body, clickCallback = (clickedItem)=>{}}){
        this.source = src;
        this.element = el;
        this.clickCallBack = clickCallback;
    }

    async apply(){
        if (!this.source) {
            this.navigationConfig = defaultNavigation;
        } else {
            this.navigationConfig = await jsonFetch(source);
        }
        this._appendToDom();
    }

    _appendToDom() {
        console.log('apply navigation as class', this.navigationConfig);
        let items = '';
        for (let key in this.navigationConfig.items) {
            const value = this.navigationConfig.items[key];
            items += `<a data-nav-target="${value}" class="nav-item nav-link" href="#">${key}</a>`;
        }
        const navEl = htmlToElement(`
<nav class="navbar navbar-expand-sm navbar-light bg-light">
  <a class="navbar-brand" href="/">${this.navigationConfig.brand}</a>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav" >
    ${items}
    </div>
  </div>
</nav>`);
        for(let child in navEl.childNodes){
            console.log('child', navEl.childNodes[child]);
        }
        let nodes = navEl.querySelectorAll("[data-nav-target]");
        nodes.forEach(n => {
            let mdFile = n.getAttribute('data-nav-target');
            n.onclick = () => this.clickCallBack(mdFile);
        });
        this.element.appendChild(navEl);
    }
}