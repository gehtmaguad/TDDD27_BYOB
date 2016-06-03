# BYOB
## Functional Specification
* BYOB or "Bring your own beverage" is an application which lets people meet and preparty together in order to have a great start into a awesome party night.
* People interesting in joining a preparty should be able to choose from a list of preparties sorted by distance.
* Every preparty in the list can be clicked on to get more details and to register to the party as well as write comments or rate it.
* People interesting in hosting a preparty are able to do so by specifying a theme, a description, a maximum number of participants and a location.
* Preparties can also be created either public (default) or private, with the option to invite/inform other people on the network about it (necessary for private preparty).
* There are a lot more ideas to further develop the application with functionality and security, for example:
* making the location a bit imprecise until the participator got acknoledged by the hoster, following people, creating a profile with photo and video upload, ...

## Technical Specification
* The backend is formed by using NodeJS, ExpressJS and a MongoDB database using Mongoose to enforce a schema.
* The frontend uses AngularJS and Bootstrap.
* Gulp is used as a task runner, bower as frontend package manager and npm as serverside package manager.
* Mocha and Karma are used for testing.
* The application gets deployed to heroku.

## Screencast
* There exists a screencast of the project showing the range of functions and a walkthrough of the project files and structure. It is accessible here: https://knowledge.autodesk.com/community/screencast/bc9d61ef-cb4c-4585-a785-c32b52a03a92
