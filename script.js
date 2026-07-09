/* =========================================================
   MISSÃO: CAFÉ DA TIA MARI — script.js (V5 — Matemática Rural)
   Jogo educativo infantil — HTML/CSS/JS puro
   ========================================================= */

/* ------------------- DADOS: ALUNOS ------------------- */
const students = [
  { name: "Thomas",   emoji: "👦" },
  { name: "Giovana",  emoji: "👧" },
  { name: "Manuella", emoji: "👧" },
  { name: "Nicolas",  emoji: "👦" },
  { name: "Bianca",   emoji: "👧" },
  { name: "Ester",    emoji: "👧" },
  { name: "Weslay",   emoji: "👦" },
  { name: "Gabriella",emoji: "👧" },
  { name: "Amanda",   emoji: "👧" },
  { name: "Bernardo", emoji: "👦" },
  { name: "Pedro",    emoji: "👦" }
];

/* ------------------- FIGURINHAS (colecionáveis) ------------------- */
const stickerPool = ["🐔","🐄","🐷","🐴","🐑","🐐","🦆","🐇","🦋","🐝","🌻","🌽","🍎","🐓","🐕"];

/* ------------------- EVENTOS DE PAUSA (sem pontuação) ------------------- */
const pauseEvents = [
  { emoji:"🐄", text:"Uma vaquinha atravessa a estrada bem devagar... o ônibus espera com paciência!" },
  { emoji:"🦋", text:"Um bando de borboletas coloridas voa ao lado da janela do ônibus!" },
  { emoji:"🐓", text:"Um galo canta bem alto na beira da estrada. Cocoricó!" },
  { emoji:"🌈", text:"Depois da chuvinha da noite, um arco-íris aparece no céu da picada!" },
  { emoji:"🐇", text:"Um coelhinho corre rapidinho pela grama e some atrás da cerca." },
  { emoji:"🐕", text:"O cachorro da fazenda late animado e corre ao lado do ônibus por um instante!" }
];

