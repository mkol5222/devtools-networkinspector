function copyTextToClipboard(text) {
    //Create a textbox field where we can insert text to. 
    var copyFrom = document.createElement("textarea");
  
    //Set the text content to be the text you wished to copy.
    copyFrom.textContent = text;
  
    //Append the textbox field into the body as a child. 
    //"execCommand()" only works when there exists selected text, and the text is inside 
    //document.body (meaning the text is part of a valid rendered HTML element).
    document.body.appendChild(copyFrom);
  
    //Select all the text!
    copyFrom.select();
  
    //Execute command
    document.execCommand('copy');
  
    //(Optional) De-select the text using blur(). 
    copyFrom.blur();
  
    //Remove the textbox field from the document.body, so no other JavaScript nor 
    //other elements can get access to this.
    document.body.removeChild(copyFrom);
  }

// Listen for all network requests.
chrome.devtools.network.onRequestFinished.addListener(function (request) {
    // Add the request to the network requests list.
    if ( request.request.method === 'POST' && (request.request.url.indexOf("graphql") !== -1
    || request.request.url.indexOf("app/threathunting/prod-gcp-apollo/") !== -1)) { // URL contains string graphql

        // console.log(request);
        var networkRequestsList = document.getElementById("network-requests");
        var requestItem = document.createElement("li");
        requestItem.textContent = `${request.request.url}: ${request.response.bodySize} bytes`;
        networkRequestsList.appendChild(requestItem);

        if (request.request.postData && request.request.postData.text) {
            var requestBody = document.createElement("pre");
            let jsonBody = null;
            try {
                jsonBody = JSON.parse(request.request.postData.text);
            } catch (e) {
                console.error(e);
            }

            if (jsonBody && jsonBody.query) {
                const copyButton = document.createElement("button");
                copyButton.textContent = "Query to clipboard";
                copyButton.addEventListener("click", function () {
                    copyTextToClipboard(jsonBody.query);
                });
                requestItem.prepend(copyButton);
            }

            const reqText = JSON.stringify(jsonBody, null, 2);
            requestBody.textContent = reqText;
            const copyButton = document.createElement("button");
                copyButton.textContent = "Request to clipboard";
                copyButton.addEventListener("click", function () {
                    copyTextToClipboard(reqText);
                });
                requestBody.prepend(copyButton);
            networkRequestsList.appendChild(requestBody);

            request.getContent(function (content, encoding) {
                // console.log('response: ', content, encoding);
                var respBody = document.createElement("pre");
                let jsonBody = null;
                try {
                    jsonBody = JSON.parse(content);
                } catch (e) {
                    console.error(e);
                }

         
                const responseText =  JSON.stringify(jsonBody, null, 2);
                respBody.textContent = responseText;
                networkRequestsList.appendChild(respBody);
                const copyButton = document.createElement("button");
                copyButton.textContent = "Response to clipboard";
                copyButton.addEventListener("click", function () {
                    copyTextToClipboard(responseText);
                });
                respBody.prepend(copyButton);
            });

        }
    }
});
