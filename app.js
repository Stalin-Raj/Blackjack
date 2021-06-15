document.querySelector("#hit").addEventListener("click",blackjackHit);
document.querySelector("#deal").addEventListener("click",blackjackDeal);
document.querySelector("#stand").addEventListener("click",blackjackStand);
const hitSound=new Audio("blackjack_assets/sounds/swish.m4a");
const winSound=new Audio("blackjack_assets/sounds/cash.mp3");
const loseSound=new Audio("blackjack_assets/sounds/aww.mp3");
let yourResult=0;
let botResult=0;
let wins=0;
let loses=0;
let ties=0;
let hitActivate=true;
let standActivate=false;
dealActivate=false;

function blackjackHit()
{
  if(hitActivate==true)
  {
    standActivate=true;
    let selectedCard=getRandomCard();
    updateScore(selectedCard,"you");
    console.log(yourResult);
    setImage(selectedCard,"#player-box")
  }
}

function blackjackDeal()
{
  if(dealActivate==true)
  {
    let AllImage=document.querySelector("#player-box").querySelectorAll("img");
    for(let i=0;i<AllImage.length;i++)
       AllImage[i].remove();
    AllImage=document.querySelector("#opponent-box").querySelectorAll("img");
    for(let i=0;i<AllImage.length;i++)
       AllImage[i].remove();
    updateTable();
    yourResult=0;
    botResult=0;
    standActivate=false;
    hitActivate=true;
    dealActivate=false;
    document.querySelector("#your-result").textContent=0;
    document.querySelector("#opponent-result").textContent=0;
    document.querySelector("#your-result").style.color="aff";
    document.querySelector("#opponent-result").style.color="aff";
  
  } 
}

function blackjackStand(){
  if(standActivate==true)
  {
    hitActivate=false;
    dealActivate=true;
    let selectedCard=getRandomCard();
    updateScore(selectedCard,"bot");
    setImage(selectedCard,"#opponent-box");
  }
}
function getRandomCard()
{
  let cards=['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
  let rand=Math.floor((Math.random()*13));
  return cards[rand];
}

function setImage(selectedCard,player)
{
  if((player=="#player-box" && yourResult<=21) || (player=="#opponent-box" && botResult<=21))
  {
   let Image=document.createElement('img');
   Image.src="blackjack_assets/images/"+selectedCard+".png";
   Image.style="height:50px;width:30%;margin:1px;"
   document.querySelector(player).appendChild(Image);
   hitSound.play();
  }
}

function updateScore(selectedCard,player)
{
  cardValues={'2':2,'3':3,'4':4,'5':5,'6':6,'7':7,'8':8,'9':9,'10':10,'J':10,'Q':10,'K':10,'A':[1,11]};
    if(player=="you" && yourResult<=21){
      if(selectedCard=='A')
      {
         if(yourResult+11<=21)
         {
            yourResult=yourResult+cardValues['A'][1];
         }
         else
        {
          yourResult=yourResult+cardValues['A'][0];
        }
      }
      else
      {
          yourResult=yourResult+cardValues[selectedCard];
        
      }
    }
      if(player=="bot" && botResult<=21)
      {
        if(selectedCard=='A')
        {
         if(botResult+11<=21)
            botResult=botResult+cardValues['A'][1];
         else
           botResult=botResult+cardValues['A'][0];
        }
        else
            botResult=botResult+cardValues[selectedCard];
    }
  if(yourResult>21)
  {
    document.querySelector("#your-result").textContent="BUSTED";
    document.querySelector("#your-result").style.color="red";
  }
  else
    document.querySelector("#your-result").textContent=yourResult;
  
  if(botResult>21)
  {
    document.querySelector("#opponent-result").textContent="BUSTED";
    document.querySelector("#opponent-result").style.color="red";
  }
  else
    document.querySelector("#opponent-result").textContent=botResult;
}
function updateTable(){
  if(yourResult>21){
    if(botResult<=21){
      loses=loses+1;
      document.querySelector("#loses").textContent=loses;
      document.querySelector("#final-result").textContent='You lost!';
       document.querySelector("#final-result").style.color="red";
      loseSound.play();
      
    }
    else if(botResult>21)
    {
      ties=ties+1;
      document.querySelector("#ties").textContent=ties;
      document.querySelector("#final-result").textContent='You tied!';
      document.querySelector("#final-result").style.color="yellow";
    }
  }
  else if(yourResult<=21)
  {
    if(botResult>21 || botResult<yourResult){
      wins=wins+1;
      document.querySelector("#wins").textContent=wins;
      document.querySelector("#final-result").textContent='You won!!!';
      document.querySelector("#final-result").style.color="green";
      winSound.play();
    }
    else if(botResult>yourResult){
      loses=loses+1;
      document.querySelector("#loses").textContent=loses;
      document.querySelector("#final-result").textContent='You lost!';
      document.querySelector("#final-result").style.color="red";
      loseSound.play();
    }
    else if(botResult==yourResult){
      ties=ties+1;
      document.querySelector("#ties").textContent=ties;
      document.querySelector("#final-result").textContent='You tied';
      document.querySelector("#final-result").style.color="yellow";
      
       
    }
  }
}