var junk=(function(){
	class TimeKeeper{
		constructor(){
			this.digi=[];
			this.proxy={};
			this.proxy.select={};
			this.ispageturninit=0;
			var startclocks=[
				{"name": "localTime","index": 0, "type":"clock","originalSetting":"time","display":this.timeDisplay,"key":"symbol","bitmask": 5,"increment":1000 },{"name": "satReading","index": 1,"alertcolor":"aqua","type": "countdown","key":"symbol","originalSetting":[0,0,6,5,0,0,0,0],"display":[0,0,6,5,0,0,0,0], "bitmask":2 },{"name": "satLongMath","alertcolor":"yellow","type": "countdown","originalSetting":[0,0,5,5,0,0,0,0],"display":[0,0,5,5,0,0,0,0], "bitmask":2 ,"increment":0},{"name": "satGrammar", "alertcolor":"purple","type": "countdown","originalSetting":[0,0,3,5,0,0,0,0],"display":[0,0,3,5,0,0,0,0], "bitmask":2 ,"increment":0},{"name": "satShortMath", "alertcolor":"red","type": "countdown","originalSetting":[0,0,2,5,0,0,0,0],"display":[0,0,2,5,0,0,0,0], "bitmask":2 ,"increment":0},{"name": "testDayAlarm","type": "alarm", "alertcolor":"pink","originalSetting":[0,6,5,9,0,0,"A","M"],"display":[0,6,5,9,0,0,"A","M"],"bitmask": 6 ,"increment":10},{"name": "NewAlarm","alertcolor":"orange","type": "alarm", "originalSetting":[0,5,3,5,0,0,"P","M"],	"display":[0,5,3,5,0,0,"P","M"],"bitmask": 6 ,"increment":30},{"name": "LaterAlarm","alertcolor":"goldenrod", "type": "alarm","originalSetting":[0,7,3,5,0,0,"A","M"], "display":[0,7,3,5,0,0,"A","M"], "bitmask": 6, "increment":30},{"name": "stopwatch","type": "stopwatch","originalSetting":[0,0,0,0,0,0,0,0],"display":[0,0,0,0,0,0,0,0],"bitmask": 0 ,"increment":30},{"name": "stopwatch2","type": "stopwatch","originalSetting":[0,0,0,0,0,0,0,0],"display":[0,0,0,0,0,0,0,0],"bitmask": 0,"increment":30}
			];
		var index=0;
		this.countdownKey=0;
		this.displaysMap=new Map();
		this.timerNames=startclocks.map(a=>{return a.name});
		for(let i = 0;i< this.timerNames.length;i++)	{
			this.displaysMap.set(this.timerNames[i], startclocks[i]);}
		tagsToProperties(["resultsArea", "datadisplay"],this);
		var context=this;
			self.proxy={}
		this.alarmArchive=[];
			self.proxy.hundredths=0;
	
		Object.defineProperties(this, {
			
			"data": {
						 get: function() {
								return template.standard(block.header.data(),3).concat(template.standard(block.timer.data(), 10),template.standard(block.buttonrow.data(),10));							}
					},
			"template":{
				"enumerable":true, 
				"configurable": true, 
					get:function(){
							return {
							"html":()=>`<fc-timekeeper id="timekeeper" style="border: silver double 4px; box-shadow: 2px 2px 3px 4px #bfbfbf; min-width: 80px;display: flex; max-width:322px;flex-flow: column nowrap; justify-content: center; padding:.7em 0 0 .27em; min-height:102px; overflow: hidden; position: relative;background: white; z-index: 9;"><style scoped>${block.header.css()}${block.timer.css()}${block.buttonrow.css()}</style>${this.data}</fc-timekeeper>`,
	 					"render":()=>{  document.getElementById("resultsArea").insertAdjacentHTML("afterbegin", `${this.template.html()}`);	},
							};
						}
				},
			"index":{
						"enumberable":true,"configurable":true, 
						"get":function(){return index&&index>-1&&index<Math.floor(this.timerNames.length-1)?index:(index=0,index)
						},
						"set":function(bool){
							
							let c=Math.floor(this.timerNames.length-1);
							index=index!=undefined?arrayincrementor(index,c, bool, 1)
						:arrayincrementor(index?index:0,c, bool, 1);
							this.datadisplay.innerHTML+=index;
							this.methods.updateCurrentName();
							window.setTimeout(()=>{this.datadisplay.innerHTML+=JSON.stringify(this.selected);this.selected.endTime;
																		this.ispageturninit=0;}, 3)
						},
					},	
			"selected":{
								"get":function(){
										return this.proxy.selected==undefined
											?this.displaysMap.get(this.timerNames[index])
										:this.proxy.selected;
											},
								"set":function(value){
									this.proxy.selected=	typeof value==="number"&&value>=0&&value<Math.floor(time.length-1)&&value===index
										?this.displaysMap.get(this.timerNames[value])
									:value;
									
								
									
											
										}
							},
			"now":{
				"enumberable":true,"configurable":true, "get":function(){return Math.floor(new Date().getTime() / 10);}
			},
			"timeDisplay":{
						get:function(){ 
							let d= new Date().toLocaleTimeString().replace(/\:/g,"").replace(/\s/,"").split("");
							d.length===7?d.unshift(0):"";
							return d;
							},
						set:function(value){this.timeDisplay=value;},
					},	
			"toggleOnOff":{
					"enumberable":true,"configurable":true, "get":function(){
					this.selected.bitmask =this.selected.bitmask == 1 ? 0 :
					this.selected.bitmask == 0 ? 1 :
					this.selected.bitmask == 2 ? 3 :
					this.selected.bitmask == 3 ? 2 :
					this.selected.bitmask;
					
						this.selected.bitmask===3||this.selected.bitmask===1?(this.endTime,this.interval.short(),	this.startstop.value="STOP "):this.selected.bitmask<4?(this.selected.endTime=0,	this.startstop.value="START ", this.selected.display.forEach((a, i)=>{this.digi[i].value=this.display[i]=a;}), this.displaysMap.set(this.selected.name, this.selected)):this.interval.short();
						return this.selected.bitmask;
										},
					},
			"noticeLog":{
				enumerable:true,
				configurable:true,
				writable:true,
				
				
			},
			"nextNotice":{
				
			},
			"endTime":{
					get:function(){
						var a=a==undefined?this.selected:a;
								a.endTime=a.bitmask===6?this.methods.alarmTime(a)
								:a.bitmask==3?(Math.floor(this.now+this.displayToHundredths))
								:a.bitmask==1?((this.now-this.displayToHundredths))
								:a.bitmask==2?a.endTime=0: a.endTime;
				 				let b=a.bitmask<4?(a.endMills=Math.floor(a.endTime*10)):a.endTime;
								a.endTimeString=new Date(b).toLocaleString();
								a.secondsRemaining=Math.floor(Math.floor(a.endTime-this.now)/100);
								a.minutesRemaining=Math.floor(a.secondsRemaining/60);
								a.hoursRemaining=Math.floor(a.minutesRemaining/60);
								
									return a.endTime;
								},
					 },
			"display":{
						get:function(){	return this.digi.map(a=>{return a.value});},
						set:function(value){
							this.selected.bitmask%2!==0||this.ispageturninit===0?this.selected.display 
										=	Array.isArray(value)?value.map((v,i)=>{
										context.digi[i].value=v; 
										return v;
									})
										:context.digi.map(a=>{return a.value}):context.digi.map(a=>{return a.value});
							this.pageturninit++;
							
			//			
						}	
 				},
			"displayToHundredths":{
								"get":function(){
									return	this.selected.display
								?this.selected.display.reduce((pre,el,i)=>{
								pre+= parseInt(el) * [3600000, 360000, 60000,6000,1000, 100,10, 1][i];
								return Math.floor(pre);
							},0):(console.log("error"),"");
				},
		},
			"methods":{
				"get":function(){
					return 	{
					 'archiveAlarmKey':(key)=>{
							this.alarmArchive.push(key)
							
					},
					"updateCurrentName":()=>{
						let name=document.querySelector("input[id^='name_clockHeaderSections_1']");
						console.log(name)
						name.value=propertyNameToLabel(this.timerNames[index]);
					},
					"set":()=>{
						this.selected.bitmask<4&&this.selected.bitmask%2!==0?this.toggleOnOff:"";
						this.selected.bitmask!==5?this.selected.display=this.counterInputs.map(a=>true? a.value:a.value): " ";
						
					},
					"delete":()=>{
						
						if(this.selected.bitmask!==5){
									this.selected.bitmask===1||this.selected.bitmask===3?this.toggleOnOff:"";
						this.displaysMap.delete(this.selected.name);
						this.timerNames.splice(index, 1);

							index=0;
					}},
					"new":()=>{console.log(this.selected.name, this.selected.originalSetting,"new");},
					"clear":()=>{
						this.ispageturninit=0
						if(this.selected.bitmask===6)
						{
							this.display=this.selected.display=[1,2,0,0,0,0,"A","M"];
						}
						else if(this.selected.bitmask===5)
						{
							console.log("the time cannot be cleared");
						}
						else{
							if(this.selected.bitmask===1||this.selected.bitmask===3)
							{this.toggleOnOff;}
							this.display=this.selected.display=[0,0,0,0,0,0,0,0];
							
						}
						this.endTime;
					},
					"off":()=>{console.log(this.selected.name, this.selected.originalSetting,"off");},
					"event":()=>{console.log(this.selected.name, this.selected.originalSetting,"event");},
					"date":()=>{console.log(this.selected.name, this.selected.originalSetting,"date", "launch calendar");},
					"todos":()=>{console.log(this.selected.name, this.selected.originalSetting,"todos");},
					"reset":()=>{
						this.ispageturninit=0
						if(this.selected.bitmask===1||this.selected.bitmask===3)
							{this.toggleOnOff;}
						console.log(this.selected.name, this.selected.originalSetting,"reset");
					this.selected.display=	this.display=this.selected.originalSetting.map(a=>true?a:a);
						
					},
					"fromHundredths":(hundredths)=>{
								var hundredths=parseInt(hundredths);
								let a=(arg,n)=>{return arg % n};let b=(arg, m)=>{return Math.floor(arg / m)};
														let c= b(b(hundredths,10),10);let d=b(c,60);let e=b(d,60);
								let returnArray=[b(e,10),a(e,10),b(a(d,60),10),a(b(c,60),10),b(a(c,60),10),a(c,10),a(b(hundredths,10),10),a(hundredths,10)];
								return returnArray;
									},
					"soundAlarm":(id)=>{
								this.alarmArchive.push(id);
								this.alarmon=window.setInterval(()=>{ 
								this.target.classList.contains("alarmactive")===true
									?this.target.classList.remove("alarmactive")
								:this.target.classList.add("alarmactive");},1500)
					},
					"terminateAlarm":(a)=>{
						clearInterval(a);clearInterval(this.alarmon); 
						this.target.classList.remove("alarmactive");},
					"alarmTime":(clk)=>{
						let a= this.convertClock(clk.display)-this.convertClock(this.timeDisplay); 
						let d=a<0?this.convertClock([1,1,5,9,5,9,"P","M"])+a+1000:a; 	
						let id="alarm_"+clk.name;
						setTimeout(()=>{
							this.soundAlarm(this[id])},d);return (d+new Date().getTime());
					},
					"convertClock":{
									get:function(){
										let result=0;
										let display=this.display;
										for(let j=0;j<5;j+=2){
											let b=display[6]==="P"&&j===0&&(display[0]==1&&display[1]==2)?0
										:display[6]==="P"&&j===0?12:display[6]==="A"&&j===0&&display[0]==1&&display[1]==2?-12:0;
											result+=((parseInt(display[j])*10+parseInt(display[j+1])+b)*(j===0?3600000:j===2?60000:1000));}
														return result;
													},
									},
				 };
			  },
			},
			"interval":{
								get:function(){
									return {
										short:()=>{
											this.ispageturninit=0;
										let	last=Math.floor(this.alarmArchive.length-1);
											let htime=last>-1?(window.clearInterval(last), false):true;
											this.key=window.setInterval(()=>{
													let b=this.selected.bitmask;
												b==5?this.display=this.timeDisplay
												:b==1?this.display=this.methods.fromHundredths(Math.floor(this.now-this.selected.endTime))
												:b==3?this.display=this.methods.fromHundredths(Math.floor(this.selected.endTime-this.now))
												:this.ispageturninit===0?this.display=this.selected.display:"";
												this.ispageturninit++;
												let timer=document.querySelector("input[id^='time_clockHeaderSections_2_']");
												
												timer.value=new Date().toLocaleTimeString();
											},this.selected.interval);
											this.methods.archiveAlarmKey(this.key);
											console.log(this.alarmArchive);
										},
										}
								}
							},
			"states":{
						get:()=>{
							return {
							one:()=>{
								this.counterInputs[6].style.cssText="width: 24px; left:-7px; padding: 2px;";
								this.counterInputs[7].style.cssText="width:28px; max-width:28px; min-width:28px; margin:0 2px 0 -2px; overflow:hidden; padding:0 0px 0 2px; z-index:4;"; 
								let a="label_time_timers_6_6";
									this[a].classList.contains("lastcolon")?(this[a].classList.remove("lastcolon"), this[a].classList.add("noseeme")):this[a].classList.add("noseeme");
								console.log(this[a])
								document.getElementById("incrementup_timers_9_9").style.cssText="display: flex; align-self: stretch; margin-left: -2px;";
								document.querySelector("input[id^='startstop_clockbuttons_9']").style.display="none";
							
							
							},
							two:()=>{
								this.selected.bitmask===3||this.selected.bitmask===1
									?this.startstop.value="  STOP ":this.selected.bitmask<4
									?this.startstop.value=" START "
									:""; 
								this.counterInputs[6].style.cssText="width: 24px;margin-left:4px;margin-right: -3px; padding-right: 2px;";
								this.counterInputs[7].style.cssText="width:24x; min-width: 24px; padding-left: 0px;padding-right: 12px;";
								let a="label_time_timers_6_6";
								this[a].classList.contains("noseeme")?(this[a].classList.remove("noseeme"), this[a].classList.add("lastcolon")):"";
									document.querySelector("input[id^='startstop_clockbuttons_9']").style.display="block";
							},
						};
						},
					},
		});
				this.template.render();
				tagsToProperties(["timekeeper", "label_time_timers_6_6"],this);
				this.counterInputs=Array.from(this.timekeeper.querySelectorAll("input.digit[type='text']"));
				this.timerLabels=Array.from(this.timekeeper.querySelectorAll("label.digit"));
			
				this.toggleColonLayoutSetter=function()
				{
					this.selected.bitmask>3
					?this.states.one()
				:this.selected.bitmask<4
					?this.states.two()
				: this.states.one();
				}.bind(this);
				
			this.states.one();
			this.clockbuttons=document.querySelector("section.clockbuttons2");
			this.clockbuttonInputs=Array.from(this.clockbuttons.querySelectorAll("input"));
			this.clockbuttonInputs.forEach(a=>{
					a.ontouchstart=a.onclick=e=>{
						let arr=a.dataset.btn.split("_");
						Array.isArray(arr)&&arr.length===2?this.methods[arr[1]]():"";
					}
				});
			this.digi = Array.from(this.timekeeper.querySelectorAll("input.digit"));
			this.clockUp =this.digi.pop();
			this.clockDown=this.digi.shift();
			this.startstop=	document.querySelector("input[id^='startstop_clockbuttons_9']")
				this.startstop.ontouchstart= 	this.startstop.onclick=e => {this.toggleOnOff;};
				this.clockUp.ontouchstart = this.clockUp.onclick = function(e){
					this.index = true;
					this.toggleColonLayoutSetter();
				}.bind(this);
				this.clockDown.ontouchstart =	this.clockDown.onclick = e => {
					this.index = false;
					this.toggleColonLayoutSetter();
				};

				this.interval.short();

		}
		}
			let jk=new TimeKeeper();
			var elem=["input", "label","section"];

})();		

return junk;