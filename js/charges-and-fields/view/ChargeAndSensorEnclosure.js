// Copyright 2002-2015, University of Colorado Boulder

/**
 * Panel with Check Boxes that control the electrical Properties of the Sim
 *
 * @author Martin Veillette (Berea College)
 */
define( function( require ) {
  'use strict';

  // imports
  var ChargesAndFieldsColors = require( 'CHARGES_AND_FIELDS/charges-and-fields/ChargesAndFieldsColors' );
  var ChargesAndFieldsConstants = require( 'CHARGES_AND_FIELDS/charges-and-fields/ChargesAndFieldsConstants' );
  var ChargedParticleCreatorNode = require( 'CHARGES_AND_FIELDS/charges-and-fields/view/ChargedParticleCreatorNode' );
  var ElectricFieldSensorCreatorNode = require( 'CHARGES_AND_FIELDS/charges-and-fields/view/ElectricFieldSensorCreatorNode' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Node = require( 'SCENERY/nodes/Node' );
  //var Panel = require('SUN/Panel');
  //var Text = require( 'SCENERY/nodes/Text' );
  var Rectangle = require( 'SCENERY/nodes/Rectangle' );
  var Vector2 = require( 'DOT/Vector2' );

  // strings
  //var minusOneNanoCoulombString = require( 'string!CHARGES_AND_FIELDS/minusOneNanoC' );
  //var plusOneNanoCoulombString = require( 'string!CHARGES_AND_FIELDS/plusOneNanoC' );
  //var sensorsString = require( 'string!CHARGES_AND_FIELDS/sensors' );

  // constants
  var CIRCLE_RADIUS = ChargesAndFieldsConstants.CHARGE_RADIUS;// radius of charged particles.
  var DATA_POINT_CREATOR_OFFSET_POSITIONS = [
    // Offsets used for initial position of point . Empirically determined.
    new Vector2( (0.8) * CIRCLE_RADIUS, (0.8) * CIRCLE_RADIUS ),
    new Vector2( (0.8) * CIRCLE_RADIUS, (-0.7) * CIRCLE_RADIUS ),
    new Vector2( (-0.9) * CIRCLE_RADIUS, (0.8) * CIRCLE_RADIUS ),
    new Vector2( (-0.6) * CIRCLE_RADIUS, (-0.75) * CIRCLE_RADIUS )
  ];

  /**
   * Enclosure that contains the charges and sensors
   * @param {ChargesAndFieldsModel} model - main model of the simulation
   * @param {Bounds2} bounds
   * @param {ModelViewTransform2} modelViewTransform
   * @constructor
   */
  function ChargeAndSensorEnclosure( model, bounds, modelViewTransform ) {

    Node.call( this );
    var enclosureGroup = this;

    var rectangle = Rectangle.roundedBounds( modelViewTransform.modelToViewBounds( bounds ), 10, 10, {lineWidth: ChargesAndFieldsConstants.PANEL_LINE_WIDTH} );
    this.addChild( rectangle );


    var left = modelViewTransform.modelToViewBounds( bounds ).minX;
    var top = modelViewTransform.modelToViewBounds( bounds ).minY;
    // Add the dataPoint creator nodes.
    DATA_POINT_CREATOR_OFFSET_POSITIONS.forEach( function( offset ) {
      enclosureGroup.addChild( new ChargedParticleCreatorNode(
        model.addUserCreatedChargedParticle.bind( model ), 1,
        modelViewTransform, {
          left: offset.x + left + 70,
          top:  offset.y + top + 20
        } ) );
      enclosureGroup.addChild( new ChargedParticleCreatorNode(
        model.addUserCreatedChargedParticle.bind( model ), -1,
        modelViewTransform, {
          left: 170 + offset.x + left,
          top:  offset.y + top + 20
        } ) );
      enclosureGroup.addChild( new ElectricFieldSensorCreatorNode(
        model.addUserCreatedElectricFieldSensor.bind( model ),
        modelViewTransform, {
          left: offset.x + left + 270,
          top: offset.y + top + 20
        } ) );

    } );


    //Panel.call(this, enclosureGroup, {
    //    fill: ChargesAndFieldsConstants.PANEL_FILL,
    //    stroke: ChargesAndFieldsConstants.PANEL_STROKE,
    //    lineWidth: ChargesAndFieldsConstants.PANEL_LINE_WIDTH,
    //    xMargin: 10,
    //    yMargin: 5
    //});


    ChargesAndFieldsColors.link( 'controlPanelBorder', function( color ) {
      rectangle.stroke = color;
    } );

    ChargesAndFieldsColors.link( 'controlPanelFill', function( color ) {
      rectangle.fill = color;
    } );


  }

  return inherit( Node, ChargeAndSensorEnclosure );

} );