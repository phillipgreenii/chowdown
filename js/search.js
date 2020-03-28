---
---
var matchRecipes = (function () {

var recipes = [
  {% for recipe in site.recipes %}
    {
      "id"	: "{{ recipe.name }}",
      "title"	: "{{ recipe.title | escape }}",
      {% if recipe.ingredients %}"ingredients"	: "{% for ingredient in recipe.ingredients %}{{ ingredient | escape }}, {% endfor %}",{% endif %}
      {% if recipe.tags %}"tags"	: "{% for tag in recipe.tags %}{{ tag | escape }} {% endfor %}",{% endif %}
      "image"	: "{{ site.baseurl }}/images/{{ recipe.image }}",
      "url"	: "{{ site.baseurl }}{{ recipe.url }}"      
    } {% unless forloop.last %},{% endunless %}
  {% endfor %}
];

var idx = lunr(function() {
  this.ref("id");
  this.field("title");
  this.field("ingredients");
  this.field("tags");
  recipes.forEach(function(doc) {
    this.add(doc);
  }, this);
});

function matchRecipes(txt) {
  if (txt == null) {
    return null;
  }

  var matches = {};

  idx.search(txt).forEach(function(m) {
    matches[m.ref] = true;
  });

  return matches;
}

return matchRecipes;
})();



