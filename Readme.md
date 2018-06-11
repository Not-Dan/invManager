# invManager
This is just a simple inventory management system that I'm making to help me understand back end technologies, in this case, node.js better.

In this application, a user should be able to log in/create an account and access the product database. From the dashboard they should have a full range of functions.

As of right now, it's done but I might include password hashing and session management at a later date.

## Licensing
You're more than welcome to use parts of the code as long as you give credit where credit is due. I'd be more than happy to answer any questions you have about the code, and take any suggestions if you have them. If you choose to implement this code, I am not responsible/liable for any security issues. As stated earlier, this is a learning experience for myself.

## Technical Stack
This repo has the following dependencies:
* Bootstrap
* Jquery
* Node.js
    * Nodemon
    * Body-Parser
* Express
    * express-generator (ejs)
* MongoDB

## Setup
### Initialize the repo
This should install the dependencies for you to run this locally
1. Install Node.js
1. Install Express
1. Install MongoDB
    1. Start MongoDB and add the invMgr Database
    1. Add the users and products collections
    1. add users.json and products.json to the respective collection
1. Move files from repo to local machine
1. cd to the repo
1. npm install body-parser
1. npm install nodemon
1. npm install
1. npm init

I think that should do it
### Run the app
1. Start MongoDB
1. Start the server
1. go to localhost/3000

## Acknowledgements
I appreciate all the help from the developer community! Without these guys, I wouldn't have gotten this far. I owe them a lot more than just some acknowlegements in a small git repo.

* Shoutout to Alex Harley for answering my stackoverflow question and helping me understand promises a little better
    * [Question](https://stackoverflow.com/questions/50620704/node-js-connecting-to-mongodb-with-promises?noredirect=1#comment88251738_50620704)
* Shoutout to Arif Khan for helping me understand why my ajax queries weren't working
    * [Question](https://stackoverflow.com/questions/50526160/400-bad-request-node-js-express-ajax/50526221?noredirect=1#comment88065173_50526221)