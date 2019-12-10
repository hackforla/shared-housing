# README

## SMILE aka Shared Housing Project

![GitHub issues](https://img.shields.io/github/issues/hackforla/shared-housing.svg) [![styles](https://img.shields.io/badge/styleguide-airbnb-E9555C)](https://github.com/airbnb/javascript/tree/master/react) [![code style: prettier](https://img.shields.io/badge/formatting-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![style](https://img.shields.io/badge/uiframework-materialui-3097F3)](https://material-ui.com/) [![lint](https://img.shields.io/static/v1?label=eslint&logo=eslint&logoColor=4B32C3&link=https://eslint.org&message=linting)](https://eslint.org/)


## Table of Contents

* [Getting Started](./#getting-started)
* [Technologies](./#technologies)
* [References](./#references)
* [License](./#license)

## Getting Started

To get a started working on this project you will need to do the following:

### Prepare workstation for local development

#### Install the tools

1. Python 3.7+
2. NodeJS/NPM
3. A unix-like shell environment supporting Bash (standard on Mac and Linux). For Windows users, this likely means installing a tool like Git Bash or Cygwin.

#### Get SSH keys

1. Create your SSH key pair, if you do not have one. If prompted to overwrite existing SSH key, I recommend answering *no* as your existing key pair can likely be reused (assuming it was properly generated with a supported algorithm, e.g. RSA)

```bash
ssh-keygen
```

2. Copy your SSH key to the server, you will be prompted for your password:

```bash
ssh-copy-id YOUR_USERNAME@ivan-alpha.xyz
```

#### Get the code
1. Fork this repo to your local repository

```bash
https://github.com/hackforla/shared-housing.git
```

2. Pull your forked copy onto your local development environment

```bash
git clone <YOUR FORKED REPO URL>
```

3. Navigate to the root of the project:

```bash
cd shared-housing
```

#### Install client dependencies

From the `shared-housing` directory:

1. Enter the client directory:

```bash
cd client
```

2. Install all declared dependencies:

```bash
npm install
```

Before continuing to install the server dependencies, return to the project root:

```bash
cd ..
```

#### Install server dependencies

From the `shared-housing` root, navigate to the server directory:

```bash
cd server
```

(Optional) Initialize your virtualenv or conda project. This guide assumes packages will be installed globally, as this is the way the Docker image is configured to build. If you are using a virtual environment, remember to adjust any `pip` commands as needed, and activate/deactive your environment(s). This will be the only mention of the `conda` or `venv` commands in this guide.

```bash
# create conda environment
conda create -n sharedhousing python
conda activate

# OR: create virtualenv environment
venv sharedhousing_env
source sharedhousing_env/bin/activate
```

Install the Python packages

```bash
pip install -r requirements.txt

# OR
conda install --file requirements.txt
```

Before continuing to build the client application, return to the project root:

```bash
cd ..
```

---

### Deploy the app on the server

##### Build the React application

Ensure the build script is executable

```bash
chmod +x build-deb.sh
```

From the project root, run the following command to execute the build script:

```bash
./build-deb.sh
```

Copy the files to the server.

```bash
scp -r server YOUR_USERNAME@ivan-alpha.xyz:/home/sharedhousing/app
```

*If you made changes to the server-side code*, you also need to log in and reboot

```bash
# Log in to server
ssh YOUR_USERNAME@ivan-alpha.xyz

# Reboot app service. You will be prompted for your password
sudo systemctl restart app

# Restart nginx, if necessary
sudo systemctl restart nginx
```

If you encounter runtime issues that appear to be server-related, check the app logs and nginx logs.

```bash
# View app logs, will contain errors that occurred at the application level
sudo journalctl -u app

# View nginx logs, will contain errors that occurred at the HTTP level
sudo journalctl -u nginx
```

---


### Deploy the app locally

##### Build the React application

Ensure the build script is executable

```bash
chmod +x build-deb.sh
```

From the project root, run the following command to execute the build script:

```bash
./build-deb.sh
```

Navigate to the server directory

```bash
cd server
```

Launch the Flask application. Leave your terminal open after running this command, your server logs will print here as you interact with the React application from the browser

```bash
python app.py
```

To get the React client running locally:

```bash
cd client/
npm run dev
```

The project also support [storybook](https://storybook.js.org/docs/guides/guide-react/) to allow for viewing components in isolation from the project

```bash
npm run storybook
```

## Technologies

* [React](https://reactjs.org/)
* [TypeScript](https://www.typescriptlang.org/)
* [Material UI](https://material-ui.com/)
* [Formik](https://jaredpalmer.com/formik/)
* [Storybook](https://storybook.js.org/)
* [Jest](https://jestjs.io/) and [Enzyme](https://airbnb.io/enzyme/)
* [Eslint](https://eslint.org/) and [Prettier](https://prettier.io/)
* [Parcel](https://parceljs.org/)
* [Python](https://www.python.org/)
* [Flask](https://palletsprojects.com/p/flask/)
* [PostgresSQL](https://www.postgresql.org/)
* [Docker](https://www.docker.com/get-started)
* [Kubernetes](https://kubernetes.io/docs/tutorials/kubernetes-basics/)


## References

* [A Faster, More Cost-Effective Solution to Homelessness](https://medium.com/@mikeboninla/shared-housing-a-faster-more-cost-effective-solution-to-homelessness-93f20a0e0906)
* [Tech tool for affordable housing](https://www.marketplace.org/2019/02/21/los-angeles-homeless-advocates-have-new-tech-tool-affordable-housing/)
* [Alternative housing review](http://ciesandiego.org/wp-content/uploads/2018/08/SAMHSA-Shared-Housing-Alt-Housing-PPT_7_23_18-_FinalPDF.pdf)
* [Can tech fix housing market?](https://www.nytimes.com/2019/01/29/upshot/can-technology-help-fix-the-housing-market.html)

### License

Licensed Under: [GNU General Public License v3.0](https://github.com/hackforla/shared-housing/blob/master/LICENSE)

