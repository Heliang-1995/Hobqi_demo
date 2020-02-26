window.onload = function (){
	var streets = new ol.layer.Tile ({
		source: new ol.source.XYZ ({
			url:'http://www.google.cn/maps/vt?lyrs=m@189&gl=cn&x={x}&y={y}&z={z}',
		})
	});
	var satellite = new ol.layer.Tile ({
		source: new ol.source.XYZ ({
			url:'http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}',
		})
	});
	var format = 'image/png';
    var bounds = [107.045006, 39.815668,
	111.372948, 40.871876];
	var ImageMap=new ol.layer. Image({
		source: new ol.source.ImageWMS({
			url: 'http://localhost:8080/geoserver/Hobqi/wms',
			params:{
				'FORMAT': format,
				'VERSION': '1.1.1',
				LAYERS: 'Hobqi:Hobqi',
			}
		})
		});	
		var mousePositionControl = new ol.control.MousePosition({   
            coordinateFormat: ol.coordinate.createStringXY(4),      
            projection: 'EPSG:4326',                               
            className: 'custom-mouse-position',                   
            target: document.getElementById('mouse-position'),     
            undefinedHTML: '&nbsp;'                                 
		});

	var map = new ol.Map({  
		controls: ol.control.defaults().extend([mousePositionControl]), 
		layers: [streets,satellite,ImageMap],  
		view: new ol.View({  
			center: [109.55, 40.00],  
			projection: 'EPSG:4326',  
			zoom: 7.5
		}),  
		target: 'map'  
	}); 
	var swipe = document.getElementById('swipe');  
 
	satellite.on('precompose', function(event){          
		var ctx = event.context;                 
		var width = ctx.canvas.width * (swipe.value / 100);  
		
		ctx.save();               
		ctx.beginPath();           
		ctx.rect(width, 0, ctx.canvas.width - width, ctx.canvas.height);    
		ctx.clip();                
	})
	
	satellite.on('postcompose', function(event){    
		var ctx = event.context;
		ctx.restore();           
	});

	swipe.addEventListener('input', function(){   
		map.render();          
	}, false);

}
