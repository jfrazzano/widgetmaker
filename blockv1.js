	function htmlTagToProperty(tagId, context) {

		return Object.defineProperty(context, tagId, {
			enumerable: true,
			configurable: true,
			get: function() {
				return document.getElementById(tagId);
			},
			set: function() {
				context[tagId] = document.getElementById(tagId);
			}
		});
	}
	function tagsToProperties(tagIdArray, context) {
		var i = 0,
			count = tagIdArray.length;
		for (i = 0; i < count; i++) {
			var property = tagIdArray[i];
			htmlTagToProperty(property, context);
		}

	}
	function labelToPropertyName(label){
    		var propertyName=label!=undefined?label:"";        
  			var regex=new RegExp(' ', 'g');      
				propertyName = propertyName.replace(regex, "");
      	var ketter = propertyName!=''?propertyName[0].toLowerCase():"";
				propertyName=propertyName.slice(1);
				propertyName=ketter.concat(propertyName);
        propertyName = propertyName.replace("one", "1");
        propertyName = propertyName.replace("One", "1");
        propertyName = propertyName.replace("two", "2");
        propertyName = propertyName.replace("Two", "2");
        return propertyName;
}
	function propertyNameToLabel(a){
		var b, c, d, e, f;
a&&a!==undefined && typeof a ==="string"
		?(b=a.replace(/([A-Z])/g, " $1"),
			c=b.replace(/^./, function(b){ return b.toUpperCase();}),
			d=/[A-Z]1/ig.test(c)?c.replace("1", " One"):c,
			e=/[A-Z]2/ig.test(d)?d.replace("2", " Two").replace("_","'"):d)
			:"NOTICE ME";
	f=e.charAt(0)==="S"&&e.charAt(1)==="a"&&e.charAt(2)==="t"&&e.charAt(3)===" "?e.replace("at", "AT"):e;
	return f;
  }
	var us504Index=0;
	var op = {
"___":(a)=>{return eval(a)},
  "+": function(a, b){return parseInt(a) + parseInt(b);},
	"-": function(a, b){return Math.floor(parseInt(a) - parseInt(b));},
  "==": function(a, b){return a == b;},
  "===": function(a, b){return a === b;},
  "!": function(a){return !a;}
  /* and so on */
};	
	function incrementor(v,action, floor, last, floorAction,lastAction) {
    let test=typeof action!=="number"?v:action;
		return test < last && test > floor?action:test > last-1&&lastAction==undefined?last:lastAction!==undefined&&test>last-1?lastAction:test<Math.ceil(floor+1)&& floorAction==undefined?floor:test<Math.ceil(floor+1)&& floorAction!=undefined?floorAction:action;
	}
	function arrayincrementor(v, last, bool, perview) {
		let per = perview != undefined ? perview : 1;
		let ll = last;
		let close = last % per;
		let fin = last - close;
		return bool === true && v === last
			? 0
			: v !== last && bool === true
				? incrementor(v, op["+"](v, per), 0, op["+"](ll, 1), op["+"](v, per), 0)
				: bool === false && v === 0
					? last
					: incrementor(v, op["-"](v, per), -1, last, last, fin);
	}
	function* clockincrementor(v, last, bool, perview, topush, thelastone, isRunning) {
		while(isRunning.isRunning===true){
				let old=v;
				let per = perview != undefined ? perview : 1;
		let ll = last;
		let close = last % per;
		let fin = last - close;
		v= bool === true && v === last
			? 0
			: v !== last && bool === true
				? incrementor(v, op["+"](v, per), 0, op["+"](ll, 1), op["+"](v, per), 0)
				: bool === false && v === 0
					? last
					: incrementor(v, op["-"](v, per), -1, last, last, fin);
			var  turner=bool===true?0:last;
if(v===turner){
	thelastone.value=topush.next().value;
yield v;
}else yield v
			}
	}
	function setRemaining(obj,...props) {
		return	props.reduce((obj, po,i)=>true?(obj[po[0]]=po[1](po[2]), obj):obj,obj);
			}
	var block=Object.defineProperties({},{
		"timer":{
			enumerable: true, configurable: true,
			get:function(){return {
			css:()=>`input.digit{max-width: .95em;min-width: .65em;font-size: 28px;margin:3em 1px;font-family: merriweather;align-content: center;align-text: center;padding: 0;font-weight: 500;margin: .03em;border: 0;outline: 0;cursor: pointer; color: #00a;}label.digit{margin-bottom: .3em; padding:0;width: 3px;font-weight: 500;layout flex;color: brown;font-size:1em;color: brown;} label:nth-of-type(even).digit{opacity: 0;display: none;}label:nth-of-type(odd).digit{width: .53em;font-size: 1.5em;display: flex;margin-top: .16em;margin-left:.2em;}input:nth-of-type(1).digit{ margin-right: .28em;} label:nth-of-type(9).digit{display:none;} input:nth-of-type(10).digit, input:nth-of-type(1).digit{min-width: .6em;width: .6em;font-weight: 200; color:#ddd;} input:nth-of-type(10).digit:hover, input:nth-of-type(1).digit:hover{color: brown;} section.digit2{padding: 12px;margin-left:-3px;} label.digit.lastcolon{align-self: right; opacity: 1;width: .5em;font-size: 1.4em;display: block;font-family: merriweather; padding-left: 4px; margin-right:-3px; } div.digit2{display: flex;flex-flow: row nowrap;flex:8;} section.digit2{display: flex;flex-flow: row nowrap;min-width: 268px;max-height: 2.3em; padding: 0 9px;} 
label.noseeme{opacity: 0;} label.clockheaders, label.clockbuttons, label.start{ display: none; width: 0; height: 0; opacity: 0;} `,
			data:()=>{
				let t = new Date().toLocaleTimeString().replace(/\s/g, "").replace(/:/g, "");
				t = t.length < 8 ? "0".concat(t) : t;
				let p = "❮".concat(t, "❯"), dtypeArray = [];
				return p.split("").map((d, i) => {
					dtypeArray[i] = {wrapper: null, bind: "timers", aria_role: "digit", aria_labeled: "timers", aria_label: "TIMEKEEPER", type: i === 0 ? "button" : i < 7 ? "text" : i < 9 ? "text" : "button", class: "digit", properties: { maxlength: 1 }, label: i % 2 === 0 && i < 7 ? ":" : `<span ></span>`, nested: null};
					return Object.assign(dtypeArray[i],i === 0  ? { name: "incrementdown", class: "digit", data_btn: "oincrement_false", group: "timers", value: d, index: i, label: `<span hidden></span>`} : i !== 9 ? { name: "time", class: "digit", group: "timers", value: d, index: i, class: "digit", label: i % 2 === 0 && i < 7 ? ":" : `<span hidden></span>`} :{name: "incrementup", class: "digit", data_btn: "oincrement_true", group: "timers", value: d, index: i, label: `<span hidden></span>`});
								});
				},
					};	},
		},
		"header":{
			enumerable: true, configurable: true,
			get:function(){
				return {
					css:()=>`label.clockheaders { display: none; width: 0; height: 0; opacity: 0;} input.clockheaders{font-size: 18px;font-family: merriwether; padding: 0; margin: 0; border: 0 solid white; display: flex; background: transparent; color: brown;} section.clockheaders2{font-family: merriwether;display: flex; flex-flow: row nowrap; justify-content: space-between;margin: -1.5em 0 .3em 0;}`, 
					data: sectionList =>{	
								var sectionList=sectionList==undefined?[{"headerfor": "clock", "value":new Date().toLocaleDateString(), "name":"date"}, {"headerfor": "clock", value:"Local Time", "name":"name"}, {"headerfor": "clock", "name":"time", "value":new Date().toLocaleTimeString()}]:sectionList;
								return sectionList.map((b,i)=>{
									return 	{
												group: `${b.headerfor}HeaderSections`,
												name:b.name,
												value: b.value,
												class: `${b.headerfor}headers`,
												type: "button",
												wrapper: null,
												label: propertyNameToLabel(b.name),
												tabindex: 0,
												data_btn: "you have to find a way to project in the scoped methods",
												aria_role: `${b.headerfor} Header ${b.name}`,
												alt: `${propertyNameToLabel(b.headerfor)} Header ${propertyNameToLabel(b.name)}`,
												r: `${Math.floor(Math.random() * i * 32)}`,
												bind: `${b.headerfor}headers`,
												index: i*100,
												nested:null,
								};
									});
					
					
					},
				};
			},
		},
		"buttonrow":{
			enumerable: true, configurable: true,
			get:function(){
			return {
				css:()=>`input[type="button"].clockbuttons{font-size:1em; background: ivory; color: green; margin-bottom: .21em; min-width: 4.95em!important; width: 4.97em!important; display: flex; align-self: stretch; align-text: top; padding:.2em; font-family: merriweather; border-left:black 1px solid; justify-content: center; align-content: center; flex-flow: row nowrap; outline: 0px red solid; box-shadow: 1px 2px 1px 3px #000; height:99%; border-radius:.4em;} input[type="button"].clockbuttons+label.clockbuttons, label.clockbuttons.start, input[type="button"].clockbuttons.start+label.clockbuttons.start{display: none; width:0px;}section.clockbuttons2{padding: .1em 1.6em .2em 1.2em;		background: red;overflow-x: scroll;	flex-flow: row nowrap; 	display: flex; 	flex-direction: row; 	align-items: stretch; 	justify-content: space-between;		align-content: center; 	white-space:pre; 	margin:0;		overflow-y: hidden;	overflow-x: scroll; max-width: 48em; height:1.85em; font-size: 18px; width: 1000px;margin-bottom: -1em; padding: .1em 1em .1em 1.2em; opacity: 0; will-change: transform; transition: height .7s width .6s opacity .6 ease;  } 
section.clockbuttons2.unfaded, section.clockbuttons2:hover{font-size:18px; padding: .1em 1.6em .2em 1.2em;	margin-bottom: -1.1em; background: red; overflow-x: scroll;	flex-flow: row nowrap; 	display: flex; 	flex-direction: row; 	align-items: stretch; 	justify-content: space-between;		align-content: center; 	white-space:pre; margin-left:.65em;		overflow-y: hidden;	overflow-x: scroll;max-width: 12.5em; height: 1.85em;  opacity: 1;will-change: transform; transition: height .7s width .6s opacity .6s  ease;  }
div.clockbuttons{font-size:18px; height: 1.85em; margin:.1em 0 .6em 0; display: flex; padding: 3px 6px 6px 6px;flex-flow: row nowrap; justify-content: center; align-content: center;}`,
				data:()=>{
					
					this.buttonIcons = [
																		{ icon: `\&#x23F2`, text: "Set", databtn:"methods_set", },
																		{ text: "Reset &#x23F2", icon: `♽`, databtn:"methods_reset" },
																		{ icon: `&#x23F2`, text: "Clear ♻",  databtn:"methods_clear"},
																		{ icon: `\&#x23F2`, text: "New",  databtn:"methods_new"},
																		{ icon: `\&#X1F515`, text: "Off",  databtn:"methods_off"},
																		{ icon: `\&#x1F5D1`, text: "Delete",  databtn:"methods_delete" },
																		{ icon: `\&#x1F4CB`, text: "Event",  databtn:"methods_event" },
																		{ icon: `\&#x1f4c5`, text: "Date",  databtn:"methods_date" },
																		{ icon: `\&#x23F0`, text: "TO DOs",  databtn:"methods_todos" },
																		{
																			text: "START",
																			id: "startbutton",
																			databtn: "toggle_startstop_true",
																			class: "clockbuttons start",
																			icon: `\&#128582`
																		}
								];
								return this.buttonIcons.map((a, i) => {
											return {
												group: "clockbuttons",
												name: a.databtn.split("_")[1],
												onchecked: a.text,
												class: a.class || "clockbuttons",
												type: "button",
												wrapper: "div",
												value: `${a.icon} ${a.text}`,
												label:"",
												tabindex: 0,
												aria_checked: null,
												data_btn: a.databtn || a.text.replace(/\s/gi, ""),
												aria_role: "button",
												alt: a.text,
												r: `${Math.floor(Math.random() * i * 32)}`,
												bind: "timerApiButtons",
												index: i,
												id: a.id || " ",
												aria_label: "clockbuttons",
											};
										});
				}
			};
		}},
	});
	var templates=Object.defineProperties({}, {
							counter:{enumerable: true, configurable: true, writable:true, value: 0},
							"_":{
							get:function(){
								return {
									nested: next => {
											return `<div> ${next}</div>`;
										},
									sectionlabel: label =>`<section id="sectionlabel_${this.counter++}" hidden >${label}</section>`,
									parser: obj => {
										const k = obj =>
											Object.keys(obj)
												.map(
													(el, i) => `
																			<${el} ${Object.keys(obj[el])
														.map(
															prop => `
																					${prop !== "content"
																						? `${prop.replace("_", "-")}="${obj[el][prop]}"`
																						: ""}`
														)
														.join("")}>${obj[el].content
														? obj[el].content
														: "_content_"}${el !== "input" ? `</${el}>` : " "}`
												)
												.reduce((str, next, i, array) => {
													return next.includes("dropdowncontent")
														? (
																(str = str.replace(
																	"_content1_",
																	`${this._.sectionlabel()}`
																)),
																str.concat(next)
															)
														: str.includes("accordian")
															? str.concat(this._.nested(next))
															: str.replace("_content_", next);
												});
										return k(obj);
									},
									filter: (dataArray, perpage, start, iscols) => {
										return iscols !== true &&
											dataArray != undefined &&
											dataArray != "" &&
											Array.isArray(dataArray)
											? dataArray.filter((b, i) => {
													return i > start - 1 && i < start + perpage ? true : false;
												})
											: dataArray;
									},
									innersection: (d, p, i) => {
										const gate = (d, p, i) => `${i % p === 0 || i == 0
											? `
											<section id="component_wrapper_${d.class}" class="${d != undefined &&
													d.class != undefined &&
													d.class.includes("calendarbox")
													? d.class.split(/\s/gi)[0]
													: d.class}2" >`
											: ""} 
													${true
														? ((d.index = i), this._.parser(dataToAttributes(d)))
														: ""} 
													${(i + 1) % p === 0 ? `</section>` : ""}`;
										return gate(d, p, i);
									},
									standard: (data, perpage) => {
										let type = Array.isArray(data) &&
											data[2] != undefined &&
											data[2].class != undefined &&
											data[2].class.includes("calendarbox")
											? data[2]
											: Array.isArray(data) ? data[0] : data;
										type === undefined
											? (type = { wrapper: "All_Form", class: "calendarbox" })
											: "";
										const plate = (data, type, perpage) => `
																${type.wrapper === null
																	? ""
																	: `<${/form/gi.test(type.wrapper)
																			? "form"
																			: "div"} class="${type.class}2" >`}
																${Array.isArray(data)
																	? data
																			.map(
																				(da, i) => `
																	${this._.innersection(da, perpage, i)}`
																			)
																			.join("")
																	: this._.innersection(data, perpage, 0)}
																${type.wrapper === null
																	? ""
																	: `</${/form/gi.test(type.wrapper) ? "form" : "div"}>`}`;
										return plate(data, type, perpage);
									},
									style: css =>`<style scoped>${css}</style>`,
									block: block =>`<div name="${block.name}" >${this._.style(block.css)}${this._.standard(block.data, block.perpage)}</div>`,
									};
								},
								},});
	var template = templates._;
	function handleId(data){
			data.group = data.group != undefined
				? data.group
				: data.group == undefined && data.groupName != undefined
					? data.groupName
					: "FcInquiries";
			let a = `${data.name
				.replace(/\s/gi, "")
				.replace(/\;/gi, "")}_${data.group
				.replace(/\s/gi, "")
				.replace(/\;/gi, "")}_${data.index
				.toString()
				.replace(/\s/gi, "")
				.replace(/\;/gi, "")}`;
			let b = `${data.r}`;
			let c = `${a}_parent_${b}`;
			let d = `${a}_${b}`;
			return data.nested === null ? d : c;
		}
	function getEventbindingObject(properties, theId) {
			return Object.keys(properties).filter(k => {
				return k.startsWith("on") &&
					/click|mouse|touch|change|value|arrow|touch|key|enter|input/g.test(k)
					? {
							target: theId,
							event: k,
							action: properties[k],
							context: properties.context,
							inmethods: properties.inmethods,
							widget: properties.widget
						}
					: "";
			});
		}
	function generateIlsObject(data){
			data.id !==undefined?data.id:handleId(data);
				return {
						input: {
							id: data.id,
							type: data.type,
							name: labelToPropertyName(data.name),
							index: data.index,
							group: data.group,
							widget: data.widget,
							bind: data.bind,
							aria_checked: data.aria_checked,
							widgetsindex: data.widgetsindex,
							class: data.class != undefined ? data.class : "animatedinput",
							value: data.value && Array.isArray(data.value) === false
								? data.value
								: " ",
							data_btn: data.data_btn != undefined
								? data.data_btn
								: data.databtn != undefined && data.databtn.includes("_")
									? data.databtn
									: data.data_btn != undefined ? data.data_btn : " ",
							tabindex: data.tab_index || 0,
							aria_checked: data.checked,
							autocomplete:data.type==="text"? true:false,
							spellcheck: data.type==="text"? true:false,
							aria_label: data.label,
							aria_role: data.aria_role,
							title: data.title!=undefined?data.title: data.type==="text"&&data.class!=="digit"?"Please Fill-In This Input":data.class==="digit"&&data.type==="text"?"Double Click to Change Input":data.class==="digit"&&data.type==="button"?"Increment":data.label,
								},
						label: {
							id: `label_${data.id}`,
							for: data.id,
							name: labelToPropertyName(data.name),
							index: data.index,
							widgetsindex: data.widgetsindex,
							widget: data.widget,
							bind: data.bind,
							group: data.group,
							data_btn: data.databtn != undefined
								? data.databtn
								: data.databtn != undefined ? data.databtn : " ",
							class: data.class != undefined ? data.class : "animatedinput",
							content: data.label != undefined
								? data.label
								: data.labelcontent != undefined ? data.labelcontent : "_content1_",
							tabindex: data.tab_index ? data.tab_index : 0,
							contenteditable: data.contenteditable ? true : false,
							spellcheck: data.spellcheck === false ? false : true,
							aria_label: data.aria_label || data.label,
							aria_role: data.aria_role,
							title:data.title!=undefined?data.title: data.type==="text"&&data.class!=="digit"?"Please Fill-In This Input":data.class==="digit"&&data.type==="text"?"Double Click to Change Input":data.class==="digit"&&data.type==="button"?"Increment":data.label,
						},
						section: {
							id: `section_${data.id}`,
							widgetsindex: data.widgetsindex,
							class: data.class != undefined ? data.class : "animatedinput",
							content: data.label || data.sectionLabel,
							tabindex: data.tab_index ? data.tab_index : 0,
							aria_label: data.aria_label || data.label,
							aria_role: data.aria_role
						}
					};
	}
	function valuesListToSelectBoxes(name, group, array){
												return array.map((z, i)=>{
														let p=typeof z==="string"?z.replace(/\s/g,"_"):z;
															return { 
																"label":` ${z}`, "bind": "body", "name": name==undefined?`myhuys_${i}`:labelToPropertyName(name), "group": group!=undefined?group:"FcInquiries",
																"id":`${p}_${name}_${group}_${i}`,"class":"selects", "wrapper": "All_Form", "widget": "omni", 
																"type":"radio", "checked":false, "databtn":`setvalue_${group!=undefined?group:"FcInquiries"}_${name}_endunit`,
																"index": i, "value": z, "propertyName": labelToPropertyName(name), "tabIndex":Math.floor(i+1),
															};
																											}
																				)
								}
	function nestedAssignment(data){
									let q=[];
								q = Array.isArray(data.value) === true &&
									typeof data.value[0] !== "object"
									? valuesListToSelectBoxes(data.name,data.group,data.value)
									: data.dropdowncontent;
								return  {
													dropdowncontent: {
														id: `dropdowncontent_${handleId(data)}`,
														class: ` ${data.class} nested`,
														type: "radio",
														content: `${templates._.standard(q,q.length < 50 ? q.length : 50)}`
													} //end dropdowncontent
												}; //end o assignment, next set return for obj
}
	function dataToAttributes(data){
					data.r == undefined ? (data.r = 	us504Index, us504Index++) : data.r;
					data.groupName ? (data.group = data.groupName) : "";
								let wrapper=data.wrapper
					data.id = handleId(Array.isArray(data) ? data[0] : data);
					data.eventObject=data.properties != undefined && typeof data.properties === "object"? getEventbindingObject(data.properties, data.id): "";
					let obj = generateIlsObject(data);
					data.nested != null? obj= Object.assign(obj, nestedAssignment(data)): "";
					data.properties !== null? obj.input = Object.assign(obj.input, data.properties): "";
					data.wrapper != undefined && data.wrapper !== "All_Form"? obj= Object.assign({ [wrapper]: { id: `wrapper_${data.id}`, class: data.class, name: data.group } }, obj): "";
					data.ddc != undefined ? (obj.dropdowncontent = data.ddc) : "";
					return obj;
				}
	var component = function(){
		
	}
	
