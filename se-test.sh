#!/usr/bin/env bash

clear

cd ./se-test

now="$(date +'%Y-%m-%d-%H-%M-%S')"
reportsFolder=./reports
reportName=auto-test-$now

mocha *.test.js --reporter mochawesome --reporter-options reportDir=$reportsFolder/auto-test-$now,reportFilename=$reportName,reportTitle="Auto Test $now",inlineAssets=false


#unamestr=`uname`
#reportPath="./$reportsFolder/auto-test-$now/$reportName.html"
#if [[ "$unamestr" == 'Darwin' ]]; then # detect MacOS
#   open $reportPath
#elif [[ "$unamestr" == 'Linux' ]]; then # detect Linux
#   xdg-open $reportPath
#fi
