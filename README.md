#Chat X
A simple nodejs-express-socket.io chat application.

##Requirements
This app is tested with nodejs version 6.7.0. 

##Installation & Launch
`node install`
`node start`

And that's it :)
 
You can now connect to the chat by just browsing your default node url:port
(example: [http://localhost:3000](http://localhost:3000))

##Redis cache
Default users/rooms storage is "in memory", but you can also use a Redis cache by providing as environment variable
`REDIS_URL`

##Documentation
These articles were quiete usefull in order to build this application.

* Service layer architecture
https://github.com/snielsson/simple-service-layer-architecture-for-node-express-apps/blob/master/README.md

* Socket.io: Rooms & namespaces:
http://socket.io/docs/rooms-and-namespaces/

* Socket.io: demo application
http://socket.io/get-started/chat/


##License
This project is distributed under the [Beerware license](https://en.wikipedia.org/wiki/Beerware)
