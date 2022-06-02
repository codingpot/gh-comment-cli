document.addEventListener('keydown', (event) => {
    let key = event.key;
    let code = event.code;
    let element = <HTMLInputElement>document.getElementById("new_comment_field");

    console.log(`Key pressed ${key} \r\n Key code value: ${code}`);
    console.log(element?.value);
}, false);

let url = window.location.href;
let base_url = url.replace("https://github.com/", '');

if(base_url.split('/').length >= 2) {
    console.log("url: " + base_url);

    let username = base_url.split('/')[0];
    let reponame = base_url.split('/')[1];

    console.log("username: " + username);
    console.log("reponame: " + reponame);

    let target_filename = 'ghc-auto-completion.json';
    let target_url = `https://raw.githubusercontent.com/${username}/${reponame}/main/${target_filename}`;
    fetch(target_url).then((r) => {
        console.log('1')
        console.log(r.status)

        if(r.status != 404) {
            r.text().then((d) => {
                let completions = JSON.parse(d)

                // TODO
                // do something with parsed JSON

            })

        }
    })
    .catch(error => {
        console.error("There was an error!", error);
    })
}
