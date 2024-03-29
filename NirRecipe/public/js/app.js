// app.js
$(document).ready(function() {
  // Fetch recipes
  $.get('/api/recipes', function(recipes) {
    recipes.forEach(function(recipe) {
      $('#recipes').append(`
        <div>
          <h2>${recipe.title}</h2>
          <p>Category: ${recipe.category}</p>
          <p>Ingredients: ${recipe.ingredients.join(', ')}</p>
          <p>Instructions: ${recipe.instructions}</p>
          <p>Rating: ${recipe.rating}</p>
          <form id="ratingForm_${recipe._id}">
            <input type="number" name="rating" placeholder="Rate it (1-5)">
            <button type="submit">Submit</button>
          </form>
          <h3>Comments:</h3>
          <ul id="comments_${recipe._id}"></ul>
          <form id="commentForm_${recipe._id}">
            <input type="text" name="comment" placeholder="Your comment">
            <input type="text" name="user" placeholder="Your name">
            <button type="submit">Submit</button>
          </form>
        </div>
      `);
      // Handle rating submission
      $(`#ratingForm_${recipe._id}`).submit(function(e) {
        e.preventDefault();
        const rating = $(this).find('input[name="rating"]').val();
        $.ajax({
          url: `/api/recipes/${recipe._id}/rate`,
          method: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify({ rating: rating }),
          success: function(data) {
            $(`#recipes`).empty();
            location.reload();
          }
        });
      });
      // Handle comment submission
      $(`#commentForm_${recipe._id}`).submit(function(e) {
        e.preventDefault();
        const comment = $(this).find('input[name="comment"]').val();
        const user = $(this).find('input[name="user"]').val();
        $.ajax({
          url: `/api/recipes/${recipe._id}/comment`,
          method: 'PUT',
          contentType: 'application/json',
          data: JSON.stringify({ text: comment, user: user }),
          success: function(data) {
            $(`#recipes`).empty();
            location.reload();
          }
        });
      });
    });
  });
});
