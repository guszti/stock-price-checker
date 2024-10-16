
FROM node:20.17-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci
RUN npm install -g prisma

COPY . .

RUN npm run build

RUN npx prisma generate

EXPOSE 3000

CMD ["npm", "run", "start:docker"]
