var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');

module.exports = {

  triggerHex: function(text) {
    console.log('triggerHex action called');
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.TRIGGER_HEX
    });
  },

  drawHex: function() {
    // Sierpinski hex logic
    var width  =  window.innerWidth * 0.75;
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
    var cRadiusMin = 10;

    // Keep track of invalid attempts at making triangles (performance)
    var trianglesNotMade = 0;
    var trianglesMade = 0;

    // Adds svg & g elements to page so zooming will work
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
      // Cave Story palette
      [ "CCDEF9", "8BA8D5", "204274", "325FA4", "193259" ],
      // Unsplash Concert palette
      [ "7E3674", "BB418C", "FF95BC", "1C0053", "0E0041" ],
      // Cosmic Sunset palette
      ["DB60A4", "A43191", "47035C", "F47067" ]
    ];

    // Random palette
    var palette = metapalette[Math.floor(Math.random() * metapalette.length)];

    // Adds triangle centered at (centerX, centerY) with circumradius 'cRadius'
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

      var palette = metapalette[ Math.floor(Math.random() * metapalette.length) ];
      var fillColor = '#' + palette[ Math.floor(Math.random() * palette.length) ];

      // Handles rotation value
      var translateRotationPoints = function( rotation ) {
        // Right now, function only accepts 0 or 180 degrees rotation. Add full support in later.
        if ( rotation === 0 ) {
          return pointsUp;
        } else if ( rotation === 180 ) {
          return pointsDown;
        } else {
          console.log('Translate Rotation: invalid rotation value: ' + rotation );
        }
      };

      if ( cRadius > cRadiusMin ) {
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
            }
          )
          .attr('fill', 'white')
          .attr('points', ( centerX )  +','+   ( centerY )  +' '+ 
                          ( centerX )  +','+   ( centerY )  +' '+
                          ( centerX )  +','+   ( centerY )
          )
          .transition()
          .duration(1200)
          .delay(100)
            .attr('fill', fillColor)
            .attr('fill-opacity', fillOpacity )
            .attr('style', 'stroke: white; stroke-width:' + 0 )
            .attr('stroke-opacity', strokeOpacity )
            .attr('points', translateRotationPoints( rotation ) );
      } else {
        trianglesNotMade++;
      }
      trianglesMade++;
    };

    function hexLayout() {
      // Not sure why this needs to happen. Pretty sure its sin or cos of something. Probably should have paid more attention in math class
      var side = sideLength*2/3;
      var altitude = ( Math.sqrt(3) )/2*side;

      // Top Half
      addTriangle( width/1.5,               height*2/3 - height/3, side, up    );// Right
      addTriangle( width/1.5 - altitude,    height/2 - height/3,   side, down  );// Center
      addTriangle( width/1.5 - altitude*2,  height*2/3 - height/3, side, up    );// Left
      // Bottom Half
      addTriangle( width/1.5,               height*2/2 - height/3,         side, down    );// Right
      addTriangle( width/1.5 - altitude,    height/2 + side*2 - height/3,  side, up      );// Center
      addTriangle( width/1.5 - 2*altitude,  height*2/2 - height/3,         side, down    );// Left

      console.log('Triangles not made: ' + trianglesNotMade);
      console.log('Triangles made: ' + trianglesMade);
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

    hexLayout();
  }


};
