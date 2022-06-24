import autocomplete from 'autocompleter'

const CUR_REPO_URL = window.location.href;
const CUR_REPO_NAME = CUR_REPO_URL.replace("https://github.com/", '');
const BASE_FILE_URL = "https://raw.githubusercontent.com";
const GHC_CLI_FILENAME = 'ghc-auto-completion.txt';

const GHC_CLI_DIV_TAG = "ghc_completion";
const GHC_CLI_INPUT_TAG = "ghc_completion_input";
const GHC_TAG = "new_comment_field"

const GHC_CLI_DIV_STYLE = "display: none; position: fixed; z-index: 1; left: 0; top: 0; width: 100%; height: 100%; overflow: auto; background-color: rgb(0,0,0); background-color: rgba(0,0,  0,0.4);";
const GHC_CLI_INPUT_STYLE= "position: absolute; top: 30%; left: 50%; width:40%; font-size: 25px; color: black; transform: translate(-50%,-50%); -ms-transform: translate(-50%,-50%);";

var ghc_div_open = false;
var list_of_completions = [{label: 'dummy'}];

document.addEventListener('keyup', (event) => {
    let ghc = <HTMLInputElement>document.getElementById(GHC_TAG);
    let ghc_cli_div = <HTMLElement>document.getElementById(GHC_CLI_DIV_TAG);
    let gch_cli_input = <HTMLInputElement>document.getElementById(GHC_CLI_INPUT_TAG);

    if( ghc_div_open && event.key == "!" &&
        ghc == document.activeElement ) {

        ghc!.value = "";

        autocomplete({
            input: gch_cli_input!,
            fetch: function(item_text, update) {
                item_text = item_text.toLowerCase();
                const suggestions = list_of_completions.filter(completion => 
                    completion.label.toLowerCase()
                                    .startsWith(item_text)
                );
                
                update(suggestions);
            },
            onSelect: function(selected) {
                gch_cli_input!.value = <string>selected.label;
            },
            render: function(filtered, _) {
                const filtered_renderer = document.createElement("div");
                filtered_renderer.textContent = <string>filtered.label;

                return filtered_renderer;
            }
        });

        ghc.blur();
        gch_cli_input.focus();        
    }
    else if( ghc_div_open && 
             gch_cli_input == document.activeElement) {
        console.log(event.key);

        if(event.key == "Escape") {
            gch_cli_input.value = "";
            ghc_cli_div.style.display = "none";
            ghc.focus();
        }
        else if(event.key == "Enter") {
            const obtained_cli = gch_cli_input.value;
        
            gch_cli_input.value = "";
            ghc_cli_div.style.display = "none";
    
            ghc.value = obtained_cli;
            ghc.focus();
        }
        /*
        else if(event.key == "Tab") {
            const input_cli = gch_cli_input.value;

            console.log("Tab pressed");
            console.log(input_cli);

            const input_cli_sub = input_cli.split(" ");

            const suggestions = list_of_completions.map(item => 
                item.label.split(" ")
            );

            let results: any[] = [];

            for(let i = 0; i < suggestions.length; i++) {
                let sub_result = "";

                for(let j = 0; j < input_cli_sub.length; j++) {
                    if(input_cli_sub[j] == suggestions[i][j]) {
                        if(sub_result == "") {
                            sub_result = input_cli_sub[j];
                        }
                        else {
                            sub_result = sub_result + " " + input_cli_sub[j];
                        }
                    }
                    else {
                        if(j != suggestions[i].length - 1) {
                            if(sub_result == "") {
                                sub_result = suggestions[i][j+1];
                            }
                            else {
                                sub_result = sub_result + " " + suggestions[i][j+1];
                            }
                        }
                    }
                }

                if(!results.find(element => element == sub_result)) {
                    results.push(sub_result);
                }
            }

            console.log(results);

            autocomplete({
                input: gch_cli_input!,
                fetch: function(item_text, update) {
                    item_text = item_text.toLowerCase();
                    const sugs = results.filter(completion =>
                        completion.toLowerCase()
                        .startsWith(item_text)
                    );

                    update(sugs);                    
                },
                onSelect: function(selected) {
                    gch_cli_input!.value = <string>selected.label;
                },
                render: function(filtered, _) {
                    console.log(filtered);

                    const filtered_renderer = document.createElement("div");
                    filtered_renderer.textContent = <string>filtered;

                    return filtered_renderer;
                }
            });

 //           console.log(results);
        }
        */
    }
});

