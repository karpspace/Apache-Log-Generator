//variables

remoteIp = 
{
	cl:"remoteIp",
	name:"Remote IP",
	format: "%a ",
	sample: "123.123.123.123 ",
}

localIp = 
{
	cl:"localIp",
	name:"Local IP",
	format: "%A ",
	sample: "123.123.123.123 ",
}

bytesSent = 
{
	cl:"bytesSent",
	name:"Bytes Sent",
	format: "%B ",
	sample: "1023b ",
}
 

bytesSentCLF = 
{
	cl:"bytesSentCLF",
	name:"Bytes Sent CLF Format",
	format: "%B ",
	sample: "1023b ",
} 

date = 
{
	cl:"date",
	name:"Date",
	format: "%d ",
	sample: "12.12.2015 ",
} 


filename = 
{
	cl:"filename",
	name:"filename",
	format: "%f ",
	sample: "index.html ",
}

remotehost = 
{
	cl:"remotehost",
	name:"Remote host",
	format: "%h ",
	sample: "samplehost.com ",
}

requestmethod = 
{
	cl:"requestmethod",
	name:"Request method",
	format: "%m ",
	sample: "POST ",
}

requestProtocol = 
{
	cl:"requestProtocol",
	name:"Request Protocol",
	format: "%H ",
	sample: "HTTP ",
}

remoteLogName = 
{
	cl:"remoteLogName",
	name:"Remote logname",
	format: "%l ",
	sample: "Name ",
}

 canonicalPort = 
{
	cl:"canPort",
	name:"Can. Port serving request",
	format: "%p ",
	sample: "Lorem "
}
 
processId = 
{
	cl:"processId",
	name:"Process ID",
	format: "%P ",
	sample: "1345 "
}

queryString = 
{
	cl:"queryString",
	name:"Query string",
	format: "%q ",
	sample: "Lorem Ipsum "
}    

firstLine = 
{
	cl:"firstLine",
	name:"First Line",
	format: "%r ",
	sample: "Lorem Ipsum "
}
 
statusV = 
{
	cl:"status",
	name:"Status",
	format: "%s ",
	sample: "Lorem Ipsum "
} 

time = 
{
	cl:"time",
	name:"Time",
	format: "%t ",
	sample: "1.12s "
}

timeReq = 
{
	cl:"timeReq",
	name:"Time to serve",
	format: "%t ",
	sample: "0.12s "
}

user = 
{
	cl:"user",
	name:"User",
	format: "%u ",
	sample: "User "
}    
 
serverName= 
{
	cl:"serverName",
	name:"Server Name",
	format: "%v ",
	sample: "sample-server.com "
}        

canServerName= 
{
	cl:"canServerName",
	name:"Can. Server Name",
	format: "%V ",
	sample: "sample-server.com "
}

hyphen = 
{
	cl:"hyphen",
	name:"-",
	format: "- "
}

coma = 
{
	cl:"coma",
	name:",",
	format: ", "
}

period = 
{
	cl:"period",
	name:".",
	format: ". "
}

curlyBracketLeft = 
{
	cl:"curlyBracketLeft",
	name:"{",
	format: "{ "
}

curlyBracketRight = 
{
	cl:"curlyBracketRight",
	name:"}",
	format: "} "
}


hardBracketLeft = 
{
	cl:"hardBracketLeft",
	name:"[",
	format: "[ "
}

hardBracketRight = 
{
	cl:"hardBracketRight",
	name:"]",
	format: "] "
}

softBracketLeft = 
{
	cl:"softBracketLeft",
	name:"(",
	format: "( "
}

softBracketRight = 
{
	cl:"softBracketRight",
	name:")",
	format: ") "
}

elements = [remoteIp,localIp,date,bytesSent,requestProtocol,remoteLogName,bytesSentCLF,filename,remotehost,requestmethod,remoteLogName,remoteLogName,canonicalPort,processId,queryString,firstLine,statusV,time,timeReq,user,serverName,canServerName];
signs = [hardBracketLeft,hardBracketRight,softBracketLeft,softBracketRight,curlyBracketLeft,curlyBracketRight,coma,period,hyphen];

function renderSyntax(){
	var format = "";
	var example = "";
	$( ".chooseTo li" ).each(function( index ) {
		if($(this).attr("data-group") == "elements"){
			format += elements[$(this).attr("data-id")].format;	
			example += elements[$(this).attr("data-id")].sample;	
		}else{
			format += signs[$(this).attr("data-id")].format;	
			example += signs[$(this).attr("data-id")].format;
		}
  		
	});
	$('.syntax p').html(format);
	$('.example p').html(example);
}

function checkSigns(){
	$(".chooseFromSigns li").remove();

	for (i = 0; i < signs.length; i++) { 
    	$(".chooseFromSigns").append("<li data-group= 'signs' data-id="+i+" class='part sign "+signs[i].cl+"'><div class='dt'><div class='dtc'>"+signs[i].name+"</div></div></li>");
	}

	$( ".chooseFrom li" ).each(function( index ) {
		if($(this).attr("data-group") == "signs"){
			$(this).remove();
		}	
	});

}

	
$(document).ready(function(){
	for (i = 0; i < elements.length; i++) { 
    	$(".chooseFrom").append("<li data-group='elements' data-id="+i+" class='part element "+elements[i].cl+"'><div class='dt'><div class='dtc'>"+elements[i].name+"</div></div></li>");
	}

	for (i = 0; i < signs.length; i++) { 
    	$(".chooseFromSigns").append("<li data-group= 'signs' data-id="+i+" class='part sign "+signs[i].cl+"'><div class='dt'><div class='dtc'>"+signs[i].name+"</div></div></li>");
	}

	$('.chooseFromSigns,.chooseTo, .chooseFrom').sortable({
      	connectWith: ".connectedLists",
      	stop: function (event, ui) {
        	renderSyntax();

        	item = ui.item[0];
        	i=item.dataset.id;
        	if(item.dataset.group == "signs"){
        		if($(".chooseFromSigns"))
     			$(".chooseFromSigns").append("<li data-group= 'signs' data-id="+i+" class='part sign "+signs[i].cl+"'><div class='dt'><div class='dtc'>"+signs[i].name+"</div></div></li>");   		
        	}
        	checkSigns();
        	console.log(item.dataset.group);
    	}
    }).disableSelection();
});

