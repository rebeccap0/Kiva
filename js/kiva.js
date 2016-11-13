$(document).ready(function() {
	$("#lenderSelect option").click(function() {
		displayLenders();
   	 });
   	 $(".sortby").on('change', function() {
		displayLenders();
    });
});
function displayLenders() {
	console.log("here");
	var sortBy = $(".sortby:checked").val(),
		countryCode = $("#lenderSelect").val();
	// get a list of vendor ids
	$.getJSON("http://api.kivaws.org/v1/lenders/search.json?sort_by=" + sortBy + "&country_code="+countryCode, function(result){
		var lenders = result.lenders,
			len = lenders.length,
			lenderIds = "";
			// get the list of lenders to retrieve
			for (var i = 0; i < len; i++) {
				lenderIds = lenderIds + lenders[i].lender_id;
				if (i < len-1) {
					lenderIds = lenderIds + ",";
				}
			};
			// display detailed info on each lender
			$.getJSON("http://api.kivaws.org/v1/lenders/" + lenderIds + ".json", function(result) {
					var lenders = result.lenders,
						len = lenders.length,
						lender, lenderName="", info = "";
					$("#lenders").empty();
					for (var i = 0; i < len; i++) {
						info = "";
						lender = lenders[i];
						 lenderName = "<a href='http:///www.kiva.org/lender/" + lender.lender_id + "' target=_blank>"+ lender.name +"</a>";
						if (lender.whereabouts) {
							 lenderName = lenderName +" in " + lender.whereabouts;
						}
						if ( lender.occupational_info) {
							info  = "<p>" + unescape(lender.occupational_info) + "</p>";
						}
						$("#lenders").append("<li>" +  lenderName  + info + "</li>");
					};
			});
	 });
}