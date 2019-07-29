// Copyright 2015-2019, University of Colorado Boulder

/**
 * Scenery Node responsible for the drawing of the electricPotential lines and their accompanying voltage labels
 * A debug option can enabled the view of the (model) position points used to calculate the electric potential line.
 * The (pruned) position points that are used to draw the electric potential line can also be displayed.
 *
 * @author Martin Veillette (Berea College)
 */
define( function( require ) {
  'use strict';

  // modules
  const chargesAndFields = require( 'CHARGES_AND_FIELDS/chargesAndFields' );
  const ChargesAndFieldsColorProfile = require( 'CHARGES_AND_FIELDS/charges-and-fields/ChargesAndFieldsColorProfile' );
  const ChargesAndFieldsConstants = require( 'CHARGES_AND_FIELDS/charges-and-fields/ChargesAndFieldsConstants' );
  const Circle = require( 'SCENERY/nodes/Circle' );
  const DragListener = require( 'SCENERY/listeners/DragListener' );
  const Node = require( 'SCENERY/nodes/Node' );
  const Path = require( 'SCENERY/nodes/Path' );
  const Rectangle = require( 'SCENERY/nodes/Rectangle' );
  const StringUtils = require( 'PHETCOMMON/util/StringUtils' );
  const Text = require( 'SCENERY/nodes/Text' );
  const Util = require( 'DOT/Util' );
  const Vector2Property = require( 'DOT/Vector2Property' );

  // strings
  const pattern0Value1UnitsString = require( 'string!CHARGES_AND_FIELDS/pattern.0value.1units' );
  const voltageUnitString = require( 'string!CHARGES_AND_FIELDS/voltageUnit' );

  // constants
  const IS_DEBUG = false; // if set to true will show the (model and view) positions use in the calculation of the electric potential lines

  class VoltageLabel extends Node {

    /**
     * Function that generates a voltage label for the electricPotential line
     * @param {ElectricPotentialLine} electricPotentialLine
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Tandem} tandem
     */
    constructor( electricPotentialLine, modelViewTransform, tandem ) {

      super( { cursor: 'pointer', tandem: tandem } );

      const electricPotential = electricPotentialLine.electricPotential;
      const position = electricPotentialLine.position;

      const locationProperty = new Vector2Property( position, {
        tandem: tandem.createTandem( 'locationProperty' ),
        useDeepEquality: true
      } );

      const movableDragHandler = new DragListener( {
        applyOffset: false,
        locationProperty: locationProperty,
        tandem: tandem.createTandem( 'dragListener' ),
        transform: modelViewTransform,
        start: event => {
          // Move the label to the front of this layer when grabbed by the user.
          this.moveToFront();
        }
      } );
      this.addInputListener( movableDragHandler );

      // a smaller electric potential should have more precision
      const electricPotentialValueString = ( Math.abs( electricPotential ) < 1 ) ?
                                           Util.toFixed( electricPotential, 2 ) :
                                           Util.toFixed( electricPotential, 1 );

      // Create the voltage label for the electricPotential line
      const voltageLabelString = StringUtils.format( pattern0Value1UnitsString, electricPotentialValueString, voltageUnitString );
      const voltageLabelText = new Text( voltageLabelString, {
        font: ChargesAndFieldsConstants.VOLTAGE_LABEL_FONT,
        center: modelViewTransform.modelToViewPosition( position ),
        fill: ChargesAndFieldsColorProfile.electricPotentialLineProperty,
        tandem: tandem.createTandem( 'voltageLabelText' )
      } );

      // Create a background rectangle for the voltage label
      const backgroundRectangle = new Rectangle( 0, 0, voltageLabelText.width * 1.2, voltageLabelText.height * 1.2, 3, 3, {
        center: modelViewTransform.modelToViewPosition( position ),
        fill: ChargesAndFieldsColorProfile.voltageLabelBackgroundProperty,
        tandem: tandem.createTandem( 'backgroundRectangle' )
      } );

      this.addChild( backgroundRectangle ); // must go first
      this.addChild( voltageLabelText );

      // finds the closest location on positionArray to the position of the cursor
      const locationFunction = cursorLocation => {
        let smallestDistanceSquared = Number.POSITIVE_INFINITY;
        let closestLocation; // {Vector2}
        electricPotentialLine.positionArray.forEach( function( position ) {
          const distanceSquared = position.distanceSquared( cursorLocation );
          if ( distanceSquared < smallestDistanceSquared ) {
            smallestDistanceSquared = distanceSquared;
            closestLocation = position;
          }
        } );
        this.center = modelViewTransform.modelToViewPosition( closestLocation );
      };

      locationProperty.link( locationFunction );

      // create a dispose function to unlink the color functions
      this.disposeVoltageLabel = function() {
        locationProperty.unlink( locationFunction );
        locationProperty.dispose();
        movableDragHandler.dispose();
        voltageLabelText.dispose();
        backgroundRectangle.dispose();
      };
    }

    dispose() {
      this.disposeVoltageLabel();
      super.dispose();
    }
  }

  class ElectricPotentialLinePath extends Path {

    /**
     * Function that generates a scenery path from the shape of the electricPotential line
     * @param {Shape} electricPotentialLineShape
     * @param {ModelViewTransform2} modelViewTransform
     */
    constructor( electricPotentialLineShape, modelViewTransform ) {
      super( modelViewTransform.modelToViewShape( electricPotentialLineShape ), {
        stroke: ChargesAndFieldsColorProfile.electricPotentialLineProperty
      } );
    }
  }

  class Circles extends Node {

    /**
     * Function that generates an array of Circles with their centers determined by the position array
     * @param {Array.<Vector2>} positionArray
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Object} [options]
     */
    constructor( positionArray, modelViewTransform, options ) {

      super();

      options = _.extend( {
        radius: 2
      }, options );

      // create and add all the circles
      positionArray.forEach( position => {
        const circle = new Circle( options.radius, options );
        circle.center = modelViewTransform.modelToViewPosition( position );
        this.addChild( circle );
      } );
    }
  }

  /**
   * Scenery node that is responsible for displaying the electric potential lines
   */
  class ElectricPotentialLinesNode extends Node {

    /**
     * @param {ObservableArray.<ElectricPotentialLine>} electricPotentialLines - array of models of electricPotentialLine
     * @param {ModelViewTransform2} modelViewTransform
     * @param {Property.<boolean>} areValuesVisibleProperty - control the visibility of the voltage labels
     * @param {Tandem} tandem
     */
    constructor( electricPotentialLines, modelViewTransform, areValuesVisibleProperty, tandem ) {

      // call the super constructor
      super( { tandem: tandem } );

      // Create and add the parent node for all the lines (paths)
      const pathsNode = new Node();
      this.addChild( pathsNode );

      // Create and add the parent node for the circles (used in DEBUG mode)
      let circlesNode;
      if ( IS_DEBUG ) {
        circlesNode = new Node();
        this.addChild( circlesNode );
      }

      // Create and add the parent node for the label nodes
      const labelsNode = new Node();
      this.addChild( labelsNode );

      // Monitor the electricPotentialLineArray and create a path and label for each electricPotentialLine
      electricPotentialLines.addItemAddedListener( function( electricPotentialLine ) {

        const electricPotentialLinePath = new ElectricPotentialLinePath( electricPotentialLine.getShape(), modelViewTransform );
        pathsNode.addChild( electricPotentialLinePath );

        // TODO: Use Group
        const voltageLabel = new VoltageLabel( electricPotentialLine, modelViewTransform, tandem.createTandem( 'voltageLabel~' + electricPotentialLine.electricPotentialLineTandem.name ) );
        labelsNode.addChild( voltageLabel );

        if ( IS_DEBUG ) {

          // create all the circles corresponding to the positions calculated in the model
          const electricPotentialModelCircles = new Circles( electricPotentialLine.positionArray, modelViewTransform, {
            fill: 'pink',
            radius: 1
          } );

          // create all the circles corresponding to the positions used to create the shape of the electric potential line
          const electricPotentialViewCircles = new Circles( electricPotentialLine.getPrunedPositionArray( electricPotentialLine.positionArray ), modelViewTransform, { fill: 'orange' } );

          // no translatable strings, for debug only
          const text = new Text( 'model=' + electricPotentialLine.positionArray.length +
                                 '    view=' + electricPotentialLine.getPrunedPositionArray( electricPotentialLine.positionArray ).length, {
            center: modelViewTransform.modelToViewPosition( electricPotentialLine.position ),
            fill: 'green',
            font: ChargesAndFieldsConstants.VOLTAGE_LABEL_FONT
          } );

          // add the circles and text
          circlesNode.addChild( electricPotentialModelCircles );
          circlesNode.addChild( electricPotentialViewCircles );
          circlesNode.addChild( text );
        }

        electricPotentialLines.addItemRemovedListener( function removalListener( removedElectricPotentialLine ) {
          if ( removedElectricPotentialLine === electricPotentialLine ) {
            pathsNode.removeChild( electricPotentialLinePath );
            labelsNode.removeChild( voltageLabel );
            if ( IS_DEBUG ) {
              circlesNode.removeAllChildren();
            }

            // dispose of the link for garbage collection
            electricPotentialLinePath.dispose();
            voltageLabel.dispose();

            electricPotentialLines.removeItemRemovedListener( removalListener );
          }
        } ); // end of addItemRemovedListener

      } ); // end of addItemAddedListener

      // Control the visibility of the value (voltage) labels
      // no need to unlink present for the lifetime of the sim
      areValuesVisibleProperty.linkAttribute( labelsNode, 'visible' );
    }
  }

  return chargesAndFields.register( 'ElectricPotentialLinesNode', ElectricPotentialLinesNode );
} );

