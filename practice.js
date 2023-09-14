
// const dogs = [{ name: "Cheddar", breed: "Corgi", owner: "Holt" }, { name: "Toto", breed: "Terrier", owner: "Dorothy" }, { name: "Susan", breed: "Corgi", owner: "Lizzie" }]

// // return dog with name susan
// // find method 
// // console log variable 

// const findDoggo = dogs.find(doggo => doggo.name === "Susan" )
// console.log(findDoggo)

{/* <div id="container"> 
    </div>
    <input id="commentInput" type="text" name="comment"></input >
    <button id="clickButton">Click me</button> */}

// 1. type a comment in input field 
// 2. click button => eventHandler
// 3. p tag with that input message shows up in div , added to div -> input.value e.target 
// -> createElement, append 
// 4. clear input field -> innerText = ""

const inputValue = document.getElementById("commentInput") // #
// console.log(inputValue)
const clickButton = document.getElementById("clickButton")
const container = document.getElementById("container")

clickButton.addEventListener("click", () => {
  const pTag = document.createElement("p")
  pTag.innerHTML = inputValue.value
  container.append(pTag)
  inputValue.value = ""
})



