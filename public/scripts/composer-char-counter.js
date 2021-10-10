$(document).ready(function () {

  // event handler for the new tweet letter counter which adjusts it's values appropriately
  $(".new-tweet-form textarea").on("input", function () {
    const formOutput = ".new-tweet-form output";
    let tweetLength = $(this).val().length;
    $(formOutput).val(140 - tweetLength);
    if ($(this).val().length > 140) {
      $(formOutput).css("color", "red");
    } else {
      $(formOutput).css("color", "#483a3a");
    }
  });

});