keyControls = function(avatarObject) {

    this.mouseClicked = false;
    this.moveSpeed = 0.02;
    
    this.moveForward = false;
    this.moveBackward = false;
    this.moveLeft = false;
    this.moveRight = false;

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    this.direction = { "x":0, "y":0, "z":0 };
    this.checkCollision = () => false;
    this.action = "stand";
    
    document.getElementById("container").onmousedown  = () => {this.mouseClicked = true;}
    document.getElementById("container").onmouseup  = () => {this.mouseClicked = false;}
    document.getElementById("container").onmousemove = (event) => {
        if(this.mouseClicked) {
            this.mouse.x = ( event.clientX / renderer.domElement.clientWidth ) * 2 - 1;
            this.mouse.y = - ( event.clientY / renderer.domElement.clientHeight ) * 2 + 1;
            this.raycaster.setFromCamera( this.mouse, camera );
            if( planta.children.length > 0 ) {
                let intersects = this.raycaster.intersectObject( planta.children[0].children[0]);
                if ( intersects.length > 0 ) {
                    movement({ x: intersects[0].point.x, y: 0, z: intersects[0].point.z }, avatar.position, 0, 500, TWEEN.Easing.Linear.None);
                    avatarObject.lookAt( intersects[0].point.x, 0, intersects[0].point.z );
                }
            }
        }
    }

    this.blockIfCollision = () => {
        avatarObject.position.z -= this.direction.z * 1;
        avatarObject.position.x += this.direction.x * 1;
        this.moveForward = this.moveBackward = this.moveLeft = this.moveRight = false;    
        this.direction.x = 0;
        this.direction.z = 0;
    }

    this.sendMessage = (message) => {
        if(socket && message && message !== '') {  
            if (privateChatReceiverUser) {
                const messageListWindow =  document.getElementById("changeMessageListBox");
                fillWithNewMessage(saveData.userName, message, true);
                new Audio('./audio/clearly.mp3').play();
                messageListWindow.scrollTop = messageListWindow.scrollHeight - messageListWindow.clientHeight;
                socket.emit('privateChat', { sender: saveData.userName, receiver: privateChatReceiverUser, message: message});
                document.getElementById('textPrivate').value = '';
                document.getElementById('textPrivate').focus();
            }
            else if(saveData && saveData.userName){ 
                socket.emit('publicChat', { sender: saveData.userName, message: message});
                document.getElementById('textGeneral').value = '';
                document.getElementById('textGeneral').focus();
            }
        }
    }

    this.blockPosition = {
        w: () => { this.blockForward = true },
        ArrowUp: () => { this.blockForward = true},
        s: () => { this.blockBackward = true},
        ArrowDown: () => { this.blockBackward = true},
        a: () => { this.blockLeft = true},
        ArrowLeft: () => { this.blockLeft = true},
        d: () => { this.blockRight = true},
        ArrowRight: () => { this.blockRight = true}
    };
    
    document.onkeydown = (event) => {
        if(event.target.type == "text") {
            switch(true) {
                case event.key == "Enter":
                    this.sendMessage(event.target.value);
            }
        }
        else {
            switch( true ){
                //move up
                case event.key == "w" || event.key == "ArrowUp":
                    this.moveForward = true;
                    avatarObject.rotation.y = -Math.PI / 2;
                    this.action = "walk";
                break; 
                //move down
                case event.key == "s" || event.key == "ArrowDown":
                    this.moveBackward = true;
                    avatarObject.rotation.y = Math.PI / 2;
                    this.action = "walk";
                break; 
                //move left
                case event.key == "a" || event.key == "ArrowLeft":
                    this.moveLeft = true;
                    avatarObject.rotation.y = 0;
                    this.action = "walk";
                break; 
                //move right
                case event.key == "d" || event.key == "ArrowRight":
                    this.moveRight = true;
                    avatarObject.rotation.y = Math.PI;
                    this.action = "walk";
                break;
                //jumping
                case event.key == " ":
                    this.action = "jump";
                break;
            }
            this.direction.x = ( Number( this.moveForward ) - Number( this.moveBackward )) * this.moveSpeed;
            this.direction.z = ( Number( this.moveLeft ) - Number( this.moveRight  )) * this.moveSpeed;
        }
    };
    document.onkeyup = () => {
        this.moveForward = this.moveBackward = this.moveLeft = this.moveRight = false;    
        this.direction.x = 0;
        this.direction.z = 0;
        this.action = "walk";
    };

};
debug = function() {}
