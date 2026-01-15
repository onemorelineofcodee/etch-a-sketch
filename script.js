let eraser = false ;
let randomColor  = false ;
let newSideCopy = undefined ; 

//add click holding to rainbow mode and eraser 

let rainbowMode = document.querySelector(".randomColor");
let eraserMode = document.querySelector(".eraser");

let masterColor = undefined ;

function masterColordetermine(){
    
    masterColor = undefined ;
    if(eraser){
        masterColor = "#ffffff";
    }
    if(randomColor){
        masterColor = "#";
        for(let i=0;i<6;++i){
            masterColor += Math.floor(Math.random()*9);
        }
    }

    return masterColor || colorPicker.value;

}


rainbowMode.addEventListener("click",(e)=>{
    e.target.classList.toggle("pinned");
    randomColor = !randomColor;
    if(eraser){
        eraser = !eraser;
        eraserMode.classList.toggle("pinned");
    }
    
});

eraserMode.addEventListener("click",(e)=>{
    
    e.target.classList.toggle("pinned");
    eraser = !eraser ;

});


//div maker funtion 
//auto 16*16 grid 
//make canvas resizer and left and right buttons 
let leftSide = document.querySelector(".left-buttons");
let rightSide = document.querySelector(".right-buttons");
let mainCanvas = document.querySelector(".canvas");


function canvasResizer(number=16){
     let no_of_grids = 600/number;
     let side = undefined ;
     let newSide = undefined;
     if(Math.trunc(no_of_grids) == no_of_grids){
        side = no_of_grids;
     }else if(Math.trunc(no_of_grids)+0.5 < no_of_grids){
        side = Math.trunc((600/number)) + 1;
        newSide = (side * number);
        
        mainCanvas.style.height = `${newSide+4}px`;
        mainCanvas.style.width = `${newSide+4}px` ;

        leftSide.style.height = `${newSide+4}px`;
        rightSide.style.height = `${newSide+4}px`;
     }else {
        side = Math.trunc(600/number);
        newSide = (side * number);
        
        mainCanvas.style.height = `${newSide+4}px`;
        mainCanvas.style.width = `${newSide+4}px` ;

        leftSide.style.height = `${newSide+4}px`;
        rightSide.style.height = `${newSide+4}px`;
     }
     newSideCopy = newSide+4;
     divMaker(number,side);
}


// now just set the color value 
let colorPicker = document.querySelector(".colorPicker");

//if color value is altered then make sure eraser is chekced back
colorPicker.addEventListener("change",(e)=>{
    if(eraser){
        eraser = !eraser;
        eraserMode.classList.toggle("pinned"); 
    };
     
})


//create element and add event listener
function divMaker(number , side ){
      
    
  
      mainCanvas.replaceChildren();
      for(let i=0;i<number*number;++i){
        let div = document.createElement("div");
        div.setAttribute("style",`width:${side}px;height:${side}px;`);
        div.addEventListener("pointerenter",(e)=>{

            if (e.buttons & 1){
            e.target.style.backgroundColor = masterColordetermine();
      }});
        mainCanvas.append(div);
        
      }
}



//slider and change 
let gridValue = document.querySelector(".chooseGridSize > input");
let gridValueDisplay = document.querySelector(".currentGridSize");
gridValue.addEventListener("change",(e)=>{
    gridValueDisplay.textContent = `${gridValue.value}x${gridValue.value}`;
    canvasResizer(gridValue.value);

});

// mordern art button 

function morderart(){
    for( const i of mainCanvas.children){
       i.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
    }
}

let morderartBtn = document.querySelector(".mordernArt");
morderartBtn.addEventListener("click",(e)=>{
    morderart();
});

// eraseall funtion
let eraseAllBtn = document.querySelector(".eraseAll");
eraseAllBtn.addEventListener("click",(e)=>{
    for(const c of mainCanvas.children){
        c.style.backgroundColor = "#ffffff";
    }
});


let artNumber = 0 ;
function savePicture(){
    let body = document.querySelector("body");
    
    let container = document.createElement("div");
    let artName = document.createElement("div");

    //parent 
    let empty = document.createElement("div");

    empty.setAttribute("style","margin:auto");
    artName.textContent = `ART : ${artNumber+1}`;
    artNumber += 1;
    artName.setAttribute("style",`font-family: "Roboto Mono", monospace;\
    text-align: center;\
    font-size: 26px;\
    font-weight: 600;\
    border : 1px solid black;\
    margin-top:50px;\
    `);
    
    container.setAttribute("style",`display: flex;\
        flex-wrap: wrap;\
        width : ${newSideCopy}px;\
        height : ${newSideCopy}px;\
        border : 2px solid black;\
        margin : auto;`
    );
    for (const c of mainCanvas.children){
        let div = document.createElement("div");
        div.style.length = c.style.length ;
        div.style.width = c.style.width ;
        div.style.backgroundColor = c.style.backgroundColor ;
        container.appendChild(div);
    }
   
    empty.appendChild(artName);
    empty.appendChild(container);
    body.appendChild(empty);
}

let saveBtn = document.querySelector(".save");
saveBtn.addEventListener("click",savePicture);


canvasResizer();

