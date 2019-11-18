//Official stopword list from NLTK
let stopwords = ['i','me','my','myself','we','our','ours','ourselves','you','your','yours','yourself','yourselves','he','him','his','himself','she','her','hers','herself','it','its','itself','they','them','their','theirs','themselves','what','which','who','whom','this','that','these','those','am','is','are','was','were','be','been','being','have','has','had','having','do','does','did','doing','a','an','the','and','but','if','or','because','as','until','while','of','at','by','for','with','about','against','between','into','through','during','before','after','above','below','to','from','up','down','in','out','on','off','over','under','again','further','then','once','here','there','when','where','why','how','all','any','both','each','few','more','most','other','some','such','no','nor','not','only','own','same','so','than','too','very','s','t','can','will','just','don','should','now']

//USAA Tornado Article
let tornadoText = 'Chances are that you’ll never experience a tornado unless you live in certain parts of the country, like the Great Plains or the Gulf Coast, or you happen to chase storms for a living. And good for you if you never have to worry about them. But if you’re ever one of the unlucky few who find themselves in the path of a twister, it’s a literal whirlwind that has the potential to completely upend your life. Following are a few steps you can take now that will help prepare you for the aftermath, as well as a few things to do afterward to help you get things back on track. First off, find a safe place to store all of your critical financial, medical and legal records. This can be somewhere outside of your home or in a storage container that’s protected from the elements. Having these documents in a safe place will ease your mind in case of any emergency. Next, devise an evacuation plan to use during any natural disaster and include special considerations for pets or people with disabilities in your household. Make sure you have an emergency kit stocked with anything you’d need for a few days of roughing it. Also think about taking first aid and CPR training — you never know when those skills will be needed. Other than these steps, there isn’t a whole lot you can do to prepare. Any other advice is for what to do after the tornado has come and gone, and finding ways to get back to normal – or a new state of normal, at least. Once the immediate danger has passed and you’ve made certain it’s safe to enter the property – no downed power lines, no significant structural damage, etc. – you’ll want to assess your losses and start to rebuild the pieces. Hopefully, you have an inventory of everything in your home, which will make the process of discovering what was damaged much easier. Then you file a claim. After you file the claim, it’s all about working with your insurance provider to make sure it’s handled as swiftly as possible. This is part of the process of getting back to whole financially. Assessing your financial hit is also important. “Once back to normal, you have to make sure that you rebuild any savings spent during your transition and re-evaluate your insurance,” says Sean Scaturro, CERTIFIED FINANCIAL PLANNERTM practitioner and USAA advice director. You can be excused from being on your best financial behavior while getting back on your feet, but you don’t want to deviate from your long-term financial plans because of a disaster. “Like with any natural disaster, the recovery process from a tornado is made a great deal easier if you take all the steps to prepare in the first place,” Scaturro says. “It’s easy to say this, but it’s important, since emergencies happen. It’s not a matter of if, but a matter of when.” Luckily, you aren’t alone.'

//USAA Mental Health Article
let mentalText = 'When we think about taking care of ourselves, we tend to consider only our physical well-being. But what about your current state of mind? It impacts your day-to-day life much more than you realize. Since we all want to lead our best lives, let’s discuss a few ways to take care of your mind and how you can potentially benefit from it, physically and financially. If you find yourself nodding along to anything in this article and feel like you could use a hand with your mental health, there are places to go for help. More and more employers are offering employee assistance programs because of a general push toward wellness. If you’re a member of the armed forces, a veteran or military or veteran caregiver, there are several organizations that can offer support, like Vets4Warriors, Fisher House, The Mission Continues, PsychArmor Institute, Semper Fi Fund, Elizabeth Dole Foundation and Sesame Street for Military Families. Whether through your employer or one of these organizations, take advantage of these services that can help you with the stressors in your life. Overall, the better your mental health, the better your physical health is likely to be. If you think about how you act when you’re feeling down, this makes perfect sense. You care less about what you eat, what you wear, about going out and being with friends, about your social networks. But how can your mental health affect your finances? That’s a little harder to define. It’s clear that the inverse is true — that finances can affect your mental state. There are a few ways your mental health can impact your finances, some obvious and some not. “A bad mental state can lead to a lack of care: You might lose motivation and stop going to work, you might have job performance issues that can spiral out of control,” says CERTIFIED FINANCIAL PLANNERTM practitioner and USAA advice director Sean Scaturro. But, he says, there is a positive side: “Taking good positive strides toward your self-esteem, toward your mental health, can help you perform better, learn how you communicate and how to get better at it, at actually talking to people. It might increase your mental state and job functions. There’s a strong connection between self-confidence and financial health: As you see gains or benefits from the efforts you’re putting to a task, you’re going to want to do more of it. “When you have a mission, you work more effectively; when you know what you’re working toward, you have more productive work; when you enjoy what you’re doing, you’re more passionate about it,” Scaturro says. A great way to consistently build this self-assurance is by developing a support network. It might sound cliché, but talking with people helps, and not just when you’re in a crisis. Opening up about how you feel and not bottling things up or trying to solve issues yourself can lead to a world of greater self-satisfaction. Active participation in a support network has time and time again been seen as a way to tackle the biggest challenges in our lives and move forward in a productive manner. This is especially true if you are a member of the military community because of your service and sacrifice and the associated stressors that can weigh heavily on one’s mental state. Community programs and resources can positively impact your life and contribute to your overall health and well-being, and peer connections can be incredibly powerful. The main takeaway is that everything is interconnected. Prevention and wellness techniques, like therapy – which may be provided by your employer’s assistance program or your support networks – lets you get ahead of the curve and keep your brain and body healthy. Promoting this holistic well-being is, we can all agree, a good thing.'
//------------------------------------------------------------------------------

