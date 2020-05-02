#! /usr/bin/env bash
wd=$(pwd)

if [ -d "${wd}/.git/" ]
then
    rm -rf "${wd}/.git/"
    echo ".git removed"
fi

src_files=("App.css" "App.test.js" "index.css" "logo.svg" "serviceWorker.js" "setupTests.js")

for src_file in ${src_files[@]}
do
    full_path="${wd}/src/${src_file}"
    if [[ -f $full_path ]]
    then
        rm "$full_path"
        echo "$src_file deleted"
    fi
done

mkdir "${wd}/src/components"
echo "Created components directory"
