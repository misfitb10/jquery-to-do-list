function addListItem() {
    var $submitStuff = $('.submit--stuff');
    var $inputElement = $('.input--stuff');
    var list = '<ul class="todoList"></ul>';
    var $errorMessage = $('.message--error');
    var fadeSpeed = 245;

    // Append unordered list to the list container, because we don't want empty ul's and li's in the DOM.
    $('.listContainer').append(list);

    // Filter button
    $submitStuff.on('click', function(e) {
        e.preventDefault();

        if ( $inputElement.val() !== '' ) {
            $inputElement.removeClass('input--error');
            $('.todoList').append('<li>'+$inputElement.val()+' <a href="#" class="removeListItem">remove</a></li>');
            removeListItem();
        } else {
            $inputElement.addClass('input--error');
            $errorMessage.fadeIn(fadeSpeed);
        }
    });

    $(".input--stuff").on("input", function(e) {
        // Check if the value is empty or not
        if (this.value.length > 0) {
            $errorMessage.fadeOut(fadeSpeed);
            $inputElement.removeClass('input--error');
        } else {
            $errorMessage.fadeIn(fadeSpeed);
            $inputElement.addClass('input--error');
        }
    });
}

function removeListItem() {
    var $removeListItem = $('.removeListItem');

    $removeListItem.on('click', function(e) {
        e.preventDefault();
        $(this).parent().fadeOut(249);
    });
}

function ToDoList() {
    addListItem();
    removeListItem();
}

$(document).ready(function() {
    ToDoList();
});
