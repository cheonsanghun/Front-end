$(document).ready(function () {

    let url = 'http://apis.data.go.kr/B490007/worldjob31/openApi31';
    let serviceKey = 'p6hJ4G2EQTBiPROm2a34/B78odVpWd45ZVTjOV7QQP8O5bBdeLFYOlYESg7IBC3pq3vaYdG2E0IJccxsRwXSjA==';
    let numOfRows = 10;

    function fetchData(pageNo) {
        // 결과 및 페이징 초기화
        $('#results').empty();
        $('#pagination').empty();

        var companyName = $('#company-search').val();
        var countryName = $('#country-select').val();

        $.ajax({
            url: url,
            type: 'GET',
            dataType: 'xml',
            data: {
                serviceKey: serviceKey,
                searchEntNm: companyName,
                searchNationNm: countryName,
                numOfRows: numOfRows,
                pageNo: pageNo
            },
            success: function (xml) {
                // XML 내 태그는 ITEM
                var $items = $(xml).find('ITEM');

                if ($items.length === 0) {
                    $('#results').append('<li>검색 결과가 없습니다.</li>');
                    return;
                }

                $items.each(function () {
                    var $it = $(this);
                    var title = $it.find('rctntcSj').text();
                    var entNm = $it.find('entNm').text();
                    var nation = $it.find('rctntcNationNm').text();
                    var career = $it.find('careerStleNm').text();
                    var period = $it.find('rctntcBgnDe').text() + ' ~ ' + $it.find('rctntcEndDe').text();

                    $('#results').append(
                        '<li>' +
                        '<strong>' + title + '</strong><br>' +
                        '회사: ' + entNm + ' | 국가: ' + nation + '<br>' +
                        '경력: ' + career + ' | 기간: ' + period +
                        '</li>'
                    );
                });

                //pagination
                var totalCount = parseInt($(xml).find('totalCount').text(), 10) || 0;
                var totalPages = Math.ceil(totalCount / numOfRows);
                var pagesPerGroup = 10;  // 한 블록에 표시할 페이지 수
                //현재 페이지가 속한 블록의 시작 페이지
                var groupStart = Math.floor((pageNo - 1) / pagesPerGroup) * pagesPerGroup + 1;
                //블록의 끝 페이지 (총 페이지를 넘지 않도록)
                var groupEnd = Math.min(groupStart + pagesPerGroup - 1, totalPages);

                $('#pagination').empty();

                //이전 블록으로
                if (groupStart > 1) {
                    $('<button>')
                        .text('‹‹')
                        .on('click', function () {
                            fetchData(groupStart - pagesPerGroup);
                        })
                        .appendTo('#pagination');
                }

                for (var i = groupStart; i <= groupEnd; i++) {
                    var $btn = $('<button>')
                        .text(i)
                        .toggleClass('active', i === pageNo)
                        .on('click', (function (p) {
                            return function () { fetchData(p); };
                        })(i));
                    $('#pagination').append($btn);
                }

                //다음 블록으로
                if (groupEnd < totalPages) {
                    $('<button>')
                        .text('››')
                        .on('click', function () {
                            fetchData(groupStart + pagesPerGroup);
                        })
                        .appendTo('#pagination');
                }
            },
            error: function (xhr, status, err) {
                console.error('API 호출 오류:', status, err);
                $('#results').append('<li>데이터를 불러오는 중 오류가 발생했습니다.</li>');
            }
        });
    }

    //초기 로드: 1페이지 데이터 표시
    fetchData(1);

    //검색 버튼 클릭 시 1페이지부터 다시 조회
    $('#search-btn1').click(function () {
        fetchData(1);
    });
});
