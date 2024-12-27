let BASEURL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

let dropdowns=document.querySelectorAll(".dropdown select");
let btn=document.querySelector("button");
let fromCurr=document.querySelector(".From select")
let toCurr=document.querySelector(".To select")
let amount=document.querySelector(".amount input");

const UpdateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newsrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newsrc;
}
for(let select of dropdowns){
    for (currCode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name==="from" && currCode ==="USD"){
            newOption.selected="selected";
        }else if(select.name ==="to" && currCode ==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        UpdateFlag(evt.target);
    });
}
btn.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amtVal=amount.value;
    if(amtVal="" || amtVal<1){
        amtVal=1;
        amount.value=1;
    }
    let URL=`${BASEURL}/${fromCurr.value.toLowerCase()}.json`;
    let response=await fetch(URL);
    let data= await response.json();
    let fromCount=data[fromCurr.value.toLowerCase()];
    let rate;
    for(let toCount in fromCount){
        if(toCount===`${toCurr.value.toLowerCase()}`){
            rate=fromCount[toCount];
        } 
    }
    calAmount(rate);
});
const calAmount=(rate)=>{
    let exAmount=amount.value*rate;
    let msg=document.querySelector(".msg");
    msg.innerText=`${amount.value} ${fromCurr.value} = ${exAmount} ${toCurr.value}`;
}