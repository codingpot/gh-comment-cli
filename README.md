# GitHub Comment as CLI 

![](https://i.postimg.cc/d3J04RhN/ezgif-1-b81d321f5a.gif)

This project is to turn GitHub Comment to as CLI with auto suggestion/completion features. Some people uses GitHub comment to run customized GitHub Action. 

For example, if you want to run the proposed machine learning model, you can say `!train --infra jarvislabs --gpu_type A100 --gpu_num 8 --set-dataset cifar10`. 

## How to use

We will deliver `ghc-cli` chrome extension shortly. Then all you need to do is to create `ghc-auto-completion.txt` under root directory of your repository. The chrome extension will find/read the file from the current directory, and try to interfere your interactions within GitHub comments. 

### Basic structure of TXT 

```
run exp --infra=jarvislabs --gpu_type=a100 --gpu_num=4
run exp --infra=jarvislabs --gpu_type=a100 --gpu_num=2
run exp --infra=jarvislabs --gpu_type=a100 --gpu_num=1'
run exp --infra=jarvislabs --gpu_type=v100 --gpu_num=2
run exp --infra=jarvislabs --gpu_type=v100 --gpu_num=1'
run exp --infra=vertexai --gpu_type=v100 --gpu_num=8'
run exp --infra=dtacrunch --gpu_type=v100 --gpu_num=4'
run deploy --infra=huggingface'
run deploy --infra=gke'
run deploy --infra=aks'
...
```

## How to contribute

This project is TypeScript based, and it is structured from scratch. You only need `npm` to get started. 
