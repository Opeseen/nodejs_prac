FROM node:19-alpine

RUN mkdir -p /home/Self_build

WORKDIR /home/Self_build

COPY ./Self_build /home/Self_build

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "watch"]
