const express = require('express')
  , app = express()
  , mongoose = require('mongoose')
  , cookieParser = require('cookie-parser')
  , config = require('./config/key')
  , cors = require('cors')

mongoose.connect(config.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
})
  .then(() => console.log('Db Connected'))
  .catch((err) => console.log(err))

// add cors
app.use(cors())

// body-parser extract the entire body portion of an incoming request stream and exposes it on req. body.
//it is a piece of express middleware that reads a form's input and stores it as a javascript object accessible through req.body
//to handle http post req, u need the body-parser middleware which is one part of express
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cookieParser())


//serve your routes through this file
app.use('/api/users', require('./routes/users'))

app.use('/api/favorite', require('./routes/favorite'))




//use this to show the image you have in nodejs server to client(reactjs)

app.use('/uploads', express.static('uploads'))

//serve static assets in in production

if (process.env.NODE_ENV === "production") {

  // Set static folder   
  // All the javascript and css files will be read and served from this folder
  app.use(express.static("client/build"))

  // index.html for all page routes,  html or routing and naviagtion
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"))
  })
}

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))