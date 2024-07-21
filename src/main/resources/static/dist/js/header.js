async function getUserInfo(currentId) {
    try {
        const url = '/user/info/' + currentId;
        const config = {
            method: 'GET'
        };
        const resp = await fetch(url, config);
        const result = await resp.json();
        return result;
    } catch (e) {
        console.log(e);
    }
}
if (typeof currentId !== 'undefined' && currentId !== null) {
    getUserInfo(currentId).then(result => {
        const uploadPath = '/upload/';
        const imgPath = uploadPath + result.profile;
        if (result) {
            document.getElementById('myProfile').src = result.profile ? imgPath : "/dist/image/person-circle.svg";
        }
    })
}
