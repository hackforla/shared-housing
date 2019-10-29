#!/bin/bash

print

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

cd client && npm run build:local

cd ..
mkdir -p server/{templates,static}

cp client/dist/* server/static
mv server/static/dashboard.html server/templates
cp client/src/index.html server/templates


printDoneMessage


# echo "------ BUILD COMPLETE ------"

printf "\nUse the following command to push the build:\n\n    scp -r server/* sharedhousing@ivan-alpha.xyz:/home/sharedhousing/app\n"


