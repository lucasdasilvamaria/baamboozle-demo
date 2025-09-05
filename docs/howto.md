# HOWTO - Personalizar o Baamboozle Demo

Este documento explica como **adicionar perguntas, mudar imagens e customizar o jogo**.

---

## 1. Adicionar/editar perguntas
1. Abra o arquivo `games.json`.
2. Cada jogo está dentro de um objeto `games`, com:
   ```json
   {
     "id": "basic-english",
     "title": "Basic English Demo",
     "cards": [
       { "num": 1, "question": "Pergunta", "choices": ["op1","op2","op3"], "answer": 0, "points": 10 }
     ]
   }
````

3. Para adicionar uma carta:

   * Escolha um número único (`num`).
   * Escreva a pergunta em `question`.
   * Adicione as alternativas em `choices`.
   * Defina `answer` como o índice da resposta correta (0, 1 ou 2).
   * Defina a pontuação em `points`.

---

## 2. Alterar imagens das cartas

* O jogo usa `assets/imgs/card-back.png` como verso padrão da carta.
* Você pode substituir esta imagem por qualquer PNG/JPG de 200x300 px.
* Para cartas diferentes por carta, seria necessário modificar `app.js` para carregar imagens individuais.

---

## 3. Alterar ícones

* Ícones estão em `assets/icons/`.
* `reset.svg` → botão de "Jogar de novo"
* `close.svg` → botão de fechar modal
* Para trocar, substitua o arquivo SVG mantendo o mesmo nome ou altere o caminho no HTML/JS.

---

## 4. Alterar estilo visual

* Arquivo principal: `styles.css`.
* Você pode alterar cores, fontes, tamanho das cartas, modal, grid, etc.
* Classes principais:

  * `.card` → cartas do tabuleiro
  * `.disabled` → cartas já usadas
  * `#modal` → janela de pergunta
  * `#scoreboard` → pontuação e botão de reset

---

## 5. Executar localmente

```bash
git clone https://github.com/lucasdasilvamaria/baamboozle-demo.git
cd baamboozle-demo
python -m http.server 8000
```

Abra [http://localhost:8000](http://localhost:8000) no navegador.

---

## 6. Publicar no GitHub Pages

1. Faça commit e push das alterações.
2. Vá em **Settings > Pages**.
3. Garanta que a branch `main` e a pasta `/ (root)` estão selecionadas.
4. A demo estará online em:

   ```
   https://lucasdasilvamaria.github.io/baamboozle-demo/
   ```

---

## 7. Dicas

* Sempre mantenha `num` único para cada carta dentro de um jogo.
* Teste novas perguntas localmente antes de enviar para o GitHub Pages.
* Para expandir o projeto, você pode adicionar múltiplos jogos dentro de `games.json`.

