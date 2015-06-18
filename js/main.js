var Chequeado;

;(function(global, document, $, L, cartodb){

    "use strict";

    //Fix strange bug using jquery2 and bootstra3
    HTMLDivElement.prototype.remove = function(){};

    Chequeado = global.Chequeado = global.Chequeado || {};

    Chequeado.map;

    Chequeado.cartoUrl = 'https://chequeado.cartodb.com/api/v2_1/viz/ad0725e6-1543-11e5-9e22-0e9d821ea90d/viz.json';

    Chequeado.mainLayer;

    Chequeado.init = function(mainLayer){

		cartodb.createVis('chequeado-map', Chequeado.cartoUrl)
		  .done(function(vis, layers) {
		    
		  	Chequeado.mainLayer = layers[1];

		    // layer 0 is the base layer, layer 1 is cartodb layer
		    // when setInteraction is disabled featureOver is triggered
		    //Chequeado.mainLayer.setInteraction(true);
		    
		    /*layers[1].on('featureOver', function(e, latlng, pos, data, layerNumber) {
		      console.log(e, latlng, pos, data, layerNumber);
		    });*/

		    // you can get the native map to work with it
		    //Chequeado.map = vis.getNativeMap();

		    // now, perform any operations you need, e.g. assuming map is a L.Map object:
/*		    Chequeado.map.setZoom(3);
		    Chequeado.map.panTo([50.5, 30.5]);*/

		    Chequeado.showLayer(mainLayer);

		    $('.year-selector').on('click',function(){
		    	Chequeado.showLayer(this.id);
		    });

		});

    };

    Chequeado.showLayer = function(layerToShow) {

    	$('.year-selector').removeClass('active disabled');

    	$('.year-selector#'+layerToShow).addClass('active disabled');

        //turn off all layers
        Chequeado.mainLayer.getSubLayers().forEach(function(i) {
            i.hide()
        });

        switch (layerToShow) {
            case "agua_1991":
                Chequeado.mainLayer.getSubLayer(0).show();
                break;
            case "agua_2001":
                Chequeado.mainLayer.getSubLayer(1).show();
                break;
            case "agua_2010":
                Chequeado.mainLayer.getSubLayer(2).show();
                break;
        }

        return true;
    };


})(window, document,jQuery, L, cartodb);
