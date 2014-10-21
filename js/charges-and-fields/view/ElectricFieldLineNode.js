//  Copyright 2002-2014, University of Colorado Boulder

/**
 * Node responsible for the drawing of the electricField lines
 *
 * @author Martin Veillette (Berea College)
 */
define( function( require ) {
  'use strict';

  // modules

  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  var Path = require( 'SCENERY/nodes/Path' );
  var PhetFont = require( 'SCENERY_PHET/PhetFont' );
  var Shape = require( 'KITE/Shape' );
  var StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  var Text = require( 'SCENERY/nodes/Text' );
  var Vector2 = require( 'DOT/Vector2' );

  // constants

  var LABEL_COLOR = 'brown';
  var LABEL_FONT = new PhetFont( { size: 18, weight: 'bold' } );

  // strings

  var pattern_0value_1units = require( 'string!CHARGES_AND_FIELDS/pattern.0value.1units' );
  var voltageUnitString = require( 'string!CHARGES_AND_FIELDS/voltageUnit' );

  /**
   *
   * @param {model} model of the simulation
   * @param {ModelViewTransform2}  modelViewTransform
   * @constructor
   */
  function ElectricFieldLineNode( model, modelViewTransform ) {

    Node.call( this );
    this.modelViewTransform = modelViewTransform;

    var electricFieldLineNode = this;

    model.electricFieldLinesArray.addItemAddedListener( function( electricFieldLine ) {
      electricFieldLineNode.traceElectricFieldLine( electricFieldLine );
    } );

    // remove the nodes and clear the array the equipotential lines
    model.clearElectricFieldLinesProperty.link( function() {
      electricFieldLineNode.removeAllChildren();
      model.clearElectricFieldLines = false;
    } );

  }

  return inherit( Node, ElectricFieldLineNode, {
    traceElectricFieldLine: function( electricFieldLine ) {

      var modelViewTransform = this.modelViewTransform;

      //draw the electricField line
      var shape = new Shape();
      shape.moveToPoint( modelViewTransform.modelToViewPosition( electricFieldLine.positionArray [0] ) );
//      electricFieldLine.positionArray.forEach( function( position ) {
//        shape.lineToPoint( modelViewTransform.modelToViewPosition( position ) );
//      } );
      var arrayLength = electricFieldLine.positionArray.length;
      var i;
      var L = 6;
      var alpha = Math.PI * 6.5 / 8;

      for ( i = 0; i < arrayLength; i++ ) {
        var isArrowSegment = ( i % 50 === 2 );
        var position = modelViewTransform.modelToViewPosition( electricFieldLine.positionArray[i] );
        if ( isArrowSegment ) {
          var angle = position.minus( shape.getRelativePoint() ).angle();
          shape
            .lineToPointRelative( {x: L * Math.cos( angle + alpha ), y: L * Math.sin( angle + alpha )} )
            .lineToPointRelative( {x: 2 * L * Math.sin( alpha ) * Math.sin( angle ), y: -2 * L * Math.sin( alpha ) * Math.cos( angle )} )
            .lineToPointRelative( {x: -L * Math.cos( angle - alpha ), y: -L * Math.sin( angle - alpha )} );
        }
        shape.lineToPoint( modelViewTransform.modelToViewPosition( electricFieldLine.positionArray[i] ) );
      }

      this.addChild( new Path( shape, {stroke: 'orange', lineWidth: 2, pickable: false} ) );
    }
  } );
} );