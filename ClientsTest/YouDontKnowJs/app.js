const ajax = (url, callback, method = "GET") => {
    $.ajax({
        url: url,
        type: method,
        success: callback
    })
}

const callback = (data) => {
    console.log(data);
}

ajax("http://localhost:3000/user", callback)