$(document).ready(function () {
    // 총 주문 금액
     let sum = 0;
    $('#kaikei').on('click', function() {
        alert('총 금액은 ' + sum + '엔 입니다.');
    });
    $('#yobidasi').on('click', function() {
        alert('지금 직원을 호출 중입니다. 잠시만 기다려 주세요');
    });
    // 초기화면
    categoryChange('food');

    // 메뉴선택시 전환
    $('#categoryList button').on('click', function () {
      $('#categoryList button').removeClass('active');
      $(this).addClass('active');
      const category = $(this).data('category');
      categoryChange(category);
    });

    // 주문 버튼 클릭시
    $(document).on('click', '.add-btn', function () {
        const productId = $(this).attr('id').replace('add-', ''); // 버튼의 ID에서 제품 ID 추출
        const product = products.find(p => p.id == productId);
        
        if (!product) return; // 제품을 찾을 수 없으면 종료

        const confirmOrder = confirm('주문하시겠습니까?');
        if (confirmOrder) {
            let quantity = parseInt($(`#quan-${product.id}`).val());
            let price = product.price;
            sum += quantity * price;
            console.log('주문 금액:', sum);
            console.log('수량:', quantity);
            console.log('가격:', price);
        }
    });
    
    // L.O 까지 남은 좌석시간 표시
    let remainingTime = 5400;
      
    function updateCountdown() {
        let hours = Math.floor(remainingTime / 3600);
        let minutes = Math.floor((remainingTime - hours*3600) / 60);
        let seconds = remainingTime % 60;
        
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        seconds = seconds < 10 ? '0' + seconds : seconds;
        
        $('#remaining-time').text(`${hours}:${minutes}:${seconds}`);
        
        if (remainingTime <= 0) {
          clearInterval(countdownInterval);
          $('#remaining-time').text('');
          alert('L.O시간이 종료되었습니다.');
        } else {
          remainingTime--;
        }
      }
      let countdownInterval = setInterval(updateCountdown, 1000);
});
  // 메뉴 카테고리별 표시
  const products = [
    { id: 1, name: "焼き鳥5種盛り", price: 1000, category: "food", image: "" },
    { id: 2, name: "フライドポテト", price: 600, category: "food", image: "" },
    { id: 3, name: "コーラ", price: 350, category: "drink", image: "" },
    { id: 4, name: "生ビール", price: 500, category: "drink", image: "" }
  ];

  function categoryChange(category) {
    const filtered = products.filter(p => p.category === category);
    const $list = $('#productList');
    $list.empty();
    filtered.forEach(products => {
      const $item = $(`
        <div class="product">
          <img src="${products.image}" alt="${products.name}">
          <div class="product-info">
            <h4>${products.name}</h4>
            <p>¥${products.price}</p>
          </div>
          수량 &nbsp;
          <input type="number" id="quan-${products.id}" class="quan" value="0" min="0" max="10">
          &nbsp;&nbsp;
          <button id="add-${products.id}" data-price="${products.price}" class="add-btn">주문</button>
        </div>
      `);
      $list.append($item);
    });
  }