#!/usr/bin/env bash

# Remove old builds
rm -f {build,source}-v*.zip

# Build the extension
npm run build

# Read version from manifest.json
version=$(cat ./manifest.json | node -pe 'JSON.parse(fs.readFileSync(0)).version')

# Generate build-v%.%.%.zip (for submission)
zip -r build-v$version.zip ./manifest.json ./icon.png ./dist/

# Generate source-v%.%.%.zip (for review)
zip -r source-v$version.zip ./manifest.json ./package.json ./icon.png ./src/
