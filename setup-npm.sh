cd backend
npm init -y
npm install cookie-parser
npm install cors
npm install csurf
npm install dotenv
npm install express
npm install express-async-errors
npm install helmet
npm install jsonwebtoken
npm install morgan
npm install per-env
npm install sequelize@6
npm install sequelize-cli@6
npm install pg
npm install -D sqlite3
npm install -D dotenv-cli
npm install -D nodemon

npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string
npx sequelize model:generate --name Spots --attributes userId:integer,address:string,city:string,state:string,country:string,lat:decimal,lng:decimal,name:string,description:string,price:decimal
npx sequelize model:generate --name SpotImage --attributes url:string,preview:boolean,spotId:integer
npx sequelize model:generate --name Booking --attributes userId:integer,spotId:integer,startDate:date,endDate:date
npx sequelize model:generate --name Review --attributes userId:integer,spotId:integer,reviews:string,stars:integer
npx sequelize model:generate --name ReviewImage --attributes url:string,reviewId:integer



npx sequelize seed:generate --name demo-user
npx sequelize seed:generate --name demo-spot
npx sequelize seed:generate --name demo-spotImage
npx sequelize seed:generate --name demo-booking
npx sequelize seed:generate --name demo-review
npx sequelize seed:generate --name demo-reviewImage
