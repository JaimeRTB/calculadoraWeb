var calculadora = {
    total: 0,
    val1: '',
    val2: '',
    operador: '',
    punto: false,
    actualizarTotalDisplay: function (selector) { 
        document.getElementById(selector).innerText = this.total
    },
    actualizarDisplay: function (selector) { 
        if (this.operador.length==0) {
            document.getElementById(selector).innerText = this.val1
        }else{
            document.getElementById(selector).innerText = this.val2
        }
    },
    sumar: function (val1,val2) {  
        return (parseFloat(val1)+parseFloat(val2))
    },
    restar: function (val1,val2) {  
        return (parseFloat(val1)-parseFloat(val2))
    },
    multiplicar: function (val1,val2) {  
        return (parseFloat(val1)*parseFloat(val2))
    },
    dividir: function (val1,val2) {  
        return (parseFloat(val1)/parseFloat(val2))
    },
    borrar: function (selector) {  
        this.total = 0
        this.val1 = ''
        this.val2 = ''
        this.operador = ''
        this.punto = false
        document.getElementById(selector).innerText = 0
    },
    igual: function () {  
        switch (this.operador) {
            case 'mas':
                this.total = (this.total === 0) ? this.total = this.sumar(this.val1, this.val2) : this.total = this.sumar(this.total,this.val2)
                break;

            case 'menos':
                this.total = (this.total === 0) ? this.total = this.restar(this.val1, this.val2) : this.total = this.restar(this.total,this.val2)
                break;

            case 'por':
                this.total = (this.total === 0) ? this.total = this.multiplicar(this.val1, this.val2) : this.total = this.multiplicar(this.total,this.val2)
                break;

            case 'dividido':
                this.total = (this.total === 0) ? this.total = this.dividir(this.val1, this.val2) : this.total = this.dividir(this.total,this.val2)
                break;
        }

        if (this.total.toString().includes('.') && this.total.toString().length>8) {
            return this.total.toFixed(6)
        }

        // return this.total.toFixed(6)
        return this.total
    }
}

function funcionesTeclasNumericas(e) {
    var display = document.getElementById('display')

    if (display.innerText !== '0' || e.target.id!=='0') {
        if (!calculadora.operador) {
            if (display.innerText.length<8) {
                if (e.target.id === 'punto' && !calculadora.punto) {
                    calculadora.val1 = calculadora.val1 + '.'
                    calculadora.punto = true
                }else if(e.target.id !== 'punto'){
                    calculadora.val1 = calculadora.val1 + e.target.id
                }
            }
        }else{
            if (display.innerText.length<8) {
                if (e.target.id === 'punto' && !calculadora.punto) {
                    calculadora.val2 = calculadora.val2 + '.'
                    calculadora.punto = true
                }else if(e.target.id !== 'punto'){
                    calculadora.val2 = calculadora.val2 + e.target.id
                }
            }
        }

        calculadora.actualizarDisplay('display')
    }
}

function reset(selector) {  
    calculadora.borrar(selector)
}

function simbolo(e) {
    if (calculadora.val1.length > 0) {
        calculadora.operador = e.target.id
        calculadora.punto =false
    }
}

function mostrarResultado() {
    var resultado = calculadora.igual()
    if (resultado > 99999999) {
        document.getElementById('display').innerText = 'ERROR'
    }else{
        document.getElementById('display').innerText = resultado
    }
}

function negativoPositivo(){
    if (calculadora.operador.length > 0) {
        if (calculadora.val2.includes('-')) {calculadora.val2 = calculadora.val2.replace('-','')}
        else{calculadora.val2 = calculadora.val2 = '-'+calculadora.val2}
    }
    else{
        if (calculadora.val1.includes('-')) {calculadora.val1 = calculadora.val1.replace('-','')}
        else{calculadora.val1 = '-'+calculadora.val1}
    }
    calculadora.actualizarDisplay('display')
}

function asigarEventosTeclas() {  
    var teclas = document.getElementsByClassName('tecla')
    
    for (let i = 0; i < teclas.length; i++) {
        teclas[i].onmousedown = function(){reducirTamanoBoton(teclas[i])}
        teclas[i].onmouseup = function(){aumentarTamanoBoton(teclas[i])}
        if (Number(teclas[i].id)>=0 || teclas[i].id === 'punto') {
            teclas[i].onclick = funcionesTeclasNumericas
        }
        else if (teclas[i].id === 'on') {
            teclas[i].onclick = function () {reset('display')}
        }
        else if (teclas[i].id === 'igual') {
            teclas[i].onclick = mostrarResultado
        }
        else if(teclas[i].id === 'sign'){
            teclas[i].onclick = negativoPositivo
        }
        else{
            teclas[i].onclick = simbolo
        }
    }    
}

function aumentarTamanoBoton(elemento) {
    elemento.style.transform = 'scale(1,1)'
}

function reducirTamanoBoton(elemento) {
    elemento.style.transform = 'scale(0.95,0.95)'
}

asigarEventosTeclas()