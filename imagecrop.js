(function ($) {
	"use strict";


	$.fn.HDImageCrop = function (input) {
		if (!input) {
			alert("input button do not find")
			return;
		}
		/*layouts
			Div.box // outOf container 
			Div.inner // ineer container
			Img.img
			
			Canvas.buffer
			Input. loadImge
			*/


		this.init = function (input) {

			this.targer = $(this);
			this.input = input;



			this.targer.html(' <div id="HDC_container" ><div id="HDC_img"><img src="" id="" draggable="false"/></div></div><a id="console"></a>');
			$('#HDC_container').width($('#HDC_container').parent().width())
			$('#HDC_container').height($('#HDC_container').parent().height())
		}



		this.console = function () {
			$('#console').html($('#HDC_img').offset())

		}







		this.listen = function () {
			var self = this;
			input = this.input;
			this.input.on('change', function (e) {
				console.log(input);

				var reader = new FileReader();
				reader.onload = function (e) {
					$('#HDC_img img').attr('src', e.target.result);
				}
				reader.readAsDataURL(input[0].files[0]);

			})


			$('#HDC_img').on('mousedown', function (e) {
				e.preventDefault()
				var targ = $('#HDC_img');
				self.draging = true;
				console.log(self.draging);

				self.offsetX = e.clientX;
				self.offsetY = e.clientY;
				//if(!targ.style.left) { targ.style.left='0px'};
				//if (!targ.style.top) { targ.style.top='0px'};


				self.coordX = parseInt(targ.offset().left);
				self.coordY = parseInt(targ.offset().top);


				///	console.log(self.coordX,self.coordY)



				$('#HDC_img').on('mousemove', function (e) {
					if (!self.draging)
						return;
					e.preventDefault()
					var targ = $('#HDC_img');

					//	console.log("moving",e)

					//	targ.style.left=coordX+e.clientX-offsetX+'px';
					//targ.style.top=coordY+e.clientY-offsetY+'px';

					var left = self.coordX + e.clientX - self.offsetX;
					var top = self.coordY + e.clientY - self.offsetY;
					if (left > $('#HDC_img').parent().offset().left)
						left = 0 + $('#HDC_img').parent().offset().left;

					console.log('current set left ', left)
					console.log('calculated left', $('#HDC_img').width() - $('#HDC_img').parent().offset().left + $('#HDC_img').parent().width())

					if (left < -($('#HDC_img').width() - $('#HDC_img').parent().offset().left + $('#HDC_img').parent().width()))
						left = -($('#HDC_img').width() - $('#HDC_img').parent().offset().left + $('#HDC_img').parent().width())


					if (top > $('#HDC_img').parent().offset().top)
						top = 0 + $('#HDC_img').parent().offset().top;

					if (top < -($('#HDC_img').height() - $('#HDC_img').parent().offset().top - $('#HDC_img').parent().height())) {

						top = -($('#HDC_img').height() - $('#HDC_img').parent().offset().top - $('#HDC_img').parent().height())+3
					}




					targ.offset({
						left, top
					});

					

				})

			})

			$('#HDC_img').on('mouseup', function (e) {
				e.preventDefault()
				self.draging = false;
				$('#HDC_img').off('mousemove')
				console.log(self.draging);
			})
			$('#HDC_img').on('mouseout', function (e) {
				e.preventDefault()
				self.draging = false;
				$('#HDC_img').off('mousemove')
				console.log(self.draging);
			})



		}







		this.init(input);

		this.listen();






		



	}

	



	//	$.HDImageCrop = new HDImageCrop();


}(jQuery))