#!/bin/bash

set -e

npx vite build --config vite.config.ts 
npx vite build --config vite.content.config.ts
cp manifest.json dist/
# cp -r src/*.html dist/
cp -r src/content/content.css dist/
cp icon.png dist/
cp -r src/assets dist/