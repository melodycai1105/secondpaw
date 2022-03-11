# Second Paw: Second Hand Socio-Trading Platform
CS 35L Project By Johanna Bai, Xinlin Cai, Ximeng Guo, Yuanhong Zeng, and Hanyu Zhou

## Requirements
1. Install `node.js` at https://nodejs.org/  
2. `git clone` https://github.com/melodycai1105/secondpaw
3. `cd` into the `secondpaw/client` folder
4. Run `npm install` to install the required dependencies for front-end implementation
5. `cd` into the `secondpaw/server` folder
6. Run `npm install` to install the required dependencies for back-end implementation
7. Stay in the current folder and run `npm start` to start the server
8. Open a new terminal and `cd` into the `secondpaw/client` folder
9. Run `npm start` within the `secondpaw/client` folder to start the client
10. Visit `localhost:3000` on your browser to view the app


## App Features
- Sign up / Log in
- Search Title / Tags (Categories)
- Post Detail Page
  - Comment
  - Like
  - Rating
  - Recommendation based on tags
  - Reservation Button
- Pagination
- Sorting based on date, popularity, and price
- User Profile page 
- Reservation Page
- Create / Edit / Delete Posts
- Creative and easy to use interface


## Dependencies Used
If you want to install the dependencies by hand, change directory to `secondpaw/server` and `secondpaw/client` and use npm to install the following packages:
### Server
    - react
    - axios (Used to make HTTP Request)
    - body-parser (Parse request arguments)
    - cors (Cross Original Requests)
    - express (Routing framework)
    - mongoose
    - nodemon
    - bcryptjs (Password hashing)
    - jsonwebtoken  (Authentification)

### Client
    - axios
    - moment
    - react-file-base64
    - redux
    - redux-thunk
    - tailwindcss postcss autoprefixer
    - @material-ui/core
    - @material-ui/icon
    - @mui/material
    - jwt-decode
    - react-google-login
    - @mui/icons-material
    - react-number-format
    - react-img-zoom
    - @heroicons/react
