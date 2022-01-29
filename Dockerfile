FROM node

WORKDIR /fastfood-auth

COPY  . .

RUN npm install

