import { addRecipe, changePage } from "../data/model.js";

let initialDescCount = 3;
let initialInstCount = 3;
var recipes = [];

function initListeners() {
  $("a").on("click", (e) => {
    e.preventDefault();
    let test = e.currentTarget.id;
    changePage(test);
  })
}

export function addFormListner(){
  $(".descBtn").on("click", (e) =>{
    initialDescCount++;
    $(".formDesc").append(
      `<input id="desc${initialDescCount - 1}" type="text" placeholder="Description ${initialDescCount}">`
    )
  })

  $(".formBtn").on("click", (e) =>{
    initialInstCount++;
    $(".formInst").append(
      `<input id="desc${initialInstCount - 1}" type="text" placeholder="Description ${initialInstCount}">`
    )
  })

  $(".submitBtn").on("click", (e) =>{
    let newItemObj = {};

    let imagePath = $("#imagePath").val();
    let itemName = $("#itemName").val();
    let itemDesc = $("#itemDesc").val();
    let itemTime = $("#itemTime").val();
    let itemServe = $("#itemServe").val();
    newItemObj.imagePath = imagePath;
    newItemObj.itemName = itemName;
    newItemObj.itemDesc = itemDesc;
    newItemObj.itemTime = itemTime;
    newItemObj.itemServe = itemServe;
    newItemObj.descriptions = [];
    $('.formDesc input').each(function (index, data){      
      var value = $(this).val();
      if(value !== ""){
        let keyName = "description" + index;
        let descObj = {};
        descObj[keyName] = value;
        newItemObj.descriptions.push(descObj);
      }
      
    })
    newItemObj.instructions = [];
    $('.formInst input').each(function (index, data){
      var value = $(this).val();
      if(value !== ""){
        let keyName = "instruction" + index;
      let instObj = {};
      instObj[keyName] = value;
      newItemObj.instructions.push(instObj);
      
      }
    });
    addRecipe(newItemObj);
  })

}

$(document).ready(function () {
  changePage("home");
  initListeners();

});