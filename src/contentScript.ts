let KEYCODE_TAB = 9;
var rules;
var tab_and_focus = false;

document.addEventListener('keydown', (event) => {
    let key = event.key;
    let code = event.keyCode;
    let element = <HTMLInputElement>document.getElementById("new_comment_field");

    if(element && 
       element == document.activeElement && 
       element?.value[0] == '!') {

        if(key == 'Tab' || code == KEYCODE_TAB) {
            element.focus();
            event.preventDefault();
        }
        
        console.log(`Key pressed ${key} \r\n Key code value: ${code}`);
        console.log(element?.value); 

        let tokens = element?.value.split(' ');
        let token_len = tokens.length;
    }
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
                rules = JSON.parse(d)
            })

        }
    })
    .catch(error => {
        console.error("There was an error!", error);
    })
}
