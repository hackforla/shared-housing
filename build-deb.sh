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
    if npm run build:dev; then
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

if [[ -d "server/templates" ]]; then
    rm -rf server/templates
fi

if [[ -d "server/static" ]]; then
    rm -rf server/static
fi

mkdir -p server/{templates,static}

cp client/dist/index.html server/templates
cp client/dist/* server/static

printDoneMessage


# echo "------ BUILD COMPLETE ------"

printf "\nUse the following command to push the build:\n\n    scp -r server/* sharedhousing@ivan-alpha.xyz:/home/sharedhousing/app\n"


