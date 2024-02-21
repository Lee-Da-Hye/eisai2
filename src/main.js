
//a 이동 x
const alink = document.querySelectorAll('footer a')
        alink.forEach(link =>{
            link.addEventListener('click', function (event){
                event.preventDefault();
            })
        })


// aside
var $html = $("html");

var curIdx = 0;
//뷰포트에 표시되는 페이지의 번호

var lastIdx = $("section").length;
// 마지막 페이지의 번호 

$html.animate({scrollTop: 0},1000);
//문서(페이지)가 로드되면 첫 페이지 시작

$(window).on("wheel", function(e){
//이벤트 핸들러로 마우스 휠을 굴리면 발생하는 이벤트

if($html.is(":animated")) return;
//아래에서 호출된 .animate 메서드로 생성된 스크롤 효과가 쌓이지 않도록 스크롤이 진행되는 동안 발생하는 wheel이벤트는 무시한다.

//e(jQuery가 반환) .originalEvent(자바스크립트에서의 원래 이벤트) .deltaY(마우스 휠을 어느 방향으로 얼만큼을 굴렸는지 → 양수이면 아래쪽으로 굴린 거, 음수이면 위쪽으로 굴린 거다)
if(e.originalEvent.deltaY > 0){
  
  //마지막 페이지인 경우에는 이벤트 핸들러 종료(스크롤될 것이 없으니 마지막에서 멈춰!!)
  if(curIdx== lastIdx) return;

  curIdx++; //스크롤을 아래로 했으면 페이지 +1, 위로 올렸으면 -1씩 시키기 
}else if(e.originalEvent.deltaY < 0){

  //첫 번째 페이지인 경우에도 이벤트 핸들러 종료(올라갈 곳이 없으니 첫 번째에서 멈춰!!)
  if(curIdx == 1) return;

  curIdx--; //스크롤을 아래로 했으면 페이지 +1, 위로 올렸으면 -1씩 시키기 
}
var posTop = (curIdx-1) * $(window).height(); //이동할 페이지의 번호에 스크롤할 위치 계산

$html.animate({scrollTop : posTop}); //계산한 위치로 이동
});


var sections = $('section')
, nav = $('.fixed')
, nav_height = nav.outerHeight();

$(window).on('scroll', function () {
var cur_pos = $(this).scrollTop();

sections.each(function() {
  var top = $(this).offset().top - nav_height,
      bottom = top + $(this).outerHeight();
  
  if (cur_pos >= top && cur_pos <= bottom) {
    nav.find('a').removeClass('active');
    sections.removeClass('active');
    
    $(this).addClass('active');
    nav.find('a[href="#'+$(this).attr('id')+'"]').addClass('active');
  }
});
});

nav.find('a').on('click', function () {
  var $el = $(this)
    , id = $el.attr('href');
  
  $('html, body').animate({
    scrollTop: $(id).offset().top
  }, 500);
  
  return false;
});

// 휠 제거
var cachedWidth = $(window).width();
    $(window).resize(function(){
      var newWidth = $(window).width();
      if(newWidth !== cachedWidth){
        let bw = $("body").width();

        function react() {
          if (bw >= 801) {
            
             $(window).on('wheel');
             console.log('wheel 실행 중')
            } else {
              
               $(window).off('wheel');
               console.log('wheel 없어짐')
              }
          }
        react();

        $(window).resize(
          function(){
            react();  
        })
        $(window).resize(function(){document.location.reload();})
              //새로고침 코드================
              var delay = 300;//resize 종료 후 0.3초마다 새로 고침
              var re_timer = null;
              $(window).on('resize', function(){
                  clearTimeout(re_timer);
                  re_timer = setTimeout(function(){
                  document.location.reload();
                  }, delay);
              });
              //===================
                  cachedWidth = newWidth;
              }
    });

    /*slide*/
    //slide

// 슬라이드 전체 크기(width 구하기)
const slide = document.querySelector(".slide");
let slideWidth = slide.clientWidth;

