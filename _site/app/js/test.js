$(function() {
	var a = $('<a/>');
	a.attr('href', 'http://thomasgieling.github.io/thirdtestpage.html');
	a.text('Link to the third test page')
	var li = $('<li/>').append(a);
   $('#testlinks').append(li);
});