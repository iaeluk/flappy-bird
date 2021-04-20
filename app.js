document.addEventListener('DOMContentLoaded', () => {
    const bird = document.querySelector('.bird')
    const gameContainer = document.querySelector('.game-container')
    const ground = document.querySelector('.ground')
    

    let birdLeft = 220
    let birdBottom = 100
    let gravity = 2
    let isGameOver = false
    let gap = 430


    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    
    let gameTimerId = setInterval(startGame, 20)

    function control(e) {
        if (e.keyCode === 32) {
            jump()
        }
    }

    function jump() {
        if (birdBottom < 500) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
    }
    document.addEventListener('keyup', control)
    document.addEventListener('touchend', jump)

    function generateObstacle() {
        let obstacleLeft = 500
        let randomHeight = Math.random() * 60
        let obstacleBottom = randomHeight 

        const obstacle = document.createElement('div')
        const topObstacle = document.createElement('div')
        if (!isGameOver) {
            obstacle.classList.add('obstacle')
            topObstacle.classList.add('topObstacle')
        }
        gameContainer.appendChild(obstacle)
        gameContainer.appendChild(topObstacle)
        obstacle.style.left = obstacleLeft + 'px'
        topObstacle.style.left = obstacleLeft + 'px'
        obstacle.style.bottom = obstacleBottom + 'px'
        topObstacle.style.bottom = obstacleBottom + gap + 'px'

        function moveObstacle() {
            obstacleLeft -= 2
            obstacle.style.left = obstacleLeft + 'px'
            topObstacle.style.left = obstacleLeft + 'px'

            if (obstacleLeft === -65) {
                clearInterval(gameTimerId)
                gameContainer.removeChild(obstacle)
                gameContainer.removeChild(topObstacle)
            }
            

            let initialPipeCondition = obstacleLeft > 200 && obstacleLeft < 273 && birdLeft === 220 && 
            birdBottom < obstacleBottom + 150 

            let finalPipeCondition = obstacleLeft > 180 && obstacleLeft < 250 && birdLeft === 220 && 
            birdBottom < obstacleBottom + 150

            let initialTopPipeCondition = obstacleLeft > 200 && obstacleLeft < 273 && birdLeft === 220 && 
            birdBottom > obstacleBottom + gap -195

            let finalTopPipeCondition = obstacleLeft > 180 && obstacleLeft < 250 && birdLeft === 220 && 
            birdBottom > obstacleBottom + gap -195


            if ( initialPipeCondition || initialTopPipeCondition || finalPipeCondition || finalTopPipeCondition|| birdBottom === 0) {
                gameOver()
                clearInterval(gameTimerId)
            }
        }
        let gameTimerId = setInterval(moveObstacle, 20)
        if (!isGameOver) setTimeout(generateObstacle, 3000)
                   

    }
    generateObstacle()
    


    function gameOver() {
        clearInterval(gameTimerId)
        isGameOver = true
        document.removeEventListener('keyup', control)
    }      

})