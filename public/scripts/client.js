$(document).ready(function () {

  loadTweets();

  // handles the AJAX requests when submitting a new tweet
  $("form").on("submit", function (event) {
    event.preventDefault();
    const $data = $(this).serialize();

    // checks if form is empty
    if ($data === "text=") {
      $("#error-message").html("What?! Nothing? I'm confused...");

      $("#error-message").slideDown();
      return;
    }
    // checks if form has more than 140 INPUTTED characters
    if ($data.length > 145) {
      $("#error-message").html("Because I am a potato, I can only handle 140 characters... Sorry!");

      $("#error-message").slideDown();
      return;
    }
    // if there are no errors, go ahead and post the tweet to /tweets
    $.post("/tweets", $data, function () {
      $("#error-message").slideUp();
      loadTweets();
    });
  });

  // makes a get request to the server and then passes the new data to the renderer function
  function loadTweets() {
    $.get("/tweets", function (newData) {
      renderTweets(newData);
    });
  }
  
  // assists loadTweets(), handles adding new tweets to the tweet-container html element
  function renderTweets(tweets) {
    $('#tweets-container').empty();
    $('#new-tweet-text').val('');
    $('.counter output').val(140);
    for (const tweet of tweets) {
      const newTweet = createTweetElement(tweet);
      $('#tweets-container').prepend(newTweet);
    }
  }

  // assists renderTweets(), this function is an HTML markup template which converts the data of each tweet into something we can display
  function createTweetElement(tweet) {
    return $(`
    <article class="tweet">
    <header>
      <img src=${tweet.user.avatars}></img>
      <div class="username">
        ${tweet.user.name}
      </div>
      <div class="handle">
        ${tweet.user.handle}
      </div>
    </header>
    <div class="tweet-contents">
      ${escape(tweet.content.text)}
    </div>
    <footer>
      ${timeago.format(tweet.created_at)}
      <div>
        <i class="fa-solid fa-flag"></i>
        <i class="fa-solid fa-retweet"></i>
        <i class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>
    `);
  }
  
  //helps the template prevent cross-site attacks by disallowing the server to render HTML scripts that are submitted as a tweet.
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

});



