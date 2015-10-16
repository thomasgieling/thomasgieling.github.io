$(function() {
	var a = $('<a/>');
	a.attr('href', 'http://thomasgieling.github.io/thirdtestpage.html');
	a.text('Link to the third test page')
	var li = $('<li/>').append(a);
   $('#testlinks').append(li);
});
$(document).ready(function() {
	
	var actions = {
		uk : "http://staging.store.adidasgroup.demandware.net/on/demandware.store/Sites-adidas-GB-Site/en_GB/URLBuilder-GetSEOConfig",
		de : "http://staging.store.adidasgroup.demandware.net/on/demandware.store/Sites-adidas-DE-Site/de_DE/URLBuilder-GetSEOConfig",
		nl : "http://staging.store.adidasgroup.demandware.net/on/demandware.store/Sites-adidas-NL-Site/nl_NL/URLBuilder-GetSEOConfig",
		pl : "http://staging.store.adidasgroup.demandware.net/on/demandware.store/Sites-adidas-PL-Site/pl_PL/URLBuilder-GetSEOConfig"			
	};		
	
	$("#urlBuilderForm").on("submit", function(e) {
		
		e && e.preventDefault();
		var queryString = $(this).serialize();
		var selected = $("select option:selected").val();
		var url = actions[selected];
		$.ajax({
			url: url,
			type: 'GET',
			data: queryString,
			success: function(response) {
				$("#result").html(JSON.stringify(response));
			},
			error: function(xhr, textStatus) {
				$("#result").html(textStatus + "!");
			}
		});
	});			

});