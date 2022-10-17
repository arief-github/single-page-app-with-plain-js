import Dashboard from "./views/Dashboard.js";
import Posts from "./views/Posts.js";
import Settings from "./views/Settings.js";

const pathToRegex = (path) => new RegExp("^" + path.replace(/\//g, "\\/").replace(/:\w+/g, "(.+)") + "$");

const getParams = (match) => {
    const values = match.result.slice(1);
    const keys = Array.from(match.route.path.matchAll(/:(\w+)/g)).map(result => result[1]);

    // console.log(Array.from(match.route.path.matchAll(/:(\w+)/g)));

    // return {};

    return Object.fromEntries(keys.map((key, i) => {
        return [key, values[i]];
    }))

}

const navigateTo = (url) => {
    history.pushState(null, null, url);
    router();
}

const router = async () => {
    console.log(pathToRegex("/posts/:id"))
    const routes = [
        {path: '/', view: Dashboard},
        {path: '/posts', view: Posts},
        {path: '/posts:id', view: Posts},
        {path: '/settings', view: Settings},
    ];

    // test each route for potential match
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            result: location.pathname.match(pathToRegex(route.path)),
        }
    })

    // cek di konsol apakah semua routenya masuk
    // console.log(potentialMatches);

    let match = potentialMatches.find(potentialMatch => potentialMatch.result !== null);
    
    // cek di konsol apakah route yang masuk itu cocok
    // console.log(match);

    // cek jika ada route yang tidak cocok/sesuai maka return to dashboard
    if(!match) {
        match = {
            route: routes[0],
            isMatch: true
        }
    }

    const view = new match.route.view(getParams(match));

    // console.log(match.route.view());

    // render content
    document.querySelector('#app').innerHTML = await view.getHtml(); 
}

// agar bisa kembali ke halaman route semula
window.addEventListener("popstate", router);

document.addEventListener('DOMContentLoaded', () => {
    // route pada url akan merespon ketika link telah diklik
    document.body.addEventListener('click', e => {
        if(e.target.matches("[data-link]")) {
            e.preventDefault();
            navigateTo(e.target.href);
        }
    })
   
    router();
});