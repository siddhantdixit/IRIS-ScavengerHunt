
const sleep = require('util').promisify(setTimeout);
const ComputerVisionClient = require('@azure/cognitiveservices-computervision').ComputerVisionClient;
const ApiKeyCredentials = require('@azure/ms-rest-js').ApiKeyCredentials;
/**
 * AUTHENTICATE
 * This single client is used for all examples.
 */
const key = 'fa185d24179246f6b740cd42701d9725';
const endpoint = 'https://scavengerhunt.cognitiveservices.azure.com/';

const computerVisionClient = new ComputerVisionClient(
  new ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': key } }), endpoint);
/**
 * END - Authenticate
 */

const getTextFromImage = async (imageURL) =>{

    console.log('-------------------------------------------------');
    console.log('READ PRINTED, HANDWRITTEN TEXT AND PDF');
    console.log();

    // URL images containing printed and/or handwritten text. 
    // The URL can point to image files (.jpg/.png/.bmp) or multi-page files (.pdf, .tiff).
    const printedTextSampleURL = imageURL;

    // Recognize text in printed image from a URL
    console.log('Read printed text from URL...', printedTextSampleURL.split('/').pop());
    const printedResult = await readTextFromURL(computerVisionClient, printedTextSampleURL);
    let extractedText = printRecText(printedResult);
    return extractedText;
}

async function readTextFromURL(client, url) {
    // To recognize text in a local image, replace client.read() with readTextInStream() as shown:
    let result = await client.read(url);
    // Operation ID is last path segment of operationLocation (a URL)
    let operation = result.operationLocation.split('/').slice(-1)[0];

    // Wait for read recognition to complete
    // result.status is initially undefined, since it's the result of read
    while (result.status !== "succeeded") { await sleep(1000); result = await client.getReadResult(operation); }
    return result.analyzeResult.readResults; // Return the first page of result. Replace [0] with the desired page if this is a multi-page file such as .pdf or .tiff.
}

// Prints all text from Read result
function printRecText(readResults) {
    // console.log('Recognized text:');
    let answerResult = "";
    for (const page in readResults) {
        if (readResults.length > 1) {
        // console.log(`==== Page: ${page}`);
        }
        const result = readResults[page];

        if (result.lines.length) {
        for (const line of result.lines) {
            answerResult+=line.words.map(w => w.text).join(' ') + ' ';
        }
        }
        else { console.log('No recognized text.'); }
    }
    return answerResult;
}



module.exports = {
    getTextFromImage
}