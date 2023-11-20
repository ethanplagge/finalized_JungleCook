import { addFormListner } from "../app/app.js";
var recipes = [];

export function changePage(pageName){

  $("#app .formHolder div").off("click", "**");
  $("#app .formHolder .submit").off("click", "**");

  if(pageName == "addRecipe"){
    $.get(`pages/${pageName}.html`, (data) => {
      $("#app").html(data);
      addFormListner();
    }).fail((error) => {
      console.log("error", error);
    });
  
  } else{
    $.get(`pages/${pageName}.html`, (data) => {
      $("#app").html(data);

      if(recipes.length == 0){
        console.log("no recipes");
      } else{
        $.each(recipes, (idx, recipe) => {
          $(".recipe-holder").append(`<div class="recipe"> <div class="recipeImg">
          <div class="imageHolder">
          <button class="editButton">Edit Recipe</button>
          <button class="deleteButton" id="${idx}">Delete</button>
          <button class="viewButton" id="${idx}">View</button>
          <img id="img${idx}" src="${recipe.imagePath}" alt=""></div>
          </div>
          <div class="recipeInfo">
          <div class="titleDesc">
            <h4>${recipe.itemName}</h4>
            <p>${recipe.itemDesc}</p> 
          </div>
          <div class="cookWrapper">
            <div class="cookInfo">
              <div class="cookTimeIcon"></div>
              <div class="cookTimeInfo"><p>${recipe.itemTime}</p></div>
            </div>
            <div class="cookInfo">
              <div class="cookServeIcon"></div>
              <div class="cookServeInfo"><p>${recipe.itemServe}</p></div>
            </div>
          </div>
          </div>
        `)
          $(".recipe-holder-browse").append( `<div class="recipe"> <div class="recipeImg">
          <div class="imageHolder"><img src="${recipe.imagePath}" alt=""></div>
          </div>
          <div class="recipeInfo">
          <div class="titleDesc">
            <h4>${recipe.itemName}</h4>
            <p>${recipe.itemDesc}</p> 
          </div>
          <div class="cookWrapper">
            <div class="cookInfo">
              <div class="cookTimeIcon"></div>
              <div class="cookTimeInfo"><p>${recipe.itemTime}</p></div>
            </div>
            <div class="cookInfo">
              <div class="cookServeIcon"></div>
              <div class="cookServeInfo"><p>${recipe.itemServe}</p></div>
            </div>
          </div>
          </div>`)
         
        })
      }
     
    }).fail((error) => {
      console.log("error", error);
  
    });
    
  }

}

$('#app').on('click', '.viewButton',   function(e) {
  changePage("recipeDetail");
  const recipeIndex = $(this).attr('id');
  console.log('Clicked recipe index:', recipeIndex); // Debugging

  const recipe = recipes[recipeIndex];
  console.log('Selected recipe:', recipe); // Debugging

  if (recipe && recipe.imagePath) {
      const newImage = $('<img>').attr('src', recipe.imagePath);
      console.log('Appending image:', newImage); // Debugging
      //document.getElementById("bigTest").append(newImage);
  }
    console.log(recipe.itemDesc);
    console.log(recipe.itemName);
});

$('#app').on("click", ".editButton", function(){
  changePage("editRecipe");
})

$('#app').on("click", ".deleteButton", function(){
  const recipeIndex = $(this).attr('id');
  const deletedRecipe = recipes[recipeIndex];
  recipes.splice(deletedRecipe);
  changePage("home");
  alert("Your recipe has been deleted");
})


export function addRecipe(newRecipe){
  recipes.push(newRecipe);
}




