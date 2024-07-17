const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhZmRmZTQ3YTQ0NzU2ZTI5MDAyNTcxNWE2YjQyZDhkNSIsIm5iZiI6MTcyMDU1MTg4Mi44MzAxMDcsInN1YiI6IjY2MDNkNTE3NjA2MjBhMDE3YzMwMjY0OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kW6FWbNBxEum0GSPLqFOf-LQu3BMA-50-IJXe_Hd3w8'
    }
};
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
getUserInfo(currentId).then(result => {
    const uploadPath = '/upload/';
    const imgPath = uploadPath+result.profile;
    if (result) {
        document.getElementById('myProfile').src = result.profile ? imgPath : "/dist/image/person-circle.svg";
    }
});