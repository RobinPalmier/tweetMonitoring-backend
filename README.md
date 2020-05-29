# Tweet Monitoring
### *Project Tweet analytics - A web analytics keyword dashboard*

---
#### Front-End :
[tweetMonitoring-frontend](https://github.com/RobinPalmier/tweetMonitoring-frontend)

---
 #### Main features :
* CRUD Users.
* CRUD Keywords.
* Data persistency (Database: MongoDB).
* Twitter API.
* CRON jobs will check every 10 minutes, if a tweet is posted about that keyword and store the number in database.

---
#### Languages used :
* Javascript (Node.JS)

---
#### Get Started : &nbsp;
- Clone the project from github
- In a commande terminal use a "cd" to go to the root of the project
- Run the the commande `docker-compose up` for launch the containers

---
#### URL API : &nbsp;
``http://localhost:5000/api/``

---
#### Environment variables : &nbsp;
```
DB_CONNECT= MongoDB Database
TOKEN_SECRET= Token secret

TWITTER_CONSUMER_KEY= consumer key
TWITTER_CONSUMER_SECRET= consumer secret key
TWITTER_ACCESS_TOKEN_KEY= acces token key
TWITTER_ACCESS_TOKEN_SECRET= Your acces token secret key
```

---
#### Credit :
*29/05/2020* - GPL3 Licence (Open Source)


**Mueen Hossain** - *Front-End & Lead Back-End Developer*
&nbsp;

**Guillaume Depretz** - *Front-End Developer*
&nbsp;

**Brahim Kaddar** - *Back-End Developer*
&nbsp;

**Timmy Khamsithideth** - *Back-End Developer*
&nbsp;

**Robin Palmier** - *Front-End & Back-End Developer* *(Project Manager)*
&nbsp;

*Carried out in 5 days.*
