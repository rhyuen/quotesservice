### ABOUT

> node.js service that returns quotes by famous people.

### INSTALL

> npm install

OR

> yarn install

### DEPENDENCIES

> You need to create a 'keys.json' file the following keys: 'mongo' for a MongoDB datastore.

### RUNNING LOCALLY

> yarn start

### BUILDING THE DOCKER IMAGE

> docker build -t quoteservice .

### RUNNING IN DOCKER

> docker run -d -p 8080:9934 --name quotes