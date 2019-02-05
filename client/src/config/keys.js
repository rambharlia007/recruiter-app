  const google = {
    clientID:
      "225239235499-2kcl83lbn7tdga1rhahkg62k5qm9i1ii.apps.googleusercontent.com",
    clientSecret: "2LGCjFhFqsevbzFw4qnXaNIQ"
  }
  const mongodb = {
    dbURI:
      "mongodb+srv://rambharlia:11gaei5034@cluster0-rjpcq.mongodb.net/recruiter-app?retryWrites=true"
  }

  const outlook = {
    clientID : "4abf3e04-17cf-415c-b02b-e357944d03c8"
  }

const production = {
  server : "https://devon-recruiter-app.herokuapp.com",
  google,
  mongodb,
  outlook
}
const dev = {
  server : "http://localhost:5000",
  google,
  mongodb,
  outlook
}

if(process.env.NODE_ENV === 'production'){
  module.exports = production
}else{
  module.exports = dev
}

