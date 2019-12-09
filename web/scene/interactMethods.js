function  openPrivateChat(){
    TweenMax.to(".privateChatWindow", 0.2, {
        bottom: 250,
        ease: Back.easeOut 
    });
    document.getElementById("textPrivate").focus();
};

function fillWithNewMessage(writer, text, owner) {
    const textToPrint = owner ? "<b>you:</b> " + text : "<b>"+writer + ":</b> " + text;
    const node = document.getElementById("chatMessageList");
    const textClass= owner ? "messageReceiverText"  : "messageSenderText";
    node.insertAdjacentHTML("beforeend", '<p class=' + textClass + '>' + textToPrint + '</p>');
}

function removeCollision(){
    //hide section info box
    TweenMax.to("#popInfoBox", 0.2, { 
        left: -1500, 
        ease: Power1.easeIn 
    });
    //hide private chat box
    TweenMax.to(".privateChatWindow", 0.2, { 
        bottom: 1500, 
        ease: Power1.easeIn });
    //remove private chat text lines
    const node= document.getElementById("chatMessageList");
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}

function bathEasterEgg(name) {;
    removeCollision()
    //show section info box
    TweenMax.to("#popInfoBox", 0.2, { 
        left: 30, 
        ease: Back.easeOut 
    });
}

function doSomething(objectName){
    switch (objectName){
        case "innovacion":
            bathEasterEgg(objectName);
            break;
        case "MesasDBI":
            bathEasterEgg(objectName);   
            break; 
        case "MesasMCrespo":
            bathEasterEgg(objectName);   
            break;
        case "MesasMobileChannel":
            bathEasterEgg(objectName);   
            break;
        case "MesasWebChannel":
            bathEasterEgg(objectName);   
            break;
        case "MesasTipo2":
            bathEasterEgg(objectName);   
            break;
        case "MesasTipo3":
            bathEasterEgg(objectName);   
            break;
        case "RRHH":
            bathEasterEgg(objectName);   
            break;
        case "comedor":
            bathEasterEgg(objectName);   
            break;
        case "recepcion":
            bathEasterEgg(objectName);   
            break;
        case "agora":
            bathEasterEgg(objectName);   
            break;
        case "laboratorio":
            bathEasterEgg(objectName);   
            break;
        case "jefatura":
            bathEasterEgg(objectName);   
            break;
        case "quickstarter":
            bathEasterEgg(objectName);   
            break;
        case "biblioteca":
            bathEasterEgg(objectName);   
            break;
        case "IT":
            bathEasterEgg(objectName);   
            break;
        case "laboratorio":
            bathEasterEgg(objectName);   
            break;
        case "laboratorio":
            bathEasterEgg(objectName);   
            break;
        case "laboratorio":
            bathEasterEgg(objectName);   
            break;
        case "laboratorio":
            bathEasterEgg(objectName);   
            break;
        case "laboratorio":
            bathEasterEgg(objectName);   
            break;
        default:
            console.log("collision con usuario: ", objectName);
            break;
    }
};