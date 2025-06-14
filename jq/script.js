$(document).ready(function() {
  // 1) 햄버거 메뉴(#menu-toggle) 클릭 → 사이드바(#sidebar) 토글
  $('#menu-toggle').click(function() {
    $('#sidebar').toggleClass('active');
  });

  // 2) 사이드바 메뉴 항목(.menu-item) 클릭 → data-target에 지정된 페이지로 이동
  $('.menu-item').click(function() {
    var targetPage = $(this).data('target');
    window.location.href = targetPage;
  });

  // 3) Google 번역 위젯 영역을 상단바에 동적으로 추가하고 스크립트 로드
  $.getScript('https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
  // Google 번역 위젯 초기화 함수 정의
  window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
      pageLanguage: 'ko',
      includedLanguages: 'ko,ja',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
  };

});