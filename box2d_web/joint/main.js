var WINDOW_WIDTH  = 320;
var WINDOW_HEIGHT = 320;

enchant();

window.onload = function(){
	var core = enchant.Core( WINDOW_WIDTH, WINDOW_HEIGHT );
	core.onload = function(){
		//物理世界を作成
		var _world = new PhysicsWorld( 0.0, 9.8 );

		//オブジェクトA
		objA = new PhyBoxSprite( 10, 10, enchant.box2d.STATIC_SPRITE,
								 1.0, 0.5, 0.8, true );
		objA.image = new Surface( 10, 10 );
		objA.image.context.strokeRect( 0, 0, 10, 10 );
		objA.position = { x:160, y:100 };
		core.rootScene.addChild( objA );

		//オブジェクトB
		objB = new PhyBoxSprite( 10, 10, enchant.box2d.DYNAMIC_SPRITE,
								 1.0, 0.5, 0.8, true );
		objB.image = new Surface( 10, 10 );
		objB.image.context.strokeRect( 0, 0, 10, 10 );
		objB.position = { x:200, y:200 };
		core.rootScene.addChild( objB );

		//距離ジョイント
		var jointDef = new Box2D.Dynamics.Joints.b2DistanceJointDef();
		jointDef.Initialize( objA.body.m_body,
							 objB.body.m_body,
							 objA.body.m_body.GetWorldCenter(),
							 objB.body.m_body.GetWorldCenter()
							 );
		joint = _world.CreateJoint( jointDef );

		//世界を動かす
		core.rootScene.onenterframe = function(e){
			_world.step( core.fps );
		};
	};
	core.start();
};