/* ------------------- DADOS: PERGUNTAS (SOMENTE MATEMÁTICA RURAL) -------------------
   level: 1 (fácil), 2 (médio), 3 (mais desafiador)
   visual: opcional — lista de emojis mostrados acima da pergunta
------------------------------------------------------------------------------- */
const questionBank = [
  /* ===== NÍVEL 1 — contagem e soma/subtração até 10 ===== */
  { level:1, category:"Animais", text:"Há 4 galinhas no galinheiro. Chegaram mais 3 galinhas. Quantas galinhas há agora?", options:["6","7","8","5"], correct:1, cardHint:"Some 4 com 3.", teacherHint:"Junte as duas quantidades: 4 e 3.", visual:["🐔","🐔","🐔","🐔","➕","🐔","🐔","🐔"] },
  { level:1, category:"Horta", text:"A cesta tinha 6 ovos. A galinha botou mais 2. Quantos ovos há agora na cesta?", options:["7","8","9","6"], correct:1, cardHint:"Some 6 com 2.", teacherHint:"Comece em 6 e conte mais 2 para frente.", visual:["🥚","🥚","🥚","🥚","🥚","🥚","➕","🥚","🥚"] },
  { level:1, category:"Animais", text:"No chiqueiro há 5 porquinhos. Nasceram mais 3. Quantos porquinhos há agora?", options:["7","8","9","10"], correct:1, cardHint:"Some 5 com 3.", teacherHint:"Junte os porquinhos que já tinha com os que nasceram." },
  { level:1, category:"Horta", text:"A macieira tinha 9 maçãs. Caíram 4 maçãs no chão. Quantas maçãs restaram na árvore?", options:["4","5","6","3"], correct:1, cardHint:"É uma conta de subtração: 9 menos 4.", teacherHint:"Conte de 4 até 9 para saber quantas restaram.", visual:["🍎","🍎","🍎","🍎","🍎","🍎","🍎","🍎","🍎"] },
  { level:1, category:"Animais", text:"No galpão há 3 vacas. Chegaram mais 4 vacas. Quantas vacas há agora?", options:["6","7","8","5"], correct:1, cardHint:"Some 3 com 4.", teacherHint:"Junte as vacas que já estavam com as que chegaram." },
  { level:1, category:"Animais", text:"Uma ninhada tem 6 patinhos. 2 patinhos foram nadar no arroio. Quantos patinhos ficaram no chão?", options:["3","4","5","6"], correct:1, cardHint:"É uma subtração: 6 menos 2.", teacherHint:"Conte quantos patinhos sobraram depois que 2 foram nadar." },
  { level:1, category:"Horta", text:"No jardim há 5 flores amarelas e 3 flores vermelhas. Quantas flores há ao todo?", options:["7","8","9","6"], correct:1, cardHint:"Some as flores amarelas com as vermelhas.", teacherHint:"Junte 5 e 3 para saber o total de flores.", visual:["🌼","🌼","🌼","🌼","🌼","🌹","🌹","🌹"] },
  { level:1, category:"Horta", text:"Há 7 árvores no pomar. O vento derrubou 2 mudas pequenas. Quantas árvores restaram de pé?", options:["4","5","6","3"], correct:1, cardHint:"É uma subtração: 7 menos 2.", teacherHint:"Conte quantas árvores restam depois de tirar 2." },
  { level:1, category:"Animais", text:"O cachorro da fazenda tem 4 filhotes. Nasceram mais 2. Quantos filhotes há agora?", options:["5","6","7","8"], correct:1, cardHint:"Some 4 com 2.", teacherHint:"Junte os filhotes que já tinha com os que nasceram." },
  { level:1, category:"Horta", text:"Na horta há 8 pés de alface. Foram colhidos 3. Quantos pés de alface restaram?", options:["4","5","6","7"], correct:1, cardHint:"É uma subtração: 8 menos 3.", teacherHint:"Conte quantos pés restam depois da colheita." },
  { level:1, category:"Animais", text:"No curral há 2 cavalos. Chegaram mais 5 cavalos. Quantos cavalos há agora?", options:["6","7","8","5"], correct:1, cardHint:"Some 2 com 5.", teacherHint:"Junte os cavalos que já estavam com os que chegaram.", visual:["🐴","🐴","➕","🐴","🐴","🐴","🐴","🐴"] },
  { level:1, category:"Animais", text:"A galinha choca tinha 9 pintinhos. 4 pintinhos foram para outro galinheiro. Quantos pintinhos ficaram?", options:["4","5","6","3"], correct:1, cardHint:"É uma subtração: 9 menos 4.", teacherHint:"Conte quantos pintinhos restam depois que alguns foram embora." },
  { level:1, category:"Horta", text:"No pomar há 3 pés de laranja e 4 pés de limão. Quantos pés de frutas cítricas há ao todo?", options:["6","7","8","5"], correct:1, cardHint:"Some 3 com 4.", teacherHint:"Junte os pés de laranja com os de limão." },
  { level:1, category:"Animais", text:"Uma cabra teve 2 cabritinhos e outra cabra teve mais 3. Quantos cabritinhos há ao todo?", options:["4","5","6","7"], correct:1, cardHint:"Some 2 com 3.", teacherHint:"Junte os cabritinhos das duas cabras." },
  { level:1, category:"Animais", text:"No terreiro há 10 galinhas. 6 delas entraram no galinheiro para descansar. Quantas ficaram do lado de fora?", options:["3","4","5","6"], correct:1, cardHint:"É uma subtração: 10 menos 6.", teacherHint:"Conte quantas galinhas restaram fora do galinheiro." },
  { level:1, category:"Horta", text:"A vovó colheu 5 ovos pela manhã e mais 4 à tarde. Quantos ovos ela colheu no total?", options:["8","9","10","7"], correct:1, cardHint:"Some 5 com 4.", teacherHint:"Junte os ovos da manhã com os da tarde.", visual:["🥚","🥚","🥚","🥚","🥚","➕","🥚","🥚","🥚","🥚"] },
  { level:1, category:"Animais", text:"No pasto há 6 ovelhas brancas e 3 ovelhas pretas. Quantas ovelhas há ao todo?", options:["8","9","10","7"], correct:1, cardHint:"Some 6 com 3.", teacherHint:"Junte as ovelhas brancas com as pretas." },
  { level:1, category:"Horta", text:"A horta tinha 7 pés de tomate. O vento derrubou 3. Quantos pés de tomate ficaram de pé?", options:["3","4","5","6"], correct:1, cardHint:"É uma subtração: 7 menos 3.", teacherHint:"Conte quantos pés restaram depois do vento." },

  /* ===== NÍVEL 2 — até 30, dúzias, litros, dinheiro ===== */
  { level:2, category:"Feira", text:"A Tia Mari tinha 15 pães. Vendeu 6 pães na feirinha. Quantos pães sobraram?", options:["8","9","10","7"], correct:1, cardHint:"É uma subtração: 15 menos 6.", teacherHint:"Conte quantos pães restaram depois da venda." },
  { level:2, category:"Horta", text:"No galinheiro há 12 ovos. A vovó usou 5 para fazer bolo. Quantos ovos sobraram?", options:["6","7","8","9"], correct:1, cardHint:"É uma subtração: 12 menos 5.", teacherHint:"Conte quantos ovos restaram depois do bolo." },
  { level:2, category:"Estrada", text:"O ônibus já buscou 8 colegas e faltam buscar mais 3. Quantos colegas o ônibus vai buscar ao todo?", options:["10","11","12","9"], correct:1, cardHint:"Some 8 com 3.", teacherHint:"Junte quem já foi buscado com quem falta buscar." },
  { level:2, category:"Feira", text:"Uma dúzia de ovos tem 12 unidades. Se a vovó já usou 4 ovos da dúzia, quantos ovos restam?", options:["7","8","9","6"], correct:1, cardHint:"É uma subtração: 12 menos 4.", teacherHint:"Uma dúzia tem 12; tire os que já foram usados." },
  { level:2, category:"Medidas", text:"A vaca Mimosa deu 14 litros de leite pela manhã e 6 litros à tarde. Quantos litros ela deu no dia todo?", options:["18","19","20","21"], correct:2, cardHint:"Some 14 com 6.", teacherHint:"Junte o leite da manhã com o da tarde." },
  { level:2, category:"Feira", text:"Na feira, uma dúzia de bananas custa 12 reais. Bernardo pagou com uma nota de 20 reais. Quanto ele recebe de troco?", options:["6","7","8","9"], correct:2, cardHint:"É uma subtração: 20 menos 12.", teacherHint:"O troco é a diferença entre o que pagou e o valor da compra." },
  { level:2, category:"Medidas", text:"O saco de milho tinha 18 quilos. Foram usados 9 quilos para alimentar as galinhas. Quantos quilos restaram?", options:["8","9","10","7"], correct:1, cardHint:"É uma subtração: 18 menos 9.", teacherHint:"Conte quanto milho restou depois de alimentar as galinhas." },
  { level:2, category:"Horta", text:"Pedro colheu 16 laranjas e Amanda colheu 7. Quantas laranjas as duas crianças colheram juntas?", options:["22","23","24","21"], correct:1, cardHint:"Some 16 com 7.", teacherHint:"Junte as laranjas colhidas pelos dois." },
  { level:2, category:"Horta", text:"Na horta da escola havia 25 pés de alface. Foram colhidos 13 para o almoço. Quantos pés restaram?", options:["11","12","13","10"], correct:1, cardHint:"É uma subtração: 25 menos 13.", teacherHint:"Conte quantos pés de alface sobraram depois da colheita." },
  { level:2, category:"Estrada", text:"O ônibus percorre 17 quilômetros até a Picada São Jacó e mais 8 quilômetros até a escola. Quantos quilômetros ao todo?", options:["23","24","25","26"], correct:2, cardHint:"Some 17 com 8.", teacherHint:"Junte as duas partes do percurso." },
  { level:2, category:"Feira", text:"A Tia Mari precisa de 20 copos de leite para o café. Ela já separou 14. Quantos copos ainda faltam?", options:["4","5","6","7"], correct:2, cardHint:"É uma subtração: 20 menos 14.", teacherHint:"Conte quantos copos ainda faltam separar." },
  { level:2, category:"Convivência", text:"Weslay tinha 9 figurinhas de animais e ganhou mais 8. Quantas figurinhas ele tem agora?", options:["16","17","18","15"], correct:1, cardHint:"Some 9 com 8.", teacherHint:"Junte as figurinhas que já tinha com as que ganhou." },
  { level:2, category:"Animais", text:"No curral há 22 ovelhas. 9 foram levadas para outro pasto. Quantas ovelhas restaram no curral?", options:["12","13","14","11"], correct:1, cardHint:"É uma subtração: 22 menos 9.", teacherHint:"Conte quantas ovelhas ficaram depois que algumas foram levadas." },
  { level:2, category:"Feira", text:"A feira vende ovos em caixas de 10. A vovó comprou 3 caixas. Quantos ovos ela comprou ao todo?", options:["20","30","13","25"], correct:1, cardHint:"Some 10 três vezes: 10+10+10.", teacherHint:"Cada caixa tem 10 ovos; junte as 3 caixas." },
  { level:2, category:"Animais", text:"São 2 grupos de 6 patinhos nadando no açude. Quantos patinhos há ao todo?", options:["10","11","12","13"], correct:2, cardHint:"Some 6 com 6.", teacherHint:"Junte os dois grupinhos de patinhos." },
  { level:2, category:"Animais", text:"No açude há 19 patos. 7 patos saíram para nadar no arroio vizinho. Quantos patos ficaram no açude?", options:["11","12","13","10"], correct:1, cardHint:"É uma subtração: 19 menos 7.", teacherHint:"Conte quantos patos ficaram depois que alguns saíram." },
  { level:2, category:"Horta", text:"Manuella colheu 11 ovos e Nicolas colheu 9. Quantos ovos os dois colheram juntos?", options:["19","20","21","18"], correct:1, cardHint:"Some 11 com 9.", teacherHint:"Junte os ovos colhidos pelos dois colegas." },
  { level:2, category:"Feira", text:"Bianca tinha 20 reais para gastar na feira. Comprou uma cesta de morangos por 12 reais. Quanto sobrou?", options:["6","7","8","9"], correct:2, cardHint:"É uma subtração: 20 menos 12.", teacherHint:"Conte quanto dinheiro sobrou depois da compra." },

  /* ===== NÍVEL 3 — multiplicação, divisão simples, comparação, tempo/distância ===== */
  { level:3, category:"Medidas", text:"Cada vaca dá 8 litros de leite por dia. Se são 3 vacas, quantos litros de leite são produzidos ao todo?", options:["16","20","24","28"], correct:2, cardHint:"Some 8 três vezes: 8+8+8.", teacherHint:"Multiplique a quantidade de leite de uma vaca pelo número de vacas." },
  { level:3, category:"Estrada", text:"O ônibus demora 5 minutos entre cada picada. Se ele passa por 4 picadas, quantos minutos leva o percurso todo?", options:["15","18","20","25"], correct:2, cardHint:"Some 5 quatro vezes.", teacherHint:"Multiplique o tempo de uma parada pelo número de paradas." },
  { level:3, category:"Animais", text:"Cada galinha põe 2 ovos por dia. Se há 6 galinhas, quantos ovos são postos em um dia?", options:["10","12","14","16"], correct:1, cardHint:"Some 2 seis vezes.", teacherHint:"Multiplique os ovos de uma galinha pelo número de galinhas." },
  { level:3, category:"Feira", text:"A Tia Mari tem 18 pães para dividir igualmente entre 3 cestas. Quantos pães vão em cada cesta?", options:["5","6","7","8"], correct:1, cardHint:"Divida 18 em 3 partes iguais.", teacherHint:"Pense em quantas vezes 3 cabe dentro de 18." },
  { level:3, category:"Animais", text:"Um saco de ração alimenta 4 porquinhos por semana. Quantos porquinhos 3 sacos conseguem alimentar?", options:["10","11","12","13"], correct:2, cardHint:"Some 4 três vezes.", teacherHint:"Multiplique a quantidade de um saco pelo número de sacos." },
  { level:3, category:"Convivência", text:"Cada aluno leva 3 frutas para o lanche coletivo. Se são 5 alunos, quantas frutas serão levadas ao todo?", options:["12","13","15","18"], correct:2, cardHint:"Some 3 cinco vezes.", teacherHint:"Multiplique as frutas de um aluno pelo número de alunos." },
  { level:3, category:"Estrada", text:"A distância entre a Picada Verão e a escola é 24 quilômetros. O ônibus já andou 15 quilômetros. Quantos quilômetros faltam?", options:["7","8","9","10"], correct:2, cardHint:"É uma subtração: 24 menos 15.", teacherHint:"Conte quanto falta para completar os 24 quilômetros." },
  { level:3, category:"Animais", text:"Um cavalo come 5 quilos de ração por dia. Quantos quilos ele come em 4 dias?", options:["15","18","20","25"], correct:2, cardHint:"Some 5 quatro vezes.", teacherHint:"Multiplique a ração de um dia pelo número de dias." },
  { level:3, category:"Convivência", text:"A turma tem 24 lápis para dividir igualmente entre 4 mesas. Quantos lápis cada mesa recebe?", options:["5","6","7","8"], correct:1, cardHint:"Divida 24 em 4 partes iguais.", teacherHint:"Pense em quantas vezes 4 cabe dentro de 24." },
  { level:3, category:"Estrada", text:"O ônibus sai às 7 horas e demora 45 minutos até a escola. Quantos minutos antes das 8 horas ele chega?", options:["10","15","20","25"], correct:1, cardHint:"Pense em quanto falta para 1 hora completa.", teacherHint:"Se ele demora 45 minutos de uma hora, quanto sobra até completar a hora?" },
  { level:3, category:"Comparação", text:"Qual quantidade é maior: 3 dúzias de ovos ou 30 ovos avulsos?", options:["3 dúzias (36 ovos)","30 ovos avulsos","As duas são iguais","Não dá para comparar"], correct:0, cardHint:"Uma dúzia tem 12; calcule 3 vezes 12.", teacherHint:"3 dúzias são 36 ovos, que é mais do que 30." },
  { level:3, category:"Medidas", text:"Um saco de milho pesa 25 quilos. Dois sacos juntos pesam quantos quilos?", options:["45","48","50","55"], correct:2, cardHint:"Some 25 com 25.", teacherHint:"Junte o peso dos dois sacos." },
  { level:3, category:"Medidas", text:"Cada vaca produz 9 litros de leite por dia. Se há 4 vacas, quantos litros são produzidos ao todo?", options:["27","32","36","40"], correct:2, cardHint:"Some 9 quatro vezes.", teacherHint:"Multiplique o leite de uma vaca pelo número de vacas." },
  { level:3, category:"Horta", text:"A horta tem 5 fileiras com 6 pés de alface cada. Quantos pés de alface há ao todo?", options:["25","28","30","35"], correct:2, cardHint:"Some 6 cinco vezes.", teacherHint:"Multiplique os pés de uma fileira pelo número de fileiras." },
  { level:3, category:"Estrada", text:"O ônibus passa por 3 picadas e gasta 7 minutos em cada uma esperando as crianças. Quanto tempo ele gasta esperando ao todo?", options:["18","20","21","24"], correct:2, cardHint:"Some 7 três vezes.", teacherHint:"Multiplique o tempo de espera de uma picada pelo número de picadas." },
  { level:3, category:"Feira", text:"Uma caixa tem 12 ovos. Se a vovó comprou 5 caixas, quantos ovos ela tem ao todo?", options:["50","55","60","65"], correct:2, cardHint:"Some 12 cinco vezes.", teacherHint:"Multiplique os ovos de uma caixa pelo número de caixas." },
  { level:3, category:"Convivência", text:"A escola recebeu 40 cadernos para dividir igualmente entre 5 turmas. Quantos cadernos cada turma recebe?", options:["6","7","8","9"], correct:2, cardHint:"Divida 40 em 5 partes iguais.", teacherHint:"Pense em quantas vezes 5 cabe dentro de 40." },
  { level:3, category:"Comparação", text:"Quem percorreu mais quilômetros: o ônibus que andou 3 vezes 8 km ou o carro que andou 20 km direto?", options:["O ônibus (24 km)","O carro (20 km)","Os dois andaram igual","Nenhum andou nada"], correct:0, cardHint:"Calcule 3 vezes 8 primeiro.", teacherHint:"3 vezes 8 é 24, que é mais do que 20." }
];

