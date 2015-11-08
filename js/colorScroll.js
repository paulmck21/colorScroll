
//Program to change the background colour of a site in relation to 
//the distance from the top of the page.
//Also involves a conversion from rgb to hex that I wrote myself.



var hexArray = ['#'];

//I may have stolen the rgb regex though.
//This checks the input as valid rgb values and creates the array
function convertToHex(rgb){
	 var rgbArray = /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i.exec(rgb);

	 //resetting the hexArray
	 hexArray = ['#'];

	 //Creating the hex format
	 for (i=1; i<4; i++){
		var color1 = (0 + Math.floor(parseFloat((rgbArray[i])/16)));
		var color2 = (0 + (parseFloat(rgbArray[i],10)%16));

		//assigning letters to values over 10
		assignLetters(color1);
		assignLetters(color2);

	}

	//join array to create a string to feed to the DOM 
	return newHex = hexArray.join("");
}

//function to assign letter values to numbers over 10
//and to add all values to the hexArray
function assignLetters(color){
	
		switch (color){
			case 10:
				color = 'A';
				hexArray.push(color);
				break;
			case 11:
				color = 'B';
				hexArray.push(color);
				break;
			case 12:
				color = 'C';
				hexArray.push(color);
				break;
			case 13:
				color = 'D';
				hexArray.push(color);
				break;
			case 14:
				color = 'E';
				hexArray.push(color);
				break;
			case 15:
				color = 'F';
				hexArray.push(color);
				break;
			default:
				hexArray.push(color);
				break;
		}
	
}

//On loading and on scrolling call the scrolled function
window.onload = function() {scrolled() }
window.onscroll = function() {scrolled() }

//Maybe I should cut down this function as it grew a tad larger than I had anticipated.
//Function to assign rgb values based on the distance from the top of the document.
function scrolled () {
	var docBody = document.body;
	var dist = document.getElementById("body").scrollTop;
	console.log("dist is " + dist);
	
	//assigning random values to r,g and b
	//assuring they are under 255 and are integers
	var red = Math.floor((dist / 2) % 255);
	var green = Math.floor((dist / 3) % 255);
	var blue = Math.floor((dist / 4) % 255);





	//creating rgb string and cconverting it to hex
	var rgbVal = 'rgb (' + red + ',' + green + ',' + blue + ')';
	var hexVal = convertToHex(rgbVal);

	//change the background color to hexVal
	document.getElementById("body").style.backgroundColor = hexVal;

	//Call function to write values on screen
	writeValues(red, green, blue, hexVal, rgbVal);
	
}

//function to write hex and rgb values in the DOM
function writeValues(red, green, blue, hexVal, rgbVal){

	//grab the 2 title elements from the DOM
	var hexTitle = document.getElementById('hexTitle');
	var rgbTitle = document.getElementById('rgbTitle');

	//set the colour of the text to the opposite of the background, roughly
	var textrgbVal = 'rgb (' + (255 - red) + ',' + (255 - green) + ',' + (255 - blue) + ')';
	var textHexVal = convertToHex(textrgbVal);

	document.getElementById("body").style.color = textHexVal;

	//set the text in the title to the values of the background colour
	hexTitle.innerHTML = hexVal;
	rgbTitle.innerHTML = rgbVal;
}

var hexBtn = document.getElementById('hexDiv');
var hexText = document.getElementById('hexTitle');
var clipboardHex = new Clipboard(hexBtn, {
	target: function() {
            return hexText;
        }
});

var rgbBtn = document.getElementById('rgbDiv');
var rgbText = document.getElementById('rgbTitle');
var clipboardRgb = new Clipboard(rgbBtn, {
	target: function() {
            return rgbText;
        }
});

$(document).ready(function (){

	$('[data-toggle="tooltip"]').tooltip();

	$('#hexDiv, #rgbDiv').tooltip({title: "copied to clipboard", trigger: "click"}); 
		
			

	$('#hexDiv, #rgbDiv').on('show.bs.tooltip', function(){
		setTimeout(function(){
			$('#hexDiv, #rgbDiv').tooltip('hide')
	}, 1000)
	})
})
   
