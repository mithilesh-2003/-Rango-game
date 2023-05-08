//********************/ configers***********************************
const screenSize={x:600,y:600}
const noOfEnemies= 10

const bossSelectionRate= 3
const enemyDirectionSelectionRate= 0.5 
const enemyMoveSelectionRate=8
const enemyBulletFireRate=0.5

// player
const playerSize= 30
const playerColor= "blue"
const playerSpeed= 10
const playerHealth= 100
const playerBulletSize= 10
const playerBulletColor= "red"
const playerBulletDamage= 20
const playerBulletSpeed= 15

// enemy
const enemySize= 25
const enemySpeed= .5
const enemyColor= "purple"
const enemyHealth= 30
const enemyBulletSize= 8
const enemyBulletColor= "blue"
const enemyBulletDamage= 10
const enemyBulletSpeed= 10

// enemyBoss
const enemyBossSize= 40
const enemyBossSpeed= .5
const enemyBossColor= "purple"
const enemyBossHealth= 60
const enemyBossBulletSize= 8
const enemyBossBulletColor= "blue"
const enemyBossBulletDamage= 10
const enemyBossBulletSpeed= 1

//********************/end configers*********************************


// *******************************startData**************************
const player = {
    position :{x: 400,y :500},
    size :playerSize,
    color :playerColor,
    direction :"up",
    health : playerHealth,
    bulletSpeed: playerBulletSpeed,
    bulletSize: playerBulletSize,
    bulletColor: playerBulletColor,
    bulletDamage: playerBulletDamage
}

const enemyArray=[]

const gameState={
    // gameOver:deletePlayer,
    score:0,
    isPaused:false
}
const playerBulletArray= []
const enemyBulletArray= []
// ***************************endData*********************************

//******************************/ startAction**************************

