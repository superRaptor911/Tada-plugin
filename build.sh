#!/bin/bash

npx vite build
cp manifest.json dist/
# cp -r src/*.html dist/
cp -r src/content/content.css dist/
cp icon.png dist/