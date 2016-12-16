/**
 Copyright 2014-2015 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 
 Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
 
 http://aws.amazon.com/apache2.0/
 
 or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */

/**
 * Star Wars Puzzle Game
 * This Alexa Skill will guide the players through each step in the crossword puzzle so they can find the plans
 * to the Death Star and destroy it.
 */

'use strict';

// Route the incoming request based on type (LaunchRequest, IntentRequest,
// etc.) The JSON body of the request is provided in the event parameter.
exports.handler = function (event, context) {
    try {
        console.log("event.session.application.applicationId=" + event.session.application.applicationId);
        
        /**
         * Uncomment this if statement and populate with your skill's application ID to
         * prevent someone else from configuring a skill that sends requests to this function.
         */
        
        //     if (event.session.application.applicationId !== "amzn1.echo-sdk-ams.app.05aecccb3-1461-48fb-a008-822ddrt6b516") {
        //         context.fail("Invalid Application ID");
        //      }
        
        if (event.session.new) {
            console.log("New Session Started=" + event.session);
            onSessionStarted({requestId: event.request.requestId}, event.session);
        }
        
        if (event.request.type === "LaunchRequest") {
            onLaunch(event.request,
                     event.session,
                     function callback(sessionAttributes, speechletResponse) {
                     context.succeed(buildResponse(sessionAttributes, speechletResponse));
                     });
        } else if (event.request.type === "IntentRequest") {
            onIntent(event.request,
                     event.session,
                     function callback(sessionAttributes, speechletResponse) {
                     context.succeed(buildResponse(sessionAttributes, speechletResponse));
                     });
        } else if (event.request.type === "SessionEndedRequest") {
            onSessionEnded(event.request, event.session);
            context.succeed();
        }
    } catch (e) {
        context.fail("Exception: " + e);
    }
};

/**
 * Called when the session starts.
 */
function onSessionStarted(sessionStartedRequest, session) {
    console.log("onSessionStarted requestId=" + sessionStartedRequest.requestId
                + ", sessionId=" + session.sessionId);
    
    // add any session init logic here
}

/**
 * Called when the user invokes the skill without specifying what they want.
 */
function onLaunch(launchRequest, session, callback) {
    console.log("onLaunch requestId=" + launchRequest.requestId
                + ", sessionId=" + session.sessionId);
    
    getWelcomeResponse(callback);
}

/**
 * Called when the user specifies an intent for this skill.
 */
