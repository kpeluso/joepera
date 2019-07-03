chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.text === 'report_back_google') {
    sendResponse('(already have url)');
  } else if (msg.text === 'report_back_youtube') {
    let titleRegex = /<yt-formatted-string class="style-scope ytd-video-primary-info-renderer">(.{1,100})<\/yt-formatted-string>/; // titles truncated in sesarch after 70 chars, hard limit of 100 chars
    sendResponse(document.all[0].outerHTML.match(titleRegex)[1]);
  }
});