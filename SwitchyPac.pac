function regExpMatch(url, pattern) {
	try { return new RegExp(pattern).test(url); } catch(ex) { return false; }
}

function FindProxyForURL(url, host) {
	if (shExpMatch(url, "*://*.facebook.com/*") || shExpMatch(url, "*://facebook.com/*")) return 'PROXY 127.0.0.1:8087';
	if (shExpMatch(url, "*://*.google.com/*") || shExpMatch(url, "*://google.com/*")) return 'PROXY 127.0.0.1:8087';
	if (shExpMatch(url, "*://*.googleusercontent.com/*") || shExpMatch(url, "*://googleusercontent.com/*")) return 'PROXY 127.0.0.1:8087';
	if (shExpMatch(url, "*://*.youtube.com/*") || shExpMatch(url, "*://youtube.com/*")) return 'PROXY 127.0.0.1:8087';
	if (shExpMatch(url, "*://bit.ly/*")) return 'PROXY 127.0.0.1:8087';
	if (shExpMatch(url, "*://aws.amazon.com/*")) return 'PROXY 127.0.0.1:8087';
	if (shExpMatch(url, "*://*.ggpht.com/*") || shExpMatch(url, "*://ggpht.com/*")) return 'PROXY 127.0.0.1:8087';
	if (shExpMatch(url, "*://*.gstatic.com/*") || shExpMatch(url, "*://gstatic.com/*")) return 'PROXY 127.0.0.1:8087';
	if (shExpMatch(url, "*://*.ytimg.com/*") || shExpMatch(url, "*://ytimg.com/*")) return 'PROXY 127.0.0.1:8087';
	return 'DIRECT';
}