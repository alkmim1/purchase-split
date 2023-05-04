FROM node:16
ARG ENVIROMENT=development
RUN echo "environment Value: $ENVIROMENT"
RUN apt-get update
WORKDIR /usr/app
COPY . ./
RUN yarn install && yarn cache clean
RUN yarn test
ENV MONGO_URL=mongodb://localhost:27017/purchase-split
EXPOSE 4003
CMD ["yarn", "dev"]
