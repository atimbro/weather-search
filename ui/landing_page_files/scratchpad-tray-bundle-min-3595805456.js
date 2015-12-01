window.scratchpadInterventionAllowed=(function(){try{if(window.localStorage){try{var b=(localStorage.getItem("scratchpadInterventionAllowed")),a=parseInt(localStorage.getItem("lastScratchpadInterventionTime"),10);b=(typeof b===null)?true:(b=="true");a=(isNaN(a))?0:a;if(!b&&(new Date().getTime()-a)>(24*60*60*1000)){localStorage.setItem("scratchpadInterventionAllowed",true);localStorage.setItem("lastScratchpadInterventionTime",0);b=true;}}catch(c){}return b;}}catch(c){}return false;})();window.scratchpadNewsUpdateNeeded=(function(){try{if(window.localStorage){try{var c=(localStorage.getItem("scratchpadNewsUpdateNeeded")),a=parseInt(localStorage.getItem("lastScratchpadNewsUpdateTime"),10);c=(typeof c===null)?true:(c=="true");a=(isNaN(a))?0:a;if(!c&&(new Date().getTime()-a)>(24*60*60*1000)){localStorage.setItem("scratchpadNewsUpdateNeeded",true);localStorage.setItem("lastScratchpadNewsUpdateTime",0);c=true;}return c;}catch(b){}}}catch(b){}return true;})();window.logScratchpadIntervention=function(c){var a="Scratchpad.Tray.Autopop";if(c){a+=("."+c);}window.scratchpadInterventionAllowed=false;try{if(window.localStorage){try{if(c==="Change"){localStorage.setItem("scratchpadNewsUpdateNeeded",false);localStorage.setItem("lastScratchpadNewsUpdateTime",new Date().getTime());}else{localStorage.setItem("scratchpadInterventionAllowed",false);localStorage.setItem("lastScratchpadInterventionTime",new Date().getTime());}}catch(b){}}}catch(b){}if(window.dctk&&dctk.omtr){dctk.omtr.eVar28=a;dctk.omtr.linkTrackVars="eVar28";dctk.omtr.tl(true,"o","RFRR Action Link");}};(function(){window.Scratchpad=window.Scratchpad||{};if(window.Scratchpad.page){var c=window.Scratchpad.page;}if(window.Scratchpad.headerTray){var b=window.Scratchpad.headerTray;}if(window.Scratchpad.TrayItem){var a=window.Scratchpad.TrayItem;}window.Scratchpad={page:c||{},headerTray:b||{},trayItem:a||{},endpoints:{historyCount:"/api/userhistory/count",historyData:"/api/userhistory",viewership:"/Hotels/Offers?action=getHotelProductActivity&hotelIds=",hotelInfo:"/UserActivityDataAjax/getAdditionalHotelAvailInfo/?",regionViewership:"/api/urgency/regionActivity/",hotelInfo:"/api/userhistory/pricing",sendMeNotes:"/scratchpad/sendmenotes"},state:{loggedInUser:false,guestUser:false,legacyTemplates:false,historyData:[]},init:function(){var h=this,g=this.signedInUserCheck(),f=this.updateCountEndpoint(),e=this.handlebarsCheck(),i=this.localStorageCheck(),d=$.Deferred().done(function(j){h.state.pageId=j;if(j=="Emain"){if(typeof addScratchpadBadge==="function"){addScratchpadBadge(true);}return;}h.headerTray.init(h.state);h.getHistoryCount();h.trayTestAndLearns.init(h.state,j);if(j==="Hotels-Infosite"&&!h.trayTestAndLearns.state.autoPopOk&&!h.trayTestAndLearns.state.isMobileHeader){h.headerTray.showHotelInfositeTooltip();}});this.pageIdCheck(d);return{signedInUserCheck:g,updateCountEndpoint:f,handlebarsCheck:e,localStorageCheck:i};},pageIdCheck:function(f){if(/pub\/agent\.dll/i.test(window.location.href)){f.resolve("Emain");return;}var e=0;var d=setInterval(function(){var h=$("#pageId");if(h.attr("value")){clearInterval(d);var g=h.attr("value").split(".");if((g[1]==="Hotels"||g[1]==="Packages")&&g[2]){g=g[1]+"-"+g[2];}else{if(/Flight-Search/i.test(g[1])){g="Flight-Search";}else{g=g[1];}}f.resolve(g);}else{if(e>100){clearInterval(d);f.resolve("Page Id did not arrive in time");}}e+=5;},5);},updateCountEndpoint:function(){if(/https:/i.test(document.location.protocol)){return{pass:true,result:"don't update count endpoint on HTTPS pages"};}var h="tuid=",f=$("#scratchpad-badge-tuid").attr("data-id"),i=($("#scratchpad-badge-site-id").attr("data-id")||1),e=$("#scratchpad-badge-url").attr("data-id"),j="",g=false,d=[];if(parseInt(f,10)===-1||f===""){f=$("#scratchpad-badge-guid").attr("data-id");h="guid=";d.push("GUID");}else{d.push("TUID");}if(!f||!e){d="Either userId or url is invalid";}else{e+="/userHistory/count/jsonp?";j=e+h+f+"&siteid="+i+"&format=jsonp&callback=?";this.endpoints.historyCount=j;if(d.push){d.push(j);}g=true;}return{pass:g,result:d};},signedInUserCheck:function(){var j=$("#guest-user-flag-for-scratchpad"),g=$("#registered-and-identified-user-flag-for-scratchpad"),e=$(".shop-nav").hasClass("signed-in"),d=[e],i=false,h,f;if(g&&g.attr("data-identifieduser")){f=(g.attr("data-identifieduser")=="true");d.push(f);}else{d="userStateFlag is missing or lacks required attributes";}if(j&&j.attr("data-guestuser")){h=(j.attr("data-guestuser")=="true");if(d.push){d.push(h);}}else{d="guestUserFlag is missing or lacks required attributes";}this.state.loggedInUser=(e||f);this.state.guestUser=h;i=(typeof d!="string");return{pass:i,result:d};},handlebarsCheck:function(){var d=(!!window.Handlebars&&!!window.uitk&&uitk.version.split(".")[0]==="v2");this.state.legacyTemplates=!d;return{pass:true,result:d};},localStorageCheck:function(){var i=false,d=[],h,j,g,f;try{if(window.localStorage){h=(localStorage.getItem("scratchpadDeclineSaveInTray")=="true");j=(localStorage.getItem("scratchpadDeclineNotesInTray")=="true");if(j===null){i=true;d="Passed with missing flag(s): saveFlag is "+h+" and notesFlag is "+j;}else{this.state.blockSaveHeader=h;this.state.blockNotesHeader=j;d.push(h);d.push(j);i=true;}}else{d="No localStorage available";}}catch(k){}return{pass:i,result:d};},getHistoryCount:function(){var e=this;var d=(this.endpoints.historyCount=="/api/userhistory/count")?"json":"jsonp";Scratchpad.trayTestAndLearns.setLocalNewsFlag(false);this._request(this.endpoints.historyCount,d).then(function(f){if((f.responsestatus&&f.responsestatus.status&&f.responsestatus.status=="SUCCESS")||(f.status&&f.status=="SUCCESS")){f.count=f.count||0;f.count=Math.min(f.count,30);e.state.currentCount=f.count;e.headerTray.state.currentCount=f.count;e.trayTestAndLearns.state.currentCount=f.count;e.headerTray.state.isOkToShowTray=true;if(f.count>0){e.getHistoryData(Math.min(f.count,5),true);}else{e.headerTray.updateUI();}}else{e.getHistoryData(0,true);}}).fail(function(){e.getHistoryData(0,true);});return{pass:true,result:[]};},getHistoryData:function(d,g){var e=this,f=this.endpoints.historyData;if(d>0){f+=("?l="+d);}this._request(f).then(function(h){if(h&&h.status=="SUCCESS"&&h.userHistory){e.headerTray.state.isOkToShowTray=true;e.headerTray.handleUserHistoryCheck(h,g);e.getHotelViews();e.getRegionViews();}else{e.headerTray.state.isOkToShowTray=false;}}).fail(function(){e.headerTray.state.isOkToShowTray=false;});return{pass:true,result:[]};},getHotelViews:function(d){var f=this,e="",j="",h;if(d){e=d;}else{for(var g=0;g<this.headerTray.trayItems.length;g++){h=this.headerTray.trayItems[g];if(h.type==="hotel"){e+=h.get("hotelId")+",";}else{continue;}}}e=e.replace(/,$/,"");if(e!==""){j=this.endpoints.viewership+e+"&durationForViews=1800000&durationForBookings=172800000";Scratchpad._request(j).then(function(i){if(i&&i.HotelProductActivityList){f.headerTray.handleHotelViewershipResponse(i);}});}return{pass:true,result:j};},getRegionViews:function(){var d=this,f,g;for(var e=0;e<this.headerTray.trayItems.length;e++){f=this.headerTray.trayItems[e];if(f.type!=="hotelSearch"){return;}g=this.endpoints.regionViewership+f.get("searchRegionId");Scratchpad._request(g).then(function(h){if(h&&h.hotelProductActivityAtRegionLevelList){d.headerTray.handleRegionViewershipResponse(h);}});}},getHotelPricing:function(e,f,g){var d={hotels:e.idArray,checkInDateString:e.startDate,checkOutDateString:e.endDate,roomOccupants:f};$.ajax({url:this.endpoints.hotelInfo,type:"POST",dataType:"json",contentType:"application/json",data:JSON.stringify(d),timeout:5000,success:function(j){if(j.status==="SUCCESS"&&j.priceUpdates&&j.priceUpdates.length>0){for(var h=0;h<j.priceUpdates.length;h++){Scratchpad.page.updateHistoryItem(e,j.priceUpdates[h],g);}}else{Scratchpad.page.failGroupPriceCheck(e.idArray,g);return;}},error:function(h){Scratchpad.page.failGroupPriceCheck(e.idArray,g);}});},sendNotes:function(d){return this._request(this.endpoints.sendMeNotes,"json","POST",{sendMeNotes:d}).done(function(e){if(!e){window.location.href="/user/login?ckoflag=0&hsuc=&fram=&uurl=qscr%3Dredr%26rurl%3D%2Fscratchpad%3FsendMeNotes%3Dtrue";
}});},_request:function(g,d,e,f){if(!g){return;}return $.ajax({url:g,type:e||"GET",dataType:d||"json",data:f||{},cache:false,timeout:5000});}};})();(function(){window.Scratchpad=window.Scratchpad||{};window.Scratchpad.TrayItem=function(e){var d="";var b=Scratchpad.headerTray.locStrings;this.trayIndex=e.trayIndex||null;if(!e.product){return;}if(e.product=="HOTEL"&&e.type==="DETAIL"){this.type="hotel";this.attributes=e.hotel;if(!this.get("price")){this.set("price","");this.set("lastSeenDate",b.seePrice);}else{var h=b[this.localizedAsOfKey()].replace("####",this.get("lastSeenDate"));this.set("lastSeenDate",h);}d=/\?/.test(this.get("deepLinkUrl"))?"&":"?";this.set("rfrrString",(d+"rfrr=SP.Tray."+this.trayIndex+"."+"HI"));this.set("deepLinkUrl",(this.get("deepLinkUrl")+this.get("rfrrString")));if(this.get("thumbnailUrl")){this.set("thumbnailUrl",(this.get("thumbnailUrl").replace("_s","_t")));}this.template=Scratchpad.headerTray.templates.hotelTemplate;this.$el=$($.trim(this.template(this.attributes)));if(!this.get("checkInDate")||!this.get("checkOutDate")){this.$el.addClass("dateless");}else{if(this.get("price")===""){this.$el.addClass("priceless");}}}else{if(e.product=="HOTEL"&&e.type==="SEARCH"){this.type="hotelSearch";this.attributes=e.hotelSearch;this.set("viewCount",0);d=/\?/.test(this.get("deepLinkUrl"))?"&":"?";this.set("rfrrString",(d+"rfrr=SP.Tray."+this.trayIndex+"."+"HS"));this.set("deepLinkUrl",(this.get("deepLinkUrl")+this.get("rfrrString")));if(this.get("thumbnailUrl")){this.set("thumbnailUrl",(this.get("thumbnailUrl").replace("_s","_t")));}this.template=Scratchpad.headerTray.templates.hotelSearchTemplate;this.$el=$($.trim(this.template(this.attributes)));}else{if(e.product=="AIR"){this.type="flight";this.attributes=e.flight;var c=Scratchpad.headerTray.locStrings.fromTo;c=c.replace("####",this.get("departureAirportCode"));c=c.replace("####",this.get("arrivalAirportCode"));this.set("airportToAirport",c);if(!this.get("price")){this.set("price","");this.set("lastSeen","See price");}else{var g=b.from.replace("####",this.get("price"));var f=b[this.localizedAsOfKey()].replace("####",this.get("lastSeen"));this.set("price",g);this.set("lastSeen",f);}d=/\?/.test(this.attributes.deepLinkUrl)?"&":"?";if(this.get("returnDate")){this.set("returnDate",(" - "+this.get("returnDate")));}else{this.set("returnDate","");}this.set("rfrrString",(d+"rfrr=SP.Tray."+this.trayIndex+"."+"FS"));this.set("deepLinkUrl",(this.get("deepLinkUrl")+this.get("rfrrString")));if(this.get("routeType")){var a=this.get("routeType").replace("ROUND_TRIP",Scratchpad.headerTray.locStrings.roundTrip).replace("ONE_WAY",Scratchpad.headerTray.locStrings.oneWay);this.set("routeType",a);}this.template=Scratchpad.headerTray.templates.flightTemplate;this.$el=$($.trim(this.template(this.attributes)));if(!this.get("departureDate")){this.$el.addClass("dateless");}else{if(this.get("price")===""){this.$el.addClass("priceless");}}}else{if(e.product=="PACKAGE"){this.type="package";this.attributes=e.packages;if(!this.get("price")){this.set("price","");this.set("lastSeen","See price");}else{var g=b.from.replace("####",this.get("price"));var f=b[this.localizedAsOfKey()].replace("####",this.get("lastSeen"));this.set("price",g);this.set("lastSeen",f);}if(this.get("returnDate")){this.set("returnDate",(" - "+this.get("returnDate")));}else{this.set("returnDate","");}d=/\?/.test(this.attributes.deepLinkUrl)?"&":"?";this.set("rfrrString",(d+"rfrr=SP.Tray."+this.trayIndex+"."+"PS"));this.set("deepLinkUrl",(this.get("deepLinkUrl")+this.get("rfrrString")));this.template=Scratchpad.headerTray.templates.packageTemplate;this.$el=$($.trim(this.template(this.attributes)));}}}}if(this.trayIndex===1){this.$el.addClass("first");}};window.Scratchpad.TrayItem.prototype={set:function(a,c,b){var d=false;if(this.attributes[a]&&this.attributes[a]===c){return;}else{this.attributes[a]=c;if(b){this.updateDisplay();}}},get:function(a){var b=null;if(this.attributes[a]){b=this.attributes[a];}return b;},localizedAsOfKey:function(){if(this.get("dateTimeFormatType")==="SHORT_TIME"){return"asOfTime";}else{return"asOfDate";}},insertBefore:function(a){this.$el.insertBefore(a);},removeFromTray:function(){this.$el.remove();},moveToIndex:function(a){this.trayIndex=a;},updateDisplay:function(){var a=$($.trim(this.template(this.attributes))).find(".item-link");this.$el.empty().html(a);}};})();var Scratchpad=Scratchpad||{};(function(a){a.headerTray={$elements:{$history:null,$badge:null,$greeting:null,$viewAllItem:null},templates:{hotelTemplate:null,hotelSearchTemplate:null,flightTemplate:null,packageTemplate:null},state:{greeting:false,blockSaveHeader:false,blockNotesHeader:false,userIsNudgeEnrolled:false,apiAttemptsRemaining:0,currentCount:-1,historyData:[],isOkToShowTray:false,trayIsTurnedOn:false,addSearchAsItem:false,userHasNews:false},locStrings:{scratchpadName:"Scratchpad",seePrice:"See price",asOf:"as of ####",from:"from ####",oneWay:"One way",roundTrip:"Round trip",fromTo:"#### to ####",others:"#### others viewing now",other:"1 other viewing now",plus:"#### + ####",included:"#### and #### included",notesConfirmation:"We'll send Scratchpad updates to you by email. Watch your inbox!",defaultHeaderMessage:"Things you view while shopping are saved here. Pick up where you left off.",getUpdates:"Get Scratchpad updates by email.",thingsSavedHere:"Things you view while shopping are saved here.",viewScratchpad:"View Scratchpad",viewAllItems:"View all #### items",searchIsSaved:"This search has been saved in your Scratchpad.",sendNotesTo:"We'll send updates to ####. Watch your inbox!",pageGetUpdates:"Get updates about things in your Scratchpad.",notAvailable:"Not available",findOutWhy:"Find out why",room:"1 room left at this price",rooms:"#### rooms left at this price",packages:"#### Packages",flight:"Flight",hotel:"hotel",car:"car",othersSearching:"#### others searching now",hotels:"#### Hotels",fromToHyphen:"#### - ####",hotelSearchAvgPerNight:"avg per night",perPerson:"per person"},trayItems:[],productNameMap:{"FLIGHT":"Flight","HOTEL":"hotel","CAR":"car"},init:function(c){for(var b in c){if(c.hasOwnProperty(b)){this.state[b]=c[b];}}this.locStrings=window.scratchpadLocStrings||this.locStrings;this.productNameMap={"FLIGHT":this.locStrings.flight,"HOTEL":this.locStrings.hotel,"CAR":this.locStrings.car};this.state.blockNotesHeader=!$(".site-header-primary").hasClass("us-pos");this.captureElements();this.captureTemplates();window.scratchpadPrivateDealsEnabled=window.scratchpadPrivateDealsEnabled||false;},captureElements:function(){var c=true,b="success";this.$elements.$history=$("#header-history.nav-tab");this.$elements.$badge=$("#scratchpad-badge");this.$elements.$greeting=$(".menu-header");this.$elements.$viewAllItem=$(".view-all-history");if(!this.$elements.$history||!this.$elements.$badge||!this.$elements.$greeting||!this.$elements.$viewAllItem){c=false;b="not all elements were captured";}return{pass:c,result:[b]};},localizer:function(e,b){var c=e;if(b){for(var d=0;d<b.length;d++){c=c.replace("####",b[d]);}}return c;},captureTemplates:function(){var c=this,d=true,b="success";if(!Scratchpad.state.legacyTemplates){Handlebars.registerHelper("viewership",function(e){var f=parseInt(e,10);if(f>1){return c.locStrings.others.replace("####",e);}else{if(f===1){return c.locStrings.other;}else{return"";}}});Handlebars.registerHelper("productDescription",function(e){var f=c.locStrings.included;if(e.length===2){f=f.replace("####",c.productNameMap[e[0]]).replace("####",c.productNameMap[e[1]]);}else{f="";}return f;});Handlebars.registerHelper("localizer",function(){var e="",f=[].splice.call(arguments,0,arguments.length-1),h=c.locStrings[f[0]],g=f.slice(1,f.length);if(h){e=c.localizer(h,g);}return e;});this.templates.hotelTemplate=Handlebars.compile($("#hotel-tray-item-template").html());this.templates.hotelSearchTemplate=Handlebars.compile($("#hotel-search-tray-item-template").html());this.templates.flightTemplate=Handlebars.compile($("#flight-tray-item-template").html());
this.templates.packageTemplate=Handlebars.compile($("#package-tray-item-template").html());}else{this.templates.hotelTemplate=this.legacyHotelTemplate;this.templates.hotelSearchTemplate=this.legacyHotelSearchTemplate;this.templates.flightTemplate=this.legacyFlightTemplate;this.templates.packageTemplate=this.legacyPackageTemplate;}if(!this.templates.hotelTemplate||!this.templates.flightTemplate||!this.templates.hotelSearchTemplate||!this.templates.packageTemplate){d=false;b="not all templates assigned";}return{pass:d,result:[b]};},updateUI:function(){this.updateTrayHeader();this.updateBadge();this.updateTrayFooter();this.updateNavAction();},updateBadge:function(c){c=c||this.state.currentCount;if(this.state.greeting){c++;}var b=c>0;this.$elements.$badge.text(c).toggleClass("badge-urgent",b).toggleClass("visuallyhidden",!b);return{pass:true,result:[c,b]};},updateNavAction:function(){if(this.state.isOkToShowTray&&!this.state.trayIsTurnedOn){this.state.trayIsTurnedOn=true;$("<span>").addClass("icon icon-toggle180").appendTo(this.$elements.$history);this.$elements.$history.attr("data-control","menu").attr("href","#");}return{pass:true,result:[this.state.trayIsTurnedOn]};},declineSaveHeader:function(d,b){var c=false;try{if(window.localStorage){try{localStorage.setItem("scratchpadDeclineSaveInTray",true);}catch(f){}c=true;}}catch(f){}if(!b&&window.dctk&&dctk.trackAction&&d){dctk.trackAction("Scratchpad.SaveLater",d);}this.state.blockSaveHeader=true;this.updateUI();return{pass:true,result:[c,!!window.dctk]};},declineNotesHeader:function(c,d){var b=false;if(!d){try{if(window.localStorage){try{localStorage.setItem("scratchpadDeclineNotesInTray",true);}catch(f){}}b=true;}catch(f){}if(window.dctk&&dctk.trackAction&&c){dctk.trackAction("Scratchpad.NotesLater",c);}}this.state.blockNotesHeader=true;this.updateUI();return{pass:true,result:[b,!!window.dctk]};},acceptNotesHeader:function(b){if(b){Scratchpad.sendNotes(true).done(function(c){if(!c){window.location.href="/user/login?ckoflag=0&hsuc=&fram=&uurl=qscr%3Dredr%26rurl%3D%2Fscratchpad%3FsendMeNotes%3Dtrue";}});}if(/scratchpad/.test(window.location.pathname)){$("#send-me-notes-on").prop("checked",true);}if(b&&window.dctk&&window.dctk.omtr){dctk.omtr.eVar28=(parseInt(window.scratchpad2ColTrayTestBucket,10)>0)?"SP.Tray.CS.OptIn":"Scratchpad TrayOptIn";dctk.omtr.events="event80";dctk.omtr.linkTrackVars="eVar28,events";dctk.omtr.linkTrackEvents="event80,event81";dctk.omtr.tl(true,"o","RFRR Action Link");}$(".optional-notes-buttons").hide().removeClass("active");$(".scratchpad-greeting .greeting-message").text(this.locStrings.notesConfirmation);this.state.blockNotesHeader=true;return{pass:true,result:[this.state.greeting]};},acceptNewsHeader:function(b){Scratchpad.trayTestAndLearns.setLocalNewsFlag(false);if(b&&window.dctk&&window.dctk.omtr){dctk.omtr.eVar28="SP.Tray.CS.News";dctk.omtr.events="event80";dctk.omtr.linkTrackVars="eVar28,events";dctk.omtr.linkTrackEvents="event80,event81";dctk.omtr.tl(true,"o","RFRR Action Link");}window.location.href="/scratchpad";},updateTrayHeader:function(){var d=this;var e=(!this.state.userIsNudgeEnrolled&&window.scratchpadPrivateDealsEnabled);var f=Scratchpad.trayTestAndLearns.validLocalNewsFlag();var b=!this.state.blockSaveHeader&&(!Scratchpad.state.loggedInUser||Scratchpad.state.guestUser);var c=(!f&&!this.state.userIsNudgeEnrolled&&!this.state.blockNotesHeader);if(e||f||b||c||this.state.currentCount===0){this.state.greeting=true;$(".optional-notes-buttons").hide().removeClass("active");$(".optional-save-buttons").hide().removeClass("active");$(".optional-news-buttons").hide().removeClass("active");$(".greeting-icon").hide();}else{this.state.greeting=false;}if(e||f||b||c){if(e){this.showDealsHeader();}else{if(f){this.showNewsHeader();}else{if(c){this.showNotesHeader();}else{if(b){this.showSaveHeader();}}}}}else{this.showDefaultHeader();}if(this.state.greeting){if(this.state.currentCount!==0){$(".user-history-tab .menu").addClass("two-column");}this.$elements.$greeting.show();$(".scratchpad-item.first").removeClass("first");}else{$(".user-history-tab .menu").removeClass("two-column");this.$elements.$greeting.hide();$(".scratchpad-item").first().addClass("first");}return{pass:true,result:[b,c,this.state.currentCount,this.state.greeting]};},showSaveHeader:function(){var b=this,d=parseInt(window.scratchpad2ColTrayTestBucket,10),c=this.locStrings.defaultHeaderMessage;$(".scratchpad-greeting .greeting-submessage").hide();$(".optional-save-buttons").show().addClass("active");if(d>0){$(".optional-save-buttons .sub-action").hide();}$(".scratchpad-greeting .greeting-message").text(c);$(".optional-save-buttons .btn-action").click(function(e){e.stopPropagation();window.location="/user/login?&ckoflag=0&amp;amp;hsuc=&amp;amp;fram=&uurl=qscr%3Dredr%26rurl%3D%2Fscratchpad";});$(".optional-save-buttons .sub-action").click(function(e){e.stopPropagation();b.declineSaveHeader(this);});return{pass:true,result:[c]};},showNotesHeader:function(){var c=this,g=parseInt(window.scratchpad2ColTrayTestBucket,10),b=Scratchpad.trayTestAndLearns.getNudgeEnrollmentHeaderStrings(),d=(g>0)?b.title:this.locStrings.getUpdates,e=(g>0)?b.subtitle:"",f=(g>0)?b.buttonText:"Send Me Updates";$(".optional-notes-buttons").show().addClass("active");if(g>0){$(".optional-notes-buttons .sub-action").hide();}$(".scratchpad-greeting .greeting-message").html(d);$(".scratchpad-greeting .greeting-submessage").text(e).show();$(".optional-notes-buttons .btn-action").text(f).click(function(h){h.stopPropagation();c.acceptNotesHeader(true);});$(".optional-notes-buttons .sub-action").click(function(h){h.stopPropagation();c.declineNotesHeader(this);});if(Scratchpad.trayTestAndLearns.state.autoPopOk){Scratchpad.trayTestAndLearns.trayAutoPopTL();}return{pass:true,result:[d]};},showNewsHeader:function(){var c=this,g=parseInt(window.scratchpad2ColTrayTestBucket,10),b=Scratchpad.trayTestAndLearns.getNewsHeaderStrings(),d=b.title,e=b.subtitle,f=b.buttonText;$(".optional-save-buttons").hide();$(".optional-notes-buttons").hide();$(".greeting-icon").show();$(".optional-news-buttons").show().addClass("active").find(".btn-action").text(f);$(".scratchpad-greeting .greeting-message").text(d);$(".scratchpad-greeting .greeting-submessage").text(e).show();$(".optional-news-buttons .btn-action").click(function(h){h.stopPropagation();c.acceptNewsHeader(true);});if(window.scratchpadNewsUpdateNeeded&&Scratchpad.trayTestAndLearns.state.autoPopOk){Scratchpad.trayTestAndLearns.trayAutoPopTL("Change");}},showDealsHeader:function(){var c=this,b=Scratchpad.trayTestAndLearns.getPrivateDealsHeaderStrings();$(".optional-notes-buttons").show().addClass("active");$(".optional-notes-buttons .sub-action").hide();$(".scratchpad-greeting .greeting-message").html(b.title);$(".scratchpad-greeting .greeting-submessage").text(b.subtitle).show();$(".optional-notes-buttons .btn-action").text(b.buttonText).click(function(d){d.stopPropagation();c.acceptDealsHeader(true);});if(Scratchpad.trayTestAndLearns.state.autoPopOk){Scratchpad.trayTestAndLearns.trayAutoPopTL();}return{pass:true,result:[b]};},acceptDealsHeader:function(){if(window.dctk&&window.dctk.omtr){dctk.omtr.eVar28="PD.Tray.CS.OptIn";dctk.omtr.events="event80";dctk.omtr.linkTrackVars="eVar28,events";dctk.omtr.linkTrackEvents="event80,event81";dctk.omtr.tl(true,"o","RFRR Action Link");}Scratchpad.sendNotes(true).done(function(b){if(!b){window.location.href="/user/login?ckoflag=0&hsuc=&fram=&uurl=qscr%3Dredr%26rurl%3D%2Fscratchpad%3FsendMeNotes%3Dtrue";}});$(".optional-notes-buttons").hide().removeClass("active");$(".scratchpad-greeting .greeting-message").text(Scratchpad.trayTestAndLearns.getPrivateDealsHeaderStrings().postActionState);this.state.blockNotesHeader=true;if(/scratchpad/.test(window.location.pathname)){$("#send-me-notes-on").prop("checked",true);}return{pass:true,result:[this.state.greeting]};},showDefaultHeader:function(){var b=this.locStrings.thingsSavedHere;$(".optional-save-buttons").hide();$(".optional-notes-buttons").hide();
$(".scratchpad-greeting .greeting-submessage").hide();$(".scratchpad-greeting .greeting-message").text(b);return{pass:true,result:[b]};},updateTrayFooter:function(){var c=[this.locStrings.viewAllItems.replace("####",this.state.currentCount),this.locStrings.viewScratchpad],b=(4-this.state.currentCount);this.$elements.$viewAllItem.text(c[this.state.currentCount>5?0:1]);if(this.state.greeting&&b>0&&this.state.currentCount!==0){this.$elements.$viewAllItem.parent().addClass("pad-"+b);}else{if(this.state.currentCount===0){this.$elements.$viewAllItem.parent().addClass("extra-padding");}}return{pass:true,result:[]};},showHotelInfositeTooltip:function(){if(!window.uitk){return false;}$(".user-history-tab").uitk_tooltip("show");var b=$(".theme-urgency");if(b.hasClass("top")){b.css({"top":"150px"}).removeClass("top").addClass("bottom");}$(".theme-urgency .hotel-saved").show();return setTimeout(function(){$(".user-history-tab").uitk_tooltip("hide");},5000);},legacyHotelTemplate:function(e){var b=Scratchpad.headerTray,d=parseInt(e.viewCount,10),f="";if(e.viewCount&&d===1){e.viewCount=b.locStrings.other;}else{if(e.viewCount&&d>1){e.viewCount=b.locStrings.others.replace("####",e.viewCount);}else{e.viewCount="";}}var c='<li class="scratchpad-item">'+'<a href="'+e.deepLinkUrl+'" class="item-link" data-onclick="">'+'<ul class="item-data">'+'<li class="item-title"><strong>'+e.hotelName+"</strong></li>"+'<li class="item-date">'+e.checkInDate+" - "+e.checkOutDate+"</li>"+'<li class="item-watches">'+e.viewCount+"</li>"+'<li class="item-price-urgency"><strong class="price">'+e.price+"</strong>"+e.lastSeenDate+"</li>"+'<li class="item-img-icon">'+'<img src="//images.trvl-media.com'+e.thumbnailUrl+'" alt="'+e.hotelName+'" class="image" aspectRatio="1-1">'+"</li>"+"</ul>"+"</a>"+"</li>";return c;},legacyHotelSearchTemplate:function(d){var b=Scratchpad.headerTray,f="",e="";if(d.viewCount){f=b.localizer(b.locStrings.othersSearching,[d.viewCount]);}if(d.amount){e='<li class="item-price-urgency"><strong class="price">'+d.price+"</strong>"+'<p class="item-package-message">'+b.localizer(b.locStrings.hotelSearchAvgPerNight)+"</p>"+b.localizer(b.locStrings.asOf,[d.lastSeenDate])+"</li>";}var c='<li class="scratchpad-item">'+'<a href="'+d.deepLinkUrl+'" class="item-link" data-onclick="">'+'<ul class="item-data">'+'<li class="item-title"><strong>'+b.localizer(b.locStrings.hotels,[d.destination])+"</strong></li>"+'<li class="item-date">'+b.localizer(b.locStrings.fromToHyphen,[d.checkInDate,d.checkOutDate])+"</li>"+'<li class="item-img-icon"><span class="icon icon-hotelsalt"></span></li>'+e+'<li class="item-watches">'+f+"&nbsp;</li>"+"</ul>"+"</a>"+"</li>";return c;},legacyFlightTemplate:function(c){var b='<li class="scratchpad-item">'+'<a href="'+c.deepLinkUrl+'" class="item-link" data-onclick="">'+'<ul class="item-data">'+'<li class="item-title"><strong>'+c.departureAirportCode+" to "+c.arrivalAirportCode+"</strong></li>"+'<li class="item-date">'+c.departureDate+c.returnDate+"</li>"+'<li class="item-info">'+c.routeType+"</li>"+'<li class="item-price-urgency"><strong class="price">'+c.price+"</strong>"+c.lastSeen+"</li>"+'<li class="item-img-icon">'+'<span class="icon icon-flightsalt"></span>'+"</li>"+"</ul>"+"</a>"+"</li>";return b;},legacyPackageTemplate:function(f){var c=Scratchpad.headerTray,b=c.locStrings.included,d=c.locStrings.packages.replace("####",f.packageDestination);if(f.products.length===2){b=b.replace("####",c.productNameMap[f.products[0]]).replace("####",c.productNameMap[f.products[1]]);}else{b="";}var e='<li class="scratchpad-item">'+'<a href="'+f.deepLinkUrl+'" class="item-link" data-onclick="">'+'<ul class="item-data">'+'<li class="item-title"><strong>'+d+"</strong></li>"+'<li class="item-date">'+f.departureDate+f.returnDate+"</li>"+'<li class="item-info">'+b+"</li>"+'<li class="item-price-urgency"><strong class="price">'+f.price+"</strong>"+'<p class="item-package-message">'+c.locStrings.perPerson+"</p>"+f.lastSeen+"</li>"+'<li class="item-img-icon">'+'<span class="icon icon-packagesalt"></span>'+"</li>"+"</ul>"+"</a>"+"</li>";return e;},handleUserHistoryCheck:function(f,j){var p=[],l,n,h;var m=(!Scratchpad.state.loggedInUser&&!this.state.blockSaveHeader);var c=!f.sendNotes;this.state.userIsNudgeEnrolled=f.sendNotes;var g=(Scratchpad.trayTestAndLearns.state.requestLateHistory&&this.state.historyData.length>0);if(f.anyNews){Scratchpad.trayTestAndLearns.setLocalNewsFlag(true);}if(m||c&&false){l=Math.min(4,f.userHistory.length);}else{l=Math.min(5,f.userHistory.length);}if(g&&f.userHistory&&f.userHistory[0]){if(this.modelsMatch(f.userHistory[0],this.state.historyData[0])){return;}else{var o=this.removeMatchingTrayItem(f.userHistory[0]);if(!o){var d=true;for(var b=0;b<this.state.historyData.length;b++){if(this.modelsMatch(f.userHistory[0],this.state.historyData[b])){d=false;}}if(d){this.state.currentCount++;}}this.state.historyData.unshift(f.userHistory[0]);}h=new Scratchpad.TrayItem(f.userHistory[0]);this.trayItems.unshift(h);if(j&&this.trayItems.length>l){this.trayItems.pop().removeFromTray();}if(j){h.insertBefore(this.trayItems[1].$el);}p.push(h);}else{if(this.state.currentCount===-1){this.state.historyData=f.userHistory;this.state.currentCount=f.userHistory.length;Scratchpad.trayTestAndLearns.state.currentCount=f.count;}for(var e=0;e<l;e++){n=f.userHistory[e];n.trayIndex=e+1;h=new Scratchpad.TrayItem(n);this.trayItems.push(h);p.push(h);if(j){h.insertBefore($(".user-history-tab .menu li").last());}}}if(j){this.updateUI();}return{pass:true,result:p};},handleRegionViewershipResponse:function(e){var d;for(var c=0;c<e.hotelProductActivityAtRegionLevelList.length;c++){d=e.hotelProductActivityAtRegionLevelList[c];for(var b=0;b<this.trayItems.length;b++){if(this.trayItems[b].get("searchRegionId")===d.regionId){this.trayItems[b].set("viewCount",d.viewCount,true);}else{continue;}}}},handleHotelViewershipResponse:function(e){var b=[],f;for(var d=0;d<e.HotelProductActivityList.length;d++){f=e.HotelProductActivityList[d];for(var c=0;c<this.trayItems.length;c++){if(parseInt(this.trayItems[c].get("hotelId"),10)===f.HotelId){f.ViewCount=this.numberWithCommas(f.ViewCount);if(this.trayItems[c].get("hotelId")==f.HotelId){this.trayItems[c].set("viewCount",f.ViewCount,true);b.push(f);}}else{continue;}}}return{pass:true,result:b};},numberWithCommas:function(b){var c=b.toString().split(".");c[0]=c[0].replace(/\B(?=(\d{3})+(?!\d))/g,",");return c.join(".");},removeMatchingTrayItem:function(b){var d=0,c={},e={"AIR":["flight","id"],"HOTEL":["hotel","hotelId"],"PACKAGE":["packages","id"]}[b.product];for(d;d<this.trayItems.length;d++){item=this.trayItems[d];if(item.type===e[0]&&(item.get(e[1])===b[e[0]][e[1]])){item.removeFromTray();return true;}}return false;},modelsMatch:function(d,c){if(d.hasOwnProperty("product")&&c.hasOwnProperty("product")&&(d.product===c.product)){var b={"AIR":["flight","id"],"HOTEL":["hotel","hotelId"],"PACKAGE":["packages","id"]}[d.product];if(d[b[0]][b[1]]===c[b[0]][b[1]]){return true;}else{return false;}}else{return false;}}};})(Scratchpad);var Scratchpad=Scratchpad||{};(function(a){a.trayTestAndLearns={state:{currentCount:0,isMobileHeader:false,autoPopOk:false,requestLateHistory:false,doublewideTrayBucket:0,inCSMVPTest:false,},buckets:{4071:-1,4077:-1,4939:-1},init:function(d,c){var b=this;this.buckets[4077]=parseInt(window.scratchpadBadgeFlareTLFlag,10);this.buckets[4939]=parseInt(window.scratchpad2ColTrayTestBucket,10);this.buckets[4071]=parseInt(window.scratchpadTestAnimationBucket,10);this.state.isMobileHeader=($(window).width()<711);this.state.inCSMVPTest=(this.buckets[4939]>0);this.state.autoPopOk=(window.scratchpadInterventionAllowed&&!this.state.isMobileHeader&&(c!=="Hotel-Search")&&!/https:/i.test(document.location.protocol));if(this.buckets[4077]===1){setTimeout(function(){b.badgeFlareTL();},2000);}if(c==="Flight-Search"&&!b.state.autoPopOk&&!b.state.isMobileHeader&&this.buckets[4071]===1){this.searchTooltipTL();}else{if(c==="scratchPad"&&this.validLocalNewsFlag()){this.setLocalNewsFlag(false);
}}this.lateAddItemTL(c);},validLocalNewsFlag:function(){var c=false;try{if(this.state.inCSMVPTest&&window.localStorage){c=(localStorage.getItem("scratchpadNewsFlag")==="true");}}catch(b){}return c;},setLocalNewsFlag:function(b){try{if(window.localStorage){try{localStorage.setItem("scratchpadNewsFlag",b);}catch(c){}}}catch(c){}},badgeFlareTL:function(){if(!this.state.currentCount>0||$("#scratchpad-badge").hasClass("visuallyhidden")){return;}var e=8,d=8,c=-4,b=-4;if(this.state.currentCount>9){e+=4;c=c+3;}$(".scratchpad-flare").css({"opacity":"1","margin-left":e+"px","margin-top":"8px"}).animate({"width":"30px","height":"30px","margin-left":(c-3)+"px","margin-top":"-7px","opacity":"0"},1000).delay(1).animate({"width":"0","height":"0","margin-left":e+"px","margin-top":"8px"}).delay(1).animate({"opacity":"1"});return{pass:true,result:[]};},trayAutoPopTL:function(f){var g=$(".item-list .scratchpad-item a").hide(),d=g.find(".image, .icon, .item-price-urgency").hide(),c=$(".menu-header .active").children().hide().not(".sub-action"),b=$(".greeting-message").hide(),e=g.add(c).add(b);$(".user-history-tab").one("click touchstart",function(l){var j=$(this);if(j.hasClass("open")){l.stopPropagation();var i=dctk.omtr.eVar28;var h=dctk.omtr.prop16;var k=dctk.omtr.linkTrackVars;dctk.omtr.eVar28="Header.SP.Tray.AutoPopDismiss";dctk.omtr.prop16="Header.SP.Tray.AutoPopDismiss";dctk.omtr.linkTrackVars="eVar28,prop16";dctk.omtr.tl(true,"o","RFRR Action Link");dctk.omtr.prop16=h;dctk.omtr.eVar28=i;dctk.omtr.linkTrackVars=k;}j.removeClass("open");});setTimeout(function(){$(".user-history-tab").addClass("open");g.slideDown();b.add(c).add(d).delay(250).fadeIn("fast");logScratchpadIntervention(f);},1000);this.state.autoPopOk=false;},searchTooltipTL:function(){if(window.uitk){setTimeout(function(){$(".user-history-tab").uitk_tooltip("show");$(".theme-urgency").css({"opacity":0}).find(".search-saved").show().closest(".theme-urgency").animate({"opacity":"1"},200).delay(4500).animate({"opacity":"0"},200);},2500);}return{pass:true,result:[]};},lateAddItemTL:function(e){var d=this;if(e==="Flight-Search"){this.state.requestLateHistory=true;uitk.subscribe("Flights.ModuleBuilder.Controller.renderComplete",function(){d.getMostRecent(1);});}else{if(e==="Package-Search"){this.state.requestLateHistory=true;var g=0;var b=setInterval(function(){g+=500;if(rendered&&totalResultsCount>0){clearInterval(b);d.getMostRecent(1);}else{if(g>10000){clearInterval(b);}}},500);}else{if(e==="Hotels-Infosite"){this.state.autoPopOk=false;this.state.requestLateHistory=true;this.getMostRecent(1);}else{var c=["Packages-Infosite"];for(var f=0;f<c.length;f++){if(c[f]===e){this.state.requestLateHistory=true;this.getMostRecent(1);}}}}}},getMostRecent:function(c){var b=this;c=c||1;setTimeout(function(){Scratchpad.getHistoryData(c,true);},1000);},getNudgeEnrollmentHeaderStrings:function(){return{title:"Get price and availability changes for hotels you view.",subtitle:"Your Scratchpad can watch for updates 24/7.",buttonText:"Track Changes",};},getNewsHeaderStrings:function(){return{title:[false,"Something's changed!","Something's changed!","Something's changed!"][this.buckets[4939]],subtitle:[false,"Your Scratchpad found an update for at least one hotel you viewed.","Your Scratchpad found an update for at least one hotel you viewed.","Your Scratchpad found an update for at least one hotel you viewed."][this.buckets[4939]],buttonText:[false,"See What's Changed","See What's Changed","See What's Changed"][this.buckets[4939]]};},getPrivateDealsHeaderStrings:function(){return{title:["Get price and availability changes for hotels you view.","Unlock private deals on hotels you view.","Never miss another deal!"][this.buckets[4939]],subtitle:["Your Scratchpad can watch for updates 24/7.","Your Scratchpad can watch for exclusive savings 24/7.","Track hotels you view for deals, price and availability updates.",][this.buckets[4939]],buttonText:["Track Changes","Unlock Private Deals","Keep Me Updated",][this.buckets[4939]],postActionState:"Nice! Watch your inbox for deal alerts from your Scratchpad."};}};})(Scratchpad);
/*!  generated on 2014-10-26 12:03:55.928 PDT(-0700) in 16 ms  */

/*!  served in 0 ms  */