function onIntent(intentRequest, session, callback) {
    console.log("onIntent requestId=" + intentRequest.requestId
                + ", sessionId=" + session.sessionId);
    
    var intent = intentRequest.intent,
    intentName = intentRequest.intent.name;
    
    // handle yes/no intent after the user has been prompted
    if (session.attributes && session.attributes.userPromptedToContinue) {
        delete session.attributes.userPromptedToContinue;
        if ("AMAZON.NoIntent" === intentName) {
            handleFinishSessionRequest(intent, session, callback);
        } else if ("AMAZON.YesIntent" === intentName) {
            handleRepeatRequest(intent, session, callback);
        }
    }
    
    // dispatch custom intents to handlers here
    if ("AnswerIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("HyperspaceIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("FatherIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("EmpireIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("SisterIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("FriendIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("JediIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("XwingIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("DroidIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("ForceBeWithYouIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AnswerOnlyIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("DontKnowIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.YesIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.NoIntent" === intentName) {
        handleAnswerRequest(intent, session, callback);
    } else if ("AMAZON.StartOverIntent" === intentName) {
        getWelcomeResponse(callback);
    } else if ("AMAZON.RepeatIntent" === intentName) {
        handleRepeatRequest(intent, session, callback);
    } else if ("AMAZON.HelpIntent" === intentName) {
        handleGetHelpRequest(intent, session, callback);
    } else if ("AMAZON.StopIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else if ("AMAZON.CancelIntent" === intentName) {
        handleFinishSessionRequest(intent, session, callback);
    } else {
        throw "Invalid intent";
    }
}

/**
 * Called when the user ends the session.
 * Is not called when the skill returns shouldEndSession=true.
 */
function onSessionEnded(sessionEndedRequest, session) {
    console.log("onSessionEnded requestId=" + sessionEndedRequest.requestId
                + ", sessionId=" + session.sessionId);
    
    // Add any cleanup logic here
}

// ------- Skill specific business logic -------
var CARD_TITLE = "Star Wars Puzzle"; // Be sure to change this for your skill.

function getWelcomeResponse(callback) {
    var sessionAttributes = {},
    speechOutput = "<speak><audio src='https://s3.amazonaws.com/starwarspuzzle/openingtheme.mp3'/>"
    + "<break time='1s'/>Welcome to the star wars death star puzzle game."
    + "<break time='1s'/>Your mission is to complete the crossword puzzle and find the deaths star plans and destroy it."
    + "<break time='1s'/>I will be here to guide you through each step of the game"
    + "<break time='1s'/>Let’s get started."
    + "<break time='1s'/>For 1 across on the crossword puzzle, you must answer 10 pictopia star wars cards correctly to get the clue</speak>",
    shouldEndSession = true,
    repromptText = "Please repeat your command",
    i, j;
    
    sessionAttributes = {
        "speechOutput": repromptText,
        "repromptText": repromptText,
        "score": 0
    };
    callback(sessionAttributes,
             buildSpeechletResponseSSML(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
}

function handleAnswerRequest(intent, session, callback) {
    var speechOutput = "";
    var sessionAttributes = {};
    var userGaveUp = intent.name === "DontKnowIntent";
    
    var shouldEndSession = true;
    
    var currentQuestionIndex = 0,
    repromptText = "Please repeat your request",
    i, j;
    
    if (intent.name == "HyperspaceIntent") {
        speechOutput = "<speak>Congratulations, you have unlocked the clue for one across on the crossword puzzle."
        + "<break time='1s'/>Here is your clue"
        + "<break time='1s'/>What is the name of the ship from the following sound clip?"
        + "<break time='1s'/><audio src='https://s3.amazonaws.com/starwarspuzzle/kesslrun.mp3'/></speak>";
    }
    else if (intent.name == "FatherIntent") {
        speechOutput = "<speak>Congratulations, you have unlocked the clue for two across on the crossword puzzle."
        + "<break time='1s'/>Here is your clue"
        + "<break time='1s'/>I am the father of Luke Skywalker. <break time='1s'/>What was my Jedi name?"
        + "<break time='1s'/><audio src='https://s3.amazonaws.com/starwarspuzzle/darthvader.mp3'/></speak>";
    }
    else if (intent.name == "EmpireIntent") {
        speechOutput = "<speak>Congratulations, you have unlocked the clue for three across on the crossword puzzle."
        + "<break time='1s'/>Here is your clue"
        + "<break time='1s'/>To see the answer, you need to find a lego kit and build it."
        + "<break time='1s'/>The kit is hidden inside something you use to cook food during a summertime party.</speak>";
    }
    else if (intent.name == "SisterIntent") {
        speechOutput = "<speak>Congratulations, you have unlocked the clue for four across on the crossword puzzle."
        + "<break time='1s'/>Here is your clue"
        + "<break time='1s'/>Which Star Wars character is speaking in the following sound clip?"
        + "<break time='1s'/><audio src='https://s3.amazonaws.com/starwarspuzzle/leia.mp3'/></speak>";
    }
    else if (intent.name == "FriendIntent") {
        speechOutput = "<speak>Congratulations, you have unlocked the clue for five across on the crossword puzzle."
        + "<break time='1s'/>To find the answer, you must decode the numbers into the name of a star wars character</speak>";
    }
    else if (intent.name == "JediIntent") {
        speechOutput = "<speak>Congratulations, you have unlocked the clue for six across on the crossword puzzle."
        + "<break time='1s'/>To see the answer, create letters of the name of a jedi master using the wooden sticks.</speak>";
    }
    else if (intent.name == "XwingIntent") {
        speechOutput = "<speak><audio src='https://s3.amazonaws.com/starwarspuzzle/redfive.mp3'/><break time='2s'/>Congratulations, you have unlocked the clue for seven across on the crossword puzzle."
        + "<break time='1s'/>To see the answer, you need to find a lego kit and build it."
        + "<break time='1s'/>The kit is hidden in the coldest place in the house</speak>";
    }
    else if (intent.name == "DroidIntent") {
        speechOutput = "<speak><audio src='https://s3.amazonaws.com/starwarspuzzle/R2D2a.mp3'/><break time='1s'/>Congratulations, you have completed the crossword puzzle."
        + "<break time='1s'/>One down will tell you the location of the next clue</speak>";
    }
    else if (intent.name == "ForceBeWithYouIntent") {
        speechOutput = "<speak><audio src='https://s3.amazonaws.com/starwarspuzzle/deathstarexplosion.mp3'/>"
        + "<break time='1s'/>Congratulations, you have solved the Star Wars puzzle and won the game!"
        + "<break time='1s'/><audio src='https://s3.amazonaws.com/starwarspuzzle/throneroom.mp3'/></speak>";
    }
    
    sessionAttributes = {
        "speechOutput": repromptText,
        "repromptText": repromptText,
        "currentQuestionIndex": currentQuestionIndex,
        "score": 0
    };
    console.log("Sending Response=" + buildSpeechletResponseSSML(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
    callback(sessionAttributes,
             buildSpeechletResponseSSML(CARD_TITLE, speechOutput, repromptText, shouldEndSession));
    
}

function handleRepeatRequest(intent, session, callback) {
    // Repeat the previous speechOutput and repromptText from the session attributes if available
    // else start a new game session
    if (!session.attributes || !session.attributes.speechOutput) {
        getWelcomeResponse(callback);
    } else {
        callback(session.attributes,
                 buildSpeechletResponseWithoutCard(session.attributes.speechOutput, session.attributes.repromptText, false));
    }
}

function handleGetHelpRequest(intent, session, callback) {
    // Provide a help prompt for the user, explaining how the game is played. Then, continue the game
    // if there is one in progress, or provide the option to start another one.
    
    // Ensure that session.attributes has been initialized
    if (!session.attributes) {
        session.attributes = {};
    }
    
    // Set a flag to track that we're in the Help state.
    session.attributes.userPromptedToContinue = true;
    
    // Do not edit the help dialogue. This has been created by the Alexa team to demonstrate best practices.
    
    var speechOutput = "This is the Star Wars puzzle game. You receive clues from the game by asking Alexa using code words",
    repromptText = "Please repeat your command";
    var shouldEndSession = true;
    callback(session.attributes,
             buildSpeechletResponseWithoutCard(speechOutput, repromptText, shouldEndSession));
}

function handleFinishSessionRequest(intent, session, callback) {
    // End the session with a "Good bye!" if the user wants to quit the game
    callback(session.attributes,
             buildSpeechletResponseWithoutCard("Good bye!", "", true));
}

function isAnswerSlotValid(intent) {
    var answerSlotFilled = intent.slots && intent.slots.Answer && intent.slots.Answer.value;
    var answerSlotIsInt = answerSlotFilled && !isNaN(parseInt(intent.slots.Answer.value));
    return answerSlotIsInt && parseInt(intent.slots.Answer.value) < (ANSWER_COUNT + 1) && parseInt(intent.slots.Answer.value) > 0;
}

// ------- Helper functions to build responses -------


function buildSpeechletResponse(title, output, repromptText, shouldEndSession) {
    return {
    outputSpeech: {
    type: "PlainText",
    text: output
    },
    card: {
    type: "Simple",
    title: title,
    content: output
    },
    reprompt: {
    outputSpeech: {
    type: "PlainText",
    text: repromptText
    }
    },
    shouldEndSession: shouldEndSession
    };
}
function buildSpeechletResponseSSML(title, output, repromptText, shouldEndSession) {
    return {
    outputSpeech: {
    type: "SSML",
    ssml: output
    },
    card: {
    type: "Simple",
    title: title,
    content: output
    },
    reprompt: {
    outputSpeech: {
    type: "PlainText",
    text: repromptText
    }
    },
    shouldEndSession: shouldEndSession
    };
}
function buildSpeechletResponseWithoutCard(output, repromptText, shouldEndSession) {
    return {
    outputSpeech: {
    type: "PlainText",
    text: output
    },
    reprompt: {
    outputSpeech: {
    type: "PlainText",
    text: repromptText
    }
    },
    shouldEndSession: shouldEndSession
    };
}

function buildResponse(sessionAttributes, speechletResponse) {
    return {
    version: "1.0",
    sessionAttributes: sessionAttributes,
    response: speechletResponse
    };
}