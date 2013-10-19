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

		//天秤のうでを作成
		var balance_arm_width = WINDOW_WIDTH-100;
		var balance_arm_data  = [balance_arm_width, 5, WINDOW_WIDTH/2, 20 ];
		var balance_arm		  = createWallClass( balance_arm_data );
		var balance_arm_obj   = balance_arm.drawWall( enchant.box2d.DYNAMIC_SPRITE );
		core.rootScene.addChild( balance_arm_obj );

		//天秤の皿を作成
		var dish_width			= 70;
		//皿の描画位置
		var dishes_pos_x		= [ (WINDOW_WIDTH/2)-((balance_arm_width/4)*1.5), 
									(WINDOW_WIDTH/2)+((balance_arm_width/4)*1.5) ];
		//皿の描画処理
		var balance_dishes_data = [ [dish_width, 5, dishes_pos_x[0], WINDOW_HEIGHT/2],
									[dish_width, 5, dishes_pos_x[1], WINDOW_HEIGHT/2] ];
		var balance_dish_left		= createWallClass( balance_dishes_data[0] );
		var balance_dish_left_obj  = balance_dish_left.drawWall( enchant.box2d.DYNAMIC_SPRITE );
		//皿が回転しないよう設定
		balance_dish_left_obj.body.m_body.SetFixedRotation( true );
		core.rootScene.addChild( balance_dish_left_obj );
		var balance_dish_right		= createWallClass( balance_dishes_data[1] );
		var balance_dish_right_obj  = balance_dish_right.drawWall( enchant.box2d.DYNAMIC_SPRITE );
		//皿が回転しない(ry
		balance_dish_right_obj.body.m_body.SetFixedRotation( true );
		core.rootScene.addChild( balance_dish_right_obj );

		//天秤の関節を作成
		var balance_junctures_data	   = [ [5, 5, dishes_pos_x[0], 10],
										   [5, 5, dishes_pos_x[1], 10] ];
		var balance_juncture_left	   = createWallClass( balance_junctures_data[0] );
		var balance_juncture_left_obj  = balance_juncture_left.drawWall( enchant.box2d.DYNAMIC_SPRITE );
		core.rootScene.addChild( balance_juncture_left_obj );
		var balance_juncture_right	   = createWallClass( balance_junctures_data[1] );
		var balance_juncture_right_obj = balance_juncture_right.drawWall( enchant.box2d.DYNAMIC_SPRITE );
		core.rootScene.addChild( balance_juncture_right_obj );
		
		//ジョイント
		def1 = new Box2D.Dynamics.Joints.b2DistanceJointDef();
		def1.Initialize( balance_dish_left_obj.body.m_body
						,balance_juncture_left_obj.body.m_body
						,balance_dish_left_obj.body.m_body.GetWorldCenter()
						,balance_juncture_left_obj.body.m_body.GetWorldCenter()
						);
		var joint1 = world.CreateJoint(def1);

		def2 = new Box2D.Dynamics.Joints.b2DistanceJointDef();
		def2.Initialize( balance_dish_right_obj.body.m_body
						,balance_juncture_right_obj.body.m_body
						,balance_dish_right_obj.body.m_body.GetWorldCenter()
						,balance_juncture_right_obj.body.m_body.GetWorldCenter()
						);
		var joint2 = world.CreateJoint(def2);

		//クリックした箇所にボールを作成
		core.rootScene.addEventListener( 'touchstart', function( event ){
				var ball	   = createWallClass( [10, 10, event.localX, event.localY] );
				var ball_obj   = ball.drawWall( enchant.box2d.DYNAMIC_SPRITE );
				core.rootScene.addChild( ball_obj );
			});

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
