'use strict';


var target = "*://github.com/*";


function logResponse(responseDetails) {
    console.log("AAAAAAAAAAAAAAAAAAA");
    browser.tabs.query({
        currentWindow: true,
        active: true
    }).then(sendMessageToTabs).catch(onError);
}
var browser = browser || chrome;
browser.webRequest.onCompleted.addListener(
    logResponse,
    {urls: [
        "*://github.com/*"
    ]}
);

function onError(error) {
    console.error(`Error: ${error}`);
}

function sendMessageToTabs(tabs) {
    for (let tab of tabs) {
        browser.tabs.sendMessage(
            tab.id,
            {greeting: "Hi from background script"}
        ).then(response => {
            console.log("Message from the content script:");
        console.log(response.response);
    }).catch(onError);
    }
}

// var tess=true;
// var localurl="";
// chrome.browserAction.onClicked.addListener(function(tab) {
//     if(tess){
//       tess=false;
//       chrome.browserAction.setIcon({path: 'icon2.svg'});
//
//     }else{
//       chrome.browserAction.setIcon({path: 'icon.svg'});
//       tess=true;
//     }
//
// });
//
//
// chrome.webRequest.onBeforeRequest.addListener(
//   function(info) {
//     // Redirect the original request to a given URL.
//     if(tess){
//     var url="";
//
//     if(info.url.includes("api.github.com")){
//       var exp=new RegExp("(http|https)://api.github.com/");
//       url = info.url.replace(exp,"http://nexus.prod.uci.cu/repository/api.github.com-proxy/");
//   return {redirectUrl: url};
//     }else{
//
//     var exp=new RegExp("(http|https)://github.com/");
//     url = info.url.replace(exp,"http://nexus.prod.uci.cu/repository/github-proxy/");
//   return {redirectUrl: url};
//     }
//
//
//     }
//   },
//   // filters
//   {
//     urls: [
//       "*://github.com/*","*://api.github.com/*"
//     ]
//   },
//   // extraInfoSpec
//   ["blocking"]);
//
//   chrome.webRequest.onBeforeRequest.addListener(
//     function(info) {
//       // Redirect the original request to a given URL.
//       if(tess){
//       //  console.log("CANCEL "+info.url+" NEW "+chrome.extension.getURL('github/framework.css'));
//       //return {redirectUrl: chrome.extension.getURL('framework.css')};
//         return {cancel: true};
//
//       }
//
//     },
//     // filters
//     {
//       urls: [
//         "*://*.github.com/*","*://*.githubusercontent.com/*"
//       ]
//     },
//     // extraInfoSpec
//     ["blocking"]);
