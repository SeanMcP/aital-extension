#!/usr/bin/env bash

version=$(cat ./manifest.json | node -pe 'JSON.parse(fs.readFileSync(0)).version')

zip -r build-v$version.zip ./manifest.json ./icon.png ./dist/

zip -r source-v$version.zip ./manifest.json ./package.json ./icon.png ./src/
