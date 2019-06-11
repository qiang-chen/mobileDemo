define([], function() {
    function ajax(opt) {
        return new Promise((resolve, reject) => {
            var xhr = null;
            xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4 && xhr.status == 200) {
                    if (xhr.response) {

                        resolve(JSON.parse(xhr.response))
                    } else {
                        reject(xhr.statusText)
                    }
                }
            }
            if (opt.type == 'get') {
                xhr.open(opt.type, opt.url + '?' + opt.data, opt.async);
                xhr.send();
            } else if (opt.type == 'post') {
                xhr.open(opt.type, opt.url, opt.async);
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.send(formateObject(opt.data))
            }

            function formateObject(data) {
                let str = '';
                for (let key in data) {
                    str += key + '=' + data[key] + "&";
                }
                return str.replace(/\&$/g, '');
            }
        })
    }
    return ajax;
})