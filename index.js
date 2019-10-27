
function draw(n,data){
    let canvas = document.querySelector("canvas"), 
        ctx = canvas.getContext("2d"),
        width = n, 
        height = n, 
        scale = canvas.width / n; 
    
    fetch(data)
        .then(response => response.json())
        .then(cdata => {
            
            let makeColor = function(d) {return d;};
            
            if(data == 'data/4x4.json'){
                makeColor = function(d){ return '#' + d; };
            }else if(data == 'data/32x32.json'){
                makeColor = function(d){ 
                 let [r,g,b,a] = d;
                    return `rgba(${r}, ${g}, ${b}, ${a})`; 
                };
            }

          
             for(var row = 0; row < height; row++) {
                 for(var col = 0; col < width; col++) {
                    ctx.fillStyle = makeColor(cdata[col][row]);
                    ctx.fillRect(col * scale, row * scale, scale, scale);
                }
            }
         });       
}
 function drawPNG(){
    const img = new Image(canvas.width, canvas.height);
    img.onload = ()=>{
        ctx.drawImage(img, 0, 0);
    }
    img.src = 'data/image.png';
}

let matrix32 = document.getElementById('set_32x32');
let matrix4 = document.getElementById('set_4x4');
let png = document.getElementById('set_png');
matrix4.addEventListener('click', draw(4,'data/4x4.json'));
matrix32.addEventListener('click', draw(4,'data/32x32.json'));
png.addEventListener('click', drawPNG());
/*
function loadJSON(callback) {   

    var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
    xobj.open('GET', 'data/4x4.json', true); // Replace 'appDataServices' with the path to your file
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
          }
    };
    xobj.send(null);  
 } */
