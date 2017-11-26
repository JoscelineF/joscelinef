$(function() {
  var users = ['ESL_SC2', 'cretetion', 'freecodecamp', 'storbeck', 'OgamingSC2', 'habathcx', 'RobotCaleb', 'noobs2ninjas', 'brunofin','DansGaming','moonmoon_ow','bethesda','wesg_dota2','Hearthstone','Fortnite'];
  var api = 'https://wind-bow.gomix.me/twitch-api';
  var notFound = [];

  users.forEach(function(element) {
    var streamsUrl = api + '/streams/' + element;
    var channelsUrl = api + '/channels/' + element;
    $.ajax({
      url: streamsUrl,
      dataType: 'jsonp',
      type: 'GET',
      success: function(data) {
        if (data.stream == null) {
          // stream._links.channel - channel link
          $.ajax({
            url: channelsUrl,
            dataType: 'jsonp',
            type: 'Get',
            success: function(results) {
              if (results.status === 404) {
                //user not found
                notFound.push(element);
              } else {
                var userChip = '';
                if (results.logo == null) {
                  userChip = results.display_name;
                } else {
                  userChip = '<img src="' + results.logo + '" alt="Contact Person">' + results.display_name;
                }
                var createdDate = new Date(results.created_at).toDateString();
                $('.channels').append('<div class="card offline hvr-grow-shadow"><div class="title">' + userChip + '</div><div class="card-desc"><p>' + results.display_name + ' is currently offline</p><div class="info"><p>Streaming since: ' + createdDate +'</p><p>Follower count: ' + results.followers + '</p></div></div><div class="card-footer"><a href="https://www.twitch.tv/' + element + '" target="_blank">Visit the channel</a></div></div>');
              }
            },
            fail: function(err) {
              $('.error').show();
              $('.error').html('<p>Error code: ' + err.status + ' - ' + err.error + '</p>');
            },
          });
        } else {
          var createdDate = new Date(data.stream.created_at).toDateString();
          $('.channels').append('<div class="card online hvr-grow-shadow"><div class="title"><img src="' + data.stream.channel.logo + '" alt="Contact Person">' + data.stream.channel.display_name + '</div><div class="card-desc"><img src="' + data.stream.preview.medium + '" width="250" /><p>' + data.stream.channel.game + ': ' + data.stream.channel.status + '</p><div class="info"><p>Streaming since: ' + createdDate +'</p><p>Follower count: ' + data.stream.channel.followers + '</p></div></div><div class="card-footer"><a href="https://www.twitch.tv/' + element + '" target="_blank">Visit the channel</a></div></div>');
        }
      }, // end of success
      fail: function(err) {
        $('.error').html('<p>Error code: ' + error.status + ' - ' + error.error + '</p>');
      }
    }); // end of ajax call
  }); // end of foreach
  $('#all').click(function() {
    $('#online').removeClass('selected');
    $('#offline').removeClass('selected');
    $('#all').addClass('selected');
    $('.online').slideDown();
    $('.offline').slideDown();
  });
  $('#online').click(function() {
    $('#all').removeClass('selected');
    $('#offline').removeClass('selected');
    $('#online').addClass('selected');
    $('.offline').slideUp();
    $('.online').slideDown();
  });
  $('#offline').click(function() {
    $('#online').removeClass('selected');
    $('#all').removeClass('selected');
    $('#offline').addClass('selected');
    $('.online').slideUp();
    $('.offline').slideDown();
  });
});