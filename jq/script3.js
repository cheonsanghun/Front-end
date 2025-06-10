$(document).ready(function () {
    let sum = 0;
    let num = 0;
    let kaikei = '<div id="kaikeichart"><table><tr><th class="num">No.</th><th class="name">商品</th><th class="price">値段</th><th class="quantity">数量</th></tr>'
    // 마지막 계산
    $('#kaikei').on('click', function() {
        //alert('총 금액은 ' + sum + '엔 입니다.');
        const confirmKaikei = confirm('お会計しますか？よろしければ「確認」ボタンを押してください。');
        if (confirmKaikei) {
        kaikei += `<tr><th>総計</th><th class="sum" colspan = 3>¥${sum}</th></tr></table></div>`
        $('#kaikeiscreen').html(kaikei);
        $('#top3').html('ありがとうございました。');
      }
    });
    // 직원 호출
    $('#yobidasi').on('click', function() {
        alert('只今呼び出し中です。少々お待ちください。');
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

        const confirmOrder = confirm(`「${product.name}」を「${$(`#quan-${product.id}`).val()}個」注文でよろしいでしょうか？`);
        if (confirmOrder) {
            let name = product.name;
            let quantity = parseInt($(`#quan-${product.id}`).val());
            let price = product.price;
            sum += quantity * price;
            num++;
            kaikei += `<tr><td class="num">${num}</td><td> ${name}</td><td class="price">¥${price}</td><td class="quantity">${quantity}</td></tr>`
            //console.log('주문 금액:', sum);
            //console.log('수량:', quantity);
            //console.log('가격:', price);
            alert('注文を転送しました。');
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
          alert('L.O時間が終了しました。');
        } else {
          remainingTime--;
        }
      }
      let countdownInterval = setInterval(updateCountdown, 1000);
});
  // 메뉴 카테고리별 표시
  const products = [
    { id: 1, name: "焼き鳥5種盛り", price: 1000, category: "food", image: "" },
    { id: 2, name: "炒飯", price: 600, category: "food", image: "" },
    { id: 3, name: "シーザーサラダ", price: 500, category: "food", image: "" },
    { id: 4, name: "フライドポテト", price: 350, category: "food", image: "" },
    { id: 5, name: "コーラ", price: 300, category: "drink", image: "" },
    { id: 6, name: "烏龍茶", price: 300, category: "drink", image: "" },
    { id: 7, name: "生ビール", price: 500, category: "drink", image: "" },
    { id: 8, name: "ハイボール", price: 400, category: "drink", image: "" }
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
          </div>
          <b>¥${products.price}</b> &nbsp;
          数量: &nbsp;
          <input type="number" id="quan-${products.id}" class="quan" value="0" min="0" max="10">
          &nbsp;&nbsp;
          <button id="add-${products.id}" data-price="${products.price}" class="add-btn">注文</button>
        </div>
      `);
      $list.append($item);
    });
  }