// 슬라이드 전체를 선택해 값을 변경해주기 위해 슬라이드 전체 선택하기
let slideItems = document.querySelectorAll(".slide_item");
// 현재 슬라이드 위치가 슬라이드 개수를 넘기지 않게 하기 위한 변수
const maxSlide = slideItems.length;

// 버튼 클릭할 때 마다 현재 슬라이드가 어디인지 알려주기 위한 변수
let currSlide = 1;

// 페이지네이션 생성
const pagination = document.querySelector(".slide_pagination");


for (let i = 0; i < maxSlide; i++) {
if (i === 0) pagination.innerHTML += `<li class="active"></li>`;
else pagination.innerHTML += `<li></li>`;
}

const paginationItems = document.querySelectorAll(".slide_pagination > li");

// 무한 슬라이드를 위해 start, end 슬라이드 복사하기
const startSlide = slideItems[0];
const endSlide = slideItems[slideItems.length - 1];
const startElem = document.createElement("div");
const endElem = document.createElement("div");

endSlide.classList.forEach((c) => endElem.classList.add(c));
endElem.innerHTML = endSlide.innerHTML;

startSlide.classList.forEach((c) => startElem.classList.add(c));
startElem.innerHTML = startSlide.innerHTML;

// 각 복제한 엘리먼트 추가하기
slideItems[0].before(endElem);
slideItems[slideItems.length - 1].after(startElem);

// 슬라이드 전체를 선택해 값을 변경해주기 위해 슬라이드 전체 선택하기
slideItems = document.querySelectorAll(".slide_item");
//
let offset = slideWidth + currSlide;
slideItems.forEach((i) => {
i.setAttribute("style", `left: ${-offset}px`);
});

function nextMove() {
currSlide++;
// 마지막 슬라이드 이상으로 넘어가지 않게 하기 위해서
if (currSlide <= maxSlide) {
    // 슬라이드를 이동시키기 위한 offset 계산
    const offset = slideWidth * currSlide;
    // 각 슬라이드 아이템의 left에 offset 적용
    slideItems.forEach((i) => {
    i.setAttribute("style", `left: ${-offset}px`);
    });
    // 슬라이드 이동 시 현재 활성화된 pagination 변경
    paginationItems.forEach((i) => i.classList.remove("active"));
    paginationItems[currSlide - 1].classList.add("active");
} else {
    // 무한 슬라이드 기능 - currSlide 값만 변경해줘도 되지만 시각적으로 자연스럽게 하기 위해 아래 코드 작성
    currSlide = 0;
    let offset = slideWidth * currSlide;
    slideItems.forEach((i) => {
    i.setAttribute("style", `transition: ${0}s; left: ${-offset}px`);
    });
    currSlide++;
    offset = slideWidth * currSlide;
    // 각 슬라이드 아이템의 left에 offset 적용
    setTimeout(() => {
    // 각 슬라이드 아이템의 left에 offset 적용
    slideItems.forEach((i) => {
        // i.setAttribute("style", `transition: ${0}s; left: ${-offset}px`);
        i.setAttribute("style", `transition: ${0.15}s; left: ${-offset}px`);
    });
    }, 0);
    // // 슬라이드 이동 시 현재 활성화된 pagination 변경
    paginationItems.forEach((i) => i.classList.remove("active"));
    paginationItems[currSlide - 1].classList.add("active");
}
}
function prevMove() {
currSlide--;
// 1번째 슬라이드 이하로 넘어가지 않게 하기 위해서
if (currSlide > 0) {
    // 슬라이드를 이동시키기 위한 offset 계산
    const offset = slideWidth * currSlide;
    // 각 슬라이드 아이템의 left에 offset 적용
    slideItems.forEach((i) => {
    i.setAttribute("style", `left: ${-offset}px`);
    });
    // 슬라이드 이동 시 현재 활성화된 pagination 변경
    paginationItems.forEach((i) => i.classList.remove("active"));
    paginationItems[currSlide - 1].classList.add("active");
} else {
    // 무한 슬라이드 기능 - currSlide 값만 변경해줘도 되지만 시각적으로 자연스럽게 하기 위해 아래 코드 작성
    currSlide = maxSlide + 1;
    let offset = slideWidth * currSlide;
    // 각 슬라이드 아이템의 left에 offset 적용
    slideItems.forEach((i) => {
    i.setAttribute("style", `transition: ${0}s; left: ${-offset}px`);
    });
    currSlide--;
    offset = slideWidth * currSlide;
    setTimeout(() => {
    // 각 슬라이드 아이템의 left에 offset 적용
    slideItems.forEach((i) => {
        // i.setAttribute("style", `transition: ${0}s; left: ${-offset}px`);
        i.setAttribute("style", `transition: ${0.15}s; left: ${-offset}px`);
    });
    }, 0);
    // 슬라이드 이동 시 현재 활성화된 pagination 변경
    paginationItems.forEach((i) => i.classList.remove("active"));
    paginationItems[currSlide - 1].classList.add("active");
}
}

