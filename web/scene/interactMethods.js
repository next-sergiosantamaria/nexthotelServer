function  openPrivateChat(){
    TweenMax.to("#privateChatWindow", 0.2, { 
        width: 300, 
        height: 150, 
        borderTopWidth:2,
        borderRightWidth:2,
        borderBottomWidth:2, 
        borderLeftWidth:2, 
        ease: Back.easeOut 
    });
};

function fillWithNewMessage(writer, text, owner) {
    let textToPrint = owner ? "<b>you:</b> " + text : "<b>"+writer+"</b>" + ": " + text;
    var node = document.getElementById("chatMessageList"); 
    node.insertAdjacentHTML("afterbegin", '<p class="messageReceiverText">'+textToPrint+'</p>');
}

function bathEasterEgg(name) {
    TweenMax.to("#popInfoBox", 0.2, { 
        width: 450, 
        height: 250, 
        borderTopWidth:2,
        borderRightWidth:2,
        borderBottomWidth:2, 
        borderLeftWidth:2, 
        ease: Back.easeOut 
    });
}

function unDoSomething(){
    TweenMax.to("#popInfoBox, #privateChatWindow", 0.2, { 
        width: 0, 
        height: 0,
        borderTopWidth:0,
        borderRightWidth:0,
        borderBottomWidth:0, 
        borderLeftWidth:0, 
        ease: Back.easeIn });
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