const dialogflow = require('dialogflow');
const uuid = require('uuid');
require('dotenv').config

const projectId = process.env.GOOGLE_PROJECT_ID
const sessionId = uuid.v4();

const credentials = {
    client_email:process.env.GOOGLE_CLIENT_MAIL,
    private_key:process.env.GOOGLE_PRIVATE_KEY
}
const sessionClient = new dialogflow.SessionsClient({projectId,credentials});
// console.log("DEMO",credentials)
const textQuery = async (req,res,next)=>{
    // const sessionPath = sessionClient.projectAgentSessionPath(
    //     projectId,
    //     sessionId
    // );
    const sessionPath = sessionClient.sessionPath(projectId, sessionId);

    // console.log("SESSION CLIENT:::",sessionClient)
    // console.log("SESSION ID:::",sessionId)
    const text_query = req.body.text
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
        text: {
            // The query to send to the dialogflow agent
            text: text_query,
            // The language used by the client (en-US)
            languageCode: 'en-US',
        },
        },
    };

    try {
        // console.log("TEXT QUERY::::" ,text_query    )
        const responses = await sessionClient.detectIntent(request);
        console.log('Detected intent');
        const result = responses[0].queryResult;
        console.log(`  Query: ${result.queryText}`);
        console.log(`  Response: ${result.fulfillmentText}`);
        if (result.intent) {
            console.log(`  Intent: ${result.intent.displayName}`);
        } else {
            console.log(`  No intent matched.`);
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    textQuery
}


