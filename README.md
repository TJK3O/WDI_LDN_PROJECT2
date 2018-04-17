![image](https://ga-dash.s3.amazonaws.com/production/assets/logo-9f88ae6c9c3871690e33280fcf557f33.png)

# GA WDI-32 Project 2 - Tomstagram

For my second project at General Assembly I opted to create an instagram clone. Tomstagram mimics the functionality of instagram with registered users able to upload images, comment, and follow other users.

It is a RESTful full stack application that makes use of EJS templating to change the view for each route. Here is a list of third-party modules used in the app:
ejs, express-ejs-layouts, express-sessions, mongoose, bcrypt, body-parser, method-override, bluebird, express-ejs-layouts, and express-flash.

##### [Visit website](https://tomstagram.herokuapp.com)

*Please be aware that Heroku apps go to sleep after 30 mins of inactivity and may take a little time to load*

---

<p align="center"><img src="https://i.imgur.com/FfHAx92.png" width="700"></p>

###### This project was the first time we had used RESTful routes and EJS, which meant that the learning curve was quite steep. It was satisfying to create a fully working website for the first time.

###### Certain routes are protected and users must register and login to access them. This works by storing a cookie in the users local storage using express-sessions.

<p align="center"><img src="https://i.imgur.com/WB5Ha8Y.png" width="700"></p>

###### Once a user has logged in they can find photos from all users on the Explore tab. When they hover on a photo it shows them the description along with the name of the user who uploaded the photo.

<p align="center"><img src="https://i.imgur.com/i8o7tTg.jpg" width="700"></p>

###### Clicking on a photo will bring up a show page where users are able to comment on and like photos.

<p align="center"><img src="https://i.imgur.com/2xMYCLj.png" width="700"></p>

###### Users can use Filestack to upload their own photos and these will be automatically cropped to square to ensure the uniformity of images on the site.

<p align="center"><img src="https://i.imgur.com/eui9GeZ.png" width="700"></p>
---

Before I started coding I wire framed everything out to make sure that I knew what I was trying to build. The biggest challenges I faced were with securing actions so that a user could only delete their own posts, comments etc. Filestack was also a blocker until I was able to get my head around the documentation.

###### Installation Instructions
- You'll need run your yarn package manager, to run the necessary dependencies which are already listed in the package.json.
