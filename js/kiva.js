$(document).ready(function() {
	$("#countries option").click(function() {
		displayLenders();
   	 });
   	 $(".sortby").on('change', function() {
		displayLenders();
    });
    $(".paging").on('change', function() {
			displayLenders();
    });
});
function displayLenders() {
	var sortBy = $(".sortby:checked").val(),
		countryCode = $("#countries ").val(),
		page = $("#paging").val();
		if (page == 0) page = 1;
	// get a list of vendor ids
	$.getJSON("https://api.kivaws.org/v1/lenders/search.json?sort_by=" + sortBy + "&country_code="+countryCode + "&page=" + page, function(result){
		var lenders = result.lenders,
			len = lenders.length,
			lenderIds = "", paging = result.paging;
			var pages=paging.pages
			// get the list of lenders to retrieve
			for (var i = 0; i < len; i++) {
				lenderIds = lenderIds + lenders[i].lender_id;
				if (i < len-1) {
					lenderIds = lenderIds + ",";
				}
			};
			$(".paging").empty();
			console.log(paging);
			console.log("pages" +pages);
			for (var i = 1; i <= pages; i++) {
				selected = "";
				if (i == page) selected = "selected";
				$(".paging").append("<option "+ selected +" value=" + i + ">" + i + "</option>");
			}
			// display detailed info on each lender
			$.getJSON("https://api.kivaws.org/v1/lenders/" + lenderIds + ".json", function(result) {
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
