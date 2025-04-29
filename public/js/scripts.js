$(document).ready(() => {
    $('#cityInput').on('input', function() {
        const city = $(this).val();

        if (city.length > 0) {
            $.get('/weatherCheck', { city: city }, (data) => {
                $('#weatherResult').html(data);
            }).fail(function() {
                $('#weatherResult').html('<p class="text-red-600">Failed to fetch weather data. Please check the location or API key.</p>');
            });
        } else {
            $('#weatherResult').html('');
        }
    });
});

$(document).ready(() => {
    $.get('/opentdb'), (data) => {
        $('#result').html(data)
    }
})

$(document).ready(() => {
    function calculate() {
        const firstValue = $('#firstValue').val();
        const secondValue = $('#secondValue').val();
        
        $.post('/calculate', { firstValue, secondValue }, (data) => {
            $('#addResult').text(data.add);
            $('#mulResult').text(data.mul);
            $('#subResult').text(data.sub);
            $('#divResult').text(data.div);
            $('#aveResult').text(data.ave);
        });
    }
    
    $('#firstValue, #secondValue').on('input', calculate);
});

$(document).ready( () => {
    function updateCurrencyOptions() {
        const currency1 = $('#currency1').val();
        const currency2 = $('#currency2').val();
        
        $('#currency2 option').each( () => {
            $(this).prop('disabled', $(this).val() === currency1);
        });
        $('#currency1 option').each( () => {
            $(this).prop('disabled', $(this).val() === currency2);
        });
    }

    function convertCurrency(isReverse) {
        const currency1 = isReverse ? $('#currency2').val() : $('#currency1').val();
        const currency2 = isReverse ? $('#currency1').val() : $('#currency2').val();
        const amount1 = isReverse ? $('#amount2').val() : $('#amount1').val();

        if (amount1 !== '') {
            $.ajax({
                url: '/currencyConvert',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({ currency1, currency2, amount1 }),
                success: (data) => {
                    if (isReverse) {
                        $('#amount1').val(data.convertedAmount);
                    } else {
                        $('#amount2').val(data.convertedAmount);
                    }
                },
                error: () => {
                    if (isReverse) {
                        $('#amount1').val('Error');
                    } else {
                        $('#amount2').val('Error');
                    }
                }
            });
        }
    }

    $('#currency1, #currency2').on('change', () => {
        updateCurrencyOptions();
    });

    $('#amount1').on('input', () => {
        convertCurrency(false);
    });

    $('#amount2').on('input', () => {
        convertCurrency(true);
    });

    updateCurrencyOptions();
});

