var width  =  document.getElementById('chart').offsetWidth
var height =  (window.innerHeight || html.clientHeight    || body.clientHeight    || screen.availHeight);

// set triangle size smaller to make room for other triangles
var triHeight = height/2;
var triWidth = width/2;

// triangle side length
var s =  Math.min(triHeight, triWidth);   

var sin30 = Math.pow(3,1/2)/2;
var cos30 = .5;

// Min circumradius
var minR = 5;


//adds svg & g elements to page so zooming will work
var svg = d3.select("#chart")
  .append("svg:svg")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", '#0F1E36')
    .attr("pointer-events", "all")
  .append('svg:g')
    .call(d3.behavior.zoom().on("zoom", redraw))
  .append('svg:g');

svg.append('svg:rect')
    .attr('width', width)
    .attr('height', height)
    

function redraw() {
  console.log("here", d3.event.translate, d3.event.scale);
  svg.attr("transform",
      "translate(" + d3.event.translate + ")"
      + " scale(" + d3.event.scale + ")");
}


// triangle centered at (cx, cy) with circumradius r
function addTriangleUp(cx, cy, r){
  var strokeOpacity = 1;
  var strokeWidth = 3
  var fillOpacity = 1
  var palette = ["CCDEF9", "8BA8D5", "204274","325FA4","193259"];
  var fillColor = '#' + palette[Math.floor(Math.random() * palette.length)];

  if ( r > 80 ) {
    strokeOpacity = .9;
    strokeWidth = 10;
    fillOpacity = .5
  } else if ( r > 60 ) {
    strokeOpacity = .8;
    strokeWidth = 7;
    fillOpacity = .3
  } else if ( r > 40 ) {
    strokeOpacity = .7; 
    strokeWidth = 5;
    fillOpacity = .2
  } else if ( r > 20 ) {
    strokeOpacity = .6; 
    strokeWidth = 4.5
    fillOpacity = .1
  } else if (r > 15 ) {
    strokeOpacity = .5;
    strokeWidth = 2.5
    fillOpacity = .08
  }else if (r > 10 ) {
    strokeOpacity = .4;
    strokeWidth = 2.2
    fillOpacity = .05
  }else if (r > 5 ) {
    strokeOpacity = .3;
    strokeWidth = 1.5
    fillOpacity = .03
  }else {
    strokeOpacity = .5
    strokeWidth = 1
    fillOpacity = .01
  }
  
  var lol = function(d){
    addTriangleDown(cx,             cy,             r/2)
    addTriangleUp(  cx,             cy - r/2,       r/2);     
    addTriangleUp(  cx + r*sin30/2, cy + r*cos30/2, r/2);     
    addTriangleUp(  cx - r*sin30/2, cy + r*cos30/2, r/2);

    d3.select(this).on('mouseover', function(){});
    d3.select(this).on('click', function(){
      addTriangleUp(cx, cy, r);});
  };

  if (r > minR) {
    svg.append("g")
    .append('polygon')
      .each( lol)
      .attr('fill', 'white')
      .attr('points', (cx)  +','+   (cy)  +' '+ 
                      (cx)  +','+   (cy)  +' '+
                      (cx)  +','+   (cy))
      .transition()
      .duration(600)
      .delay(10)
        .attr('fill', fillColor)
        .attr('fill-opacity', fillOpacity)
        .attr('style', 'stroke: white; stroke-width:'+ 0)
        .attr('stroke-opacity', strokeOpacity)
        .attr('points', (cx)      +','+   (cy-r)      +' '+ 
                        (cx-r*sin30)  +','+   (cy + r*cos30)  +' '+
                        (cx+r*sin30)  +','+   (cy + r*cos30))
  }else {
    // strokeOpacityUp = strokeOpacityUp+.001
  }
}

// Upside down sierpinski pattern triangle
function addTriangleDown(cx, cy, r){
  var palette = ["CCDEF9", "8BA8D5", "204274","325FA4","193259"];
  var fillColor = '#' + palette[Math.floor(Math.random() * palette.length)];
  var strokeOpacity = 1;
  var strokeWidth = 3
  var fillOpacity = 1
  if ( r > 80 ) {
    strokeOpacity = .9;
    strokeWidth = 10;
    fillOpacity = .5
  } else if ( r > 60 ) {
    strokeOpacity = .8;
    strokeWidth = 7;
    fillOpacity = .45
  } else if ( r > 40 ) {
    strokeOpacity = .7; 
    strokeWidth = 5;
    fillOpacity = .4
  } else if ( r > 20 ) {
    strokeOpacity = .6; 
    strokeWidth = 4.5
    fillOpacity = .35
  } else if (r > 15 ) {
    strokeOpacity = .5;
    strokeWidth = 2.5
    fillOpacity = .3
  }else if (r > 10 ) {
    strokeOpacity = .4;
    strokeWidth = 2.2
    fillOpacity = .25
  }else if (r > 5 ) {
    strokeOpacity = .3;
    strokeWidth = 1.5
    fillOpacity = .2
  }else {
    strokeOpacity = .5
    strokeWidth = 1
    fillOpacity = .15
  }
  var lol = function(d){
    
    addTriangleUp(cx, cy, r/2)
    addTriangleDown(  cx,       cy + r/2,     r/2);     
    addTriangleDown(  cx + r*sin30/2, cy - r*cos30/2, r/2);     
    addTriangleDown(  cx - r*sin30/2, cy - r*cos30/2, r/2);

    d3.select(this).on('mouseover', function(){});
    d3.select(this).on('click', function(){
      addTriangleDown(cx, cy, r);});
  };

  if (r > minR) {
    svg.append("g")
    .append('polygon')
      .each( lol)
      .attr('fill', 'white')
      .attr('points', (cx)  +','+   (cy)  +' '+ 
                      (cx)  +','+   (cy)  +' '+
                      (cx)  +','+   (cy))
      .transition()
      .duration(600)
      .delay(10)
        .attr('fill', fillColor)
        .attr('fill-opacity', fillOpacity)
        .attr('style', 'stroke: white; stroke-width:'+ 0)
        .attr('stroke-opacity', strokeOpacity)
        .attr('points', (cx)      +','+   (cy+r)      +' '+ 
                        (cx-r*sin30)  +','+   (cy - r*cos30)  +' '+
                        (cx+r*sin30)  +','+   (cy - r*cos30))
  }else {
    // console.log('r < 40');
  }
}



function hexLayout() {
    // Not sure why this needs to happen. Pretty sure its sin or cos of something. Probably should have paid more attention in math class
    var side = s*2/3;
    var altitude = (Math.sqrt(3))/2*side
    // Top Half
    addTriangleUp(width/2, height*2/3, side); // Right
    addTriangleDown(width/2 - altitude, height/2, side);// Center
    addTriangleUp(width/2 - altitude*2, height*2/3, side);// Left
    // // Bottom Half
    addTriangleDown(width/2, height*2/2, side); // Right
    addTriangleUp(width/2 - altitude, height/2 + side*2, side);// Center
    addTriangleDown(width/2 -2*altitude, height*2/2, side);// Left
};

// Lay out hexagon
hexLayout();
