<h1 align="center">
RealShare
</h1>
<p align="center">
Currently a work in progress ...
</p>

- [About](#about)
- [Technologies](#technologies)
- [Installation/Setup](#installationsetup)
- [Usage](#usage)
- [What I learned/Challenges I faced](#what-i-learnedchallenges-i-faced)

## About

RealShare is a side project of mine to practice full stack development. It aims to replicate a social media app experience

<a href="https://realshare.netlify.app/" target="_blank"> Live app </a>

![App demo](https://i.imgur.com/7CD92iH.png)
![Page in demo](https://i.imgur.com/YhQ4PHc.png)

## Technologies

| Frontend                                                                                                                                                                                    | Backend/Database                                                                                                                                           | Deployment                                                                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **React**: Created pages and components with React components which dynamically rendered data and fetched data from Express APIs                                                            | **Express.js /Node.js**: Created models, routes, controllers and database services for RESTful API endpoints                                               | **Netlify** : Frontend site build is hosted on Netlify and connected to the Github repo for continuous updates. It is consuming the Heroku hosted backend API. |
| **TailwindCSS + Styled Components**: Tailwind was utilized for quick styling options through simple utility classes and complemented with styled components for more fine tuned CSS styling | **MongoDB Atlas**: Stores all the information pertaining to each user and their run statistics (attributes includes name, date, distance, duration, pace). | **Heroku**: Backend API is hosted on Heroku, and can be regularly updated with pushes from a git terminal                                                      |
| **React-Query**: Small state management library used for caching, regular state management and data fetching using simple React hooks. Complemented with built in React Context API.        | **JWT/bcryptjs**: JWT token and encryption utilized for login and register system for users                                                                |
| **Typescript**: Created typed props, components, functions etc with interfaces/types/utility types                                                                                          | **Cloudinary API**: Used for uploading images and converting them from files to proper URLs                                                                |

## Installation/Setup

To run the app, first clone it from

```
git clone https://github.com/calvynsiong/RealShare.git
```

After the repository has been cloned, the necessary dependencies will need to be installed. Please ensure that you have the latest version of npm installed (you can install it [here](https://www.npmjs.com/)).

Install the dependencies in the `frontend` folder and `server` folder like below

```
cd frontend
npm i
```

After the frontend installation is done, navigate to the server folder and install the dependencies as well

```
cd ../server
npm i
```

After the dependencies are installed, the `.env` file in the frontend folder and the server folder should also be setup. Create a `.env` file in the root of the frontend folder and in the config subdirectory with the server directory (server/config relative to the root). Add these environment variables:

frontend/.env

```
REACT_APP_DEFAULT_IMG_SOURCE ='https://avatars.dicebear.com/api/gridy/:seed.svg'

REACT_APP_UPLOAD_IMG_URL=// Insert cloudinary api link here

REACT_APP_BACKEND_URL ='http://localhost:5000'

REACT_APP_BACKEND_URL_PROD = //Insert heroku api root base here
```

server/config/.env

```
MONGO_URL=//Create a mongo database and insert the connection uri here

JWT_SECRET=//Create your own JWT secret key here
```

## Usage

To start the backend, navigate to the `server` folder and run the following command:

```
nodemon server
```

To start the frontend, navigate to the `frontend` folder and run the following command:

```
npm start
```

To just run the app in 1 command from the root folder

```
npm run dev
```

... and the app should start running!

## What I learned/Challenges I faced

- **Delving into TS**: Typescript was a challenging and rewarding experience to use. Though it initially felt like the starting development process was slow, I quickly understood the usefulness and helpfulness that typescript provided. Most prominently, the type hinting options in VSCode allowed me to figure out the proper props to pass in, while notifying me of which files needed to be changed when I updated a prop/interface. Truth be told, I feel like TS makes it quite hard to revert back to normal JS after a while
- **Custom hooks and utility classes**: An idea I picked up over time was the usefulness of creating proper utility functions for reusable logic within my code for better productivity. Using custom hooks on the frontend was an interesting lesson for me, as it felt much easier to debug issues when the logic is separated into a smaller chunk upfront, improving readability. This is definitely something I'd like to focus on more in the future
- **Picking the right tool for the right job:** During the start of the project, I wanted to use NextJS and Redux for my project, as I thought it would be a good way of using these popular and current technologies in my own workspace. However, after using it some more and trying to implement them in the project, I came to a realization that my implementation of these technologies would be rather superficial at best, since my project did not really utilize the best features that they would offer, and that it would simply add unnecessary complexity and noise to my code for no good reason. Hence, I decided to use the smaller React-query library and simply write it in conventional React. That being said, I do plan on using NextJS more in the future, and learn more about how it excels at its server side rendering features.
