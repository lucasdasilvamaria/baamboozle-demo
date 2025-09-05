# 📖 Baamboozle-like: Quiz de Inglês Básico (Demo no GitHub Pages)

Este repositório contém um **jogo de demonstração** inspirado no estilo *Baamboozle*, desenvolvido em **HTML, CSS e JavaScript puros**.  
Ele roda direto no navegador e está publicado via **GitHub Pages** para exibição no meu portfólio.

---

## ✨ Recursos
- Tabuleiro interativo com cartas numeradas.
- Perguntas de inglês básico (vocabulário, gramática, tradução).
- Sistema simples de pontuação.
- Botão de **reset** para jogar quantas vezes quiser.
- Totalmente responsivo e compatível com navegadores modernos.
- Hospedado e acessível no **GitHub Pages**.

---

## 🎯 Objetivo
Este projeto foi criado como parte do meu **portfólio no GitHub Pages**.  
Ele demonstra:
- Capacidade de criar aplicações interativas sem dependências externas.  
- Uso de **JavaScript, HTML e CSS** em conjunto.  
- Publicação de projetos prontos em **GitHub Pages**.  

Além de portfólio, pode servir como **ferramenta prática** para professores de inglês revisarem conteúdo de forma divertida.

---

## 🕹️ Como jogar
1. Acesse a **demo online no GitHub Pages**:  
   [https://lucasdasilvamaria.github.io/baamboozle-demo/](https://lucasdasilvamaria.github.io/baamboozle-demo/)
2. Clique em um número no tabuleiro para abrir a pergunta.  
3. Escolha a alternativa correta.  
4. Veja sua pontuação acumulada.  
5. Use o botão **"Jogar de novo"** para reiniciar o jogo e repetir a experiência.  

---

## 📂 Estrutura de Arquivos
```

/baamboozle-demo
├─ index.html      # Página principal do jogo
├─ styles.css      # Estilos visuais
├─ app.js          # Lógica do jogo
├─ games.json      # Perguntas e respostas (quiz de inglês básico)
└─ README.md       # Documentação do projeto

````

---

## 📝 Exemplo de games.json
```json
{
  "games": [
    {
      "id": "basic-english",
      "title": "Basic English Demo",
      "cards": [
        { "num": 1, "question": "Translate: 'cachorro'", "choices": ["dog","cat","bird"], "answer": 0, "points": 10 },
        { "num": 2, "question": "What's the plural of 'child'?", "choices": ["childs","children","childes"], "answer": 1, "points": 10 },
        { "num": 3, "question": "Complete: I ___ a book.", "choices": ["read","reads","reading"], "answer": 0, "points": 10 },
        { "num": 4, "question": "Translate: 'maçã'", "choices": ["apple","orange","pear"], "answer": 0, "points": 10 },
        { "num": 5, "question": "Past of 'go'?", "choices": ["goed","went","gone"], "answer": 1, "points": 10 }
      ]
    }
  ]
}
````

---

## 🚀 Deploy no GitHub Pages

Este projeto está publicado diretamente no **GitHub Pages**:

1. Todo o código está na branch `main`.
2. A configuração em **Settings > Pages** aponta para a pasta `/ (root)`.
3. A demo fica disponível no link:
   [https://lucasdasilvamaria.github.io/baamboozle-demo/](https://lucasdasilvamaria.github.io/baamboozle-demo/)

---

## 💻 Rodar localmente

Se quiser testar sem internet:

```bash
# Clone o repositório
git clone https://github.com/lucasdasilvamaria/baamboozle-demo.git
cd baamboozle-demo

# Inicie um servidor local (exemplo com Python)
python -m http.server 8000
```

Acesse em [http://localhost:8000](http://localhost:8000).

---

## 📜 Licença

MIT. Livre para uso, modificação e distribuição.