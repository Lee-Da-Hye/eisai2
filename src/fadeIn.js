$(document).ready(function() {
    $(window).scroll( function(){
			
        $('.fadeIn').each( function(i){
            
            var bottom_of_element = $(this).offset().top + $(this).outerHeight() / 3;
            
            //offset()은 Document 를 기준으로 하는 좌표 
            // outerHeight() : 첫 번째 요소에 대해 현재 계산된 외부 높이(패딩, 테두리 및 선택적으로 여백 포함)를 가져오거나 일치하는 모든 요소의 외부 높이를 설정
            var bottom_of_window = $(window).scrollTop() + $(window).height();
            //scrollTop : 일치하는 요소 집합의 첫 번째 요소에 대한 스크롤 막대의 현재 세로 위치를 가져오거나 일치하는 모든 요소에 대한 스크롤 막대의 세로 위치를 설정
            
            if( bottom_of_window > bottom_of_element ){
                $(this).animate({'opacity':'1'},700);
            }
        }); 
    });
});