/* ------------------- CARTAS DE AJUDA (efeitos) ------------------- */
const cardEffects = [
  { key:"eliminate", icon:"❌", title:"Duas erradas fora!", text:"Duas alternativas erradas foram eliminadas. Escolha entre as que sobraram!" },
  { key:"hint",       icon:"💡", title:"Dica rápida!", text:"" },
  { key:"secondChance",icon:"🔁", title:"Segunda chance!", text:"Se você errar dessa vez, poderá tentar novamente sem perder pontos!" },
  { key:"swap",        icon:"🔄", title:"Pergunta trocada!", text:"Essa pergunta foi trocada por uma nova. Boa sorte!" }
];

/* ------------------- ESTADO DO JOGO ------------------- */
const state = {
  playerName: "Amigo(a)",
  score: 0,
  stopIndex: 0,
  onBus: [],
  helpsLeft: { friends: 2, card: 3, teacher: 1 },
  usedQuestionIdx: [],
  currentQuestionIdx: null,
  helpsUsedThisQuestion: [],
  secondChanceActive: false,
  extraMode: false,
  answered: false,
  streak: 0,
  stickers: [],
  muted: false,
  lastCardEffect: null
};

/* ------------------- HELPERS ------------------- */
function $(id){ return document.getElementById(id); }
function showScreen(id){
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  $(id).classList.add("active");
}
function shuffle(arr){
  const a = arr.slice();
  for(let i=a.length-1;i>0;i--){
    const j = Math.floor(Math.random()*(i+1));
    [a[i],a[j]] = [a[j],a[i]];
  }
  return a;
}

