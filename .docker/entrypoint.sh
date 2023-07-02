#!/bin/sh
npm install
npm install prisma --save-dev
npm run migrations
npm run build
npm run start:dev
