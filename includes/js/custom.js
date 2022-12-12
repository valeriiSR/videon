$(function(){

/*	Бургер	*/

$(".burg").on('click',function(){
	$(".main-nav-items").css({"visibility":"visible"})
	$(".main-nav-items").slideToggle();
});

/*	END. Бургер	*/

function isNumeric(n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
}
/* Главный слайдер	*/

function change_main_slide(curent_slide_num){
	$(".main-slider-in").css({"background":"rgba(0,0,0,.5)"})
	$(".main-slider-in-"+curent_slide_num).css({"background":"none"});
}
var curent_slide_num = 1;
setInterval(function(){
	if(curent_slide_num >= 10){curent_slide_num = 1;} change_main_slide(curent_slide_num); curent_slide_num++;
}, 2000);

/* END. Главный слайдер	*/


/*	Форма расчета панелей	*/

/*	Ввод чисел с клавы	*/
$(".goriz-pans-inp, .vert-pans-inp").on('input', function(){
	var gor_qty = this.value;
	if(gor_qty.length > 0){
		if(isNumeric(gor_qty)){

		}else{
			alert("Введите корректное число");
			$(this).val(1);
		}
	}
	if(gor_qty.length > 2){
		$(this).val(gor_qty.substr(0, 2));
	}
});
/*	END. Ввод чисел с клавы	*/


/*	Ввод чисел стрелочками	*/
$(".gor-btn-up").on('click', function(){
	var v = $(".goriz-pans-inp").val();
	if(isNumeric(v) && v != ""){
		var nv = ++v;
		$(".goriz-pans-inp").val(nv);
	}else{
		$(".goriz-pans-inp").val(1);
	}
});
$(".gor-btn-down").on('click', function(){
	var v = $(".goriz-pans-inp").val();
	if(isNumeric(v) && v != ""){
		var nv = --v;
		if(nv < 1){nv = 1;}
		$(".goriz-pans-inp").val(nv);
	}else{
		$(".goriz-pans-inp").val(1);
	}
});
/*	Vertical	*/
$(".vert-btn-up").on('click', function(){
	var v = $(".vert-pans-inp").val();
	if(isNumeric(v) && v != ""){
		var nv = ++v;
		$(".vert-pans-inp").val(nv);
	}else{
		$(".vert-pans-inp").val(1);
	}
});
$(".vert-btn-down").on('click', function(){
	var v = $(".vert-pans-inp").val();
	if(isNumeric(v) && v != ""){
		var nv = --v;
		if(nv < 1){nv = 1;}
		$(".vert-pans-inp").val(nv);
	}else{
		$(".vert-pans-inp").val(1);
	}
});

/*	END. Ввод чисел стрелочками	*/


/*	END. Форма расчета панелей	*/


/*	Scroll	*/


$('.main-nav-item a[href^="#"]').click( function(e){
	e.preventDefault;
    var scroll_el = $(this).attr('href');
	var destination = $(scroll_el).offset().top;
    if ($(scroll_el).length != 0) {
        $('html, body').animate( { scrollTop: destination }, 1200 );
    }
	return false;
});


/*	END. Scroll	*/

/*	popup forms	*/
var doc_height = $("body").height();
$(".popup_form_wrp").css({'height': doc_height});

var body_wth = parseInt($("body").css("width"));
var formwrp_w = parseInt($(".popup-form").css("width"));

var ml_for_f =  parseInt((body_wth - formwrp_w) / 2);

$(".popup-form").css({"margin-left": ml_for_f});


function send_data(title, contact_1, contact_2, contact_3, other){
	var data_from = "Запрос из формы с сайта Videon";
	var v_title = "Заголовок формы: " + title;
	var v_cont_1 = "Контакты: " + contact_1;
	var v_cont_2 = "Контакты: " + contact_2;
	var v_cont_3 = "Контакты: " + contact_3;
	var dop_data = "Дополнительные данные: " + other;

	$.ajax({
		type: "POST",
		url: "http://100lps.ru/videon_imgs/form.php",
		data: {data_from:data_from, title:title, v_cont_1:v_cont_1, v_cont_2:v_cont_2, v_cont_3:v_cont_3, dop_data:dop_data},
		success: function(res){

			var ra_ml = (body_wth - 300) / 2;
			$(".well").css({"margin-left":ra_ml}).show("slow");
			$(".preloder_ins").animate({
				left: 0
			},2000, function(){
				$(".well").css({"display":"none"});
				$(".err").css({"display":"none"});
				$(".response-answer").hide();

				$(".popup_form_wrp").hide("slow");
				$(".popup-form").each(function(){
					$(this).css({"display":"none"});
				});
			});
			$(".response-answer").css({"height":doc_height,"display":"block"});
			
		},error:function(){
			var ra_ml = (body_wth - 300) / 2;
			$(".err").css({"margin-left":ra_ml}).show("slow");
			$(".preloder_ins").animate({
				left: 0
			},2000, function(){
				$(".well").css({"display":"none"});
				$(".err").css({"display":"none"});
				$(".response-answer").hide();

				$(".popup_form_wrp").hide("slow");
				$(".popup-form").each(function(){
					$(this).css({"display":"none"});
				});
			});
			$(".response-answer").css({"height":doc_height,"display":"block"});
			/*alert("Произошла ошибка отправки данных!<br> Попробуйте ещё раз позже.");*/
		}
	});
};



/*	Закзать обратный звонок	*/
$(".make-call").on('click', function(){

	var cur_h = $(this).offset().top;

	$(".popup_form_hr").html("Заказать обрантый звонок");
	$(".call-back").css({'display': 'block'});
	$(".popup_form_wrp").show();

	$("#call-back-submit").on('click', function(e){
		e.preventDefault();
		var contact_1 = $("#call-back-name").val();
		var contact_2 = $("#call-back-phone").val();

		/*console.log(contact_1);
		console.log(contact_2);*/
		send_data("Заказ обратного звонка", contact_1, contact_2, "", "");
	});
});

/*	Закзать обратный звонок	*/

/*	Расчитать стоимость	*/
$(".form-calculate-btn").on('click', function(){
	var orientation_in_val = $(".orientation").val();
	if(orientation_in_val == "gorisontal"){var orientation = "Горзонтальная";}else{var orientation = "Вертикальная"}

	var gor_v = $(".goriz-pans-inp").val();
	var vert_v = $(".vert-pans-inp").val();

	if(gor_v == ""){
		var gor_v = $(".goriz-pans-inp").attr("placeholder");
	}
	if(vert_v == ""){
		var vert_v = $(".vert-pans-inp").attr("placeholder");	
	}

	if(gor_v == "" && vert_v == ""){
		var p_q = '1 x 1';
	}else{
		var p_q = gor_v + " x " + vert_v;
	}
	
	$(".panls-orient").html(orientation);
	$(".panls-qty").html(p_q);

	var cur_h = $(this).offset().top;
	$(".popup_form_hr").html("Расчитать стоимость");
	$(".order-calculate").css({'display': 'block'});
	$(".popup_form_wrp").show();

	$("#order-calculate-submit").on('click', function(e){
		e.preventDefault();
		var contact_1 = $("#order-calculate-name").val();
		var contact_2 = $("#order-calculate-phone").val();
		var contact_3 = $("#order-calculate-email").val();
		var other = orientation +" / " + p_q;
		/*console.log(contact_1);
		console.log(contact_2);*/
		send_data("Расчитать стоимость", contact_1, contact_2, contact_3, other);
	});
});
/*	END.Расчитать стоимость	*/


/*	Заполните заявку и мы свяжемся с Вами в течении 30 минут!	*/
$(".form-recall-send").on('click', function(){
	var contact_1 = $("#form-recall-username").val();
	var contact_2 = $("#form-recall-email").val();

	
	send_data("Перезвоним через 30 минут", contact_1, contact_2, "", "");
	
});
/*	END. Заполните заявку и мы свяжемся с Вами в течении 30 минут!	*/

/*	Связаться с инженером	*/
$(".ing-call_btn").on('click', function(){
	var cur_h = $(this).offset().top;

	$(".popup_form_hr").html("Связаться с инженером");
	$(".call-back").css({'display': 'block'});
	$(".popup_form_wrp").show();
});
/*	END. Связаться с инженером	*/

/*	Обучающий центр Видеон	*/
$(".learning-desc-btn").on('click', function(){
	$(".popup_form_tx").html("Познакомьтесь с оборудованием, посетите демонстрационный зал в нашем учебном центре и оцените простоту конфигурирования видеоконтроллера. Убедитесь в функциональности, качестве и удобстве Videon ");
	$(".popup_form_hr").html("Обучающий Центр Видеон");
	$(".edu-form").css({'display': 'block'});
	$(".popup_form_wrp").show();


	$("#edu-form-submit").on('click', function(e){
		e.preventDefault();
		var contact_1 = $("#edu-form-name").val();
		var contact_2 = $("#edu-form-phone").val();

		send_data("Запрос обучающий цент видеон", contact_1, contact_2, "", "");
	});
});
/*	END. Обучающий центр Видеон	*/

/*	Закрыть формы	*/
$(".popup-form-close").on('click', function(event){
	/*event.stopPropagation();*/
	$(this).parent().children("form").css({"display": "none"});
	$(this).parent().parent().hide();
});
	/*	END.Закрыть формы	*/
/*	END. popup forms	*/





/*	Раскрытие списка партнеров	*/
$(".ell-btn").on('click', function(){
	$(".more_partners").slideToggle("slow");
})
/*	END. Раскрытие списка партнеров	*/


/*	Спецификации устройств	*/
$("#v-start").on('click', function(){
	window.open("https://www.dropbox.com/s/1nyjlqso6zgnwt7/%D0%A1%D0%BF%D0%B5%D1%86%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F%20Videon%20Standard%20%2B%20%D0%A1%D0%9F%D0%9E.jpg?dl=0","_blank");
});
$("#v-standart").on('click', function(){
	window.open("https://www.dropbox.com/s/1nyjlqso6zgnwt7/%D0%A1%D0%BF%D0%B5%D1%86%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F%20Videon%20Standard%20%2B%20%D0%A1%D0%9F%D0%9E.jpg?dl=0","_black");
});	
$("#v-pro").on('click', function(){
	window.open("https://www.dropbox.com/s/ywj6ngbucgcwa77/%D0%A1%D0%BF%D0%B5%D1%86%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F%20Videon%20Pro%20%2B%20%D0%A1%D0%9F%D0%9E.jpg?dl=0","_black");
});
$("#v-max").on('click', function(){
	window.open("https://www.dropbox.com/s/23k82u9i3cc4jxi/%D0%A1%D0%BF%D0%B5%D1%86%D0%B8%D1%84%D0%B8%D0%BA%D0%B0%D1%86%D0%B8%D1%8F%20Videon%20Max%20%2B%20%D0%A1%D0%9F%D0%9E.jpg?dl=0","_black");
});
/*	END. Спецификации устройств	*/

/*	Пользовательское соглащение	*/
$(".user-agreement").on('click', function(e){
	e.preventDefault();
	$(".popup_form_hr").html("Пользовательское соглашение");
	$(".popup_form_tx").html("Содержание соглашения в разработке");
	
	$(".ex").css({'display': 'block'});
	$(".popup_form_wrp").show();
});
/*	END. Пользовательское соглащение	*/

});