/* níveis por parada: as primeiras paradas são mais fáceis, as últimas mais desafiadoras */
function levelForStop(stopIndex){
  if(stopIndex <= 3) return 1;
  if(stopIndex <= 7) return 2;
  return 3;
}

function pickUnusedQuestion(level){
  let pool = level
    ? questionBank.map((q,i)=>i).filter(i => questionBank[i].level === level)
    : questionBank.map((q,i)=>i);
  let available = pool.filter(i => !state.usedQuestionIdx.includes(i));

  if(available.length === 0){
    // libera novamente as perguntas desse nível (ou de todas) se acabar o estoque
    state.usedQuestionIdx = state.usedQuestionIdx.filter(i => !pool.includes(i));
    available = pool;
  }
  const idx = available[Math.floor(Math.random()*available.length)];
  state.usedQuestionIdx.push(idx);
  return idx;
}

/* ------------------- SOM (Web Audio API, sem arquivos externos) ------------------- */
let audioCtx = null;
function getAudioCtx(){
  if(!audioCtx){
    const AC = window.AudioContext || window.webkitAudioContext;
    if(AC) audioCtx = new AC();
  }
  return audioCtx;
}
function playTone(freq, start, duration, type, gainValue){
  if(state.muted) return;
  const ctx = getAudioCtx();
  if(!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type || "sine";
  osc.frequency.value = freq;
  gain.gain.value = gainValue || 0.12;
  osc.connect(gain);
  gain.connect(ctx.destination);
  const t0 = ctx.currentTime + start;
  osc.start(t0);
  gain.gain.setValueAtTime(gain.gain.value, t0);
  gain.gain.exponentialRampToValueAtTime(0.001, t0 + duration);
  osc.stop(t0 + duration + 0.02);
}
function playCorrectSound(){
  playTone(523, 0, 0.14, "triangle", 0.13);
  playTone(659, 0.12, 0.14, "triangle", 0.13);
  playTone(784, 0.24, 0.22, "triangle", 0.14);
}
function playWrongSound(){
  playTone(220, 0, 0.22, "sine", 0.1);
  playTone(180, 0.15, 0.25, "sine", 0.09);
}
function playCoinSound(){
  playTone(988, 0, 0.08, "square", 0.06);
  playTone(1318, 0.06, 0.12, "square", 0.06);
}
function playHornSound(){
  playTone(300, 0, 0.18, "sawtooth", 0.08);
  playTone(300, 0.2, 0.18, "sawtooth", 0.08);
}
function playCardFlipSound(){
  playTone(440, 0, 0.05, "square", 0.05);
  playTone(520, 0.05, 0.08, "square", 0.05);
}
function playStreakSound(){
  [523,659,784,988].forEach((f,i)=> playTone(f, i*0.09, 0.12, "triangle", 0.11));
}

function toggleMute(){
  state.muted = !state.muted;
  $("btn-mute").textContent = state.muted ? "🔇" : "🔊";
}

/* ------------------- CONFETE / ESTRELINHAS ------------------- */
function launchConfetti(){
  const layer = $("fx-layer");
  const emojis = ["⭐","✨","🎉","🌟"];
  for(let i=0;i<24;i++){
    const piece = document.createElement("div");
    piece.className = "fx-piece";
    piece.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    piece.style.left = Math.random()*100 + "vw";
    piece.style.animationDuration = (1.5 + Math.random()*1.5) + "s";
    piece.style.fontSize = (1 + Math.random()*1.2) + "rem";
    layer.appendChild(piece);
    setTimeout(()=>piece.remove(), 3200);
  }
}

/* ------------------- INÍCIO DO JOGO ------------------- */
function startGame(){
  const nameInput = $("playerName").value.trim();
  state.playerName = nameInput || "Amigo(a)";
  state.score = 0;
  state.stopIndex = 0;
  state.onBus = [];
  state.helpsLeft = { friends: 2, card: 3, teacher: 1 };
  state.usedQuestionIdx = [];
  state.extraMode = false;
  state.streak = 0;
  state.stickers = [];

  updateHelpButtons();
  renderStickers();
  showScreen("screen-map");
  renderMap();
  updateHud();

  setTimeout(()=> goToStop(0), 600);
}

/* ------------------- MAPA ------------------- */
function renderMap(){
  const road = $("road");
  road.querySelectorAll(".house-stop").forEach(el=>el.remove());
  const oldBus = road.querySelector(".road-bus");
  if(oldBus) oldBus.remove();

  students.forEach((s, i)=>{
    const div = document.createElement("div");
    div.className = "house-stop";
    div.id = "house-" + i;
    div.innerHTML = `<span class="house-emoji">🏠</span><span class="house-name">${s.name}</span>`;
    road.appendChild(div);
  });

  const bus = document.createElement("div");
  bus.className = "road-bus";
  bus.id = "road-bus";
  bus.textContent = "🚌";
  bus.style.left = "0%";
  road.appendChild(bus);
}

function updateBusPosition(){
  const bus = $("road-bus");
  if(!bus) return;
  const totalStops = students.length;
  const pct = (state.stopIndex / totalStops) * 90;
  bus.style.left = pct + "%";

  document.querySelectorAll(".house-stop").forEach((el, i)=>{
    el.classList.remove("current","visited");
    if(i < state.stopIndex) el.classList.add("visited");
    if(i === state.stopIndex) el.classList.add("current");
  });
}

function renderBusPassengers(){
  const wrap = $("bus-passengers");
  wrap.innerHTML = "";
  state.onBus.forEach(name=>{
    const chip = document.createElement("span");
    chip.className = "passenger-chip";
    chip.textContent = "🙂 " + name;
    wrap.appendChild(chip);
  });
}

function renderStickers(){
  const wrap = $("sticker-list");
  if(!wrap) return;
  wrap.innerHTML = "";
  if(state.stickers.length === 0){
    wrap.innerHTML = "<span style='font-size:0.85rem;color:#999;'>Acerte sem ajuda para ganhar figurinhas!</span>";
    return;
  }
  state.stickers.forEach(st=>{
    const chip = document.createElement("span");
    chip.className = "sticker-chip";
    chip.textContent = st;
    wrap.appendChild(chip);
  });
}

function updateHud(){
  $("hud-score").textContent = state.score;
  $("hud-onbus").textContent = state.onBus.length + "/" + students.length;
  $("hud-stop").textContent = Math.min(state.stopIndex, students.length) + "/" + students.length;
  const pct = Math.min(100, (state.score/100)*100);
  $("hud-progress-fill").style.width = pct + "%";
  renderBusPassengers();
  renderStickers();
}

function updateHelpButtons(){
  $("help-friends-count").textContent = state.helpsLeft.friends;
  $("help-card-count").textContent = state.helpsLeft.card;
  $("help-teacher-count").textContent = state.helpsLeft.teacher;
  $("btn-help-friends").disabled = state.helpsLeft.friends <= 0;
  $("btn-help-card").disabled = state.helpsLeft.card <= 0;
  $("btn-help-teacher").disabled = state.helpsLeft.teacher <= 0;
}

/* ------------------- IR PARA UMA PARADA ------------------- */
function goToStop(index){
  state.stopIndex = index;
  updateBusPosition();
  updateHud();
  playHornSound();

  setTimeout(()=>{
    showScreen("screen-question");
    loadQuestionForStop(index);
  }, 900);
}

function loadQuestionForStop(stopIndex){
  const student = students[stopIndex];
  const level = levelForStop(stopIndex);
  state.currentQuestionIdx = pickUnusedQuestion(level);
  state.helpsUsedThisQuestion = [];
  state.secondChanceActive = false;
  state.answered = false;

  $("stop-banner").textContent = "🚏 Parada: Casa de " + student.name;
  renderQuestion();
}

function renderQuestion(){
  const q = questionBank[state.currentQuestionIdx];
  $("category-tag").textContent = "🔢 " + q.category;
  $("question-text").textContent = q.text;
  $("feedback-banner").className = "feedback-banner";
  $("feedback-banner").textContent = "";

  const visualBox = $("question-visual");
  visualBox.innerHTML = "";
  if(q.visual && q.visual.length){
    q.visual.forEach(em=>{
      const span = document.createElement("span");
      span.textContent = em;
      visualBox.appendChild(span);
    });
  }

  const grid = $("answers-grid");
  grid.innerHTML = "";
  const letters = ["A","B","C","D"];
  q.options.forEach((opt, i)=>{
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.dataset.index = i;
    btn.innerHTML = `<span class="answer-letter">${letters[i]}</span><span>${opt}</span>`;
    btn.addEventListener("click", ()=> handleAnswer(i));
    grid.appendChild(btn);
  });

  updateHelpButtons();
}

/* ------------------- RESPOSTA ------------------- */
function handleAnswer(selectedIndex){
  if(state.answered) return;
  const q = questionBank[state.currentQuestionIdx];
  const correct = selectedIndex === q.correct;
  const buttons = document.querySelectorAll(".answer-btn");

  if(correct){
    state.answered = true;
    buttons.forEach(b=>{
      b.classList.add("disabled");
      if(parseInt(b.dataset.index) === q.correct) b.classList.add("correct");
    });
    onCorrectAnswer();
  } else {
    if(state.secondChanceActive){
      buttons[selectedIndex].classList.add("wrong");
      buttons[selectedIndex].classList.add("disabled");
      playWrongSound();
      showFeedback("Quase! Você ainda tem uma segunda chance. Tente outra alternativa!", false, true);
      state.secondChanceActive = false;
      return;
    }
    state.answered = true;
    buttons.forEach(b=>{
      b.classList.add("disabled");
      const bi = parseInt(b.dataset.index);
      if(bi === selectedIndex) b.classList.add("wrong");
      if(bi === q.correct) b.classList.add("correct");
    });
    onWrongAnswer();
  }
}

function pointsForCorrect(){
  if(state.extraMode) return 10;
  if(state.helpsUsedThisQuestion.length === 0) return 10;
  let min = 10;
  state.helpsUsedThisQuestion.forEach(h=>{
    if(h === "friends") min = Math.min(min, 7);
    if(h === "card") min = Math.min(min, 6);
    if(h === "teacher") min = Math.min(min, 6);
  });
  return min;
}

function onCorrectAnswer(){
  const student = state.extraMode ? null : students[state.stopIndex];
  const pts = pointsForCorrect();
  state.score += pts;
  state.streak++;

  playCorrectSound();
  setTimeout(playCoinSound, 200);
  launchConfetti();

  // figurinha só quando acerta sem nenhuma ajuda
  let stickerMsg = "";
  if(state.helpsUsedThisQuestion.length === 0){
    const sticker = stickerPool[Math.floor(Math.random()*stickerPool.length)];
    state.stickers.push(sticker);
    stickerMsg = ` Você ganhou a figurinha ${sticker}!`;
  }

  if(student){
    state.onBus.push(student.name);
    showFeedback(`🎉 Muito bem! ${student.name} entrou no ônibus! (+${pts} pontos)${stickerMsg}`, true, false);
  } else {
    showFeedback(`🎉 Muito bem! (+${pts} pontos)${stickerMsg}`, true, false);
  }

  showStreakBanner();
  updateHud();
  setTimeout(()=> advance(), 1700);
}

function onWrongAnswer(){
  const q = questionBank[state.currentQuestionIdx];
  state.streak = 0;
  playWrongSound();
  state.score = Math.max(0, state.score - 5);
  const letters = ["A","B","C","D"];
  showFeedback(`💛 Ops! Não foi dessa vez, mas a viagem continua! A resposta certa era ${letters[q.correct]}: "${q.options[q.correct]}". (-5 pontos)`, false, true);
  updateHud();
  setTimeout(()=> advance(), 2200);
}

function showFeedback(msg, good, bad){
  const el = $("feedback-banner");
  el.textContent = msg;
  el.className = "feedback-banner show " + (good ? "good" : bad ? "bad" : "");
}

function showStreakBanner(){
  const el = $("streak-banner");
  if(state.streak >= 3 && state.streak % 3 === 0){
    el.textContent = `🔥 Sequência de ${state.streak} acertos! Você está mandando bem!`;
    el.classList.add("show");
    playStreakSound();
    setTimeout(()=> el.classList.remove("show"), 2600);
  }
}

/* ------------------- AVANÇAR ------------------- */
function advance(){
  if(state.extraMode){
    if(state.score >= 100){
      finishGame();
    } else {
      loadExtraQuestion();
    }
    return;
  }

  const nextIndex = state.stopIndex + 1;
  if(nextIndex < students.length){
    showScreen("screen-map");
    // pequenas pausas de respiro em algumas paradas, sem pontuação
    if(nextIndex === 3 || nextIndex === 6 || nextIndex === 9){
      showPauseEvent(()=> goToStop(nextIndex));
    } else {
      goToStop(nextIndex);
    }
  } else {
    state.stopIndex = students.length;
    updateBusPosition();
    updateHud();
    if(state.score >= 100){
      finishGame();
    } else {
      showScreen("screen-extra-intro");
    }
  }
}

function showPauseEvent(onContinue){
  const ev = pauseEvents[Math.floor(Math.random()*pauseEvents.length)];
  $("event-emoji").textContent = ev.emoji;
  $("event-text").textContent = ev.text;
  showScreen("screen-event");
  $("btn-event-continue").onclick = ()=>{
    onContinue();
  };
}

/* ------------------- DESAFIOS EXTRAS ------------------- */
function loadExtraQuestion(){
  state.currentQuestionIdx = pickUnusedQuestion(null);
  state.helpsUsedThisQuestion = [];
  state.secondChanceActive = false;
  state.answered = false;
  $("stop-banner").textContent = "🌟 Desafio extra — faltam pontos para o café!";
  showScreen("screen-question");
  renderQuestion();
}

/* ------------------- FINAL DO JOGO ------------------- */
function finishGame(){
  $("certificate-name").textContent = state.playerName;
  showScreen("screen-final");
  launchConfetti();

  ["reward-1","reward-2","reward-3"].forEach((id, i)=>{
    $(id).classList.remove("show");
    setTimeout(()=>{ $(id).classList.add("show"); launchConfetti(); playCoinSound(); }, 500 + i*900);
  });
}

/* ------------------- AJUDA 1: COLEGAS ------------------- */
function useClassmatesHelp(){
  if(state.helpsLeft.friends <= 0 || state.answered) return;
  state.helpsLeft.friends--;
  state.helpsUsedThisQuestion.push("friends");
  updateHelpButtons();
  playCardFlipSound();

  const q = questionBank[state.currentQuestionIdx];
  const letters = ["A","B","C","D"];
  const voters = shuffle(students.filter(s => !state.onBus.includes(s.name))).slice(0,3);
  const fallbackVoters = voters.length ? voters : shuffle(students).slice(0,3);

  const phrasesRight = ["Acho que é", "Tenho certeza que é", "Eu escolheria", "Com certeza é"];
  const phrasesWrong = ["Talvez seja", "Acho que pode ser", "Eu ia de", "Quem sabe é"];

  const votesHtml = fallbackVoters.map((s, idx)=>{
    const goRight = Math.random() < 0.7;
    const letterIdx = goRight ? q.correct : Math.floor(Math.random()*4);
    const phrase = goRight ? phrasesRight[idx % phrasesRight.length] : phrasesWrong[idx % phrasesWrong.length];
    return `<div class="friend-vote"><span class="avatar">${s.emoji}</span><span class="bubble"><strong>${s.name}:</strong> "${phrase} ${letters[letterIdx]}!"</span></div>`;
  }).join("");

  $("friends-votes").innerHTML = votesHtml;
  $("modal-friends").classList.add("active");
}

/* ------------------- AJUDA 2: CARTA ------------------- */
function useCardHelp(){
  if(state.helpsLeft.card <= 0 || state.answered) return;
  state.helpsLeft.card--;
  state.helpsUsedThisQuestion.push("card");
  updateHelpButtons();
  playCardFlipSound();

  const q = questionBank[state.currentQuestionIdx];
  const effect = cardEffects[Math.floor(Math.random()*cardEffects.length)];
  state.lastCardEffect = effect.key;

  $("card-icon").textContent = effect.icon;
  $("card-title").textContent = effect.title;

  if(effect.key === "eliminate"){
    $("card-text").textContent = effect.text;
    applyEliminateTwo(q);
  } else if(effect.key === "hint"){
    $("card-text").textContent = "Dica: " + q.cardHint;
  } else if(effect.key === "secondChance"){
    $("card-text").textContent = effect.text;
    state.secondChanceActive = true;
  } else if(effect.key === "swap"){
    $("card-text").textContent = effect.text;
    state.currentQuestionIdx = pickUnusedQuestion(state.extraMode ? null : levelForStop(state.stopIndex));
  }

  $("modal-card").classList.add("active");
}

function applyEliminateTwo(q){
  const buttons = Array.from(document.querySelectorAll(".answer-btn"));
  const wrongIndices = buttons.map(b=>parseInt(b.dataset.index)).filter(i => i !== q.correct);
  const toEliminate = shuffle(wrongIndices).slice(0,2);
  buttons.forEach(b=>{
    if(toEliminate.includes(parseInt(b.dataset.index))){
      b.classList.add("eliminated");
    }
  });
}

/* ------------------- AJUDA 3: PROFESSORA ------------------- */
function callTeacher(){
  if(state.helpsLeft.teacher <= 0 || state.answered) return;
  state.helpsLeft.teacher--;
  state.helpsUsedThisQuestion.push("teacher");
  updateHelpButtons();

  const q = questionBank[state.currentQuestionIdx];
  const teacherName = Math.random() < 0.5 ? "Professora Dirlene" : "Professora Ana";
  $("teacher-calling").textContent = "☎️ Ligando para a " + teacherName + "...";
  $("teacher-tip").textContent = "";

  $("modal-teacher").classList.add("active");
  setTimeout(()=>{
    $("teacher-tip").textContent = "💡 " + q.teacherHint;
  }, 1200);
}

/* ------------------- EVENTOS ------------------- */
document.addEventListener("DOMContentLoaded", ()=>{
  $("btn-start").addEventListener("click", startGame);
  $("btn-howto").addEventListener("click", ()=> showScreen("screen-howto"));
  $("btn-howto-back").addEventListener("click", ()=> showScreen("screen-start"));
  $("btn-mute").addEventListener("click", toggleMute);

  $("btn-help-friends").addEventListener("click", useClassmatesHelp);
  $("btn-help-card").addEventListener("click", useCardHelp);
  $("btn-help-teacher").addEventListener("click", callTeacher);

  $("btn-friends-close").addEventListener("click", ()=> $("modal-friends").classList.remove("active"));
  $("btn-teacher-close").addEventListener("click", ()=> $("modal-teacher").classList.remove("active"));
  $("btn-card-close").addEventListener("click", ()=>{
    $("modal-card").classList.remove("active");
    if(state.lastCardEffect === "swap"){
      renderQuestion();
    }
  });

  $("btn-extra-continue").addEventListener("click", ()=>{
    state.extraMode = true;
    loadExtraQuestion();
  });

  $("btn-play-again").addEventListener("click", ()=>{
    showScreen("screen-start");
  });
});
