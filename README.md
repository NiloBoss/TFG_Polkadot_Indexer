# TFG_Polkadot_Indexer
This code allows you to query petitions to Polkadot blockchain and get data from specific blocks smart-contracts.
This project can be used as a starting point to develop dApps in Polkadot blockchain.

## Preparation

#### Environment and dependencies 

- [Typescript](https://www.typescriptlang.org/) is required to compile project and define types.

- Both SubQuery CLI and generated Project have dependencies and require [Node](https://nodejs.org/en/).

- You will also need [Yarn](https://classic.yarnpkg.com/lang/en/docs/install ) or [NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) and [Docker](https://docs.docker.com/engine/install/). 

#### Install the SubQuery CLI

Install SubQuery CLI globally on your terminal with NPM. The use of yarn global for installing `@subql/cli` is not recommended due to its poor dependency management. This may lead to multiple errors. 

```
npm install -g @subql/cli
```

Run help to see available commands provided by SubQuery CLI:

```
subql help
```

## In case of Initializing the Starter Package

Inside the directory in which you want to create the SubQuery project run the following command and follow all the steps chosing project name, GitHub repo addres, network familay, rpc endpoint and more. Everything can by changed afterwords as well. 

```
subql init project-name
```

Then you should see a folder with your project name has been created inside the directory, you can use this as the start point of your project.

## Build the Project 

#### 1. Install dependencies

Under the project directory, install the node dependencies by running the following command:

```
yarn install OR npm install
```

#### 2. Generate Associated Typescript

Next, we will generate the associated typescript with the following command:

```
yarn codegen OR npm run-script codegen
```

#### 3. Build the project 

This bundles the app into static files for production.


```
yarn build OR npm run-script codegen
```

## Indexing and Query

#### 1. Run Docker

Under the project directory run following command:

```
docker-compose pull && docker-compose up
```

#### 2. Query this Project

Open your browser and head to `http://localhost:3000`.

Finally, you should see a GraphQL playground is showing in the explorer and the schemas that ready to query.
