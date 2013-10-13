var WINDOW_WIDTH  = 320;
var WINDOW_HEIGHT = 320;

enchant();

function createWallClass( draw_data ){
	return new wallClass(  draw_data[0], draw_data[1],
						   draw_data[2], draw_data[3] 
						   );
}

window.onload = function(){
	var core = enchant.Core( WINDOW_WIDTH, WINDOW_HEIGHT );
	core.onload = function(){
		//物理世界を作成
		var world = new PhysicsWorld( 0.0, 9.8 );

		//天秤の軸を作成
		var balance_vartical_data = [ 10, WINDOW_HEIGHT*2-40, WINDOW_WIDTH/2, WINDOW_HEIGHT ];
		var balance_vartical = createWallClass( balance_vartical_data );
		core.rootScene.addChild( balance_vartical.drawWall( enchant.box2d.STATIC_SPRITE ) );

		//天秤の棒を作成
		var balance_width_data = [WINDOW_WIDTH-60, 5, WINDOW_WIDTH/2, 0 ];
		var balance_width = createWallClass( balance_width_data );
		core.rootScene.addChild( balance_width.drawWall( enchant.box2d.DYNAMIC_SPRITE ));

		//床を作成
		var wall_data =[ WINDOW_WIDTH,     5,   WINDOW_WIDTH/2,   WINDOW_HEIGHT ];
		var floor = createWallClass( wall_data );
		core.rootScene.addChild( floor.drawWall( enchant.box2d.STATIC_SPRITE ) );

		//世界を動かす
		core.rootScene.onenterframe = function(e){
			world.step( core.fps );
		};
	};
	core.start();
};
