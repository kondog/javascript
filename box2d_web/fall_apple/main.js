enchant();

//りんごを作成
function makeApple( apple, pos_x, pos_y, core ){
	apple.image = core.assets[ 'icon0.png' ];
	apple.frame = 15;
	apple.position = {x:pos_x, y:pos_y};
	return apple;
}

//クリックした際のリスナーの登録
function giveListener( apple, core, accel_vector ){
	apple.addEventListener( 'touchstart', function(){
			var vector = new b2Vec2(accel_vector[0], accel_vector[1]);
			apple.applyImpulse( vector );
		});
}

//壁の描画
function drawWalls( core, wall_size_x, wall_size_y, wall_pos_x, wall_pos_y ){
	var wall = new PhyBoxSprite( wall_size_x, wall_size_y, enchant.box2d.STATIC_SPRITE,
								 1.0, 0.5, 0.8, true );
	wall.image = new Surface( wall_size_x, wall_size_y );
	wall.image.context.strokeRect( 1, 1, wall_size_x, wall_size_y );
	wall.position = {x:wall_pos_x, y:wall_pos_y};
	core.rootScene.addChild( wall );
}				   

window.onload = function(){
	var core = enchant.Core( 320, 320 );
	var icon = 'icon0.png';
	core.preload( icon );
	core.onload = function(){
		//物理世界を作成
		var world = new PhysicsWorld( 0.0, 9.8 );

		//りんごを作成
		//りんごの初期位置のリスト
		var x_y = [ // x,  y
				    [160, 300],
					[240, 300],
					[80, 300],
					];
		//クリックした際の加速度
		var vectors = [ // x, y
					   [   5,-5 ],
					   [  -7,-4 ],
					   [  -2, -6 ],
						];
		for( var i = 0; i < x_y.length; i++ ){
			var apple_empty = new PhyCircleSprite( 8, enchant.box2d.DYNAMIC_SPRITE, 1.0, 0.5, 0.8, true );
			var apple       = makeApple( apple_empty, x_y[i][0], x_y[i][1], core );
			core.rootScene.addChild( apple );
			//クリックした際の動き
			giveListener( apple, core, vectors[i] );
		}

		//上下左右の壁を作成
		var wall_data = [// size_x, size_y, pos_x, pos_y
						 [     320,     10,   160,   320 ],
						 [     320,     10,   160,     5 ],
						 [      10,    320,   320,   160 ],
						 [      10,    320,    10,   160 ],
						 ];
		for( var i=0; i < wall_data.length; i++ ){
			drawWalls( core, wall_data[i][0], wall_data[i][1], wall_data[i][2], wall_data[i][3] );
		}

		//世界を動かす
		core.rootScene.onenterframe = function(e){
			world.step( core.fps );
		};
	};
	core.start();
};
window.moveTo( 100, 100 );