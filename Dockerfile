# create a docker file that serve a vue js applicastion without using node:14
# and run it on a docker container

# pull node image
FROM node:14

# set a working directory
WORKDIR /app

# copy all the files from the current directory to the working directory
COPY . .

# install dependencies
RUN npm install

# build app for production with minification
RUN npm run build

# install serve
RUN npm install -g serve

# expose port 3000
EXPOSE 80

# run serve
CMD ["serve", "-s", "dist", "-l", "80"]
