// Get the modal
var deletePostModal = document.getElementById('deletePostModal');

// Get the button that opens the modal
var deletePostBtn = document.getElementById('#{post._id}');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("closeDeletePost")[0];

// When the user clicks the button, open the modal
deletePostBtn.onclick = function() {
      deletePostModal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
      deletePostModal.style.display = "none";
};