window.addEventListener("keydown",function(e){
   
    if(e.code=="KeyD"|| e.code=="ArrowUp"){
        // console.log("Arrowup")
        player.position.y=player.position.y-playerSpeed
        player.direction= "up"
        if(player.position.y-player.size/2<0){
            player.position.y= player.size/2+screenSize.y
        }
    }
    else if(e.code=="KeyS"|| e.code=="ArrowDown"){
        // console.log("Arrowdown")
        player.position.y=player.position.y+playerSpeed
        player.direction="down"
        if(player.position.y+player.size/2>screenSize.y){
            player.position.y= player.size/2
        }
    }
     else if(e.code=="KeyA" || e.code=="ArrowLeft"){
        // console.log("Arrowleft")
        player.position.x=player.position.x-playerSpeed
        player.direction="left"
        if(player.position.x-player.size/2<0){
            player.position.x=player.size/2+screenSize.x
        }
    }
    else if(e.code=="KeyW"|| e.code=="ArrowRight"){
        // console.log("Arrowright")
        player.position.x=player.position.x+playerSpeed
        player.direction="right"
        if(player.position.x+player.size/2>screenSize.x){
            player.position.x= screenSize.x-player.size/2-screenSize.x

        }
    }
    else if(e.code== "Space" || e.code=="Enter"){
        const bullet ={
            position:{
                x:player.position.x,
                y:player.position.y
            },
            size:playerBulletSize,
            color: playerBulletColor,
            direction:player.direction,
            speed:playerBulletSpeed,
            damage:playerBulletDamage,
        }
        playerBulletArray.push(bullet)
    }else if(e.code== "KeyP"){
        if (!gameState.isPaused) {
            clearInterval(gameState.loop)
            gameState.isPaused= true
            drawHud()
        } else {
            gameState.loop = gameloop()
            gameState.isPaused= false
        }
    }
})
const fireEnemiesBullet= (enemies,enemiesBullets)=>{
    enemies.forEach((e)=>{
        if (Math.random()*10<enemyBulletFireRate){
            enemiesBullets.push({
                position:{
                    x:e.position.x,
                    y:e.position.y
                },
                direction:e.direction,
                size:e.bulletSize,
                color:e.bulletColor,
                speed: e.bulletSpeed,
                damage: e.bulletDamage
            })
        }
    })    
}
const moveEnemies=(enemies)=>{
    enemies.forEach((e)=>{
        if(Math.random()*10<enemyDirectionSelectionRate){
            e.direction=directionGenerator()
        }if(Math.random()*10<enemyMoveSelectionRate){
            if(e.direction==="up"){
                e.position.y-=e.speed
                if(e.position-e.size/2<0){
                    e.position.y=screenSize.y-e.size/2
                }
            }else if(e.direction==="down"){
                e.position.y+=e.speed
                if(e.position+e.size/2>screenSize.y){
                    e.position.y=e.size/2
                }
            }else if(e.direction==="left"){
                e.position.y-=e.speed
                if(e.position-e.size/2<0){
                    e.position.y=screenSize.x-e.size/2
                }
            }else if(e.direction==="right"){
                e.position.y+=e.speed
                if(e.position+e.size/2>screenSize.y){
                    e.position.y=e.size/2
                }
            }
        }
    })
}
const positionGenerator= (sSize,eSize)=>{
    return Math.random()*(sSize-eSize)+eSize/2
}
const directionGenerator=()=>{
    const selection=["up","down","left","right"]
    const d=Math.floor((Math.random()*selection.length)-0.0000001)
    return selection[d]
}
const spawnEnemies= (enemies)=>{
    if(enemies.length<noOfEnemies){
        // selection of enemy
        const enemyType={
            size :enemySize,
            speed:enemySpeed,
            color :enemyColor,
            health : enemyHealth,
            bulletSpeed: enemyBulletSpeed,
            bulletSize: enemyBulletSize,
            bulletColor: enemyBulletColor,
            bulletDamage: enemyBulletDamage
        }
        if(Math.random()*10<bossSelectionRate){
            enemyType.size =enemyBossSize,
            enemyType.speed=enemyBossSpeed,
            enemyType.color =enemyColor,
            enemyType.health = enemyHealth,
            enemyType.bulletDamage= enemyBulletDamage,
            enemyType.bulletColor= enemyBulletColor,
            enemyType.bulletSize= enemyBulletSize,
            enemyType.bulletSpeed= enemyBulletSpeed
        }
        // enemy creation
        const enemy={
            position:{
                x:positionGenerator(screenSize.x,enemyType.size),
                y:positionGenerator(screenSize.y,enemyType.size)
            },
            size:enemyType.size,
            speed:enemyType.speed,
            color:enemyType.color,
            health:enemyType.health,
            direction:directionGenerator(),
            bulletSpeed:enemyType.bulletSpeed,
            bulletSize:enemyType.bulletSize,
            bulletColor:enemyType.bulletColor,
            bulletDamage:enemyType.bulletDamage,
        }
        enemies.push(enemy)
    }
}
const moveBullets=(bullets)=>{
    bullets.forEach((b) => {
        if(b.direction=== "up"){
            b.position.y= b.position.y-b.speed
        }
        else if(b.direction==="down"){
            b.position.y= b.position.y+b.speed
        }
        else if(b.direction==="left"){
            b.position.x=b.position.x-b.speed
        }
        else if(b.direction==="right"){
            b.position.x=b.position.x+b.speed
        }  
    })
}
const checkOutScreenBullets=(bullets)=>{
    bullets.forEach((b)=>{
        if(b.position.x<0|| b.position.x>screenSize.x|| b.position.y<0|| b.position.y> screenSize.y){
            b.delete= true
        }
    })
}
const checkPlayerBulletCollisionWithEnemy=(enemies,bullets)=>{
    bullets.forEach((bullet)=>{
        enemies.forEach((enemy)=>{
            if(enemy.size/2+bullet.size/2>=Math.abs(enemy.position.x-bullet.position.x)&& 
            enemy.size/2+bullet.size/2>=Math.abs(enemy.position.y-bullet.position.y)){
                enemy.health=enemy.health-bullet.damage
                bullet.delete =true
                if(enemy.health<=0){
                    enemy.delete=true
                    gameState.score=gameState.score+10
                }
            }
        })
    })    
}
const checkEnemyBulletCollisionWithPlayer=(player,bullets)=>{
    bullets.forEach((bullet)=>{
        if(player.size/2+bullet.size/2>=Math.abs(player.position.x-bullet.position.x)&& 
        player.size/2+bullet.size/2>=Math.abs(player.position.y-bullet.position.y)){
            player.health=player.health-bullet.damage
            bullet.delete =true
            if(player.health<=0){
            }
            console.log(player.health)
        }
    })    
}
const deleteBullets= (bullets)=>{
    bullets.forEach((b,i)=>{
        if(b.delete){
            bullets.splice(i,1)
        }
    })
}
const deleteEnemy=(enemies)=>{
    enemies.forEach((enemy,i)=>{
        if(enemy.delete){
            enemies.splice(i,1)
        }
    })
}
const init =(player,enemies,playerBulletArray,enemyBulletArray)=>{
    if(gameState.over){
        gameState.over= false
        player.position.x=300
        player.position.y=300
        player.health=100
        gameState.score=0
        enemies.splice(0,enemies.length-1)
        playerBulletArray.splice(0,playerBulletArray.length-1)
        enemyBulletArray.splice(0,enemyBulletArray.length-1)

    }
}
const gameOver=()=>{
    if(player.health<=0){
        player.health=0
        const x= confirm("Game Over!\n do you want to play again")
        console.log(x)
        if(x){
            gameState.over= true
        }else{
            clearInterval(gameState.loop)
            window.close()
        }
    }
}
//***********************start drawing******************************************
const c= document.getElementById("canvas")
c.width =screenSize.x
c.height =screenSize.y
const ctx = c.getContext("2d")

