import autocomplete from 'autocompleter'

var list_of_completions = [{label: 'dummy'}];

const KEYCODE_TAB = 9;
const GHC_DIV_ID = "ghc_completion";
const GHC_INPUT_ID = "ghc_completion_input";

var rules;
var ghc_div_open = false;

document.addEventListener('keyup', (event) => {
    let element = <HTMLInputElement>document.getElementById("new_comment_field");
    let ghc_div = <HTMLElement>document.getElementById(GHC_DIV_ID);

    if( element == document.activeElement &&
        ghc_div_open && 
        event.key == "!" ) {

        element!.value = "";

        let input_div = <HTMLInputElement>document.getElementById(GHC_INPUT_ID);
        autocomplete({
            input: input_div!,
            fetch: function(text, update) {
                text = text.toLowerCase();
                // you can also use AJAX requests instead of preloaded data
                var suggestions = list_of_completions.filter(n => n.label.toLowerCase().startsWith(text));
                update(suggestions);
            },
            onSelect: function(item) {
                input_div!.value = <string>item.label;
            },
            render: function(item, currentValue) {
                const itemElement = document.createElement("div");
                itemElement.textContent = <string>item.label;
                return itemElement;
            }
        });

        element.blur();
        input_div.focus();        
    }
});

document.addEventListener('keypress', (event) => {
    let key = event.key;
    let element = <HTMLInputElement>document.getElementById("new_comment_field");

    console.log(key);

    if(element && 
       element == document.activeElement && 
       key == "!") {

        console.log(element?.value);
        console.log(element?.value.length);

        let ghc_div = <HTMLElement>document.getElementById(GHC_DIV_ID);
        if(ghc_div == null) {
            let overlay_div = <HTMLElement>document.createElement("div");
            overlay_div.id = GHC_DIV_ID;
            overlay_div.style.cssText = "display: none; position: fixed; z-index: 1; left: 0; top: 0;   width: 100%; height: 100%; overflow: auto; background-color: rgb(0,0,0); background-color: rgba(0,0,  0,0.4);";

            let input_div = <HTMLElement>document.createElement("input");
            input_div.id = GHC_INPUT_ID;
            input_div.style.cssText = "position: absolute; top: 30%; left: 50%; width:40%; font-size: 25px; color: black; transform: translate(-50%,-50%); -ms-transform: translate(-50%,-50%);";
            overlay_div.appendChild(input_div);

            document.body.appendChild(overlay_div);
        }

        if(ghc_div_open == false){
            ghc_div = <HTMLElement>document.getElementById(GHC_DIV_ID);
            ghc_div.style.display = 'block';
            ghc_div_open = true;
        }
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
                // TODO: do something with d
                list_of_completions = d.split('\n');
                
                list_of_completions.forEach((entry, index) => {
                    list_of_completions[index] = {label: entry}
                })
            })

        }
    })
    .catch(error => {
        console.error("There was an error!", error);
    })
}
