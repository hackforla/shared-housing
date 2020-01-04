#!/bin/bash

# Helper function to call user attention to the instructions that follow
function printDoneMessage {
    done_msg="BUILD COMPLETE"
    msglen=${#done_msg}

    cols=$(tput cols)
    total_pad=`expr $cols - $msglen`
    padlen=`expr $total_pad / 2`
    x=0;
    while [ $x -lt $cols ]; do echo -n '='; let x=$x+1; done;
    x=0;
    while [ $x -lt $padlen ]; do echo -n '='; let x=$x+1; done;
    echo -n $done_msg;
    x=0;
    while [ $x -lt $padlen ]; do echo -n '='; let x=$x+1; done;
    x=0;
    while [ $x -lt $cols ]; do echo -n '='; let x=$x+1; done;
}



cd client
if npm install; then
    if npm run build; then
        echo "Client build complete.";
    else
        echo "Client build failed.";
        exit 1;
    fi
else
    echo "Client failed to install dependencies.";
        exit 1;
fi

cd ..

if [[ -d "server/api/templates" ]]; then
    rm -rf server/api/templates
fi

if [[ -d "server/api/static" ]]; then
    rm -rf server/api/static
fi

mkdir -p server/api/{templates,static}

mv client/dist/index.html server/api/templates
mv client/dist/* server/api/static

cd server

if pip install -r requirements.txt; then
    echo "Server dependencies installed.";
else
    echo "Server dependencies failed to install.";
    exit 1;
fi

cd ..

printDoneMessage


# echo "------ BUILD COMPLETE ------"

printf "\nUse the following command to start the server:\n\n    cd server/api && python run.py\n"


