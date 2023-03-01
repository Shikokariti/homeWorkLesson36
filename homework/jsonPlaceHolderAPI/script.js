let posts = '/posts';
let comments = '/comments';
let albums = '/albums';
let contents = [posts,comments,albums];
function createAPI(content) {
    return fetch('https://jsonplaceholder.typicode.com' + content);
}
async function getAPI(content) {
    let API = await createAPI(content);
    API.json().then((data)=>{console.log(data)});
}
contents.forEach((content)=>{
    getAPI(content);
});
