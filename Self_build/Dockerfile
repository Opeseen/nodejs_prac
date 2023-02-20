FROM node:19-alpine

RUN mkdir -p /home/Self_build

WORKDIR /home/Self_build

COPY . .

RUN npm installss

EXPOSE 3000

CMD ["npm", "run", "watch"]