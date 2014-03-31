(function($, undefined) {

	var fc = $.my1Calendar = { version: "0.1.0" };
	$.fn.my1Calendar = function(options) {
		console.log("start my1Calendar;");
		this.each(function(i, _element) {
			var element = $(_element);
			var calendar = new MyCalendar(element);
//		var calendar = new Calendar(element, options, eventSources);
			element.data('my1Calendar', calendar);
			calendar.render();
		});
	}

	;;


;;

	function MyCalendar(element) {
		console.log("calendar");
		var t = this;
		this.render=function(inc) {
			initialRender();
		}
		
		function initialRender() {
			content = $("<div>Hello Calendar</div>")
			.prependTo(element);
			header = new Header(t);
			headerElement = header.render();
			if (headerElement) {
				element.prepend(headerElement);
			}
			console.log(element);
			BasicView.call(t,element);
			console.log(2);
		}
	}
	
;;


	function Header(calendar, options) {
		var t = this;
		t.render = render;
		function render() {
			element = $("<table class='fc-header' style='width:100%'/>")
			.append(
				$("<tr/>")
					.append(renderSection('left'))
					.append(renderSection('center'))
					.append(renderSection('right'))
			);
			return element;
		}
		
		function renderSection(position) {
			var e = $("<td class='fc-header-" + position + "'/>");
			return e;
		}
	}

;;

function BasicView(element, calendar, viewName) {
	var t = this;
	var tm;
	var showWeekNumbers;
	var rowCnt, colCnt=7;
	var table;

	// imports
	console.log("imports View.call");
	View.call(t, element, calendar, viewName);

	console.log("BasicView");
	buildTable();
	
	function buildTable() {
		var html = buildTableHTML();
		if (table) {
			table.remove();
		}
		table = $(html).appendTo(element);
	}
	function buildTableHTML() {
		var html =
			"<table class='fc-border-separate' style='width:100%' cellspacing='0'>" +
			buildHeadHTML() +
			buildBodyHTML() +
			"</table>";
		return html;
	}
	function buildHeadHTML() {
		var headerClass = tm + "-widget-header";
		var html = '';
		var col;
		var date;
		html += "<thead><tr>"; 

		if (showWeekNumbers) {
			html +=
				"<th class='fc-week-number " + headerClass + "'>" +
				htmlEscape(weekNumberTitle) +
				"</th>";
		}

		for (col=0; col<colCnt; col++) {
			date = cellToDate(0, col);
			html +=
				"<th class='fc-day-header fc-" + dayIDs[date.getDay()] + " " + headerClass + "'>" +
				htmlEscape(formatDate(date, colFormat)) +
				"</th>";
		}
		html += "</tr></thead>";
		return html; 
	}
	function buildBodyHTML() {
		var contentClass = tm + "-widget-content";
		var html = '';
		var row;
		var col;
		var date;

		html += "<tbody>";
		for (row=0; row<rowCnt; row++) {
			html += "<tr class='fc-week'>";
			if (showWeekNumbers) {
				date = cellToDate(row, 0);
				html +=
					"<td class='fc-week-number " + contentClass + "'>" +
					"<div>" +
					htmlEscape(formatDate(date, weekNumberFormat)) +
					"</div>" +
					"</td>";
			}
			for (col=0; col<colCnt; col++) {
				date = cellToDate(row, col);
				console.log(date);
				html += buildCellHTML(date);
			}
			html += "</tr>";
		}
		html += "</tbody>";
		return html; 
	}
	function htmlEscape(s) {
		return s.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/'/g, '&#039;')
		.replace(/"/g, '&quot;')
		.replace(/\n/g, '<br />');
	}
}


function View(element, calendar, viewName) {
	var t = this;
	
	var cellToDate = t.cellToDate;
	var cellToCellOffset = t.cellToCellOffset;
	var cellOffsetToDayOffset = t.cellOffsetToDayOffset;

	function cellToDate() {
		var cellOffset = cellToCellOffset.apply(null, arguments);
		var dayOffset = cellOffsetToDayOffset(cellOffset);
		var date = dayOffsetToDate(dayOffset);
		return date;
	}
	// cell -> cell offset
	// Possible arguments:
	// - row, col
	// - { row:#, col:# }
	function cellToCellOffset(row, col) {
		var colCnt = t.getColCnt();

		// rtl variables. wish we could pre-populate these. but where?
		var dis = isRTL ? -1 : 1;
		var dit = isRTL ? colCnt - 1 : 0;

		if (typeof row == 'object') {
			col = row.col;
			row = row.row;
		}
		var cellOffset = row * colCnt + (col * dis + dit); // column, adjusted for RTL (dis & dit)

		return cellOffset;
	}

	// cell offset -> day offset
	function cellOffsetToDayOffset(cellOffset) {
		var day0 = t.visStart.getDay(); // first date's day of week
		cellOffset += dayToCellMap[day0]; // normlize cellOffset to beginning-of-week
		return Math.floor(cellOffset / cellsPerWeek) * 7 // # of days from full weeks
			+ cellToDayMap[ // # of days from partial last week
				(cellOffset % cellsPerWeek + cellsPerWeek) % cellsPerWeek // crazy math to handle negative cellOffsets
			]
			- day0; // adjustment for beginning-of-week normalization
	}

	// day offset -> date (JavaScript Date object)
	function dayOffsetToDate(dayOffset) {
		var date = cloneDate(t.visStart);
		addDays(date, dayOffset);
		return date;
	}

}


})(jQuery);
