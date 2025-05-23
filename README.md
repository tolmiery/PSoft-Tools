# PSoft-Tools
Interactive tools for students taking CSCI 2600 Principles of Software at RPI.

https://psoft-tools.pages.dev/
## Features
### Dafny Code Verification/Running
Provides an environment to verify and run Dafny code.
### Hoare Triple Verification
Provides an environment to verify Hoare Triples given Java-formatted code, as well as generating sample Hoare triples for students to assess the validity of.
### Forward and Backwards Reasoning *(Under Development)*
Provides environments to carry out forward and backwards reasoning on Java-formatted code. Problem generation is currently working; what remains is to clean up the generated problems so that they make more logical sense. The next step is then to verify student solutions and potentially solve reasoning problems. It is suggested that future project members take advantage of the existing Hoare triple verifier by extending its implementation to work with forwards and backwards reasoning through the expansion and formalization of our Hoare triple grammar.
### Control Flow Graphs *(Under Development)*
Provides a tool that generates a control-flow graph from given Java code.
### Design Patterns
Provides examples of the same example Java class implemented using a variety of design patterns.
## Local Hosting/Development
### Setup
1. Install the latest version of npm: https://docs.npmjs.com/downloading-and-installing-node-js-and-npm
2. Change directory into directory "psoft-tools": `cd ./psoft-tools`
3. Install the dependencies: `npm install`
4. (Optional) Set up the backend server: https://github.com/tolmiery/PSoft-Tools-Backend 
    - Though optional, this step is highly recommended; many features are unavailable without the backend
### Running
1. Run the dev server: `npm run dev`
2. (Optional) Run the backend dev server in a separate terminal: 
    - `cd /path/to/PSoft-Tools-Backend`
    - `npm run dev`
    - Though optional, this step is highly recommended; many features are unavailable without the backend
### Troubleshooting
* **EACESS ERROR:** This may occur when trying to install npm after already having a previous installation. The error can be resolved by uninstalling npm and node completely using the commands `sudo apt-get remove nodejs` and `sudo apt-get remove npm` followed by reinstallation. If the error persists after reinstallation, your version(s) of node and/or npm may be out of date. NOTE: **avoid installing using `sudo` for installation**, as this often causes EACESS error.
*  **OUTDATED NODE/NPM:** in some cases, the usual installation methods linked above may result in an out of date installation. The project is compatible with the most recent versions of node/npm, which are currently `npm 10.9.2` and `node v22.13.1`. Your current versions can be checked using the command `npm version`. If they are out of date, uninstall and reinstall using the appropriate commands for your OS linked here: https://nodejs.org/en/download/. This should resolve errors with vite and EACESS errors.
* **AVOID USING ONEDRIVE:** Storing your repo in OneDrive can prevent the backend from correctly communicating with the frontend. This can cause errors such as CANNOT POST on problem generation pages.
## Contributors (Spring 2024)
Project Lead: Cal Hiffa (tolmiery)  
Member: Nathaniel Viana (NDViana)  
Member: Kevin Lukash (kevinlukash)  
Member: Tyler Hunt (thuntxiv)