//Uncomment to run it
// weightText(tornadoText);

// weightText(mentalText);

function weightText(text){

    //Regex to split but keep end punctuation characters
    let sentences = text.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g);

    //Regex to remove all special characters
    let noSpecialsText = text.replace(/[^a-zA-Z0-9 ]/g, '');

    //Break into individual words
    let tokenizedWords = noSpecialsText.split(' ');

    //Find the # of occurences of each word
    let wordFreq = {};

    tokenizedWords.forEach(word => {
        word = word.toLowerCase();
        if(!stopwords.includes(word)){
            if(!Object.keys(wordFreq).includes(word))
                wordFreq[word] = 1;
            else
                wordFreq[word] += 1;
        }
    });

    //Most used word
    let maxCount = Math.max(...Object.values(wordFreq));

    //Find the weighted average
    Object.keys(wordFreq).forEach(word => {
        wordFreq[word] = wordFreq[word] / maxCount;
    });

    //Set weighted scores of each sentence
    sentenceWeights = {};
    sentences.forEach(sentence => {

        let formatSent = sentence.replace(/[^a-zA-Z0-9 ]/g, '');

        let words = formatSent.split(' ');

        words.forEach(word => {
            word = word.toLowerCase();
            if(Object.keys(wordFreq).includes(word)){
                if(!Object.keys(sentenceWeights).includes(sentence))
                    sentenceWeights[sentence] = wordFreq[word];
                else
                    sentenceWeights[sentence] += wordFreq[word];
            }
        })
    });
    return sentenceWeights;
}

//Reconstruct weighted sentences
//Use isSeparate to either return individual sentence array or concat summary, 0=returnArray, 1=returnString 
function assemble(weightsObj, reqNumOfSentences, isSeparate){

    let summarizedContent;
    let weightVals = Object.values(sentenceWeights);
    let topWeightIndices = findWeightIndices(weightVals, reqNumOfSentences, isSeparate);
    console.log(topWeightIndices);
    //Keep within character limit
    if(isSeparate == 0){
        summarizedContent = [];
        for (let i = 0; i < topWeightIndices.length; i++){
            summarizedContent.push(Object.keys(weightsObj)[topWeightIndices[i]]);
        };      
    }
    //Concat
    else if(isSeparate == 1){
        summarizedContent = '';
        for (let i = 0; i < topWeightIndices.length; i++){
            summarizedContent = summarizedContent + ' ' + Object.keys(weightsObj)[topWeightIndices[i]];
        };       
    }

    return summarizedContent;
}

//Get ORDERED index position of n largest weights
//isDesc=0, isOrdered=1
function findWeightIndices(weightsArr, reqNumOfSentences, isDesc) {

    let topWeightIndices = [];

    for (var i = 0; i < weightsArr.length; i++) {
        //Add initial values
        topWeightIndices.push(i);
        //After initial values added, enter if
        if (topWeightIndices.length > reqNumOfSentences) {
            //Sort based on weights value, not index value
            topWeightIndices.sort(function(a, b) { return weightsArr[b] - weightsArr[a]; });
            //Remove lowest
            topWeightIndices.pop();
        }
    }
    console.log(topWeightIndices);
    if(isDesc == 0)
        return topWeightIndices;
    else if(isDesc == 1)
        return topWeightIndices.sort();
}

function twitterize(sentenceArray){
    let charLimit = 280;
    let tweet = '';

    for(let i = 0; i < sentenceArray.length; i++){

        //Check if sent under limit and set at least defaut value
        if(sentenceArray[i].length < charLimit){      
            if(tweet == '')
                tweet = sentenceArray[i];
            
            //See if you can pair a second sentence and stay under char limit
            for(let j = i + 1; j < sentenceArray.length; j++){
                if(sentenceArray[j].length < charLimit){
                    if(tweet.length < charLimit && (tweet.length + sentenceArray[j].length < charLimit)){
                        tweet = tweet + ' ' + sentenceArray[j];
                    }
                }
            }
        }
    }
    return tweet;
}

$('#convertBtn').on('click', function(){
    // alert('button works');

    // let weights = weightText(tornadoText);
    let inputText = $('#textInput').val();
    let weights = weightText(inputText);


    let finalOutput = assemble(weights, 4, 1);
    $('#otherText').text(finalOutput.trim());
    // console.log('Summarized Content to 3: \n' + finalOutput);

    // console.log('\n');
    // console.log('Shrunk from ' + Object.keys(weights).length + ' sentences to 3 sentences!\n\n');

    let twitterOutput = assemble(weights, 6, 0);
    // console.log('Summarized Content to 1: \n' + twitterOutput);
    // console.log(twitterOutput);

    // console.log('\n');
    // console.log('Shrunk from ' + Object.keys(weights).length + ' sentences to 1 sentences!');
    // console.log('Characters: ' + twitterOutput.length);   
    
    let finalTweet = twitterize(twitterOutput);
    // console.log(finalTweet);

    $('#twitterText').text(finalTweet.trim());
    $('#twitterText').trigger('keyup');

    return false;
})

//Count characters for user
$('#twitterText').on('keyup', function(){
    let charLength = $('#twitterText').val().length;
    console.log('keyup: ' + charLength)
    $('#charCount').text(charLength + '/280')

});

$('#copyBtn').on('click', function(){

    $('#otherText').select();
    document.execCommand("copy");
    window.getSelection().removeAllRanges();

})

$('#twitterBtn').on('click', function(){
    //PUT TWITTER POST API CALL HERE FOR ONCLICK EVENT

})

$('#fbBtn').on('click', function(){
    //OPTIONAL FACEBOOK CALL IF TIME

})