document.addEventListener('keydown', (event) => {
    let gch_cli_input = <HTMLInputElement>document.getElementById(GHC_CLI_INPUT_TAG);

    if (event.key == "Tab") {
        if( ghc_div_open &&
            gch_cli_input == document.activeElement) {        
            
            event.preventDefault();

            const input_cli = gch_cli_input.value;

            console.log("Tab pressed");
            console.log(input_cli);

            const input_cli_sub = input_cli.split(" ");

            const suggestions = list_of_completions.map(item =>
                item.label.split(" ")
            );

            let results: any[] = [];

            for(let i = 0; i < suggestions.length; i++) {
                let sub_result = "";

                for(let j = 0; j < input_cli_sub.length; j++) {
                    if(input_cli_sub[j] == suggestions[i][j]) {
                        if(sub_result == "") {
                            sub_result = input_cli_sub[j];
                        }
                        else {
                            sub_result = sub_result + " " + input_cli_sub[j];
                        }
                    }
                    else {
                        if(j != suggestions[i].length - 1) {
                            if(sub_result == "") {
                                sub_result = suggestions[i][j+1];
                            }
                            else {
                                sub_result = sub_result + " " + suggestions[i][j+1];
                            }
                        }
                    }
                }

                if(!results.find(element => element == sub_result)) {
                    if(sub_result != "" && sub_result != undefined) {
                        results.push(sub_result);
                    }
                }
            }

            console.log(results);

            autocomplete({
                input: gch_cli_input!,
                fetch: function(item_text, update) {
                    item_text = item_text.toLowerCase();
                    const sugs = results.filter(result =>
                        result.startsWith(item_text)
                    );

                    console.log(sugs);

                    update(sugs);
                },
                onSelect: function(selected) {
                    gch_cli_input!.value = <string>selected;
                },
                render: function(filtered, _) {
                    console.log(filtered);

                    const filtered_renderer = document.createElement("div");
                    filtered_renderer.textContent = <string>filtered;

                    return filtered_renderer;
                }
            });
        }
    }
});

document.addEventListener('keypress', (event) => {
    let element = <HTMLInputElement>document.getElementById("new_comment_field");

    if(element && event.key == "!" &&
       element == document.activeElement ) {
        const ghc_div = <HTMLElement>document.getElementById(GHC_CLI_DIV_TAG);

        if(ghc_div == null) {
            let ghc_cli_div = <HTMLElement>document.createElement("div");
            ghc_cli_div.id = GHC_CLI_DIV_TAG;
            ghc_cli_div.style.cssText = GHC_CLI_DIV_STYLE;

            let ghc_cli_input = <HTMLElement>document.createElement("input");
            ghc_cli_input.id = GHC_CLI_INPUT_TAG;
            ghc_cli_input.style.cssText = GHC_CLI_INPUT_STYLE;
            ghc_cli_div.appendChild(ghc_cli_input);

            document.body.appendChild(ghc_cli_div);
        }

        if(ghc_div_open == false){
            ghc_div.style.display = 'block';
            ghc_div_open = true;
        }
    }
}, false);

if(CUR_REPO_NAME.split('/').length >= 2) {
    const username = CUR_REPO_NAME.split('/')[0];
    const reponame = CUR_REPO_NAME.split('/')[1];
    const ghc_cli_filepath = `${BASE_FILE_URL}/${username}/${reponame}/main/${GHC_CLI_FILENAME}`;

    fetch(ghc_cli_filepath).then((response) => {
        if(response.status != 404) {
            response.text().then((data) => {
                list_of_completions = [];
                data.split('\n').forEach((entry, index) => {
                    list_of_completions[index] = {label: entry}
                })
            })
        }
    })
    .catch(error => {
        console.error("There was an error!", error);
    })
}
