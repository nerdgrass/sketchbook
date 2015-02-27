'use strict';

var width  =  document.getElementById('chart').offsetWidth;
var height =  (window.innerHeight || html.clientHeight    || body.clientHeight    || screen.availHeight);

// set triangle size smaller to make room for other triangles
var triHeight = height / 2;
var triWidth = width / 2;

// triangle side length
var sideLength = Math.min(triHeight, triWidth);   

var sin30 = Math.pow(3, 1/2) / 2;
var cos30 = 0.5;

// Directions
var down = 180;
var up = 0;

// Min circumradius
var cRadiusMin = 3;

//adds svg & g elements to page so zooming will work
var svg = d3.select("#chart")
  .append("svg:svg")
    .attr("width", width)
    .attr("height", height)
    .attr("fill", 'transparent')
    .attr("pointer-events", "all")
  .append('svg:g')
    .call(d3.behavior.zoom().on("zoom", redraw))
  .append('svg:g');

var metapalette = [
  [ "CCDEF9", "8BA8D5", "204274", "325FA4", "193259" ],
  [ "3F3337", "574751", "574751", "B8BDDA", "2E688D", "34A4C7" ],
  [ "27171A", "412B31", "735D6A", "81C1C2", "E7F2F2" ],
  [ "7E3674", "BB418C", "FF95BC", "1C0053", "0E0041" ],
  [ "74152C", "2B0D1E", "190915", "B89FB5", "D0E1FD" ]
];

// monochrome dark metapalette
// var metapalette = [
//   ["494949", "3A3A3A","2B2B2B","4C4C4C","1C1E1D","191919"],
//   ["2E3332", "292D2C", "212322","202322","191C1B"],
// ];

// Apple Color Palette
// var metapalette = [
//   ["FF2D55"],//pink
//   ["FF9500"],//orange
//   ["FFCC00"],//gold
//   ["5AC8FA"],//light blue
//   ["007AFF"],//dark blue
//   ["4CD964"],//green
//   // ["FF3B30"],//red
//   ["8E8E93"]//gray
// ];

// Random palette
var palette = metapalette[Math.floor(Math.random() * metapalette.length)];

// triangle centered at (centerX, centerY) with circumradius cRadius
function addTriangle( centerX, centerY, cRadius, rotation ){
  var strokeOpacity = cRadius/100;
  var fillOpacity = cRadius/100;

  var pointsDown = 
    ( centerX )                   +','+   ( centerY + cRadius )        +' '+ 
    ( centerX - cRadius*sin30 )   +','+   ( centerY - cRadius*cos30 )  +' '+
    ( centerX + cRadius*sin30 )   +','+   ( centerY - cRadius*cos30 );
  var pointsUp = 
    ( centerX )                  +','+   ( centerY - cRadius )         +' '+ 
    ( centerX - cRadius*sin30 )  +','+   ( centerY + cRadius*cos30 )   +' '+
    ( centerX + cRadius*sin30 )  +','+   ( centerY + cRadius*cos30 );

  var palette = metapalette[Math.floor(Math.random() * metapalette.length)];
  var fillColor = '#' + palette[Math.floor(Math.random() * palette.length)];

  // Handles rotation value
  var translateRotation = function( rotation ) {
    // Right now, function only accepts 0 or 180 degrees rotation. Add full support in later.
    if ( rotation === 0 ) {
      return pointsUp;
    } else if ( rotation === 180 ) {
      return pointsDown;
    } else {
      console.log('Translate Rotation: invalid rotation value: ' + rotation );
    }
  };

  if (cRadius > cRadiusMin ) {
    svg.append("g")
    .append('polygon')
      .each(
        function(){
          if ( rotation === 0 ) {
            addTriangle( centerX,                     centerY,                      cRadius/2, down );
            addTriangle( centerX,                     centerY - cRadius/2,          cRadius/2, up   );     
            addTriangle( centerX + cRadius * sin30/2, centerY + cRadius * cos30/2,  cRadius/2, up   );     
            addTriangle( centerX - cRadius * sin30/2, centerY + cRadius*cos30/2,    cRadius/2, up   );
          } else if ( rotation === 180 ) {
            addTriangle(  centerX,                    centerY,                    cRadius/2, up   )
            addTriangle(  centerX,                    centerY + cRadius/2,        cRadius/2, down );     
            addTriangle(  centerX + cRadius*sin30/2,  centerY - cRadius*cos30/2,  cRadius/2, down );     
            addTriangle(  centerX - cRadius*sin30/2,  centerY - cRadius*cos30/2,  cRadius/2, down );
          } else {
            console.log('Add Triangle: invalid rotation: ' + rotation );
          }

          d3.select(this).on('mouseover', function(){});
          d3.select(this).on('click', function(){
            addTriangle( centerX, centerY, cRadius, rotation );
          });
        }
      )
      .attr('fill', 'white')
      .attr('points', ( centerX )  +','+   ( centerY )  +' '+ 
                      ( centerX )  +','+   ( centerY )  +' '+
                      ( centerX )  +','+   ( centerY )
      )
      .transition()
      .duration(600)
      .delay(10)
        .attr('fill', fillColor)
        .attr('fill-opacity', fillOpacity )
        .attr('style', 'stroke: white; stroke-width:' + 0 )
        .attr('stroke-opacity', strokeOpacity )
        .attr('points', translateRotation( rotation ) );
  } else {
    console.log('circumradius lower than minimum');
  }
};

function hexLayout() {
  // Not sure why this needs to happen. Pretty sure its sin or cos of something. Probably should have paid more attention in math class
  var side = sideLength*2/3;
  var altitude = ( Math.sqrt(3) )/2*side;

  // Top Half
  addTriangle( width/2,               height*2/3, side, up    );// Right
  addTriangle( width/2 - altitude,    height/2,   side, down  );// Center
  addTriangle( width/2 - altitude*2,  height*2/3, side, up    );// Left
  // Bottom Half
  addTriangle( width/2,               height*2/2,         side, down    );// Right
  addTriangle( width/2 - altitude,    height/2 + side*2,  side, up      );// Center
  addTriangle( width/2 - 2*altitude,  height*2/2,         side, down    );// Left
};

function redraw() {
  console.log("here", d3.event.translate, d3.event.scale);
  svg.attr("transform",
    "translate(" + d3.event.translate + ")"
    + " scale(" + d3.event.scale + ")");
};

svg.append('svg:rect')
  .attr('width', width)
  .attr('height', height);

// Lay out hexagon
hexLayout();
