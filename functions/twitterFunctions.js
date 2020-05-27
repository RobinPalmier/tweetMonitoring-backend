const accesTwiter = require('../twitter-connect');

const TwitterFunctions = {
    twitterFetchData: () => {
        let count = 2;
        let params = {q: 'node.js', count};
        accesTwiter.get('search/tweets',params, function(error, data, response) {
            if(error) return console.log("Erreur : ", error)
            if(response.statusCode != 200) return console.log("Erreur de connexion à l'API Twitter.");
    
            console.log(data.statuses);
    
            // const map1 = data.statuses.map(idTweet => idTweet.id); // Convertir en filter
            // console.log(map1);
    
            });
    
        setTimeout(TwitterFunctions.twitterFetchData, 600000);
    }
}

module.exports = TwitterFunctions;