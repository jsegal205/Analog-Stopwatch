;(function($){

	var _zero = 0;
	var _degToRotate = 6;
	var _fullCircle = 360;
	var _second = _zero;
	var _minute = _zero;
	var _hourdeg = _zero;
	var _hourlbl = _zero;
	var _running = false;
	var _started = false;

	var $secondhand = $('.secondhand');
	var $minutehand = $('.minutehand');
	var $hourhand = $('.hourhand');
	var $second = $('#second');
	var $minute = $('#minute');
	var $hour = $('#hour');

	$('#start').bind('click', function(){
		_running = true;
		second();
	});

	$('#stop').bind('click', function(){
		_running = false;
		second();
	});

	$('#reset').bind('click', function(){

		//reset this shit.	

	});
		
	function second(){
		if (_running){
			setTimeout(function(){
				rotate(_degToRotate);
				second();
			}, 5);	
			_second += _degToRotate;
		}
	};

	function rotate(deg){
		if (_second === _fullCircle){
			_second = _zero;	
			_minute += _degToRotate;
		} 
		if (_minute === _fullCircle){
			_minute = _zero;
			_hourdeg += _degToRotate*5;
			_hourlbl += 1;
		}
		if (_hourdeg === _fullCircle){
			_hourdeg = _zero;
			_hourlbl = _zero;
		}
		
		$secondhand.css('transform','rotate(' + (_second - _hourdeg) + 'deg)');
		$minutehand.css('transform','rotate(' + (_minute -_hourdeg) + 'deg)');
		$hourhand.css('transform','rotate(' + _hourdeg + 'deg)');
		
		updateLbls();
	};

	function updateLbls() {
		var secondlbl = (_second / _degToRotate);
		if (secondlbl < 10){
			secondlbl = '0' + secondlbl.toString();
		}

		var minutelbl = (_minute / _degToRotate);
		if(minutelbl < 10){
			minutelbl = '0' + minutelbl.toString();
		}

		$second.text(secondlbl);
		$minute.text(minutelbl);
		$hour.text(_hourlbl);
	}

	updateLbls();
})(jQuery);