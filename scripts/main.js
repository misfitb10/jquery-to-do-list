function ToDoList() {
    // Create container for the list
    createListContainer();

    var $inputStuff = $('.input--stuff');

    // Add list items through ADD button
    var $submitStuff = $('.submit--stuff');
    if ($submitStuff.length) {
        $submitStuff.on('click', addListItem);
    }

    // Add list items through ENTER
    if ($inputStuff.length) {
        $inputStuff.bind('keypress', function(e) {
            var codeEnter = 13;

            if (e.keyCode === codeEnter) {
                addListItem();
            }
        });
    }

    // Check if the input field is empty
    if ($inputStuff.length) {
        $inputStuff.on('input', checkEmptyValue);
    }

    // Remove entire list
    var $btnRemoveEntireList = $('.btn--removeEntireList');
    if ($btnRemoveEntireList) {
        $btnRemoveEntireList.on('click', removeEntireList);
    }
}

function createListContainer() {
    var $listContainer = $('.listContainer');
    var list = '<ul class="todoList"></ul>';

    // Append unordered list to the list container, because we don't want empty ul's and li's in the DOM
    return $listContainer.append(list);
}

function createListItem() {
    var $inputElement = $('.input--stuff');
    return '<li>' + $inputElement.val() + ' <a href="#" class="btn btn--removeListItem">X</a></li>'
}

function createRemoveEntireListButton() {
    return '<a href="#" class="btn btn--removeEntireList">Remove entire list</a>'
}

function addListItem(e) {
    if (e) { e.preventDefault() }

    var $inputElement = $('.input--stuff');
    var $btnRemoveEntireList = $('.btn--removeEntireList');
    var $errorMessage = $('.message--error');
    var $todoList = $('.todoList');
    var fadeSpeed = 245;

    // Check if the value is not empty
    if ($inputElement.val() !== '') {
        $todoList.append(createListItem());

        // Remove list item (bind only once!)
        $('.btn--removeListItem').off().on("click", function(e){
            e.preventDefault();
            removeListItem(this);
        });

        // If there are more than 1 list items, show the `remove entire list` button
        if ($('.todoList li').length > 1) {
            if ( !$btnRemoveEntireList.length ) {
                $todoList.after(createRemoveEntireListButton);

                // Bind remove entire list
                $('.btn--removeEntireList').on('click', removeEntireList);
            }
        }
    } else {
        $inputElement.addClass('input--error');
        $errorMessage.fadeIn(fadeSpeed);
    }
}

function checkEmptyValue() {
    var $errorMessage = $('.message--error');
    var $inputElement = $('.input--stuff');
    var errorClass = 'input--error';
    var fadeSpeed = 245;

    if ($inputElement.val().length > 0) {
        $errorMessage.fadeOut(fadeSpeed);
        $inputElement.removeClass(errorClass);
    } else {
        $errorMessage.fadeIn(fadeSpeed);
        $inputElement.addClass(errorClass);
    }
}

function removeListItem(thisItem) {
    $(thisItem).parent().remove();
    checkEmptyList();
}

function removeEntireList(e) {
    if (e) { e.preventDefault() }
    $('.btn--removeEntireList, .todoList li').remove();
}

function checkEmptyList() {
    var $todoListItem = $('.todoList li');
    if ($todoListItem.length === 0) {
        $('.btn--removeEntireList').remove();
    }
}

$(function() {
    ToDoList();
});
