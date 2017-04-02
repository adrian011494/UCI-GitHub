'use strict';

var tess=true;
var localurl="";
chrome.browserAction.onClicked.addListener(function(tab) {
    if(tess){
      tess=false;
      chrome.browserAction.setIcon({path: 'icon2.svg'});

    }else{
      chrome.browserAction.setIcon({path: 'icon.svg'});
      tess=true;
    }

});


chrome.webRequest.onBeforeRequest.addListener(
  function(info) {
    // Redirect the original request to a given URL.
    if(tess){
    var url="";

    if(info.url.includes("api.github.com")){
      var exp=new RegExp("(http|https)://api.github.com/");
      url = info.url.replace(exp,"http://nexus.prod.uci.cu/repository/api.github.com-proxy/");
  return {redirectUrl: url};
    }else{

    var exp=new RegExp("(http|https)://github.com/");
    url = info.url.replace(exp,"http://nexus.prod.uci.cu/repository/github-proxy/");
  return {redirectUrl: url};
    }


    }
  },
  // filters
  {
    urls: [
      "*://github.com/*","*://api.github.com/*"
    ]
  },
  // extraInfoSpec
  ["blocking"]);

  chrome.webRequest.onBeforeRequest.addListener(
    function(info) {
      // Redirect the original request to a given URL.
      if(tess){
      //  console.log("CANCEL "+info.url+" NEW "+chrome.extension.getURL('github/framework.css'));
      //return {redirectUrl: chrome.extension.getURL('framework.css')};
        return {cancel: true};

      }

    },
    // filters
    {
      urls: [
        "*://*.github.com/*","*://*.githubusercontent.com/*"
      ]
    },
    // extraInfoSpec
    ["blocking"]);
