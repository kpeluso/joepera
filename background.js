let numTabs = 50;
// joe-pera-inspired distraction packs
let randList = [
  'roofing', 'flooring', 'amish+fireplaces', 'microwave+ovens+near+me', 'general+store', 'american+pickers', 'garage+sale+near+me', 'white+picket+fence+catalog', 'american+flag+store', 'geranium+florist+near+me', 'home+improvement',
  'how+to+repair+garden+hose', 'tulip', 'florist', 'florist+near+me', 'geranium', 'roses', 'how+to+plant+tulips', 'how+to+garden', 'best+gardening+hose+2018', 'lunar+calendar+2018', 'ripe+beets+near+me', 'how+to+grow+beets', 'organic+beet+farm+near+me',
  'install+washing+machine', 'best+wrenches', 'home+Depot+flower+pots', 'cost+of+flower+pots', 'flower+pots+near+me', 'antiques+near+me', 'home+improvement+magazine', 'DIY+dog+bed', 'pickup+trucks', 'mayo+prices', 'grocery+coupons', 'coupons',
  'stop+n+shop', 'family+gardening', 'gardening+tips', 'PTA+meetings', 'comfortable+plaid', 'wool', 'knitting', 'how+to+knit', 'how+to+sew', 'how+to+open+email', 'fertilizer+for+tulips', 'how+to+plant+flower+seeds'
]; // middle-age suburban americana themed distractions
// helpers
let randEl = (ls) => {
  return ls[Math.floor(Math.random() * ls.length)];
}
let joepera = (rootUrl) => {
  let url;
  for (i=0;i<numTabs;i++) {
    url = rootUrl + randEl(randList);
    chrome.tabs.create({url, active: false}, afterJoePeraSpeaks);
    chrome.history.addUrl({url})
  }
}
let afterJoePeraSpeaks = (tab) => {
  chrome.tabs.remove(tab.id);
}
// when new tab load complete...
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  if (changeInfo.status == 'complete' && tab.active) {
    let urlRegex_1 = /^https?:\/\/(?:[^./?#]+\.)?google\.com\/search\?/;
    let urlRegex_2 = /^https?:\/\/(?:[^./?#]+\.)?youtube\.com/;
    let searchQueryRegex = /q=([a-zA-Z0-9%\+]+)&/;
    let i,url;
    // ...check the URL of the active tab against our pattern and if it matches, send a message specifying a callback too
    if (urlRegex_1.test(tab.url)) {
      chrome.tabs.sendMessage(tab.id, {text: 'report_back_google'}, (useless) => {joepera("https://www.google.com/search?q=")});
    } else if (urlRegex_2.test(tab.url)) {
      chrome.tabs.sendMessage(tab.id, {text: 'report_back_youtube'}, (title) => {joepera("https://www.youtube.com/results?search_query=")});
    }
  }
})