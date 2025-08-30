function searchUI(searchId, itemClass, searchItems) {
  $("#" + searchId).on("keyup", function (e) {
    let query = $("#" + searchId).val();

    if (query == "") {
      $("." + itemClass).fadeIn();
      return;
    }

    query = query.toLowerCase();

    $("." + itemClass).each(function (index, element) {
      for (var i in searchItems) {
        if (
          $(element).find(searchItems[i]).text().toLowerCase().indexOf(query) >=
          0
        ) {
          $(element).fadeIn();
          return;
        }
      }
      $(element).fadeOut();
    });
  });
}
