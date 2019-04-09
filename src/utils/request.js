const headers = new Headers({
    "Accept": "application/json",
    "Content-Type": "application/json"
});

function get(url) {
    return fetch(url, {
        method: "GET",
        headers
    }).then(response => {
        handleResponse(url, response);
    }).catch(err => {
        console.log(`Request failed. URL: ${url}, Message: ${err}`);
        return Promise.reject({
            error: {
                message: "Request failed"
            }
        });
    });
}

function post(url, data) {
    return fetch(url, {
        method: "POST",
        headers,
        body: data
    }).then(response => {
        handleResponse(url, response);
    }).catch(err => {
        console.log(`Request failed. URL: ${url}, Message: ${err}`);
        return Promise.reject({
            error: {
                message: "Request failed"
            }
        });
    });
}

function handleResponse(url, response) {
    if (response.status === 200) {
        return response.json();
    } else {
        console.log(`Request failed. URL: ${url}`);
        return Promise.reject({
            error: {
                message: "Request failed"
            }
        });
    }
}

export {get, post};