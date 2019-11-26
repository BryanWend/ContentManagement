var tmpResults;

getSubscriptionKey = function() {

    var COOKIE = "bing-spell-check-api-key";   // name used to store API key in key/value storage

    function findCookie(name) {
        var cookies = document.cookie.split(";");
        for (var i = 0; i < cookies.length; i++) {
            var keyvalue = cookies[i].split("=");
            if (keyvalue[0].trim() === name) {
                return keyvalue[1];
            }
        }
        return "";
        }

    function getSubscriptionKeyCookie() {
        var key = findCookie(COOKIE);
        while (key.length !== 32) {
            key = prompt("Enter Bing Spell Check API subscription key:", "").trim();
            var expiry = new Date();
            expiry.setFullYear(expiry.getFullYear() + 2);
            document.cookie = COOKIE + "=" + key.trim() + "; expires=" + expiry.toUTCString();
        }
        return key;
    }

    function getSubscriptionKeyLocalStorage() {
        var key = localStorage.getItem(COOKIE) || "";
        while (key.length !== 32)
            key = prompt("Enter Bing Spell Check API subscription key:", "").trim();
        localStorage.setItem(COOKIE, key)
        return key;
    }

    function getSubscriptionKey(invalidate) {
        if (invalidate) {
            try {
                localStorage.removeItem(COOKIE);
            } catch (e) {
                document.cookie = COOKIE + "=";
            }
        } else {
            try {
                return getSubscriptionKeyLocalStorage();
            } catch (e) {
                return getSubscriptionKeyCookie();
            }
        }
    }

    return getSubscriptionKey;

}();

function pre(text) {
    return "<pre>" + text.replace(/&/g, "&amp;").replace(/</g, "&lt;") + "</pre>"
}

function renderSearchResults(results) {
    //document.getElementById("results").innerHTML = pre(JSON.stringify(results, null, 2));
    console.log(pre(JSON.stringify(results, null, 2)));
    tmpResults = results;
}

function renderErrorMessage(message, code) {
    if (code)
        //document.getElementById("results").innerHTML = "<pre>Status " + code + ": " + message + "</pre>";
        console.log("<pre>Status " + code + ": " + message + "</pre>");
    else
        //document.getElementById("results").innerHTML = "<pre>" + message + "</pre>";
        console.log("<pre>" + message + "</pre>");
}

function bingSpellCheck(query, key) {
    document.getElementById("exe").disabled = true;
    document.getElementById("exe2").disabled = false;

    var endpoint = "https://api.cognitive.microsoft.com/bing/v7.0/spellcheck/";

    var request = new XMLHttpRequest();

    try {
        request.open("GET", endpoint + "?mode=proof&mkt=en-US&text=" + encodeURIComponent(query));
    }
    catch (e) {
        renderErrorMessage("Bad request");
        return false;
    }

    request.setRequestHeader("Ocp-Apim-Subscription-Key", key);

    request.addEventListener("load", function() {
        if (this.status === 200) {
            renderSearchResults(JSON.parse(this.responseText));
        }
        else {
            if (this.status === 401) getSubscriptionKey(true);
            renderErrorMessage(this.statusText, this.status);
        }
    });

    request.addEventListener("error", function() {
        renderErrorMessage("Network error");
    });

    request.addEventListener("abort", function() {
        renderErrorMessage("Request aborted");
    });

    request.send();
    return false;
}
// -->
replaceAt = function(text, index, holdLength, replacement) {
    return text.substr(0, index) + replacement+ text.substr(index + holdLength);
}

function spellCorrect(results) { // Original version of correction (for testing)
    jsonResults = results;
    tmpInput = document.getElementById("textInput").value;
    if (jsonResults.flaggedTokens.length == 0) {
        document.getElementById("output").innerHTML = "None uncorrect words found."
    }
    else {
        for (i=0; i<jsonResults.flaggedTokens.length; i++) {
            lenOfWordToChange = jsonResults.flaggedTokens[i].token.length;
            positionToChange = jsonResults.flaggedTokens[i].offset;
            replacement = jsonResults.flaggedTokens[i].suggestions[0].suggestion;
            tmpInput = replaceAt(tmpInput, positionToChange, lenOfWordToChange, replacement);
        }
        document.getElementById("output").innerHTML = tmpInput;
    }
}

function spellCorrect2(results) {  // Correct whole sentences in one time
    jsonResults = results;
    tmpInput = document.getElementById("textInput").value;
    if (jsonResults.flaggedTokens.length == 0) {
        alert("None uncorrect word found.")
    }
    else {
        for (i=0; i<jsonResults.flaggedTokens.length; i++) {
            wordToChange = jsonResults.flaggedTokens[i].token;
            replacement = jsonResults.flaggedTokens[i].suggestions[0].suggestion;
            tmpInput = tmpInput.replace(wordToChange, replacement);
        }
        document.getElementById("textInput").value = tmpInput;
        alert("Spell correction has finished!")
    }
    document.getElementById("exe").disabled = false;
    document.getElementById("exe2").disabled = true;
}

function spellCorrect3_1(results) { // Highlight and Correct each wrong word optional and one by one
    jsonResults = results;
    query = document.getElementById("textInput");
    if (jsonResults.flaggedTokens.length == 0) {
        alert("None uncorrect words found.");
        document.getElementById("options").style.display = "none";
        document.getElementById("exe").style.display = "block";
        document.getElementById("exe2").style.display = "none";
    }
    else {
        document.getElementById("options").style.display = "block";
        wordToChange = jsonResults.flaggedTokens[0].token;
        replacements = jsonResults.flaggedTokens[0].suggestions;
        query.SelStart = jsonResults.flaggedTokens[0].offset;
        query.SelLength = jsonResults.flaggedTokens[0].token.length;
        numOfOpt = replacements.length;
        optToAdd = ""
        for (i=0; i<numOfOpt; i++) {
            if (i==0) {
                optToAdd += "<option selected>" + replacements[i].suggestion + "</option>";
            }
            else {
                optToAdd += "<option>" + replacements[i].suggestion + "</option>";
            }
        }
        document.getElementById("suggest_option").innerHTML = optToAdd;
    }
}

function spellCorrect3_2(results) {
    wordToChange = results.flaggedTokens[0].token;
    opt = document.getElementById("suggest_option").value;
    inputText = document.getElementById("textInput").value;
    inputText = inputText.replace(wordToChange, opt);
    document.getElementById("textInput").value = inputText;
    results.flaggedTokens.shift();
    this.tmpResults = results;
    spellCorrect3_1(this.tmpResults);
}

function spellCorrect3_3(results) {
    results.flaggedTokens.shift();
    spellCorrect3_1(results);
}