    let squares = document.querySelectorAll("td");//Get all squares in the table
    let restart = document.querySelector("#butt");//Restart button
    let playerArr = [];//This array stores the two players
    let gameValue = " "; //Game value is either X and O depending on player called
    let moveCount = 0;//Tracks each move made by players
    let playersection = document.querySelector("div#playersection");//The div containing the player radio buttons
    let ticTable = document.querySelector("table#tic-table")//The tic tac table 
    let result = document.querySelector("div#result");//div displaying Game drawn or Game win 
    let tdArray =[];//This array stores <Td> inorder to loop through
    let playerRadio = document.getElementById("1player");//Player radio button
    let playerRadio2 = document.getElementById("2player");//Player radio button

    //GET ALL CELL ID'S AND STORE THEM IN VARIABLES
    let cell1 = document.getElementById("1"),
        cell2 = document.getElementById("2"),
        cell3 = document.getElementById("3"),
        cell4 = document.getElementById("4"),
        cell5 = document.getElementById("5"),
        cell6 = document.getElementById("6"),
        cell7 = document.getElementById("7"),
        cell8 = document.getElementById("8"),
        cell9 = document.getElementById("9");

    //CLEAR BOARD WHEN THE RESTART BUTTON IS CLICKED
   restart.addEventListener('click', clearBoard);
   function clearBoard() {
       for(let i = 0; i<squares.length; i++){
           squares[i].textContent = "";
       }
       location.reload();
   }
 

   /*THE FOR EACH FUNCTION BELOW LOOPS THROUGH EACH CELL IN THE TABLE AND 
   PERFORMS EACH OF THE OPERATIONS CALLED INSIDE THEM*/
        squares.forEach((value, index) =>{//where value is each cell and index is the index of each one
            value.setAttribute('data-id',index);//index is assigned as the data-id for each cell(UNECESSARY)
            value.addEventListener("click", play);//Add Event Listener to each cell
    
            //PLAY GAME ON EACH CELL
            function play() {
                callNextPlayer();//Call player
                value.textContent = gameValue;//Update Content on the table cell to players value(either X or O)
                incrementMoves();//Increment move after each player play's
                checkDraw();//Check for Draw 
                   
            }//end play
    
            //INCREMENT MOVES AND CHECK FOR GAME WINNER ON EACH MOVE
            function incrementMoves() {
                for(let i = 0; i<squares.length; i++){//Loop Through and Increment The cell for which this function(UNECESSARY loop)
                    moveCount++;//was called
                    removeEvent(squares);//Remove Event from that cell to prevent click
                    console.log(moveCount);
                    if(moveCount >=5){//Only check for win when at least five moves have been made
                        if(checkWin() == true){
                            ticTable.setAttribute('disabled',true);//Aimed at disabling the table but not functional
                            result.innerHTML = "Game won by "+ gameValue;//Output Win and Winner
                            return;//Return to caller function (Play()) to prevent going back to the for loop
                         }else{
                             return;//Just Return to caller function
                         }
                        
                    }
                    else{
                        return;
                    }
                    
                }
            }//end increment moves
    
            //CHECK DRAW ON EXHAUSTION OF MOVES 
            function checkDraw() {
                for(let i = 0; i<squares.length; i++){
                if(moveCount == squares.length && checkWin() == false){ //If move is exhausted and there is no winner
                    let gameDrawn = document.createElement("span");//Create a Span element to display draw result
                    gameDrawn.textContent = "Game Drawn";//Send This Text to the Span
                    gameDrawn.classList.add("display-4");//Bootstrap typography class
                    gameDrawn.style.color = "blue";//Color of text
                    result.appendChild(gameDrawn);//Append Created Span to The Result Div
                    return true;
                }//end if
                else{
                    return false;
                }
            }
            }
            
            //REMOVE CLICK EVENT FROM PLAYED CELLS 
            function removeEvent(x) {
                for(let i = 0; i<squares.length; i++){//Loop Through Squares
                   tdArray.push(x[i]);//Push Squares into an array inorder to use array function (forEach())
                   tdArray.forEach((element ,index)=> {
                       element.removeEventListener("click", play);//Remove Event Listener from each Square 
                                   
                   })
                }
                
            }
    
        })    
    
    
   

