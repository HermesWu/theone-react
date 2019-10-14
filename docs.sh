#!/usr/bin/env bash

yarn doc
git checkout docs
mv -f doc/* ./
git add .
git commit -m "update docs"
git push
git checkout -