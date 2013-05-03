function show_minical(){
  if (scheduler.isCalendarVisible())
     scheduler.destroyCalendar();
  else
     scheduler.renderCalendar({
        position:"dhx_minical_icon",
        date:scheduler._date,
        navigation:true,
        handler:function(date,calendar){
           scheduler.setCurrentView(date);
           scheduler.destroyCalendar()
        }
     });
}

$('#dhx_minical_icon').live({
	click: function(){
		show_minical();
	}
});

scheduler.xy = $.extend({} , scheduler.xy , {
	scale_height: 41,
	min_event_height: 100
});
	
scheduler.refreshSchoolConfig = function(){
	this.config = $.extend({} , scheduler.config , ds.School.getSchedulerConfig());
}

scheduler.locale.labels = $.extend({} , scheduler.locale.labels , {
	confirm_deleting: 'Are you sure you want to delete this event?'
});

scheduler.templates.event_date = function(date){
	var
	nb	= date.getHours()*60 + date.getMinutes();
	
	return _ns.formatTimeFromNumber(nb);
}

scheduler.config = $.extend({} , scheduler.config , {
	full_day: false,
	repeat_date : "%m/%d/%Y",
	hour_size_px: 132,
	separate_short_events: true,
	details_on_dblclick: true,
	xml_date : "%Y-%m-%d %H:%i",
	multi_day: false,
	details_on_create: true,
	fix_tab_position: false,
	first_hour: 7,
	last_hour: 23,
	drag_lightbox: true,
	show_loading: true,
	minicalendar: {
		mark_events: true
	},
	buttons_left: ["dhx_cancel_btn"],
	buttons_right: [],
	server_utc : true
});

scheduler.render_event_bar = function(a) {
    var b = this._rendered_location, c = this._colsS[a._sday], d = this._colsS[a._eday];
    d == c && (d = this._colsS[a._eday + 1]);
    var e = this.xy.bar_height, f = a.id == this._drag_id ? 0 : a._sorder * e, g = this._colsS.heights[a._sweek] + (this._colsS.height ? this.xy.month_scale_height + 2 : 2) + f, h = document.createElement("DIV"), k = "dhx_cal_event_clear";
    a._timed || (k = "dhx_cal_event_line", a.hasOwnProperty("_first_chunk") && a._first_chunk && (k += " dhx_cal_event_line_start"), a.hasOwnProperty("_last_chunk") && 
    a._last_chunk && (k += " dhx_cal_event_line_end"));
    var i = scheduler.templates.event_class(a.start_date, a.end_date, a);
    i && (k = k + " " + i);
    var j = a.color ? "color:" + a.color + ";" : "", m = a.textColor ? "color:" + a.textColor + ";" : "", n = '<div event_id="' + a.id + '" class="' + k + '" style="position:absolute; top:' + g + "px; left:" + c + "px; width:" + (d - c - 15) + "px;" + m + "" + j + "" + (a._text_style || "") + '">', a = scheduler.getEvent(a.id);
    a._timed && (n += scheduler.templates.event_bar_date(a.start_date, a.end_date, a));
    n += scheduler.templates.event_bar_text(a.start_date, 
    a.end_date, a) + "</div>";
    n += "</div>";
    h.innerHTML = n;
    this._rendered.push(h.firstChild);
    b.appendChild(h.firstChild)
};