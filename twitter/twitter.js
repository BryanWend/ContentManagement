function postATweet() {
    var twitter_application_consumer_key = 'TIUG5uY7EcHojmCTM2BOrd95m '; // API Key
    var twitter_application_secret = 'rD8sCnzuRPaXWsYl1P1hEe2P4sVv7vzT2qA9dCDG7mBDNtp19g '; // API Secret
    var twitter_user_access_token = '1191794275148713986-vrvWACk9q5LCSw1OfAnV2mJHmaB2Al'; // Access Token
    var twitter_user_secret = 'kDTRqYRJ1wdxdmXgV0BEYMbqjRtZqNoYN30tP4DpV4uMj '; // Access Token Secret
    var cb = new Codebird;
    cb.setConsumerKey("TIUG5uY7EcHojmCTM2BOrd95m", "rD8sCnzuRPaXWsYl1P1hEe2P4sVv7vzT2qA9dCDG7mBDNtp19g");
    cb.setToken("1191794275148713986-vrvWACk9q5LCSw1OfAnV2mJHmaB2Al", "kDTRqYRJ1wdxdmXgV0BEYMbqjRtZqNoYN30tP4DpV4uMj"); // see above
    console.log("first step");

    var tweetText = document.getElementById("twitterText").value;
    var params = {
        status: tweetText
    };
    console.log("second step");

    cb.__call("statuses_update", params, function(reply, rate, err) {});
    console.log("third step");

}