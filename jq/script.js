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
  $('#topbar').append('<div id="google_translate_element" style="display:none; margin-left:8px;"></div>');
  $.getScript('https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
  // Google 번역 위젯 초기화 함수 정의
  window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({
      pageLanguage: 'ko',
      includedLanguages: 'ko,ja',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
  };

  // 4) 번역 버튼(#translate-btn) 클릭 → 위젯 표시 및 일본어로 자동 번역
  $('#translate-btn').click(function() {
    $('#google_translate_element').show();

    // select 태그가 로드될 때까지 대기 후 일본어로 변경
    setTimeout(function() {
      var $select = $('#google_translate_element select');
      if ($select.length) {
        $select.val('ja').trigger('change');
      }
    }, 500);
  });

  // 5) 검색 버튼(#search-btn) 클릭 → 간단한 검색 입력창 표시
  $('#search-btn').click(function() {
    var query = $('#search-input').val();
    if (query !== null && query.trim() !== '') {
      // 여기서는 단순히 alert로 검색어를 보여주지만,
      // 실제 구현 시 검색 API 호출이나 검색 결과 페이지로 이동시키면 됨.
      alert('검색어: ' + query);
    }
  });
});