//PLAYER X(ONE)
   function playerOne() {
    gameValue = "X";//Player One is X
       
    if(playerArr.includes(playerOne)){//If Player One Exists in the player Array (Meaning Player One Hasn't played)
        playerArr.splice(playerOne,1)//Remove Player One from Array Inorder to call Next Available player on Next Click
    }//DELETE PLAYER FROM ARRAY
    return gameValue;
   }

//PLAYER O(TWO)
   function playerTwo() {
       gameValue = "O";//Player Two is O
       
       if(playerArr.includes(playerTwo)){//If Player Two Exists in player Array(Meaning Player two Hasn't played)
           playerArr.pop();//Remove Player Two from Array Inorder to call Next Available Player on Next Click
       }//DELETE PLAYER FROM ARRAY
       return gameValue;
   }

   //CALL NEXT PLAYER ON CLICK OF CELL
   function callNextPlayer() {
       if (playerArr == ""){//When there's no player, meaning both player's have neither or have both played
        playerArr.push(playerOne);//Set in Player one
        playerArr.push(playerTwo);//Set in Player Two
       }
       
       
       for(let i = 0; i<playerArr.length; i++){
           if(playerArr[i] == playerOne){
               playerRadio.removeAttribute("checked", true);
               playerRadio2.setAttribute("checked", true);
               playerArr[i](); //CALL PLAYER ONE IF IT EXISTS IN ARRAY, MEANING PLAYER ONE HAS'NT PLAYED
               //console.log(playerArr)
           }else if(playerArr[i] == playerTwo){
               playerRadio2.removeAttribute("checked", true);
               playerRadio.setAttribute("checked", true);
               playerArr[i](); //ONLY PLAYER TWO IS LEFT IN ARRAY MEANING  PLAYER TWO HAS'NT PLAYED
               
           }else {
            console.log("Seems player one has been lost from the array")
           }
       }
   }

   //CHECK FOR WINNER
   function checkWin() {
       if(cell1.textContent == cell2.textContent && cell1.textContent == cell3.textContent && cell1.textContent != ""){
          cell1.style.backgroundColor = "red"; 
          cell2.style.backgroundColor = "red"; 
          cell3.style.backgroundColor = "red"; 
        return true;
       }else 
       if(cell1.textContent == cell5.textContent && cell1.textContent == cell9.textContent && cell1.textContent != ""){
        cell1.style.backgroundColor = "red"; 
        cell5.style.backgroundColor = "red"; 
        cell9.style.backgroundColor = "red"; 
        return true;
       }else if(cell1.textContent == cell4.textContent && cell1.textContent == cell7.textContent && cell1.textContent != ""){
        cell1.style.backgroundColor = "red"; 
        cell4.style.backgroundColor = "red"; 
        cell7.style.backgroundColor = "red"; 
        return true;
       }else if(cell2.textContent == cell5.textContent && cell2.textContent == cell8.textContent && cell2.textContent != ""){
        cell2.style.backgroundColor = "red"; 
        cell5.style.backgroundColor = "red"; 
        cell8.style.backgroundColor = "red"; 
        return true;
       }else if (cell3.textContent == cell6.textContent && cell3.textContent == cell9.textContent && cell3.textContent != ""){
        cell3.style.backgroundColor = "red"; 
        cell6.style.backgroundColor = "red"; 
        cell9.style.backgroundColor = "red";    
        return true;
       }else if(cell7.textContent == cell8.textContent && cell7.textContent == cell9.textContent && cell7.textContent != ""){
        cell7.style.backgroundColor = "red"; 
        cell8.style.backgroundColor = "red"; 
        cell9.style.backgroundColor = "red";    
        return true;
       }else if(cell4.textContent == cell5.textContent &&  cell4.textContent == cell6.textContent && cell4.textContent != ""){
        cell4.style.backgroundColor = "red"; 
        cell5.style.backgroundColor = "red"; 
        cell6.style.backgroundColor = "red";    
        return true;
       }else if(cell3.textContent == cell5.textContent && cell3.textContent == cell7.textContent && cell3.textContent != ""){
        cell3.style.backgroundColor = "red"; 
        cell5.style.backgroundColor = "red"; 
        cell7.style.backgroundColor = "red";    
        return true;
       }
       else {
           return false;
       }
   }
   
   
//    //DISABLE TABLE USING MODAL
//    function disableTable(){
//     if(checkWin() == true){
//      squares.forEach(e => {
//          e.removeEventListener("click",play);
//         return true;
//      })
     
//     }else{
//         return false;
//     }

//     }

   

    