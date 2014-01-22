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

dateFormatToAMPM=function (date) {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0'+minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
};

(function(_ns){
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
	if(WAF.widget.Grid){
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

	if(WAF.widget.FileUpload){
	WAF.widget.FileUpload.prototype._sendFiles = function(){
		if(this.fileSet._length){
			var msg	= _ns.Message.getInstance();

			msg.append('upload_not_allowed');

			msg.display({
	            alert : true,
	            icons : false
	        });
			
			this.fileSet.removeAll([]);
		}
	}
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
						$(this).ColorPickerSetColor(options.datasource[options.attrName]);
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
	
	function Message(){
		this.stack = [];
		if ( Message.caller != Message.getInstance ) {  
			throw new Error("This object cannot be instanciated");  
		}
	}
	
	Message.instance = null;
	
	Message.getInstance = function() {  
	  if (this.instance == null) {
	      this.instance = new Message();
	      this.instance._init();
	  }  
	  
	  return this.instance;
	}
	
	Message.prototype._init = function(){
		this._messages = ds.Message.getMessages();
	}
	
	Message.prototype.getMessage = function(key){
		return this._messages[key];
	}
	
	Message.prototype.append = function(key , config){
		if(config){
			var msg = this.getMessage(key);
			if(msg){
				config = $.extend(true , msg , config);
				this.stack.push(config);
			}
		}
		else{
			this.stack.push(this.getMessage(key));
		}
	}
	
	Message.prototype.flush = function(){
		this.stack = [];
	}
	
	Message.prototype.getStack = function(){
		return this.stack;
	}
	
	Message.prototype.display = function (config){
		if(!(config.messages && config.messages.length) && !this.getStack().length){
			return;
		}
		
		var
		type,
		dhtml 	= typeof dhtmlx != 'undefined',
		br 		= dhtml ? '<br/>' : '\n',
		msg 	= '';
		
		config = $.extend(true , {
			type 	: 'alert',
			alert	: true,
			icons	: true,
			messages: this.getStack(),
			options	: {
				callback : function(){
					
				}
			}
		} , config);
		
		type = config.alert ? 'alert' : 'confirm'
		
		for(var i = 0 , message ; message = config.messages[i] ; i++){
			switch(typeof message){
				case 'string':
					msg += message;
					break;
				case 'object':
					message = $.extend(true , {
						tag			: 'span',
						message		: '',
						css 		: {},
						attr		: {},
						type 		: null,
						addClass	: null,
						icon		: null
					} , message);
					
					if(dhtml){
						var
						$msg 	= $(document.createElement(message.tag)),
						html 	= document.createElement('div');
						
						$msg
						.css(message.css)
						.attr(message.attr)
						.text(message.message)
						.addClass(message.addClass);
						
						switch(message.type){
							case 'error':
								message.icon = '/images/error.png';
								$(html).css({
									color	: '#b94a48'
								});
								break;
							case 'warning':
								message.icon = '/images/warning.png';
								$(html).css({
									color	: '#c09853'
								});
								break;
							case 'info':
								message.icon = '/images/info.png';
								$(html).css({
									color	: '#3a87ad'
								});
								break;
						}
						
						if(message.icon && config.icons){
							var
							$img = $('<img>');
							
							$img
							.attr({
								width : 20,
								height: 19,
								src	  : message.icon
							})
							.css({
								'margin-right' : 8
							});
							
							$(html)
							.css({
								'text-align' : 'left'
							})
							.append($img);
						}
						
						$(html).append($msg);
						
						msg += html.outerHTML;
					}
					else{
						msg += message.message;
					}
					
					break;
			}
			
			msg += br;
		}
		
		if(dhtml){
			var
			options = config.options;
			
			options.text = msg;
			
			dhtmlx[type](options);
		}
		else{
			config.options.callback(window[type](msg));
		}
		
		this.flush();
	}
	
	function Mapping(){
		var
		source				= null;
		
		this.dc				= null;
		this.map 			= {};
		this.defaultColor 	= '#1796b0';
		this.types 			= {};
		this.removedItems	= [];
		
		Object.defineProperty(this, "source", {
			configurable	: true,
			set 			: function(value){
				if(value instanceof WAF.DataSourceEm){
					this.dc = value.getDataClass();
					source	= value;
				}
				else{
					throw 'Invalide datasource !';
				}
			},
			get : function(){
				return source;
			}
		});
		
		Object.defineProperty(this, "fields", {
			configurable	: true,
			set 			: function(value){
				this._initMapObj(value);
				this._setReverse();
			}
		});
		
		Object.defineProperty(this, "nbFields", {
			configurable	: true,
			get 			: function(){
				var res = 0;
				
				for(var i in this.map){
					res ++;
				}
				
				return res;
			}
		});
		
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

	Mapping.prototype.init = function(fields , source , colorAttr){
		this.source		= source;
		this.fields 	= fields;
		this.colorAttr 	= colorAttr;
	}

	Mapping.prototype.clear = function clear(){
		scheduler.clearAll();
		this.removedItems = [];
	}

	Mapping.prototype.select = function(event_object){
		if(!event_object){
			return;
		}
		
		if(this.source){
			this.source._dont_refresh = true;
			var curElem = this.source.getCurrentElement();
  		
	  		if(!curElem || (curElem && curElem.getKey() != event_object.id)){
	  			if(event_object._position){
	  				this.source.select(this.getRealPosition(event_object._position));
	  			}else{
	  				this.source.selectByKey(event_object.id);
	  			}
	  		}
		}
	}

	Mapping.prototype.fixType = function(attrName , attrValue){
		switch(this.types[attrName]){
			case 'date':
				var d = new Date(attrValue)
				return d.getUTCFullYear() + '-' + (d.getUTCMonth() + 1 ) + '-' + 
							d.getUTCDate() + ' ' + d.getUTCHours() + ':' + d.getUTCMinutes() +
							':' + d.getUTCSeconds();
			default:
				return attrValue;
		}
	}

	Mapping.prototype.getObject = function(obj, not_convert){
		var res = {};
		for(var attr in obj){
			if(this.map.hasOwnProperty(attr)){
				if(not_convert){
					res[this.map[attr]] = obj[attr];
				}
				else{
					if(this.dc.getAttributeByName(this.map[attr]).type == 'date'){
						res[this.map[attr]] = obj[attr].toString();
					}
					
					else if(typeof this.map[attr] == 'string'){
						res[this.map[attr]] = obj[attr];
					}
				}
			}
		}
		
		return res;
	}

	Mapping.prototype.saveSource = function saveSource(event_id , event_object){
		var
		that		= this,
		saved		= false;
		i 			= 0,
		nbFields	= 0,
		dc			= this.dc,
		primKey		= dc.getPrimaryKeyAttribute(),
		source		= this.source,
		curEntity 	= source.getCurrentElement(),
		obj 		= this.getObject(event_object);
		
		if(event_object._new){
			source._newElement = true;
			//source.addNewElement();
			curEntity = source.getCurrentElement();
			delete event_object._new;
		}
		else if (!curEntity){
			var opts = {
				onSuccess: function(e){
					if(e.dataSource.getCurrentElement()){
						saveSource(event_id , event_object);
					}
				}
			};
			
			if(event_object._position){
				source.select(this.getRealPosition(event_object._position) , opts);
			}else {
				source.selectByKey(event_id , opts);
			}
			
			return false;
		}
		
		for(var attr in obj){
			if(obj.hasOwnProperty(attr) && attr != primKey){
				nbFields++;
			}
		}
		
		function save(){
			curEntity.save({
				onSuccess: function(e){
					source._dont_refresh = true;
					source.serverRefresh({forceReload : true});
					that.refreshFromEntity(e.entity , event_id);
					delete that.source._doNotRefreshTeachers;
				},
				onError: function(e){
					var entity = new WAF.Entity(that.dc, e.rawResult['__ENTITIES'][0]);
					that.refreshFromEntity(entity , event_id);
					scheduler.updateView();

					_ns.Message.getInstance().display({
						messages: [{
							message: e.error[0].message,
							type: 'error'
						}]
					});
				}
			} , {data : event_id});
			saved = true;
		}
		
		for(var attr in obj){
			if(obj.hasOwnProperty(attr) && attr != primKey){
				if(dc[attr].related){
					if(obj[attr]){
						dc[attr].getRelatedClass().getEntity( obj[attr] , {
							onSuccess : function(e){
								curEntity[e.userData['attr']].setValue(e.entity);
								i++;
								
								if(i == nbFields && !saved){
									save();
								}
							}
						} , {attr : attr});
					}
					else{
						i++;
					}
				}
				else{
					switch(dc[attr].type){
						case 'date':
							curEntity[attr].setValue(new Date(obj[attr]));
							break;
						default:
							curEntity[attr].setValue(obj[attr]);
							break;
					}
					
					i++;
				}
			}
		}
		
		if(i == nbFields && !saved){
			save();
		}
	}

	Mapping.prototype.selectEvent = function selectEvent(event_id){
		var
		$node,
		ev 			= scheduler.getEvent(event_id),
		$dataArea 	= $('.dhx_cal_data');
		
		if(ev){
			scheduler.setCurrentView(ev.start_date);
			
			$node = $(scheduler.getRenderedEvent(ev.id));
			$dataArea.scrollTop(parseInt($node.css('top')) - $dataArea.height()/2 + $node.height()/2);
			
			$node.click();
		}
	}

	Mapping.prototype.getRealPosition = function(position){
		for(var i = this.removedItems.length - 1 , rmPos ; rmPos = this.removedItems[i] ; i--){
			if(position > rmPos){
				position--;
			}
		}
		return position;
	}
	
	Mapping.prototype.getReverseObject = function(obj , _dont_fix){
		var res = {};
			
		for(var attr in this._reverse){
			var item = obj[attr];
			
			if(item && item.__deferred){
				res[this._reverse[attr]] = item.__deferred.__KEY;
			}
			else if(item){
				if(this.types[this._reverse[attr]] && !_dont_fix){
					res[this._reverse[attr]] = this.fixType(this._reverse[attr] , item);
				}
				else{
					res[this._reverse[attr]] = item;
				}
			}
		}
		
		return res;
	}

	Mapping.prototype.refreshFromEntity = function refreshFromEntity(entity , event_id){
		var
		self	= this,
		obj 	= this.getObjectFromEntity(entity),
		ev_obj 	= scheduler.getEvent(entity.getKey());
		
		if(!ev_obj){
			ev_obj 	= scheduler.getEvent(event_id);
			if(!ev_obj){
				return;
			}
		}else{
			event_id = entity.getKey();
		}
		
		for(var attr in obj){
			if(obj.hasOwnProperty(attr) && attr != 'id'){
				ev_obj[attr] = obj[attr];
			}
		}
		
		entity.getAttributeValue(this.colorAttr, {
			onSuccess: function(e){
				ev_obj['color'] = e.result;
				scheduler.updateEvent(event_id);
				scheduler.changeEventId(event_id , entity.getKey());
			},
			onError: function(e){
				ev_obj['color'] = self.defaultColor;
				scheduler.updateEvent(event_id);
				scheduler.changeEventId(event_id , entity.getKey());
			}
		});
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
					var related = entity[attr.name].getValue();
					if(related){
						obj[revAttr] = related.getKey();
					}
					else{
						obj[revAttr] = entity[attr.name].relKey;
					}
					break;
			}
		}
		
		return obj;
	}

	Mapping.prototype.getPositionWithOffset = function(position){
		for(var i = this.removedItems.length - 1 , rmPos ; rmPos = this.removedItems[i] ; i--){
			if(position > rmPos){
				position++;
			}
		}
		return position;
	}

	/***************** Private methods *****************/
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

	Mapping.prototype._getReverseAttr = function(attrName){
		return this._reverse[attrName];
	}

	Mapping.prototype._initMapObj = function(fields){
		if(!this.dc){
			return;
		}
		
		for(var attr in fields){
			if(fields.hasOwnProperty(attr)){
				var
				value = fields[attr],
				dcAttr= this.dc[value];
				
				if(!dcAttr){
					continue;
				}
				
				switch(dcAttr.kind){
					case 'relatedEntity':
					case "calculated":
					case "storage":
						value = dcAttr.name;
						break;
				}
				
				this.map[attr] = value;
				
				if(dcAttr.type == 'date'){
					this.types[attr] = dcAttr.type;
				}
			}
		}
		
		if(!this.map['id']){
			this.map['id'] = this.dc.getPrimaryKeyAttribute();
		}
	}

	function syncWithDS(config){
		var
		dc,
		fields,
		mappingObj,
		fieldsStr		= '';
		
		config 		= $.extend({} , {
			fields 		: {},
			time   		: 500,
			dataSource	: null,
			readonly	: false,
			cacheSize	: 40,
			initQuery	: false,
			colorAttr	: false
		}, config);
		
		if(!config.dataSource || !config.dataSource.getDataClass){
			return;
		}
		
		fields 		= config.fields;
		mappingObj	= _ns.Mapping.getInstance();
		mappingObj.init(fields , config.dataSource, config.colorAttr);
		
		for(var attr in fields){
			if(fields.hasOwnProperty(attr)){
				if(fieldsStr){
					fieldsStr += ', ';
				}
				
				fieldsStr += fields[attr];
			}
		}
		
		/************** TO MODIFY [JUST A HUCK] **************/
		config.dataSource.removeCurrent = function(options , userData){
			var entity = this.getCurrentElement();
			
			if(!entity){
				return false;
			}
			
			options = $.extend({} , {
				userData : {
					_removed 	: true,
					_key		: entity.getKey(),
					_position	: this.getPosition()
				}
			} , options );
			
			WAF.DataSourceEm.removeCurrent.call(this , options , userData);
		}
		/******************** [END HACK] *********************/
		
		WAF.addListener(config.dataSource.getID() , "onCollectionChange", function(e){
			if(e.dataSource._newElement){
				delete e.dataSource._newElement;
				return false;
			}
			else if(e.dataSource.isNewElement()){
				return false;
			}
			else if(e.eventData){
				var
				evData	= e.eventData;
				
				if(evData._removed){
					if(evData._position && mappingObj.removedItems.indexOf(evData._position) < 0){
						mappingObj.removedItems.push(evData._position);
					}
					
					var ev = scheduler.getEvent(evData._key);
					
					if(ev){
						ev._dont_save = true;
						scheduler.deleteEvent(ev.id);
					}
				}
				return false
			}
			
			if(!this._time ||  new Date().getTime() > this._time.getTime() + config.time){
				var
				that		= this,
				col			= this.getEntityCollection(),
				dc			= this.getDataClass(),
				primKey		=  dc.getPrimaryKeyAttribute(),
				cache		= dc.getCache(),
				recieved	= 0,
				arr 		= [];
				
				mappingObj.clear();
				col._private.pageSize = config.cacheSize;
				
				function draw(){
					if(arr.length == config.cacheSize || recieved == that.length){
						scheduler.parse(arr , 'json');
						arr = [];
					}
				}
				
				function push(element , position){
					var
					ent = new WAF.Entity(mappingObj.dc, element),
					res	= mappingObj.getReverseObject(element);
					
					ent.getAttributeValue(mappingObj.colorAttr, {
						onSuccess: function(e){
							res['color'] 		= e.result;
							res['id'] 			= element[primKey];
							res['_position'] 	= position;
							
							arr.push(res);
							recieved++;
							draw();
							getElement(position + 1);
						},
						onError: function(e){
							res['color'] 		= mappingObj.defaultColor;
							res['id'] 			= element[primKey];
							res['_position'] 	= position;
							
							arr.push(res);
							recieved++;
							draw();
							getElement(position + 1);
						}
					});
				}
				
				function getElement(position){
					if(typeof position != "number" || recieved == col.length){
						return;
					}
					
					var
					key		= col._private.getKeyByPos(position),
					element = cache.getCacheInfo(key);
					
					if(element){
						push(element.rawEntity , position);
					}
					else{
						that.getElement(position , {
							onSuccess: function(e){
								if(e.element){
									push(e.element , e.position);
								}
							}
						});
					}
				}
				
				getElement(0);
			}
			
			this._time = new Date();
		}, "WAF");
		
		WAF.addListener(config.dataSource.getID() , "onElementSaved", function(e){
			if(!e.entity.getKey()){
				e.dataSource.removeCurrent();
				return;
			}
			
			if(e.dataSource.isNewElement()){
				var
				dc		= e.dataSource.getDataClass(),
				primKey	= dc.getPrimaryKeyAttribute(),
				element = e.element,
				item	= mappingObj.getReverseObject(element , true);
				
				item['id'] 			= element[primKey];
				item['_position'] 	= mappingObj.getPositionWithOffset(e.position);
				item['_dont_save'] 	= true;
				
				scheduler.addEvent(item);
			
				mappingObj.selectEvent(item['id']);
			}
			else{
				var
				entity = e.entity;
				
				mappingObj.refreshFromEntity(entity , entity.getKey());
			}
		}, "WAF")
		
		WAF.addListener(config.dataSource.getID() , "onCurrentElementChange", function(e){
			if(e.eventKind == "onCurrentElementChange"){
				var
				current = e.dataSource.getCurrentElement();
				
				if(current){
					if(e.dataSource._dont_refresh){
						delete e.dataSource._dont_refresh;
						return;
					}
					
					mappingObj.selectEvent(current.getKey());
				}
			}
		}, "WAF")
		
		if(config.initQuery !== false){
			var col	= config.dataSource.getEntityCollection();
			
			col._private.pageSize = config.cacheSize;
			config.dataSource.query(config.initQuery);
		}
		
		return mappingObj;
	}
	
	WAF.DataClass.prototype.getPrimaryKeyAttribute = function(){
		return this._private.primaryKey;
	}
	
	WAF.Entity.prototype.getAttributeValue = function(attrPath, opts){
		var attrs= attrPath.split('.'),
			that= this;
		
		opts = $.extend(true, {
			onSuccess: false,
			onError: false
		}, opts);
		
		function getNext(entity){
			if(!entity){
				returnResponse("An error has occured!", 'error');
				return;
			}
			
			var attr = attrs[0];
			
			switch(true){
				case entity[attr] instanceof WAF.EntityAttributeSimple:
					if(attrs.length > 1){
						returnResponse("Unknwon attribute : " + attrs.slice(1).join('.'), 'error');
					}
					
					returnResponse(entity[attr].getValue());
					break;
				case entity[attr] instanceof WAF.EntityAttributeRelated:
					entity[attr].load({
						onSuccess: function(e){
							attrs = attrs.slice(1);
							getNext(e.entity);
						}
					});
					break;
				default:
					returnResponse("Unknwon attribute", 'error');
					break;
			}
		}
		
		function returnResponse(result, type){
			switch(type){
				case 'error':
					if(typeof opts.onError == 'function'){
						opts.onError.call(that, {error: result});
					}
					break;
				default:
					if(typeof opts.onSuccess == 'function'){
						opts.onSuccess.call(that, {result: result});
					}
					break;
			}
		}
		
		getNext(this);
	}
	
	function formatNumber(str , nb){
		while(str.length < nb){
			str = '0' + str;
		}
		
		return str;
	}
	
	function formatTimeFromNumber(val){
		var
		nbMinutes	= val%60
		nbHours 	= (val - nbMinutes)/60,
		pm			= nbHours > 12;

		if(pm){
			nbHours -= 12;
		}

		return nbHours + ':' + formatNumber(nbMinutes + '' , 2) + ' ' + (pm ? 'PM' : 'AM');
	}
	
	function getDateFromMinutes(baseDate , nb){
		if(!baseDate){
			return null;
		}
		
		var
		nbM = nb%60;
		nbH = (nb - nbM)/60;
		
		baseDate.setHours(nbH);
		baseDate.setMinutes(nbM);
		
		return new Date(baseDate);
	}
	
	_ns.Message 				= Message;
	_ns.Mapping 				= Mapping;
	_ns.parseUri 				= parseUri;
	_ns.syncWithDS				= syncWithDS;
	_ns.formatNumber			= formatNumber;
	_ns.getDateFromMinutes		= getDateFromMinutes;
	_ns.formatTimeFromNumber 	= formatTimeFromNumber;
})(_ns);

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
        .insertAfter( input )
        .button({
            icons: {
                primary: "ui-icon-triangle-1-s"
            },
            text: false
        })
        .removeClass( "ui-corner-all" )
        .removeAttr('title')
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
