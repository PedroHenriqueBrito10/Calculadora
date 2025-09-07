function criaCalculadora() {
  return {
    display: document.querySelector('.display'), // pega a class display da tabela 

    inicia() { // método inicial
      this.cliqueBotoes();       //  "this" é a calculadora
      this.pressionaBackSpace(); 
      this.pressionaEnter();     
    },

    pressionaBackSpace() { // é a funcão que foi chamada acima
      this.display.addEventListener('keydown', e => {
        // Arrow function mantém "this" como calculadora
        if (e.keyCode === 8) { 
          e.preventDefault();   // evita apagar só 1 caractere
          this.clearDisplay();  // chama método do objeto -> limpa tudo
        }
      });
    },

    pressionaEnter() { // é a funcão que foi chamada primeira de todas
      this.display.addEventListener('keyup', e => {
        // Arrow function  mantém "this" como calculadora
        if (e.keyCode === 13) { 
          this.realizaConta();  
        }
      });
    },


    realizaConta() { // é a funcão que foi chamada acima
      let conta = this.display.value; 

      try {
        conta = eval(conta); 

        if (!conta) { 
          alert('Conta inválida');
          return;
        }

        this.display.value = String(conta); 
      } catch(e) {
        alert('Conta inválida'); 
        return;
      }
    },

    clearDisplay() {
      this.display.value = ''; // limpa o input
    },

    apagaUm() {
      this.display.value = this.display.value.slice(0, -1); 
    },


// usa this pq o metodo do objeto ja existia no escopo global por isso o arrow function tbm    
    cliqueBotoes() {
      document.addEventListener('click', e => {
        const el = e.target;

        if (el.classList.contains('btn-num')) {
          this.btnParaDisplay(el.innerText); 
        }

        if (el.classList.contains('btn-clear')) {
          this.clearDisplay(); 
        }

        if (el.classList.contains('btn-del')) {
          this.apagaUm(); 
        }

        if (el.classList.contains('btn-eq')) {
          this.realizaConta(); 
        }

        this.display.focus(); 
      });
    },





    btnParaDisplay(valor) {
      this.display.value += valor; 
    }

  };
}

const calculadora = criaCalculadora(); 
calculadora.inicia();
