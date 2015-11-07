// Copyright 2015, University of Colorado Boulder

/**
 * Global settings
 *
 * @author Martin Veillette (Berea College)
 */
define( function( require ) {
  'use strict';

  // modules
  var PropertySet = require( 'AXON/PropertySet' );

  var ChargesAndFieldsGlobals = new PropertySet( {
    projectorColors: !!phet.chipper.getQueryParameter( 'projector' ) || false
  } );

  return _.extend( ChargesAndFieldsGlobals, {
    disallowWebGL: phet.chipper.getQueryParameter( 'webgl' ) === 'false'
  } );
} );