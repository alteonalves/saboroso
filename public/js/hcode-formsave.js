HTMLFormElement.prototype.save = function () {

    const form = this;

    return new Promise((resolve, reject) => {
        form.addEventListener('submit', e => {

            e.preventDefault();

            const formData = new FormData(form);

            fetch(form.action, {
                method: form.method,
                body: formData
            })
                .then(response => response.json())
                .then(json => {
                    resolve(json);
                }).catch(err=>{
                    reject(err);
                });

        });
    });


}