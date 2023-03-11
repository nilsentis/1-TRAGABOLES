    document.addEventListener('DOMContentLoaded', () => {
        const pantalla      = document.querySelector("#pantalla");
        const hippo = document.querySelector(".hippo");
        const contenidor = document.querySelector('.contenidor');
        const boles    = document.querySelectorAll(".bola");
        let cont = 0;

        hippo.style.top  = (pantalla.clientHeight / 2 - hippo.clientHeight / 2) + "px";
        hippo.style.left = (pantalla.clientWidth / 2 - hippo.clientWidth / 2) + "px";

        generateBalls(20);

        function generateBalls(amountBalls){
            //Creem una llista/array de boles buida
            let boles = [];
            let color;
            let top;
            let left;

            //Bucle per generar el número de boles (amountBalls)
            for(let i=0; i<amountBalls; i++) {
                boles[i] = document.createElement("div");
                boles[i].className = 'bola';
                contenidor.appendChild(boles[i]);

                let mida = Math.round(Math.random()*80 + 30);
                boles[i].style.width = mida + "px";
                boles[i].style.height = mida + "px";

                boles[i].style.border = "solid black 2px";
                boles[i].style.borderRadius = "100%";

                color = Math.random() * (4 - 1) + 1;

                if (Math.round(color) == 1) boles[i].style.backgroundColor = "yellow";
                else if (Math.round(color) == 2) boles[i].style.backgroundColor = "green";
                else if (Math.round(color) == 3) boles[i].style.backgroundColor = "red";
                else if (Math.round(color) == 4) boles[i].style.backgroundColor = "blue";

                left = Math.random() * ((pantalla.clientWidth - boles[i].clientWidth) - 0) + 0;
                top = Math.random() * ((pantalla.clientHeight - boles[i].clientHeight) - 0) + 0;
                boles[i].style.position = "absolute";
                boles[i].style.top = top + "px";
                boles[i].style.left = left + "px";
            }
            //Retornem la llista de boles generades (la farem servir després)
            return boles;
        }

        function controlarLimits(){
            if(hippo.offsetLeft < 0) 
                hippo.style.left = 0;
            if(hippo.offsetTop < 0)  
                hippo.style.top  = 0;
            if(hippo.offsetTop+hippo.clientHeight > pantalla.clientHeight) 
                hippo.style.top  = (pantalla.clientHeight - hippo.clientHeight) + "px";
            if(hippo.offsetLeft+hippo.clientWidth > pantalla.clientWidth)
                hippo.style.left = (pantalla.clientWidth - hippo.clientWidth) + "px";
        }

        function detectarXoc(){
            let boles = document.querySelectorAll(".bola");            

            for (bola of boles) {
                const latDret = hippo.offsetLeft+hippo.clientWidth > bola.offsetLeft;
                const latEsq  = hippo.offsetLeft < bola.offsetLeft+bola.clientWidth;
                const altSup  = hippo.offsetTop < bola.offsetTop+bola.clientHeight;
                const altInf  = hippo.offsetTop+hippo.clientHeight > bola.offsetTop;

                if(latDret && latEsq && altSup && altInf){
                    bola.remove();
                    if(bola.style.backgroundColor == "yellow") cont++;
                    else cont--;
                }
            }
        }

        function bolesGrogues()
        {
            let boles = document.querySelectorAll(".bola");
            let h1 = document.getElementById("titol1");
            let h2 = document.getElementById("titol2");
            let fi = 1;
            for (bola of boles) {
                if (bola.style.backgroundColor == "yellow")
                {
                    fi = 0;
                }
            }
            if (fi == 1)
            {
                bola.remove();
                hippo.remove();
                contenidor.remove();
                if (cont > 0)
                {
                    h1.innerHTML = "Victory!";
                    h1.style.color = "green";
                }
                else 
                {
                    h1.innerHTML = "Game Over!";
                    h1.style.color = "red";
                }
                h2.innerHTML = "Puntuació: " + cont;
                setTimeout(() => {
                    location.reload();
                  }, 5000);
            }
        }

        window.addEventListener('keydown',(e) => {
            switch(e.key){
                case 'ArrowDown'    :   hippo.style.top   = parseInt(hippo.style.top) + 10 + "px"; break;
                case 'ArrowUp'      :   hippo.style.top   = parseInt(hippo.style.top) - 10 + "px"; break;
                case 'ArrowLeft'    :   hippo.style.left  = parseInt(hippo.style.left) - 10 + "px"; break;
                case 'ArrowRight'   :   hippo.style.left  = parseInt(caixaVermella.style.left) + 10 + "px"; break;
            }
            controlarLimits();
            detectarXoc();
            bolesGrogues();
        });

        window.addEventListener('mousemove', (e) => {
            hippo.style.top  = e.clientY - hippo.clientHeight/2 + "px";
            hippo.style.left = e.clientX - hippo.clientWidth/2  + "px";
            controlarLimits();
            detectarXoc();
            bolesGrogues();
        });
    });