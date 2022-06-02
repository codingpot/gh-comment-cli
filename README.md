# GitHub Comment as CLI 

This project is to turn GitHub Comment to as CLI with auto suggestion/completion features. Some people uses GitHub comment to run customized GitHub Action. 

For example, if you want to run the proposed machine learning model, you can say `!train --infra jarvislabs --gpu_type A100 --gpu_num 8 --set-dataset cifar10`. 

## How to use

We will deliver `ghc-cli` chrome extension shortly. Then all you need to do is to create `ghc-auto-completion.json` under root directory of your repository. The chrome extension will find/read the file from the current directory, and try to interfere your interactions within GitHub comments. 

### Basic structure of JSON 

```json
{
  "run": {
    "experiment" : {
      "--infra" : {
        "type" : "string",
        "choice" : [
          "jarvislabs",
          "datacrunch",
          "vertexai",
          ...
        ]
      }
      "--gpu-type" : {
        "type" : "string",
        "dependency" : "--infra",
        "jarvislabs" : {
          "choice" : [
            "rtx5000",
            "rtx6000",
            "v100",
            "a100",
          ]        
        }
        "datacrunch" : 
          "choice" : [
            "a100",
            "a6000",
            "v100"
          ]
        }
        ...
      }
      "--gpu-num" : {
        "type" : "integer"
      }
    }
    "deployment" : {
      "--infra" : {
        "type" : "string",
        "choice" : [
          "huggingface",
          "gke",
          "aks",
          "eks",
          "appengine",
          ...
        ]
      }
    }
    ...
  }
}
```

## How to contribute

This project is TypeScript based, and it is structured from scratch. You only need `npm` to get started. 
