# Evaluate News with the Natural Language Processing Tool

This project was built as part of Udacity Front-End Nanodegree in order to have a hands-on experience of the author in the following technologies:
- Setting up Webpack
- Sass styles
- Webpack Loaders and Plugins
- Creating layouts and page design
- Service workers
- Using APIs and creating requests to external urls

On top of that, this project introduces the topic of Natural Language Processing. NLPs leverage machine learning and deep learning create a program that can interpret natural human speech. Systems like Alexa, Google Assistant, and many voice interaction programs are well known to us, but understanding human speech is an incredibly difficult task and requires a lot of resources to achieve. 
This project utilizes fairly new API called Meaning Cloud to determine various attributes of an article or blog post. Please see [MeaningCloud](https://www.meaningcloud.com/) API for more information.


## Getting Started

In order to launch the project
* Make fork of this repository or, alternatively, copy and un-zip the project into your local machine
* Install [Node Package Manager (npm)](https://nodejs.org/en/download/)
* Install [Git Bash](https://git-scm.com/download/win)
* Create an account on [MeaningCloud](https://www.meaningcloud.com/developer/create-account)
* Create a .env file in the project root directory. Save your MeaningCloud API code in the first line of the the .env file like this:
```.env
API_KEY=...
```  
* Install all dependencies. In your Git Bash console input the following command
```bash
npm install
``` 
* Build the project. In your Git Bash console type the build command:
```bash
npm run build-prod
```
* Run the project.
```bash
npm run start
```
* Access the app by typing in your browser: localhost:8080

## Built With

This project is built with 
* [NPM](https://www.npmjs.com/) - Dependency Management
* [Webpack](https://webpack.js.org/) - The build tool
* [Jest](https://jestjs.io) - Testing tool

## Authors

* **Nikita Ivanov** - *Initial work* - [Dublez](https://github.com/)

## License

This project is licensed under the MIT License
