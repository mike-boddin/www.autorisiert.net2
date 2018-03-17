export const jsonFetch = (url) => {
    return fetch(url).then((response) => {
        return response.json();
    })
};