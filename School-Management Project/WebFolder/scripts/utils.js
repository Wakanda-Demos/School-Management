var
_ns = {
	sFields	: {},
	mappingObj	: {},
	setMappingObj : function(mappingObj){
		this._mappingObj = mappingObj;
	},
	getMappingObj : function(){
		return this._mappingObj;
	}
};

(function(){
	WAF.Widget.prototype.center = function(config){
		var
		htmlObj 	= this.$domNode,
		width		= this.getWidth(),
		parent		= htmlObj.parent(),
		height		= this.getHeight();
		
		if(parent.attr('id') === $('body').attr('id')){
			parent = $(window);
		}
		
		/**
		 * Config : 
		 *    center 			==> 'v' : only vertically
		 *				 			'h' : only horizontally
		 *				 			'vh': horizontally and vertically
		 **/
		if(arguments.length == 0){
			htmlObj.css({
				left	: (parent.width() - width)/2,
				top		: (parent.height() - height)/2
			});
			
			return;
		}
		
		switch(config.center){
			case 'v' :
				htmlObj.css({
					top		: (parent.height() - height)/2
				});
				break;
			case 'h' :
				htmlObj.css({
					left	: (parent.width() - width)/2
				});
				break;
			case 'vh' :
				htmlObj.css({
					left	: (parent.width() - width)/2,
					top		: (parent.height() - height)/2
				});
				break;
		}
	}
	
	WAF.widget.Grid.prototype.editCell = function(row , column){
		var
		gridView = this.gridController.gridView,
		row = gridView._private.functions.getRowByRowNumber({
			gridView: gridView,
			rowNumber: row
		});
		
		gridView._private.functions.startEditCell({
			gridView: gridView,
			columnNumber: column,
			row: row,
			cell: row.cells[0]
		});
	}
	
	WAF.DataSourceEm.prototype.cancel = function(){
		var
	    that	= this,
	    curElem	= that.getCurrentElement()
	    key		= curElem.getKey();
	    
	    if(that.isNewElement() || !that.getCurrentElement() || !that.getCurrentElement().getKey()){
	        that.removeCurrent();
	        return;
	    }
		
	    that.serverRefresh({forceReload : true});
	}
	
	WAF.widget.FileUpload.prototype._sendFiles = function(){
		var
		msg = "This version does not allow you to upload a photo.";
		
		if(dhtmlx.alert){
			dhtmlx.alert({
				id : 'uploadAlert',
				text : msg
			});
		}
		else{
			alert(msg);
		}
		
		this.fileSet.removeAll([]);
	}

	function parseUri (str) {
		var	o   = parseUri.options,
			m   = o.parser[o.strictMode ? "strict" : "loose"].exec(str),
			uri = {},
			i   = 14;

		while (i--) uri[o.key[i]] = m[i] || "";

		uri[o.q.name] = {};
		uri[o.key[12]].replace(o.q.parser, function ($0, $1, $2) {
			if ($1) uri[o.q.name][$1] = $2;
		});

		return uri;
	};

	parseUri.options = {
		strictMode: false,
		key: ["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],
		q:   {
			name:   "queryKey",
			parser: /(?:^|&)([^&=]*)=?([^&]*)/g
		},
		parser: {
			strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
			loose:  /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/
		}
	};

	(function($) {
		$.widget("ui.smSearch", {
			options: {
				datasource	: null,
				query		: 'fullname = "' + waf.wildchar + '@value' + waf.wildchar + '"',
				trigger		: 'keyup',
				filter		: false,
				callback	: function(event){
					var options = $(this).data('_widget').data('smSearch').options;
					
					if(options.datasource && options.datasource.query){
						if($(this).val()){
							if(!options.filter){
								options.datasource.query(options.query.replace(/@value/g , $(this).val()) , options.queryOptions)
							}else{
								options.datasource.filterQuery(options.query.replace(/@value/g , $(this).val()) , options.queryOptions)
							}
						}
						else{
							options.datasource.all(options.queryOptions);
						}
					}
				},
				queryOptions: {}
			},
			clear: function(){
				$(this.element).find('input').val('');
				$(this.element).find('span').hide();
			},
			_create: function(){
				var
				options 	= this.options,
				element 	= $(this.element).addClass('search waf-project-sm-container-search'),
				h 			= element.height(),
				w 			= element.width(),
				form 		= $('<form>').appendTo(element),
				field		= $('<input>').appendTo(form).addClass('field'),
				delBtn		= $('<div>').appendTo(form).addClass('delete'),
				span		= $('<span>').html('x').appendTo(delBtn)/*,
				submitBtn	= $('<button type="submit"></button>').appendTo(element)*/;
				
//				submitBtn.css({
//					width: h
//				});
				
				form.css({
					width: w-h-10
				})
				
				field.prop({
					name: 'field',
					type: 'text',
					placeholder: 'Search...'
				});
				
				field.keyup(function() {
			        if ($.trim(field.val()) != "") {
			            span.fadeIn();
			        }
			        else{
			        	span.fadeOut();
			        }
			    })
			    .css({
			    	width: w-h-45
			    });
			    
			    span.click(function(e) {
			        field.val("");
			        options.callback.call(field.get(0) , e);
			        $(this).hide();
			    });
			    
			    field.bind(options.trigger , function(e){
			    	options.callback.call(this , e);
			    }).data({
			    	'_widget': element
			    });
			    
			    form.submit(function(){
			    	return false;
			    })
			}
		});
	})(jQuery);


	(function($) {
		$.widget("ui.smColorPicker", {
			options: {
				datasource	: null,
				attrName	: null,
				format		: 'hex', // hsb, hex, rgb
				selectImg	: '/images/colorpicker/select2.png',
				save		: false,
				dispatch	: false,
				initColor	: null,
				css 		: {
					position: 'absolute',
					top: 5,
					left: 0,
					width: 18,
					height: 18
				}
			},
			setColor: function(color){
				color = color ? color : 'transparent';
				this.colorDiv.css({
					'background-color': color
				});
			},
			_create: function(){
				var
				options 	= this.options,
				element 	= $(this.element).addClass('smColorPicker'),
				colorDiv	= this.colorDiv = $('<div>');
				
				if(!options.datasource || !options.attrName){
					return;
				}
				
				element
				.empty()
				.append(colorDiv)
				.addClass('nostyle');
				
				colorDiv
				.css($.extend(true , options.css , {
					background: 'url(' + options.selectImg + ') center',
					'background-color': options.initColor ? options.initColor : 'transparent'
				}));
				
				element.ColorPicker($.extend( {} , {
					onHide: function(){
						if(options.save){
							options.datasource.save();
						}
					},
					onShow: function(){
						$(this).ColorPickerSetColor('#7a3d3d');
					},
					onChange: function (hsb, hex, rgb) {
						var res;
						switch(options.format){
							case 'hsb':
								res = 'hsl(' + hsb.h + ',' + hsb.s + '%,' + hsb.b + '%)';
								break;
							case 'rgb':
								res = 'rgb(' + rgb.r + ',' + rgb.g + ',' + rgb.b + ')';
								break;
							default:
								res = "#" + hex;
								break;
						}
						options.datasource[options.attrName] = res;
						
						if(options.dispatch){
							options.datasource.dispatch('onCurrentElementChange');
						}
						
						colorDiv.css({
							'background-color': res
						});
					}
				} , options));
			}
		});
	})(jQuery);
	
	function Mapping(){
		this.baseObj 		= sources.timeTable;
		this.map 			= {};
		this.colorAttr		= null;
		this.defaultColor 	= 'white';
		
		this.types = {
			start_date: 'date',
			end_date: 'date'
		}
		
		if ( Mapping.caller != Mapping.getInstance ) {  
			throw new Error("This object cannot be instanciated");  
		}
	}
	
	Mapping.instance = null;
	
	Mapping.getInstance = function() {  
	  if (this.instance == null) {
	      this.instance = new Mapping();
	  }  
	  
	  return this.instance;
	}
	
	Mapping.prototype.init = function(fields , dc){
		Mapping.fields = fields;
		Mapping.dc = dc;
		this.map = _ns.initSchedulerFields(fields , dc);
		this._setReverse();
	}

	Mapping.prototype.fixType = function(attrName , attrValue){
		switch(this.types[attrName]){
			case 'date':
				var d = new Date(attrValue)
				return d.getFullYear() + '-' + (d.getMonth() + 1 ) + '-' + 
							d.getDate() + ' ' + d.getHours() + ':' + d.getMinutes() +
							':' + d.getSeconds();
			default:
				return attrValue;
		}
	}

	Mapping.prototype.getObject = function(obj){
		var res = {};
		for(var attr in obj){
			if(this.map.hasOwnProperty(attr)){
				if(typeof this.map[attr] == 'object' && this.map[attr].attrName){
					res[this.map[attr].attrName] = obj[attr];
				}
				
				else if(this.baseObj.getAttribute(this.map[attr]).type == 'date'){
					res[this.map[attr]] = obj[attr].toString();
				}
				
				else if(typeof this.map[attr] == 'string'){
					res[this.map[attr]] = obj[attr];
				}
			}
		}
		
		return res;
	}

	Mapping.prototype._setReverse = function(){
		if(!this._reverse){
			var reverse = this._reverse = {};
			
			for(var attr in this.map){
				if(typeof this.map[attr] == "string"){
					reverse[this.map[attr]] = attr;
				}
				else if(typeof this.map[attr] == 'object' && this.map[attr].attrName){
					reverse[this.map[attr].attrName] = attr;
				}
			}
		}
	}

	Mapping.prototype.getColorValue = function(obj){
		if(!obj || !this.colorAttr || typeof this.colorAttr != 'string'){
			return this.defaultColor;
		}
		
		var
		res 	= obj,
		attribs = this.colorAttr.split('.');
		
		if(obj instanceof WAF.Entity){
			for(var i = 0 , attr ; attr = attribs[i] ; i++){
				res = res[attr];
				
				if(!res){
					return this.defaultColor;
				}
				if(res instanceof WAF.EntityAttributeRelated){
					res.load({
						onSuccess: function(e){
					    	res = e.entity;
						}
					});
				}
				else if(res.getValue){
					return res.getValue();
				}
			}
		}
		else{
			for(var i = 0 , attr ; attr = attribs[i] ; i++){
				res = res[attr];
				
				if(!res){
					return this.defaultColor;
				}
			}
		}
		
		return res;
	}

	Mapping.prototype.getReverseObject = function(obj){
		var res = {};
			
		for(var attr in this._reverse){
			if(typeof obj[attr] == "object" 
					&& typeof this.map[this._reverse[attr]] == 'object'){
				
				if(!this.map[this._reverse[attr]].keyAttr){
					this.map[this._reverse[attr]].keyAttr = 'ID';
				}
				
				res[this._reverse[attr]] = obj[attr][this.map[this._reverse[attr]].keyAttr];
			}
			
			else if(obj[attr]){
				if(this.types[this._reverse[attr]]){
					res[this._reverse[attr]] = this.fixType(this._reverse[attr] , obj[attr]);
				}
				else{
					res[this._reverse[attr]] = obj[attr];
				}
			}
		}
		
		return res;
	}

	Mapping.prototype._getReverseAttr = function(attrName){
		return this._reverse[attrName];
	}

	Mapping.prototype.getObjectFromEntity = function(entity){
		var dc;
		if(entity.getDataClass){
			dc = entity.getDataClass();
		}
		
		if(!dc){
			return null;
		}
		
		var
		attrs	= dc.getAttributes(),
		obj 	= {};
		
		for(var i = 0 , attr ; attr = attrs[i] ; i++){
			var revAttr = this._getReverseAttr(attr.name);
			if(!revAttr){
				continue;
			}
			switch(attr.kind){
				case 'storage':
				case 'calculated':
					obj[revAttr] = entity[attr.name].getValue();
					break;
				case 'relatedEntity':
					obj[revAttr] = entity[attr.name].relKey;
					break;
			}
		}
		
		return obj;
	}
	
	function initSchedulerFields(fields , dc){
		if(_ns.sFields.id){
			return _ns.sFields;
		}
		
		for(var attr in fields){
			if(fields.hasOwnProperty(attr)){
				var
				value = fields[attr],
				dcAttr= dc[value];
				
				if(!dcAttr){
					continue;
				}
				
				switch(dcAttr.kind){
					case 'relatedEntity':
						value = {
							attrName 	: dcAttr.name,
							related		: true,
							keyAttr		: dcAttr.getRelatedClass()._private['primaryKey']
						}
						break;
					case "calculated":
					case "storage":
						value = dcAttr.name;
						break;
				}
				
				_ns.sFields[attr] = value;
			}
		}
		
		return _ns.sFields;
	}
	
	function syncWithDS(config){
		var
		dc,
		fields,
		mappingObj,
		fieldsStr		= '',
		defaultConfig 	= {
			fields 		: {},
			time   		: 1000,
			dataSource	: null,
			readonly	: false
		};
		
		config 		= $.extend({} , defaultConfig , config);
		
		if(!config.dataSource || !config.dataSource.getDataClass){
			return;
		}
		
		dc			= config.dataSource.getDataClass();
		fields 		= config.fields;
		mappingObj	= _ns.Mapping.getInstance();
		mappingObj.init(fields , dc);
		
		mappingObj.colorAttr = config.colorAttr;
		
		_ns.setMappingObj(mappingObj);
		
		if(!fields.id){
			fields.id = dc._private.primaryKey;
		}
		
		for(var attr in fields){
			if(fields.hasOwnProperty(attr)){
				if(fieldsStr){
					fieldsStr += ', ';
				}
				
				fieldsStr += fields[attr];
			}
		}
		
		WAF.addListener(config.dataSource.getID() , "onCollectionChange", function(){
			if(!this._time ||  new Date().getTime() > this._time.getTime() + config.time){
				this.toArray( fieldsStr , {
					onSuccess: function(e){
						var
						resTemp		= [],
						res 		= e.result;
						
						scheduler.clearAll();
						
						for(var i = 0 ; i < res.length ; i++){
							resTemp.push(mappingObj.getReverseObject(res[i]));
							if(config.readonly){
								resTemp[i].readonly = true;
							}
							
							resTemp[i].color = mappingObj.getColorValue(res[i]);
						}
						scheduler.parse(resTemp , 'json');
					}
				});
			}
			
			this._time = new Date();
		}, "WAF");
		
		config.dataSource.query(config.initQuery ? config.initQuery : '');
		
		return mappingObj;
	}
	
	_ns.parseUri 			= parseUri;
	_ns.Mapping 			= Mapping;
	_ns.initSchedulerFields	= initSchedulerFields;
	_ns.syncWithDS			= syncWithDS;
})();

// Modified jQuery ui combobox 
$.widget( "ui.combobox", {
    _create: function() {
        var self = this,
        select = this.element.hide(),
        selected = select.children( ":selected" ),
        value = selected.val() ? selected.text() : "";
        var input = this.input = $( "<input>" )
        .attr('placeholder' , '[Select]')
        .insertAfter( select )
        .val( value )
        .autocomplete({
            delay: 0,
            minLength: 0,
            source: function( request, response ) {
                var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
                response( select.children( "option" ).map(function() {
                    var text = $( this ).text();
                    if ( this.value && ( !request.term || matcher.test(text) ) )
                        return {
                            label: text.replace(
                                new RegExp(
                                    "(?![^&;]+;)(?!<[^<>]*)(" +
                                    $.ui.autocomplete.escapeRegex(request.term) +
                                    ")(?![^<>]*>)(?![^&;]+;)", "gi"
                                    ), "<strong>$1</strong>" ),
                            value: text,
                            option: this
                        };
                }) );
            },
            select: function( event, ui ) {
                ui.item.option.selected = true;
                self._trigger( "selected", event, {
                    item: ui.item.option
                });
            },
            change: function( event, ui ) {
                if ( !ui.item ) {
                    var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( $(this).val() ) + "$", "i" ),
                    valid = false;
                    select.children( "option" ).each(function() {
                        if ( $( this ).text().match( matcher ) ) {
                            this.selected = valid = true;
                            return false;
                        }
                    });
                    if ( !valid ) {
                        // remove invalid value, as it didn't match anything
                        $( this ).val( "" );
                        select.val( "" );
                        input.data( "autocomplete" ).term = "";
                        return false;
                    }
                }
            }
        })
        .addClass( "ui-widget ui-widget-content ui-corner-left" );

        input.data( "autocomplete" )._renderItem = function( ul, item ) {
            return $( "<li></li>" )
            .data( "item.autocomplete", item )
            .append( "<a>" + item.label + "</a>" )
            .appendTo( ul );
        };

        this.button = $( "<button type='button'>&nbsp;</button>" )
        .prop( "tabIndex", -1 )
        .prop( "title", "Show All Items" )
        .insertAfter( input )
        .button({
            icons: {
                primary: "ui-icon-triangle-1-s"
            },
            text: false
        })
        .removeClass( "ui-corner-all" )
        .addClass( "ui-corner-right ui-button-icon" )
        .click(function() {
            // close if already visible
            if ( input.autocomplete( "widget" ).is( ":visible" ) ) {
                input.autocomplete( "close" );
                return;
            }

            // work around a bug (likely same cause as #5265)
            $( this ).blur();

            // pass empty string as value to search for, displaying all results
            input.autocomplete( "search", "" );
            //input.focus();
        });
        
    },

    destroy: function() {
        this.input.remove();
        this.button.remove();
        this.element.show();
        $.Widget.prototype.destroy.call( this );
    },
    
    //allows programmatic selection of combo using the option value
    setValue: function (value) {
        var $input = this.input;
        $("option", this.element).each(function () {
            if ($(this).val() == value) {
                this.selected = true;
                $input.val(this.text);
                return false;
            }
        });
    }
});
