function appendFormdata(FormData, data, name) {
    name = name || '';
    if (typeof data === 'object') {
        $.each(data, function(index, value) {
            if (name == '') {
                appendFormdata(FormData, value, index);
            } else {
                appendFormdata(FormData, value, name + '[' + index + ']');
            }
        })
    } else {
        FormData.append(name, data);
    }
}


var formData = new FormData(),
    your_object = {
        name: 'test object',
        another_object: {
            name: 'and other objects',
            value: 'whatever'
        }
    };
appendFormdata(formData, your_object);