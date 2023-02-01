FROM node:18.13.0-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

ENV ENVIRONMENT=development

CMD ["npm", "run", "start:dev"]
