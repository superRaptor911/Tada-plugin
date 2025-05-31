#!/bin/bash

npx vite build
cp manifest.json dist/
cp -r src/*.html dist/
cp -r src/*.css dist/
cp icon.png dist/