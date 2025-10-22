// Simulador de Orçamento
document.getElementById('form-orcamento').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Obter valores do formulário
    const renda = parseFloat(document.getElementById('renda').value);
    const moradia = parseFloat(document.getElementById('moradia').value) || 0;
    const transporte = parseFloat(document.getElementById('transporte').value) || 0;
    const alimentacao = parseFloat(document.getElementById('alimentacao').value) || 0;
    const saude = parseFloat(document.getElementById('saude').value) || 0;
    const educacao = parseFloat(document.getElementById('educacao').value) || 0;
    const lazer = parseFloat(document.getElementById('lazer').value) || 0;
    const outros = parseFloat(document.getElementById('outros').value) || 0;
    
    // Calcular total de despesas
    const totalDespesas = moradia + transporte + alimentacao + saude + educacao + lazer + outros;
    const saldo = renda - totalDespesas;
    
    // Exibir resultados
    document.getElementById('saldo').textContent = `Saldo: R$ ${saldo.toFixed(2)}`;
    
    // Criar gráfico de despesas
    const graficoDespesas = document.getElementById('grafico-despesas');
    graficoDespesas.innerHTML = '';
    
    const despesas = [
        { nome: 'Moradia', valor: moradia, cor: '#3498db' },
        { nome: 'Transporte', valor: transporte, cor: '#2ecc71' },
        { nome: 'Alimentação', valor: alimentacao, cor: '#e74c3c' },
        { nome: 'Saúde', valor: saude, cor: '#f39c12' },
        { nome: 'Educação', valor: educacao, cor: '#9b59b6' },
        { nome: 'Lazer', valor: lazer, cor: '#1abc9c' },
        { nome: 'Outros', valor: outros, cor: '#34495e' }
    ];
    
    despesas.forEach(despesa => {
        if (despesa.valor > 0) {
            const porcentagem = (despesa.valor / renda) * 100;
            const div = document.createElement('div');
            div.innerHTML = `
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>${despesa.nome}</span>
                    <span>${porcentagem.toFixed(1)}%</span>
                </div>
                <div class="grafico">
                    <div class="barra" style="width: ${porcentagem}%; background-color: ${despesa.cor};"></div>
                </div>
            `;
            graficoDespesas.appendChild(div);
        }
    });
    
    // Gerar recomendações
    const recomendacoes = document.getElementById('recomendacoes');
    recomendacoes.innerHTML = '';
    
    if (saldo < 0) {
        const p = document.createElement('p');
        p.textContent = '⚠️ Atenção! Suas despesas estão maiores que sua renda. Considere reduzir gastos.';
        p.style.color = '#e74c3c';
        recomendacoes.appendChild(p);
    } else if (saldo === 0) {
        const p = document.createElement('p');
        p.textContent = '⚠️ Seu orçamento está equilibrado, mas não sobra nada para poupar. Tente reduzir algumas despesas.';
        p.style.color = '#f39c12';
        recomendacoes.appendChild(p);
    } else {
        const p = document.createElement('p');
        p.textContent = '✅ Ótimo! Você tem um saldo positivo. Considere investir parte desse valor.';
        p.style.color = '#2ecc71';
        recomendacoes.appendChild(p);
        
        // Sugerir porcentagem para investir
        const porcentagemInvestir = (saldo / renda) * 100;
        if (porcentagemInvestir >= 20) {
            const p2 = document.createElement('p');
            p2.textContent = '💡 Você poderia investir até 20% da sua renda para construir uma reserva financeira.';
            p2.style.marginTop = '10px';
            recomendacoes.appendChild(p2);
        }
    }
    
    // Verificar se alguma categoria está acima do recomendado
    const recomendacoesCategorias = {
        'Moradia': 30,
        'Alimentação': 20,
        'Transporte': 15,
        'Saúde': 10,
        'Educação': 10,
        'Lazer': 10,
        'Outros': 5
    };
    
    Object.keys(recomendacoesCategorias).forEach(categoria => {
        const despesa = despesas.find(d => d.nome === categoria);
        if (despesa && despesa.valor > 0) {
            const porcentagem = (despesa.valor / renda) * 100;
            const limite = recomendacoesCategorias[categoria];
            
            if (porcentagem > limite) {
                const p = document.createElement('p');
                p.textContent = `📊 ${categoria} está usando ${porcentagem.toFixed(1)}% da sua renda (recomendado: até ${limite}%).`;
                p.style.marginTop = '10px';
                p.style.color = '#e67e22';
                recomendacoes.appendChild(p);
            }
        }
    });
    
    // Mostrar resultados
    document.getElementById('resultados').style.display = 'block';
    
    // Rolar suavemente para os resultados
    document.getElementById('resultados').scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
    });
});

// Glossário interativo
const termos = document.querySelectorAll('.termo-header');
termos.forEach(termo => {
    termo.addEventListener('click', function() {
        const conteudo = this.nextElementSibling;
        const sinal = this.querySelector('span:last-child');
        
        if (conteudo.style.display === 'block') {
            conteudo.style.display = 'none';
            sinal.textContent = '+';
        } else {
            conteudo.style.display = 'block';
            sinal.textContent = '-';
        }
    });
});

// Navegação suave
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        window.scrollTo({
            top: targetElement.offsetTop - 60,
            behavior: 'smooth'
        });
    });
});

// Adicionar classe ativa à navegação
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Adicionar estilo para link ativo
const style = document.createElement('style');
style.textContent = `
    nav a.active {
        background-color: #3498db;
        font-weight: bold;
    }
`;
document.head.appendChild(style);

// Inicialização da página
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar animação de entrada aos cards
    const cards = document.querySelectorAll('.card, .dica, .infografico');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
});