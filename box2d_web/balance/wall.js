var wallClass = enchant.Class.create({
		//                    壁サイズx, 壁サイズy, 壁表示位置x, 壁表示位置y
		initialize: function(    size_x,    size_y,       pos_x,       pos_y ){
			this._size_x = size_x;
			this._size_y = size_y;
			this._pos_x  = pos_x;
			this._pos_y  = pos_y
		},
		//壁の描画
		drawWall: function( spriteOption ){
			var wall = new PhyBoxSprite( this._size_x, this._size_y,
										 spriteOption,
										 1.0, 0.5, 0.8, true );
			wall.image = new Surface( this._size_x, this._size_y );
			wall.image.context.strokeRect( 0, 0, this._size_x, this._size_y );
			wall.position = {x:this._pos_x, y:this._pos_y};
			return wall;
		}
	});