const drawHud = (x,y,size,color) => {
    ctx.fillStyle= "gray"
    ctx.font = "20px sarif"
    ctx.fillText(`Score: ${gameState.score}`, 20,20);
    ctx.fillText(`Health:${player.health}`,500,20)
    if(gameState.isPaused){
        ctx.fillText("Paused",300,300)
    }
}
const draw = (x,y,size,color,direction) => {
    if(direction ==="up"){
        ctx.fillStyle= color;
        ctx.fillRect(x-.5*size,y-1.5*size,size,size);
        ctx.fillRect(x-1.5*size,y-.5*size,size, size);
        ctx.fillRect(x-.5*size,y-.5*size,size, size);
        ctx.fillRect(x+.5*size,y-.5*size,size, size);
        ctx.fillRect(x-1.5*size,y+.5*size,size, size);
        ctx.fillRect(x+.5*size,y+.5*size,size, size);   
    }
    else if(direction ==="down"){
        ctx.fillStyle= color;
        ctx.fillRect(x-.5*size,y-.5*size,size, size);
        ctx.fillRect(x-.5*size,y+.5*size,size, size);
        ctx.fillRect(x-1.5*size,y-.5*size,size, size);
        ctx.fillRect(x+.5*size,y-.5*size,size, size);
        ctx.fillRect(x-1.5*size,y-1.5*size,size, size);
        ctx.fillRect(x+.5*size,y-1.5*size,size,size);
    }
    else if(direction ==="right"){
        ctx.fillStyle= color;
        ctx.fillRect(x-1.5*size,y-1.5*size,size, size);
        ctx.fillRect(x-.5*size,y-1.5*size,size, size);
        ctx.fillRect(x-.5*size,y-.5*size,size, size);
        ctx.fillRect(x+.5*size,y-.5*size,size, size);
        ctx.fillRect(x-1.5*size,y+.5*size,size, size);
        ctx.fillRect(x-.5*size,y+.5*size,size, size);
    }
    else if(direction ==="left"){
        ctx.fillStyle= color;
        ctx.fillRect(x-.5*size,y-.5*size,size, size);
        ctx.fillRect(x-.5*size,y-1.5*size,size, size);
        ctx.fillRect(x-.5*size,y+.5*size,size, size);
        ctx.fillRect(x-1.5*size,y-.5*size,size, size);
        ctx.fillRect(x+.5*size,y-1.5*size,size, size);
        ctx.fillRect(x+.5*size,y+.5*size,size, size);
    }
}     
const drawBullets= (bullets)=>{
    bullets.forEach((b)=>{
        ctx.fillStyle= b.color;
        ctx.fillRect(b.position.x-0.5*b.size,b.position.y-0.5*b.size,b.size,b.size)
    })
}
// ********************************end Drawing********************************
const gameloop=((Pause)=>{
    return setInterval(()=>{
        init(player,enemyArray,playerBulletArray,enemyBulletArray)
        gameOver()
        spawnEnemies(enemyArray)
        fireEnemiesBullet(enemyArray,enemyBulletArray)
        moveEnemies(enemyArray)
        checkEnemyBulletCollisionWithPlayer(player,enemyBulletArray)
        moveBullets(enemyBulletArray)
        moveBullets(playerBulletArray)
        checkPlayerBulletCollisionWithEnemy(enemyArray,playerBulletArray)
        checkOutScreenBullets(playerBulletArray)
        deleteBullets(playerBulletArray)
        deleteBullets(enemyBulletArray)
        deleteEnemy(enemyArray)
        // deletePlayer(player)
        ctx.clearRect(0,0,screenSize.x,screenSize.y);
        drawBullets(playerBulletArray)
        drawBullets(enemyBulletArray)
        draw(player.position.x,player.position.y,player.size/3,player.color,player.direction);
        enemyArray.forEach((enemy)=>{
        draw(enemy.position.x,enemy.position.y,enemy.size/3,enemy.color,enemy.direction);
        })
        drawHud()
    },20);
})
gameState.loop= gameloop()