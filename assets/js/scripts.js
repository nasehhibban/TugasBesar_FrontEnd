$(document).ready(function () {
    $('.select2').select2({
        theme: 'bootstrap-5',
        minimumInputLength: 3,
        allowClear: true,
        placeholder: 'Masukkan Nama Pahlawan',
        ajax: {
            dataType: 'json',
            url: 'https://indonesia-public-static-api.vercel.app/api/heroes',
            delay: 250,
            data: function (params) {
                return {
                    name: params.term
                }
            },
            processResults: function (response) {
                console.log(response);
                return {
                    results: $.map(response, function (item) {
                        // console.log(item.parameters);
                        // return item
                        return {
                            text: item.name,
                            id: item.name
                        }
                    })
                };
            },
        }
    }).on('select2:select', function (evt) {
        var data = $(".select2 option:selected").text();
        var expression = new RegExp(data, "i");
        $.getJSON('https://indonesia-public-static-api.vercel.app/api/heroes', function (data) {
            $.each(data, function (key, value) {
                console.log(value.name.search(expression));
                if (value.name.search(expression) != -1) {
                    $('#data').addClass('d-none');
                    $('#result').removeClass('d-none');
                    $('#result').html('<tr>' + '<td>' + value.name + '</td>' + '<td>' + value.birth_year + '</td>' + '<td>' + value.death_year + '</td>' + '<td>' + value.ascension_year + '</td>' + '<td>' + value.description + '</td>' + '</tr>');
                }
            });
        });
    });
});

$(document).ready(function () {
    $.getJSON('https://indonesia-public-static-api.vercel.app/api/heroes', function (data) {
        $.each(data, function (key, value) {
            $('#data').append('<tr>' + '<td>' + value.name + '</td>' + '<td>' + value.birth_year + '</td>' + '<td>' + value.death_year + '</td>' + '<td>' + value.ascension_year + '</td>' + '<td>' + value.description + '</td>' + '</tr>');
        });
    });
});