// 브라우저 화면이 조정될 때 마다 slideWidth를 변경하기 위해
window.addEventListener("resize", () => {
slideWidth = slide.clientWidth;
});

// 각 페이지네이션 클릭 시 해당 슬라이드로 이동하기
for (let i = 0; i < maxSlide; i++) {
// 각 페이지네이션마다 클릭 이벤트 추가하기
paginationItems[i].addEventListener("click", () => {
    // 클릭한 페이지네이션에 따라 현재 슬라이드 변경해주기(currSlide는 시작 위치가 1이기 때문에 + 1)
    currSlide = i + 1;
    // 슬라이드를 이동시키기 위한 offset 계산
    const offset = slideWidth * currSlide;
    // 각 슬라이드 아이템의 left에 offset 적용
    slideItems.forEach((i) => {
    i.setAttribute("style", `left: ${-offset}px`);
    });
    // 슬라이드 이동 시 현재 활성화된 pagination 변경
    paginationItems.forEach((i) => i.classList.remove("active"));
    paginationItems[currSlide - 1].classList.add("active");
});
}

// 드래그(스와이프) 이벤트를 위한 변수 초기화
let startPoint = 0;
let endPoint = 0;

// PC 클릭 이벤트 (드래그)
slide.addEventListener("mousedown", (e) => {
startPoint = e.pageX; // 마우스 드래그 시작 위치 저장
});

slide.addEventListener("mouseup", (e) => {
endPoint = e.pageX; // 마우스 드래그 끝 위치 저장
if (startPoint < endPoint) {
    // 마우스가 오른쪽으로 드래그 된 경우
    prevMove();
} else if (startPoint > endPoint) {
    // 마우스가 왼쪽으로 드래그 된 경우
    nextMove();
}
});

// 모바일 터치 이벤트 (스와이프)
slide.addEventListener("touchstart", (e) => {
startPoint = e.touches[0].pageX; // 터치가 시작되는 위치 저장
});
slide.addEventListener("touchend", (e) => {
endPoint = e.changedTouches[0].pageX; // 터치가 끝나는 위치 저장
if (startPoint < endPoint) {
    // 오른쪽으로 스와이프 된 경우
    prevMove();
} else if (startPoint > endPoint) {
    // 왼쪽으로 스와이프 된 경우
    nextMove();
}
});

// 기본적으로 슬라이드 루프 시작하기
let loopInterval = setInterval(() => {
nextMove();
}, 3000);

// 슬라이드에 마우스가 올라간 경우 루프 멈추기
slide.addEventListener("mouseover", () => {
clearInterval(loopInterval);
});

// 슬라이드에서 마우스가 나온 경우 루프 재시작하기
slide.addEventListener("mouseout", () => {
loopInterval = setInterval(() => {
    nextMove();
}, 3000);
});

