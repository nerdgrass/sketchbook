var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');

module.exports = {

  triggerHex: function(cRadiusSelected, paletteSelected) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.TRIGGER_HEX,
      cRadiusMin: cRadiusSelected,
      palette: paletteSelected
    });
  },

  drawHex: function(cRadiusMin, outsidePalette) {
    // Removes existing hexagon, if there is one.
    d3.selectAll("svg").remove();

    let width  =  window.innerWidth * 0.75;
    let height =  (window.innerHeight || html.clientHeight    || body.clientHeight    || screen.availHeight) * 0.85;

    let sin30 = Math.pow(3, 1/2) / 2;
    let cos30 = 0.5;

    // set triangle size smaller to make room for other triangles
    let triHeight = height / 2;
    let triWidth = width / 2;

    // triangle side length
    let sideLength = Math.min(triHeight, triWidth);   

    // Directions (only up/down are valid for now)
    let down = 180;
    let up = 0;

    // grab outside palette. Shouldn't have to do this. Look into.
    let palette = outsidePalette;

    // Keep track of invalid attempts at making triangles (future performance tweaks)
    let trianglesNotMade = 0;
    let trianglesMade = 0;

    // Adds svg & g elements to page so zooming will work
    let svg = d3.select("#chart")
      .append("svg:svg")
        .attr("width", width)
        .attr("height", height)
        .attr("fill", 'transparent')
        .attr("pointer-events", "all")
      .append('svg:g')
        .call(d3.behavior.zoom().on("zoom", redraw))
      .append('svg:g');

    // Adds triangle centered at (centerX, centerY) with circumradius 'cRadius'
    function addTriangle( centerX, centerY, cRadius, rotation){
      let strokeOpacity = cRadius/100;
      let fillOpacity = cRadius/100;

      let pointsDown = 
        ( centerX )                   +','+   ( centerY + cRadius )        +' '+ 
        ( centerX - cRadius*sin30 )   +','+   ( centerY - cRadius*cos30 )  +' '+
        ( centerX + cRadius*sin30 )   +','+   ( centerY - cRadius*cos30 );
      let pointsUp = 
        ( centerX )                  +','+   ( centerY - cRadius )         +' '+ 
        ( centerX - cRadius*sin30 )  +','+   ( centerY + cRadius*cos30 )   +' '+
        ( centerX + cRadius*sin30 )  +','+   ( centerY + cRadius*cos30 );

      // let palette = metapalette[ Math.floor(Math.random() * metapalette.length) ];
      let fillColor = '#' + palette[ Math.floor(Math.random() * palette.length) ];

      // Handles rotation value
      let translateRotationPoints = function( rotation ) {
        switch(rotation) {
          case 0:
            return pointsUp;
            break;
          case 180:
            return pointsDown;
            break;
        }
      };

      if ( cRadius > cRadiusMin ) {
        svg.append("g")
        .append('polygon')
          .each(
            function(){
              switch(rotation) {
                case 0:
                  addTriangle( centerX,                     centerY,                      cRadius/2, down );
                  addTriangle( centerX,                     centerY - cRadius/2,          cRadius/2, up   );     
                  addTriangle( centerX + cRadius * sin30/2, centerY + cRadius * cos30/2,  cRadius/2, up   );     
                  addTriangle( centerX - cRadius * sin30/2, centerY + cRadius*cos30/2,    cRadius/2, up   );
                  break;
                case 180:
                  addTriangle(  centerX,                    centerY,                    cRadius/2, up   )
                  addTriangle(  centerX,                    centerY + cRadius/2,        cRadius/2, down );     
                  addTriangle(  centerX + cRadius*sin30/2,  centerY - cRadius*cos30/2,  cRadius/2, down );     
                  addTriangle(  centerX - cRadius*sin30/2,  centerY - cRadius*cos30/2,  cRadius/2, down );
                  break;
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
      let side = sideLength*2/3;
      let altitude = ( Math.sqrt(3) )/2*side;

      // Top Half
      addTriangle( width/1.5,               height*2/3 - height/3, side, up    );// Right
      addTriangle( width/1.5 - altitude,    height/2 - height/3,   side, down  );// Center
      addTriangle( width/1.5 - altitude*2,  height*2/3 - height/3, side, up    );// Left
      // Bottom Half
      addTriangle( width/1.5,               height*2/2 - height/3,         side, down    );// Right
      addTriangle( width/1.5 - altitude,    height/2 + side*2 - height/3,  side, up      );// Center
      addTriangle( width/1.5 - 2*altitude,  height*2/2 - height/3,         side, down    );// Left

      console.log('Unsucessful attempts to make triangles: ' + trianglesNotMade);
      console.log('Successful attempts to make triangles: ' + trianglesMade);
    };

    function redraw() {
      // console.log("here", d3.event.translate, d3.event.scale);
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
