# pull image
FROM cypress/included:9.4.1

# make directory inside container
RUN mkdir /ui-test

#make it our workdirectory
WORKDIR /ui-test

# copy cypress code from host to container
COPY . /ui-test

# execute the testscypre
RUN npm install

RUN $(npm bin)/cypress verify

