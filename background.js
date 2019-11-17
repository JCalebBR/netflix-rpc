var series = document.getElementsByClassName('ellipsize-text')[0].children[0].firstChild.data;
var info = document.getElementsByClassName('ellipsize-text')[0].children[1].firstChild.data;
var ep_title = document.getElementsByClassName('ellipsize-text')[0].children[2].firstChild.data;
var data = {
    series: series,
    info: info,
    ep_title: ep_title
};
chrome.runtime.sendMessage({
    action: "return",
    data: JSON.stringify(data)
});