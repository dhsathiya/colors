function test1() {
    let colorlist, huevaluenum, hueshiftnum, hueintennum, numcolornum
    let colors = []
    let value = Math.floor(Math.random() * 360) + 0 // initial value
    let shift = Math.floor(Math.random() * 721) - 360 // shift applied at each color step
    let inten = Math.floor(Math.random() * 100) + 0 // lightness?
    let color = 50 // number of colors
    var mainer = []
    var colorclean = []

    /**/
    /*console.clear()
    console.log("value : "+value)
    console.log("shift : "+shift)
    console.log("inten : "+inten)*/
    /**/

    main()

    function main() {
        colorlist = document.getElementById('colorlist')
        numcolor = 5;
        numcolornum = document.getElementById('numcolornum')
        onNumbe({
            target: numcolornum
        })
        /*onChange()*/
    }


    function onNumbe(evt) {
        if (evt.target.value.length < 1) { // if value is NaN
            return
        }
        numcolor.value = numcolornum.value = color = parseInt(evt.target.value)

        while (true) { // add or remove span elems to match new len
            if (color > colors.length) {
                let span = document.createElement('span')
                span.className = 'color'
                colorlist.appendChild(span)
                colors.push(span)
            } else if (color < colors.length && colors.length > 0) {
                colorlist.removeChild(colorlist.firstChild)
                colors.shift()
            } else {
                break
            }
        }

        onChange()
    }

    function onChange() {
        // assign cl as if there were 1 extra color, to remove white
        let cl = colors.length + 1

        var ca = []
        // set a to 1 indexed instead of 0 indexed to remove black
        for (let a = colors.length; a > 0; a--) { // don't do 0 to remove black
            /* normalize hue from 0 -> 360 to 0 -> 1
            the shift value is added here, multiplied by the color's current position on the list from halfway through the list, and divided by the length of the list overall
            */
            let h = ((value + shift * (a - cl / 2) / cl) / 360) % 1
            let s = inten / 100
            let l = a / cl
            let c = getColor(h, s, l)
            let span = colors[a - 1]
            span.innerHTML = getHex(...c) + '<br>' + getBkg(...c)
            span.style.backgroundColor = getBkg(...c)

            ca.push('#' + span.style.backgroundColor);

            //if(s < 1/3 && l > 2/5 && l < 3/5){
            if (0.299 * c[0] + 0.587 * c[1] + 0.114 * c[2] > 127) {
                span.style.color = 'black'
            } else {
                span.style.color = 'white'
            }
            //}else{
            //	span.style.color = getBkg(255-c[0], 255-c[1], 255-c[2])						
            //}
        }


        /*VARIABLE PASSER*/

        mainer = ca
        mainer.reverse()


        /*var hasher*/

        /*for(hasher in mainer){
        	var clean = mainer[hasher].replace('#','')
        	colorclean.push(clean)
        }*/
        /*console.log(colorclean)*/

        /*var x = document.createElement("INPUT");
    				x.setAttribute("type", "text");
    				x.setAttribute("value", mainer);
    				x.setAttribute("name", "colorclean");
    				x.setAttribute("class", "colorclean");
    				document.getElementById('variable').appendChild(x);*/


        var y = document.createElement("INPUT");
        y.setAttribute("type", "text");
        y.setAttribute("value", mainer);
        y.setAttribute("name", "instacolorclean");
        y.setAttribute("id", "instacolorclean");
        y.setAttribute("class", "colorclean");
        document.getElementById('instavariable').appendChild(y);

    }

    function getColor(h, s, l) {
        /** from http://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
         * Converts an HSL color value to RGB. Conversion formula
         * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
         * Assumes h, s, and l are contained in the set [0, 1] and
         * returns r, g, and b in the set [0, 255].
         *
         * @param   {number}  h       The hue
         * @param   {number}  s       The saturation
         * @param   {number}  l       The lightness
         * @return  {Array}           The RGB representation
         */
        var r, g, b;

        if (s == 0) {
            r = g = b = l; // achromatic
        } else {
            var hue2rgb = function hue2rgb(p, q, t) {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1 / 6) return p + (q - p) * 6 * t;
                if (t < 1 / 2) return q;
                if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
                return p;
            }

            var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            var p = 2 * l - q;
            r = hue2rgb(p, q, h + 1 / 3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1 / 3);
        }

        return [
            Math.round(r * 255),
            Math.round(g * 255),
            Math.round(b * 255)
        ];
    }

    function getHex(r, g, b) {
        let a = `0${r.toString(16)}`.slice(-2)
        let c = `0${g.toString(16)}`.slice(-2)
        let d = `0${b.toString(16)}`.slice(-2)
        return `#${a}${c}${d}`
    }

    function getBkg(r, g, b) {
        return `rgb(${r},${g},${b})`
    }

}
/*Custom Functions*/


/*function displaymodal(){
	document.getElementById('variable').style.zIndex = 12;
	document.getElementById('variable').style.opacity = 1;
}

function hidemodal(){
	document.getElementById('variable').style.zIndex = -11;
	document.getElementById('variable').style.opacity = 0;
}*/

function displayinstamodal() {
    document.getElementById('instavariable').style.zIndex = 12;
    document.getElementById('instavariable').style.opacity = 1;
}

function hideinstamodal() {
    document.getElementById('instavariable').style.zIndex = -11;
    document.getElementById('instavariable').style.opacity = 0;
}

/*function validateEmail(email) { 	
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 

 function continueOrNot() {
    if(validateEmail(document.getElementById('email').value)){
    	return true;
    }else{ alert("Check Email Address"); return false;}
 }*/

function validateinstaid(instaid) {
    var re = /^@([A-Za-z0-9_.]+)$/;
    return re.test(instaid);
}

function continueOrNotinsta() {
    if (validateinstaid(document.getElementById('instaid').value)) {
        return true;
    } else {
        alert("Check Instagram Account ID");
        return false;
    }
}

function closefrontmodal() {
    document.getElementById("frontmodalcontainer").style.display = "none";
    clearInterval(stopper);
}
 
function test() {
    var colorremover = document.getElementsByClassName("color");
    var colorcleanremover = document.getElementsByClassName("colorclean");
    for (var i = colorremover.length - 1; 0 <= i; i--) {
        if (colorremover[i] && colorremover[i].parentElement) {
            colorremover[i].parentElement.removeChild(colorremover[i]);
        }
    }
    for (var i = colorcleanremover.length - 1; 0 <= i; i--)
        if (colorcleanremover[i] && colorcleanremover[i].parentElement)
            colorcleanremover[i].parentElement.removeChild(colorcleanremover[i]);
    test1()
}

function copyToClipboard(text) {
    window.prompt("Copy to clipboard: Ctrl+C, Enter", text);
}