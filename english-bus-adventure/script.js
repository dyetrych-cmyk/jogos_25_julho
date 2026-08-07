/* ============================================================
   English Bus Adventure – Lógica do Jogo
   Escola 25 de Julho · Sapiranga / RS
   ============================================================ */
'use strict';

/* ── Banco de perguntas (85 questões) ──────────────────────
   Cada questão tem:
     cat, emoji, q, opts[4], a (índice), hint (dica rápida),
     teacherHint (dica forte da professora, sem revelar a resposta)
   ──────────────────────────────────────────────────────── */
const QUESTIONS = [
  // ── CORES (10) ────────────────────────────────────────────
  { cat:'Cores 🎨', emoji:'🌤️',
    q:'De que cor é o céu em inglês?',
    speechParts:[{lang:'pt-BR',text:'De que cor é o céu em inglês?'}],
    opts:['Blue','Red','Green','Yellow'], a:0,
    explanation:'Blue quer dizer azul.',
    hint:'Olhe para o céu num dia de sol!',
    teacherHint:'Pensa no oceano, no mar e no céu num dia de sol... é a mesma cor!' },
  { cat:'Cores 🎨', emoji:'🌿',
    q:'De que cor é a grama em inglês?',
    speechParts:[{lang:'pt-BR',text:'De que cor é a grama em inglês?'}],
    opts:['Orange','Blue','Green','Pink'], a:2,
    explanation:'Green quer dizer verde.',
    hint:'Pense no campo perto da escola!',
    teacherHint:'Olha pela janela para o campo perto da escola. Que cor você vê?' },
  { cat:'Cores 🎨', emoji:'☀️',
    q:'De que cor é o sol em inglês?',
    speechParts:[{lang:'pt-BR',text:'De que cor é o sol em inglês?'}],
    opts:['Purple','Yellow','White','Black'], a:1,
    explanation:'Yellow quer dizer amarelo.',
    hint:'Ela brilha e nos dá luz!',
    teacherHint:'É a mesma cor de uma banana madura e de um girassol!' },
  { cat:'Cores 🎨', emoji:'🍎',
    q:'De que cor é a maçã vermelha em inglês?',
    speechParts:[{lang:'pt-BR',text:'De que cor é a maçã vermelha em inglês?'}],
    opts:['Blue','Green','Red','Yellow'], a:2,
    explanation:'Red quer dizer vermelho.',
    hint:'Esta maçã é da cor do fogo!',
    teacherHint:'É a cor do fogo, dos bombeiros e das rosas do jardim!' },
  { cat:'Cores 🎨', emoji:'🍊',
    q:'De que cor é a laranja em inglês?',
    speechParts:[{lang:'pt-BR',text:'De que cor é a laranja em inglês?'}],
    opts:['Orange','Purple','White','Blue'], a:0,
    explanation:'Orange quer dizer laranja (a cor e a fruta!).',
    hint:'O nome é igual ao da fruta!',
    teacherHint:'Curiosidade: o nome da cor é exatamente igual ao nome da fruta!' },
  { cat:'Cores 🎨', emoji:'🥛',
    q:'De que cor é o leite em inglês?',
    speechParts:[{lang:'pt-BR',text:'De que cor é o leite em inglês?'}],
    opts:['Red','White','Blue','Yellow'], a:1,
    explanation:'White quer dizer branco.',
    hint:'É muito clara, como a neve.',
    teacherHint:'É a cor da neve, das nuvens e do papel em branco!' },
  { cat:'Cores 🎨', emoji:'🍌',
    q:'De que cor é a banana em inglês?',
    speechParts:[{lang:'pt-BR',text:'De que cor é a banana em inglês?'}],
    opts:['Pink','White','Yellow','Green'], a:2,
    explanation:'Yellow quer dizer amarelo.',
    hint:'Brilhante como o sol.',
    teacherHint:'É a cor do ouro, dos pintinhos e do sol no céu!' },
  { cat:'Cores 🎨', emoji:'🍓',
    q:'De que cor é o morango em inglês?',
    speechParts:[{lang:'pt-BR',text:'De que cor é o morango em inglês?'}],
    opts:['Red','Orange','Purple','Blue'], a:0,
    explanation:'Red quer dizer vermelho.',
    hint:'Mesma cor dos caminhões de bombeiro!',
    teacherHint:'Pensa nos carros de bombeiro, nas rosas e no coração... qual cor é essa?' },
  { cat:'Cores 🎨', emoji:'🍇',
    q:'De que cor é a uva em inglês?',
    speechParts:[{lang:'pt-BR',text:'De que cor é a uva em inglês?'}],
    opts:['Yellow','Red','Purple','White'], a:2,
    explanation:'Purple quer dizer roxo.',
    hint:'Uma mistura de azul e vermelho.',
    teacherHint:'Se você misturar azul com vermelho, que cor fica? É essa!' },
  { cat:'Cores 🎨', emoji:'🐸',
    q:'De que cor é o sapo em inglês?',
    speechParts:[{lang:'pt-BR',text:'De que cor é o sapo em inglês?'}],
    opts:['Red','Green','Blue','Yellow'], a:1,
    explanation:'Green quer dizer verde.',
    hint:'Mesma cor da grama onde ele pula.',
    teacherHint:'É a cor das folhas, da grama e das árvores do sítio!' },

  // ── NÚMEROS (10) ──────────────────────────────────────────
  { cat:'Números 🔢', emoji:'1️⃣', q:'Como se diz "1" em inglês?',
    speechParts:[{lang:'pt-BR',text:'Como se diz um em inglês?'}],
    opts:['One','Two','Three','Four'], a:0,
    explanation:'One quer dizer um.', hint:'O primeiro número de todos!',
    teacherHint:'Um, dois, três... qual é o PRIMEIRO número que você conta?' },
  { cat:'Números 🔢', emoji:'2️⃣', q:'Como se diz "2" em inglês?',
    speechParts:[{lang:'pt-BR',text:'Como se diz dois em inglês?'}],
    opts:['Five','Two','Seven','Nine'], a:1,
    explanation:'Two quer dizer dois.', hint:'Dois olhos, duas mãos…',
    teacherHint:'Olha para os seus dois olhos, suas duas mãos... que número é esse?' },
  { cat:'Números 🔢', emoji:'3️⃣', q:'Como se diz "3" em inglês?',
    speechParts:[{lang:'pt-BR',text:'Como se diz três em inglês?'}],
    opts:['One','Four','Three','Eight'], a:2,
    explanation:'Three quer dizer três.', hint:'O triângulo tem esse número de lados.',
    teacherHint:'Um triângulo tem este número de lados: conta 1, 2, ___!' },
  { cat:'Números 🔢', emoji:'4️⃣', q:'Como se diz "4" em inglês?',
    speechParts:[{lang:'pt-BR',text:'Como se diz quatro em inglês?'}],
    opts:['Four','Six','Two','Ten'], a:0,
    explanation:'Four quer dizer quatro.', hint:'Um carro tem esse número de rodas.',
    teacherHint:'Uma mesa tem este número de pernas: 1, 2, 3, ___!' },
  { cat:'Números 🔢', emoji:'5️⃣', q:'Como se diz "5" em inglês?',
    speechParts:[{lang:'pt-BR',text:'Como se diz cinco em inglês?'}],
    opts:['Three','Eight','Five','One'], a:2,
    explanation:'Five quer dizer cinco.', hint:'Conte os dedos de uma mão!',
    teacherHint:'Levanta uma mão só e conta os seus dedos! Quantos são?' },
  { cat:'Números 🔢', emoji:'6️⃣', q:'Como se diz "6" em inglês?',
    speechParts:[{lang:'pt-BR',text:'Como se diz seis em inglês?'}],
    opts:['Nine','Seven','Six','Two'], a:2,
    explanation:'Six quer dizer seis.', hint:'Um inseto tem esse número de patas.',
    teacherHint:'Uma formiga tem este número de perninhas. Conta: 1,2,3,4,5,___!' },
  { cat:'Números 🔢', emoji:'7️⃣', q:'Como se diz "7" em inglês?',
    speechParts:[{lang:'pt-BR',text:'Como se diz sete em inglês?'}],
    opts:['Seven','Four','Two','Eight'], a:0,
    explanation:'Seven quer dizer sete.', hint:'Dias da semana = esse número.',
    teacherHint:'Quantos dias tem uma semana? Dom, Seg, Ter, Qua, Qui, Sex, Sáb...' },
  { cat:'Números 🔢', emoji:'8️⃣', q:'Como se diz "8" em inglês?',
    speechParts:[{lang:'pt-BR',text:'Como se diz oito em inglês?'}],
    opts:['Three','Six','One','Eight'], a:3,
    explanation:'Eight quer dizer oito.', hint:'Uma aranha tem esse número de patas.',
    teacherHint:'Uma aranha tem este número de pernas. Seis mais dois é igual a ___!' },
  { cat:'Números 🔢', emoji:'9️⃣', q:'Como se diz "9" em inglês?',
    speechParts:[{lang:'pt-BR',text:'Como se diz nove em inglês?'}],
    opts:['Five','Nine','Two','Four'], a:1,
    explanation:'Nine quer dizer nove.', hint:'Um a menos que dez.',
    teacherHint:'É o número que vem antes do 10: 7, 8, ___, 10!' },
  { cat:'Números 🔢', emoji:'🔟', q:'Como se diz "10" em inglês?',
    speechParts:[{lang:'pt-BR',text:'Como se diz dez em inglês?'}],
    opts:['Ten','Two','Six','Three'], a:0,
    explanation:'Ten quer dizer dez.', hint:'Todos os dedos das duas mãos!',
    teacherHint:'Conta TODOS os seus dedos das duas mãos juntas: 1 até ___!' },

  // ── FRUTAS (10) ───────────────────────────────────────────
  { cat:'Frutas 🍎', emoji:'🍎', q:'"Maçã" in English is…',
    speakText:'Apple', opts:['Apple','Mango','Pear','Plum'], a:0,
    hint:'Famosa fruta que Newton viu cair!',
    teacherHint:'É redonda, pode ser vermelha ou verde, e cai das macieiras!' },
  { cat:'Frutas 🍎', emoji:'🍌', q:'"Banana" in English is…',
    speakText:'Banana', opts:['Cherry','Grape','Banana','Lemon'], a:2,
    hint:'É amarela e os macacos adoram!',
    teacherHint:'Amarela, curva, os macacos adoram. Parece igual em português!' },
  { cat:'Frutas 🍎', emoji:'🍊', q:'"Laranja" in English is…',
    speakText:'Orange', opts:['Apple','Orange','Peach','Kiwi'], a:1,
    hint:'O nome dela também é uma cor!',
    teacherHint:'O nome desta fruta é igual ao nome de uma cor! (a cor laranja = orange)' },
  { cat:'Frutas 🍎', emoji:'🍓', q:'"Morango" in English is…',
    speakText:'Strawberry', opts:['Strawberry','Blueberry','Cherry','Peach'], a:0,
    hint:'Vermelha, pequena e doce!',
    teacherHint:'Pequena, vermelha, com sementes por fora. Cresce rente ao chão!' },
  { cat:'Frutas 🍎', emoji:'🍇', q:'"Uva" in English is…',
    speakText:'Grape', opts:['Melon','Grape','Plum','Mango'], a:1,
    hint:'Cresce em cachos na parreira.',
    teacherHint:'Cresce em cachos na parreira. Pode ser roxa, verde ou vermelha!' },
  { cat:'Frutas 🍎', emoji:'🍍', q:'"Abacaxi" in English is…',
    speakText:'Pineapple', opts:['Papaya','Coconut','Pineapple','Mango'], a:2,
    hint:'Coroa espetada e doce por dentro!',
    teacherHint:'Tem uma coroa de folhas espetadas em cima e é muito doce por dentro!' },
  { cat:'Frutas 🍎', emoji:'🍉', q:'"Melancia" in English is…',
    speakText:'Watermelon', opts:['Watermelon','Cantaloupe','Lemon','Lime'], a:0,
    hint:'Grande, verde por fora e vermelha por dentro!',
    teacherHint:'Enorme, verde por fora, vermelha por dentro, cheia de água!' },
  { cat:'Frutas 🍎', emoji:'🍋', q:'"Limão" in English is…',
    speakText:'Lemon', opts:['Apple','Banana','Lemon','Grape'], a:2,
    hint:'Muito azedo e amarelo!',
    teacherHint:'Amarelo ou verde, muito azedo. Faz limonada! Rima com "demon".' },
  { cat:'Frutas 🍎', emoji:'🥭', q:'"Manga" in English is…',
    speakText:'Mango', opts:['Melon','Peach','Plum','Mango'], a:3,
    hint:'Tropical e muito doce!',
    teacherHint:'Fruta tropical muito doce, laranja por dentro. Quase soa igual em português!' },
  { cat:'Frutas 🍎', emoji:'🍑', q:'"Pêssego" in English is…',
    speakText:'Peach', opts:['Cherry','Peach','Plum','Apple'], a:1,
    hint:'Macio, redondo e cor de laranja-rosado.',
    teacherHint:'Macia, redonda, cor de rosa-alaranjado. Cresce em regiões mais frias do RS!' },

  // ── TRANSPORTES (8) ───────────────────────────────────────
  { cat:'Transportes 🚌', emoji:'🚌', q:'"Ônibus" in English is…',
    speakText:'Bus', opts:['Car','Bus','Train','Boat'], a:1,
    hint:'Te leva para a escola todo dia!',
    teacherHint:'É grande, tem várias fileiras de bancos e te traz para a escola! Pensa bem...' },
  { cat:'Transportes 🚌', emoji:'🚗', q:'"Carro" in English is…',
    speakText:'Car', opts:['Bike','Car','Truck','Bus'], a:1,
    hint:'Quatro rodas, a família usa.',
    teacherHint:'Tem 4 rodas, motor, 4 ou 5 lugares. Sua família usa para passear!' },
  { cat:'Transportes 🚌', emoji:'🚲', q:'"Bicicleta" in English is…',
    speakText:'Bicycle', opts:['Motorcycle','Tractor','Bicycle','Bus'], a:2,
    hint:'Duas rodas, você pedala.',
    teacherHint:'Tem 2 rodas, você pedala com as pernas. Não tem motor!' },
  { cat:'Transportes 🚌', emoji:'🚂', q:'"Trem" in English is…',
    speakText:'Train', opts:['Bus','Car','Train','Boat'], a:2,
    hint:'Anda nos trilhos e apita!',
    teacherHint:'Anda sobre trilhos de ferro, faz fila de vagões e apita!' },
  { cat:'Transportes 🚌', emoji:'✈️', q:'"Avião" in English is…',
    speakText:'Airplane', opts:['Airplane','Helicopter','Rocket','Boat'], a:0,
    hint:'Voa bem alto no céu.',
    teacherHint:'Voa bem alto no céu, mais alto que os pássaros e as nuvens!' },
  { cat:'Transportes 🚌', emoji:'⛵', q:'"Barco" in English is…',
    speakText:'Boat', opts:['Train','Bicycle','Car','Boat'], a:3,
    hint:'Flutua na água.',
    teacherHint:'Flutua na água e leva pessoas pelos rios, lagos e oceanos!' },
  { cat:'Transportes 🚌', emoji:'🚜', q:'"Trator" in English is…',
    speakText:'Tractor', opts:['Truck','Tractor','Bus','Car'], a:1,
    hint:'Os fazendeiros usam no campo!',
    teacherHint:'É usado na fazenda para arar a terra e plantar. Os agricultores adoram!' },
  { cat:'Transportes 🚌', emoji:'🏍️', q:'"Moto" in English is…',
    speakText:'Motorcycle', opts:['Motorcycle','Bicycle','Scooter','Bus'], a:0,
    hint:'Duas rodas, mas tem motor.',
    teacherHint:'Tem 2 rodas como a bicicleta, mas tem motor. Faz barulho!' },

  // ── SALA DE AULA (10) ─────────────────────────────────────
  { cat:'Sala de Aula 🏫', emoji:'📚', q:'"Livro" in English is…',
    speakText:'Book', opts:['Pencil','Book','Ruler','Pen'], a:1,
    hint:'Você lê histórias dentro dele.',
    teacherHint:'Tem capa, folhas e páginas. Você lê histórias dentro dele!' },
  { cat:'Sala de Aula 🏫', emoji:'✏️', q:'"Lápis" in English is…',
    speakText:'Pencil', opts:['Pencil','Eraser','Pen','Ruler'], a:0,
    hint:'Você desenha e escreve com ele.',
    teacherHint:'É de madeira por fora, grafite por dentro. Serve para escrever e desenhar!' },
  { cat:'Sala de Aula 🏫', emoji:'🧹', q:'"Borracha" in English is…',
    speakText:'Eraser', opts:['Glue','Ruler','Eraser','Scissors'], a:2,
    hint:'Remove as marcas do lápis.',
    teacherHint:'Serve para apagar o que você escreveu a lápis. Ela "apaga" os erros!' },
  { cat:'Sala de Aula 🏫', emoji:'📓', q:'"Caderno" in English is…',
    speakText:'Notebook', opts:['Book','Notebook','Folder','Album'], a:1,
    hint:'Você escreve as lições aqui.',
    teacherHint:'Tem muitas folhas pautadas onde você escreve a lição da professora!' },
  { cat:'Sala de Aula 🏫', emoji:'🖊️', q:'"Caneta" in English is…',
    speakText:'Pen', opts:['Pen','Pencil','Marker','Brush'], a:0,
    hint:'Usa tinta, não grafite.',
    teacherHint:'Usa tinta (não grafite como o lápis). Difícil de apagar!' },
  { cat:'Sala de Aula 🏫', emoji:'📏', q:'"Régua" in English is…',
    speakText:'Ruler', opts:['Scissors','Glue','Pencil','Ruler'], a:3,
    hint:'Ferramenta reta para traçar linhas.',
    teacherHint:'É reta, comprida e usada para traçar linhas direitinhas e medir!' },
  { cat:'Sala de Aula 🏫', emoji:'✂️', q:'"Tesoura" in English is…',
    speakText:'Scissors', opts:['Glue','Scissors','Tape','Ruler'], a:1,
    hint:'Duas lâminas afiadas para cortar.',
    teacherHint:'Tem duas lâminas que se cruzam e servem para cortar papel e tecido!' },
  { cat:'Sala de Aula 🏫', emoji:'🎒', q:'"Mochila" in English is…',
    speakText:'Backpack', opts:['Backpack','Bag','Box','Folder'], a:0,
    hint:'Você carrega nas costas até a escola.',
    teacherHint:'Você carrega nas costas, com alças nos dois ombros, cheia de livros!' },
  { cat:'Sala de Aula 🏫', emoji:'👩‍🏫', q:'"Professora" in English is…',
    speakText:'Teacher', opts:['Student','Teacher','Principal','Doctor'], a:1,
    hint:'Ela te ensina todo dia!',
    teacherHint:'É a pessoa que ensina toda a turma, explica as lições e corrige os cadernos!' },
  { cat:'Sala de Aula 🏫', emoji:'🪑', q:'"Cadeira" in English is…',
    speakText:'Chair', opts:['Table','Door','Chair','Window'], a:2,
    hint:'Você senta nela na sala de aula.',
    teacherHint:'É o móvel com pernas onde você SENTA para estudar na sala!' },

  // ── BRINQUEDOS (8) ────────────────────────────────────────
  { cat:'Brinquedos 🎲', emoji:'⚽', q:'"Bola" in English is…',
    speakText:'Ball', opts:['Bat','Ball','Rope','Kite'], a:1,
    hint:'Redonda – você chuta!',
    teacherHint:'É redonda, você chuta, arremessa ou quica no chão ao brincar!' },
  { cat:'Brinquedos 🎲', emoji:'🪆', q:'"Boneca" in English is…',
    speakText:'Doll', opts:['Robot','Car','Doll','Bear'], a:2,
    hint:'Um brinquedo que parece uma pessoa.',
    teacherHint:'Brinquedo com formato humano, que parece uma menininha ou bebê!' },
  { cat:'Brinquedos 🎲', emoji:'🪁', q:'"Pipa" in English is…',
    speakText:'Kite', opts:['Ball','Rope','Kite','Puzzle'], a:2,
    hint:'Você solta ela no vento!',
    teacherHint:'Você segura num fio e ela voa lá no alto quando tem vento!' },
  { cat:'Brinquedos 🎲', emoji:'🧸', q:'"Urso de pelúcia" in English is…',
    speakText:'Teddy Bear', opts:['Toy Car','Kite','Puppet','Teddy Bear'], a:3,
    hint:'Um urso macio para abraçar!',
    teacherHint:'É macio, fofinho, em forma de urso. Todo mundo quer dar abraço nele!' },
  { cat:'Brinquedos 🎲', emoji:'🧩', q:'"Quebra-cabeça" in English is…',
    speakText:'Puzzle', opts:['Game','Puzzle','Doll','Ball'], a:1,
    hint:'Você encaixa as peças.',
    teacherHint:'Tem muitas peças que você encaixa para formar uma imagem completa!' },
  { cat:'Brinquedos 🎲', emoji:'🪢', q:'"Corda de pular" in English is…',
    speakText:'Jump Rope', opts:['Jump Rope','Kite','Bat','Ball'], a:0,
    hint:'Você pula por cima!',
    teacherHint:'Duas crianças seguram as pontas e você pula por cima enquanto ela gira!' },
  { cat:'Brinquedos 🎲', emoji:'🚗', q:'"Carrinho de brinquedo" in English is…',
    speakText:'Toy Car', opts:['Toy Car','Doll','Kite','Ball'], a:0,
    hint:'Um carrinho pequeno para brincar.',
    teacherHint:'É uma versão pequenininha de um veículo. Você faz "vrummm" com ele!' },
  { cat:'Brinquedos 🎲', emoji:'🎮', q:'"Brinquedo" in English is…',
    speakText:'Toy', opts:['School','Toy','Play','Game'], a:1,
    hint:'Algo divertido para brincar!',
    teacherHint:'Qualquer objeto com que você se diverte e brinca nas horas livres!' },

  // ── AÇÕES (10) ────────────────────────────────────────────
  { cat:'Ações 🏃', emoji:'🏃', q:'"Correr" in English is…',
    speakText:'Run', opts:['Jump','Walk','Run','Swim'], a:2,
    hint:'Mover os pés muito rápido!',
    teacherHint:'É mover as pernas muito rapidamente – mais rápido que andar!' },
  { cat:'Ações 🏃', emoji:'🤸', q:'"Pular" in English is…',
    speakText:'Jump', opts:['Run','Jump','Fly','Swim'], a:1,
    hint:'Sair do chão com os dois pés!',
    teacherHint:'É sair do chão com força, como um canguru ou uma rã!' },
  { cat:'Ações 🏃', emoji:'🎵', q:'"Cantar" in English is…',
    speakText:'Sing', opts:['Dance','Draw','Sing','Write'], a:2,
    hint:'Fazer música com a sua voz.',
    teacherHint:'É usar a voz para fazer música, com melodia e palavras!' },
  { cat:'Ações 🏃', emoji:'💃', q:'"Dançar" in English is…',
    speakText:'Dance', opts:['Sing','Dance','Run','Jump'], a:1,
    hint:'Mover o corpo ao ritmo da música.',
    teacherHint:'É mover o corpo seguindo o ritmo e a batida da música!' },
  { cat:'Ações 🏃', emoji:'📖', q:'"Ler" in English is…',
    speakText:'Read', opts:['Write','Draw','Read','Paint'], a:2,
    hint:'O que você faz com um livro.',
    teacherHint:'É olhar para as letras e entender o que está escrito no livro!' },
  { cat:'Ações 🏃', emoji:'✍️', q:'"Escrever" in English is…',
    speakText:'Write', opts:['Read','Draw','Paint','Write'], a:3,
    hint:'Você coloca letras no papel.',
    teacherHint:'É fazer letras, palavras e frases no papel com caneta ou lápis!' },
  { cat:'Ações 🏃', emoji:'🎉', q:'"Brincar" in English is…',
    speakText:'Play', opts:['Eat','Sleep','Play','Run'], a:2,
    hint:'O que você faz no recreio!',
    teacherHint:'É se divertir com brinquedos ou amigos. Você faz isso no recreio!' },
  { cat:'Ações 🏃', emoji:'🍽️', q:'"Comer" in English is…',
    speakText:'Eat', opts:['Drink','Eat','Sleep','Run'], a:1,
    hint:'A comida entra pela boca.',
    teacherHint:'É pegar o alimento, mastigar e engolir. O almoço é quando você ___!' },
  { cat:'Ações 🏃', emoji:'💧', q:'"Beber" in English is…',
    speakText:'Drink', opts:['Eat','Play','Drink','Run'], a:2,
    hint:'A água entra pela boca.',
    teacherHint:'É colocar líquido na boca e engolir. Você ___ água quando está com sede!' },
  { cat:'Ações 🏃', emoji:'😴', q:'"Dormir" in English is…',
    speakText:'Sleep', opts:['Eat','Run','Play','Sleep'], a:3,
    hint:'Feche os olhos e descanse.',
    teacherHint:'É fechar os olhos, deitar na cama e descansar à noite!' },

  // ── ANIMAIS DA FAZENDA (9) ────────────────────────────────
  { cat:'Animais 🐄', emoji:'🐶', q:'"Cachorro" in English is…',
    speakText:'Dog', opts:['Cat','Dog','Bird','Fish'], a:1,
    hint:'O melhor amigo do homem!',
    teacherHint:'É o animal de estimação que late, abana o rabo e é muito fiel!' },
  { cat:'Animais 🐄', emoji:'🐱', q:'"Gato" in English is…',
    speakText:'Cat', opts:['Dog','Rabbit','Cat','Horse'], a:2,
    hint:'Ela diz miau!',
    teacherHint:'É o animal que mia, ronrona e adora dormir no sol!' },
  { cat:'Animais 🐄', emoji:'🐄', q:'"Vaca" in English is…',
    speakText:'Cow', opts:['Pig','Sheep','Horse','Cow'], a:3,
    hint:'Ela nos dá leite!',
    teacherHint:'É o animal da fazenda que dá leite e faz "muuuu"!' },
  { cat:'Animais 🐄', emoji:'🐴', q:'"Cavalo" in English is…',
    speakText:'Horse', opts:['Horse','Donkey','Cow','Pig'], a:0,
    hint:'Você pode montar nele na fazenda.',
    teacherHint:'É o animal grande que você pode montar e cavalgar pela fazenda!' },
  { cat:'Animais 🐄', emoji:'🐔', q:'"Galinha" in English is…',
    speakText:'Chicken', opts:['Duck','Turkey','Chicken','Goose'], a:2,
    hint:'Ela bota ovos e faz cocoricó!',
    teacherHint:'Ela bota ovos, vive no galinheiro e faz "cocoricó"!' },
  { cat:'Animais 🐄', emoji:'🐟', q:'"Peixe" in English is…',
    speakText:'Fish', opts:['Bird','Fish','Snake','Frog'], a:1,
    hint:'Ele vive na água e nada.',
    teacherHint:'Vive dentro da água, tem barbatanas e escamas, e nada!' },
  { cat:'Animais 🐄', emoji:'🐦', q:'"Pássaro" in English is…',
    speakText:'Bird', opts:['Bird','Fish','Bug','Worm'], a:0,
    hint:'Tem asas e consegue voar!',
    teacherHint:'Tem asas, bico e penas. A maioria sabe voar alto!' },
  { cat:'Animais 🐄', emoji:'🐰', q:'"Coelho" in English is…',
    speakText:'Rabbit', opts:['Mouse','Hamster','Rabbit','Pig'], a:2,
    hint:'Orelhas longas, fica pulando!',
    teacherHint:'Tem orelhas longas, fica pulando e adora cenoura!' },
  { cat:'Animais 🐄', emoji:'🐷', q:'"Porco" in English is…',
    speakText:'Pig', opts:['Cow','Pig','Goat','Sheep'], a:1,
    hint:'Ele diz oinc oinc!',
    teacherHint:'Animal rosado da fazenda que vive na pocilga e diz "oinc oinc"!' },

  // ── CUMPRIMENTOS E BÁSICO (10) ────────────────────────────
  { cat:'Cumprimentos 👋', emoji:'👋', q:'"Olá" in English is…',
    speakText:'Hello', opts:['Bye','Hello','Thanks','Sorry'], a:1,
    hint:'O que você diz ao encontrar alguém!',
    teacherHint:'É o cumprimento que você usa ao ENCONTRAR alguém. Igual ao "oi" em inglês!' },
  { cat:'Cumprimentos 👋', emoji:'👋', q:'"Tchau" in English is…',
    speakText:'Goodbye', opts:['Hello','Yes','Goodbye','No'], a:2,
    hint:'O que você diz ao ir embora.',
    teacherHint:'É o que você diz ao IR EMBORA, ao final do dia na escola!' },
  { cat:'Cumprimentos 👋', emoji:'✅', q:'"Sim" in English is…',
    speakText:'Yes', opts:['No','Maybe','Yes','Please'], a:2,
    hint:'Balance a cabeça para cima e para baixo.',
    teacherHint:'Quando você CONCORDA, balança a cabeça para cima e para baixo. Qual palavra é essa?' },
  { cat:'Cumprimentos 👋', emoji:'❌', q:'"Não" in English is…',
    speakText:'No', opts:['No','Yes','Please','Thanks'], a:0,
    hint:'Balance a cabeça para os lados.',
    teacherHint:'Quando você NÃO QUER algo, balança a cabeça para os lados. Qual palavra é essa?' },
  { cat:'Cumprimentos 👋', emoji:'🙏', q:'"Por favor" in English is…',
    speakText:'Please', opts:['Thank you','Sorry','Please','Hello'], a:2,
    hint:'Você diz isso quando pede algo.',
    teacherHint:'É a palavra de educação que usamos ao PEDIR algo. "Pode me ajudar, ___?"' },
  { cat:'Cumprimentos 👋', emoji:'😊', q:'"Obrigado/a" in English is…',
    speakText:'Thank you', opts:['Please','Thank you','Sorry','Hi'], a:1,
    hint:'Você diz isso depois de receber ajuda.',
    teacherHint:'É o que você fala DEPOIS de receber um presente ou ajuda de alguém!' },
  { cat:'Cumprimentos 👋', emoji:'☀️', q:'"Bom dia" in English is…',
    speakText:'Good morning', opts:['Good night','Good afternoon','Good morning','Goodbye'], a:2,
    hint:'Você diz isso de manhã!',
    teacherHint:'É o cumprimento de MANHÃ, antes do almoço, quando você chega na escola!' },
  { cat:'Cumprimentos 👋', emoji:'🌅', q:'"Boa tarde" in English is…',
    speakText:'Good afternoon', opts:['Good morning','Good afternoon','Good night','Hello'], a:1,
    hint:'Cumprimento depois do almoço.',
    teacherHint:'É o cumprimento depois do almoço, no período da TARDE!' },
  { cat:'Cumprimentos 👋', emoji:'🌙', q:'"Boa noite" in English is…',
    speakText:'Good night', opts:['Good morning','Good day','Good night','Goodbye'], a:2,
    hint:'Você diz isso antes de dormir.',
    teacherHint:'É o cumprimento antes de dormir, quando o céu já está escuro e cheio de estrelas!' },
  { cat:'Cumprimentos 👋', emoji:'🗣️',
    q:'Como se pergunta o nome de alguém em inglês?',
    speechParts:[{lang:'pt-BR',text:'Como se pergunta o nome de alguém em inglês?'}],
    opts:['What is your name?','How old are you?','Where do you live?','How are you?'], a:0,
    explanation:'What is your name? significa: Qual é o seu nome?',
    hint:'Em português seria: "Qual é o seu nome?"',
    teacherHint:'Em português é "Qual é o seu nome?". Começa com "What is your ___?"' },

  // ── ANIMAIS DA FAZENDA – EXTRA (15) ──────────────────────
  { cat:'Animais do Sítio 🐄', emoji:'🐓', q:'"Galo" in English is…',
    speechParts:[{lang:'pt-BR',text:'Galo'},{lang:'en-US',text:'in English is'}],
    speakText:'Rooster', opts:['Rooster','Duck','Turkey','Goose'], a:0,
    explanation:'Rooster quer dizer galo.',
    hint:'O macho da galinha que canta de manhã!',
    teacherHint:'É o animal que canta "cocoricó" bem cedinho para acordar todo mundo na fazenda!' },
  { cat:'Animais do Sítio 🐄', emoji:'🦆', q:'"Pato" in English is…',
    speechParts:[{lang:'pt-BR',text:'Pato'},{lang:'en-US',text:'in English is'}],
    speakText:'Duck', opts:['Chicken','Duck','Goose','Turkey'], a:1,
    explanation:'Duck quer dizer pato.',
    hint:'Nada na água e faz quá quá!',
    teacherHint:'É um pássaro que ama água, nada bem e faz um barulho bem engraçado!' },
  { cat:'Animais do Sítio 🐄', emoji:'🐑', q:'"Ovelha" in English is…',
    speechParts:[{lang:'pt-BR',text:'Ovelha'},{lang:'en-US',text:'in English is'}],
    speakText:'Sheep', opts:['Goat','Cow','Sheep','Donkey'], a:2,
    explanation:'Sheep quer dizer ovelha.',
    hint:'Tem lã grossa e faz méé!',
    teacherHint:'É o animal branco e fofo cuja lã usamos para fazer roupas quentes no inverno!' },
  { cat:'Animais do Sítio 🐄', emoji:'🐐', q:'"Cabra" in English is…',
    speechParts:[{lang:'pt-BR',text:'Cabra'},{lang:'en-US',text:'in English is'}],
    speakText:'Goat', opts:['Sheep','Goat','Cow','Pig'], a:1,
    explanation:'Goat quer dizer cabra.',
    hint:'Tem chifrinho e sobe em morros!',
    teacherHint:'É um animal com chifrinhos que consegue subir em lugares íngremes e adora comer folhas!' },
  { cat:'Animais do Sítio 🐄', emoji:'🐝', q:'"Abelha" in English is…',
    speechParts:[{lang:'pt-BR',text:'Abelha'},{lang:'en-US',text:'in English is'}],
    speakText:'Bee', opts:['Butterfly','Bee','Ant','Fly'], a:1,
    explanation:'Bee quer dizer abelha.',
    hint:'Faz mel e mora em colmeia!',
    teacherHint:'É o inseto que voa de flor em flor e produz mel delicioso para comermos!' },
  { cat:'Animais do Sítio 🐄', emoji:'🐴', q:'"Burro" in English is…',
    speechParts:[{lang:'pt-BR',text:'Burro'},{lang:'en-US',text:'in English is'}],
    speakText:'Donkey', opts:['Horse','Donkey','Mule','Ox'], a:1,
    explanation:'Donkey quer dizer burro.',
    hint:'Parece um cavalo menor, com orelhas longas!',
    teacherHint:'É um animal de carga com orelhas grandes. Faz o barulho "i-ó, i-ó"!' },
  { cat:'Animais do Sítio 🐄', emoji:'🦃', q:'"Peru" in English is…',
    speechParts:[{lang:'pt-BR',text:'Peru'},{lang:'en-US',text:'in English is'}],
    speakText:'Turkey', opts:['Turkey','Rooster','Duck','Goose'], a:0,
    explanation:'Turkey quer dizer peru.',
    hint:'Ave grande que abre a cauda como um leque!',
    teacherHint:'É uma ave grande da fazenda que abre a cauda como um leque quando quer chamar atenção!' },
  { cat:'Animais do Sítio 🐄', emoji:'🐂', q:'"Boi" in English is…',
    speechParts:[{lang:'pt-BR',text:'Boi'},{lang:'en-US',text:'in English is'}],
    speakText:'Ox', opts:['Bull','Ox','Cow','Horse'], a:1,
    explanation:'Ox quer dizer boi.',
    hint:'Animal grande e forte da fazenda.',
    teacherHint:'É o bovino forte que ajudava a puxar o arado no campo. Muito visto nas fazendas do RS!' },
  { cat:'Animais do Sítio 🐄', emoji:'🦢', q:'"Ganso" in English is…',
    speechParts:[{lang:'pt-BR',text:'Ganso'},{lang:'en-US',text:'in English is'}],
    speakText:'Goose', opts:['Duck','Turkey','Goose','Hen'], a:2,
    explanation:'Goose quer dizer ganso.',
    hint:'Ave grande e branca com pescoço longo!',
    teacherHint:'É uma ave parecida com o pato, mas maior, com pescoço longo e muito barulhenta!' },
  { cat:'Animais do Sítio 🐄', emoji:'🐮', q:'"Bezerro" in English is…',
    speechParts:[{lang:'pt-BR',text:'Bezerro'},{lang:'en-US',text:'in English is'}],
    speakText:'Calf', opts:['Calf','Bull','Foal','Lamb'], a:0,
    explanation:'Calf quer dizer bezerro.',
    hint:'É o filhotinho da vaca.',
    teacherHint:'É o bebê da vaca! Quando nasce, toma leite da mamãe vaca!' },
  { cat:'Animais do Sítio 🐄', emoji:'🐑', q:'"Cordeiro" in English is…',
    speechParts:[{lang:'pt-BR',text:'Cordeiro'},{lang:'en-US',text:'in English is'}],
    speakText:'Lamb', opts:['Lamb','Calf','Foal','Piglet'], a:0,
    explanation:'Lamb quer dizer cordeiro.',
    hint:'É o filhotinho da ovelha.',
    teacherHint:'É o bebê da ovelha. É muito fofinho e tem lã macia e branquinha!' },
  { cat:'Animais do Sítio 🐄', emoji:'🐎', q:'"Potro" in English is…',
    speechParts:[{lang:'pt-BR',text:'Potro'},{lang:'en-US',text:'in English is'}],
    speakText:'Foal', opts:['Foal','Pony','Colt','Fawn'], a:0,
    explanation:'Foal quer dizer potro.',
    hint:'É o filhotinho do cavalo.',
    teacherHint:'É o bebê do cavalo. Tem pernas compridas e logo aprende a correr rápido!' },
  { cat:'Animais do Sítio 🐄', emoji:'🐐', q:'"Cabrito" in English is…',
    speechParts:[{lang:'pt-BR',text:'Cabrito'},{lang:'en-US',text:'in English is'}],
    speakText:'Kid', opts:['Kid','Lamb','Calf','Foal'], a:0,
    explanation:'Kid quer dizer cabrito.',
    hint:'É o filhotinho da cabra.',
    teacherHint:'É o bebê da cabra. A palavra em inglês é a mesma que usamos para dizer "criança"!' },
  { cat:'Animais do Sítio 🐄', emoji:'🐜', q:'"Formiga" in English is…',
    speechParts:[{lang:'pt-BR',text:'Formiga'},{lang:'en-US',text:'in English is'}],
    speakText:'Ant', opts:['Bee','Fly','Ant','Worm'], a:2,
    explanation:'Ant quer dizer formiga.',
    hint:'Pequenininha, mas muito forte e trabalhadora!',
    teacherHint:'É um inseto muito pequeno que carrega folhas e forma fileiras. Muito comum no sítio!' },
  { cat:'Animais do Sítio 🐄', emoji:'🪱', q:'"Minhoca" in English is…',
    speechParts:[{lang:'pt-BR',text:'Minhoca'},{lang:'en-US',text:'in English is'}],
    speakText:'Worm', opts:['Snake','Worm','Caterpillar','Beetle'], a:1,
    explanation:'Worm quer dizer minhoca.',
    hint:'Vive na terra e é amiga das plantas!',
    teacherHint:'É um animalzinho que vive na terra, ajuda o solo a ficar saudável e as plantas a crescerem!' },

  // ── MÁQUINAS AGRÍCOLAS (8) ────────────────────────────────
  { cat:'Máquinas do Sítio 🚜', emoji:'🚜', q:'"Trator" in English is…',
    speechParts:[{lang:'pt-BR',text:'Trator'},{lang:'en-US',text:'in English is'}],
    speakText:'Tractor', opts:['Tractor','Harvester','Bus','Truck'], a:0,
    explanation:'Tractor quer dizer trator.',
    hint:'Máquina grande e muito usada na lavoura.',
    teacherHint:'Pense na máquina com rodas enormes que trabalha no campo plantando e carregando!' },
  { cat:'Máquinas do Sítio 🚜', emoji:'🌾', q:'"Colheitadeira" in English is…',
    speechParts:[{lang:'pt-BR',text:'Colheitadeira'},{lang:'en-US',text:'in English is'}],
    speakText:'Harvester', opts:['Planter','Harvester','Tractor','Plow'], a:1,
    explanation:'Harvester quer dizer colheitadeira.',
    hint:'Serve para colher grãos no campo.',
    teacherHint:'É a máquina grande que passa pela lavoura e colhe milho, soja e outros grãos sozinha!' },
  { cat:'Máquinas do Sítio 🚜', emoji:'⚙️', q:'"Arado" in English is…',
    speechParts:[{lang:'pt-BR',text:'Arado'},{lang:'en-US',text:'in English is'}],
    speakText:'Plow', opts:['Plow','Rake','Hoe','Shovel'], a:0,
    explanation:'Plow quer dizer arado.',
    hint:'Abre sulcos na terra para plantar.',
    teacherHint:'É o equipamento que o trator puxa para virar e preparar a terra antes de plantar!' },
  { cat:'Máquinas do Sítio 🚜', emoji:'🚛', q:'"Reboque" in English is…',
    speechParts:[{lang:'pt-BR',text:'Reboque'},{lang:'en-US',text:'in English is'}],
    speakText:'Trailer', opts:['Truck','Trailer','Container','Cart'], a:1,
    explanation:'Trailer quer dizer reboque.',
    hint:'O trator puxa ele carregado de produtos.',
    teacherHint:'É a carroceria que fica atrás do trator para carregar grãos, ferramentas ou animais!' },
  { cat:'Máquinas do Sítio 🚜', emoji:'🌿', q:'"Mangueira" in English is…',
    speechParts:[{lang:'pt-BR',text:'Mangueira'},{lang:'en-US',text:'in English is'}],
    speakText:'Hose', opts:['Pump','Pipe','Hose','Well'], a:2,
    explanation:'Hose quer dizer mangueira.',
    hint:'A borracha comprida ligada na torneira para molhar.',
    teacherHint:'É a borracha comprida que você conecta na torneira e usa para regar a horta e o jardim!' },
  { cat:'Máquinas do Sítio 🚜', emoji:'🏗️', q:'"Silo" in English is…',
    speechParts:[{lang:'pt-BR',text:'Silo'},{lang:'en-US',text:'in English is'}],
    speakText:'Silo', opts:['Silo','Barn','Shed','Tank'], a:0,
    explanation:'Silo quer dizer silo.',
    hint:'Serve para guardar grãos da colheita.',
    teacherHint:'É a torre grande onde os agricultores guardam o milho, a soja e outros grãos colhidos!' },
  { cat:'Máquinas do Sítio 🚜', emoji:'🚚', q:'"Caminhão" in English is…',
    speechParts:[{lang:'pt-BR',text:'Caminhão'},{lang:'en-US',text:'in English is'}],
    speakText:'Truck', opts:['Truck','Bus','Van','Car'], a:0,
    explanation:'Truck quer dizer caminhão.',
    hint:'Veículo grande para carregar produtos da fazenda.',
    teacherHint:'É um veículo grande e pesado que leva as mercadorias da fazenda para a cidade!' },
  { cat:'Máquinas do Sítio 🚜', emoji:'🌱', q:'"Plantadeira" in English is…',
    speechParts:[{lang:'pt-BR',text:'Plantadeira'},{lang:'en-US',text:'in English is'}],
    speakText:'Planter', opts:['Plow','Harvester','Planter','Sprinkler'], a:2,
    explanation:'Planter quer dizer plantadeira.',
    hint:'Planta as sementes na terra de forma automática.',
    teacherHint:'É a máquina que abre a terra, coloca a semente e fecha, tudo de uma vez só!' },

  // ── FERRAMENTAS RURAIS (8) ────────────────────────────────
  { cat:'Ferramentas do Sítio 🔨', emoji:'⛏️', q:'"Enxada" in English is…',
    speechParts:[{lang:'pt-BR',text:'Enxada'},{lang:'en-US',text:'in English is'}],
    speakText:'Hoe', opts:['Hoe','Shovel','Rake','Axe'], a:0,
    explanation:'Hoe quer dizer enxada.',
    hint:'Ferramenta para capinar e mexer na terra.',
    teacherHint:'É a ferramenta de cabo longo que serve para limpar o mato da lavoura e preparar a terra!' },
  { cat:'Ferramentas do Sítio 🔨', emoji:'🪣', q:'"Pá" in English is…',
    speechParts:[{lang:'pt-BR',text:'Pá'},{lang:'en-US',text:'in English is'}],
    speakText:'Shovel', opts:['Rake','Hoe','Shovel','Fork'], a:2,
    explanation:'Shovel quer dizer pá.',
    hint:'Serve para cavar e mover terra.',
    teacherHint:'É uma ferramenta com lâmina larga que serve para cavar buracos e mover terra ou areia!' },
  { cat:'Ferramentas do Sítio 🔨', emoji:'🧹', q:'"Rastelo" in English is…',
    speechParts:[{lang:'pt-BR',text:'Rastelo'},{lang:'en-US',text:'in English is'}],
    speakText:'Rake', opts:['Rake','Broom','Hoe','Shovel'], a:0,
    explanation:'Rake quer dizer rastelo.',
    hint:'Tem vários dentes e junta folhas e palha.',
    teacherHint:'É a ferramenta com vários dentes usada para juntar folhas, palha e nivelar a terra!' },
  { cat:'Ferramentas do Sítio 🔨', emoji:'🛒', q:'"Carrinho de mão" in English is…',
    speechParts:[{lang:'pt-BR',text:'Carrinho de mão'},{lang:'en-US',text:'in English is'}],
    speakText:'Wheelbarrow', opts:['Wheelbarrow','Cart','Wagon','Trolley'], a:0,
    explanation:'Wheelbarrow quer dizer carrinho de mão.',
    hint:'Tem uma roda e serve para carregar terra.',
    teacherHint:'É o carricho com uma roda na frente e duas alças atrás, que carrega terra e esterco!' },
  { cat:'Ferramentas do Sítio 🔨', emoji:'🪣', q:'"Balde" in English is…',
    speechParts:[{lang:'pt-BR',text:'Balde'},{lang:'en-US',text:'in English is'}],
    speakText:'Bucket', opts:['Barrel','Bucket','Box','Pot'], a:1,
    explanation:'Bucket quer dizer balde.',
    hint:'Serve para carregar água ou leite na fazenda.',
    teacherHint:'É um recipiente redondo com alça que serve para carregar água, leite ou ração para os animais!' },
  { cat:'Ferramentas do Sítio 🔨', emoji:'🏡', q:'"Cerca" in English is…',
    speechParts:[{lang:'pt-BR',text:'Cerca'},{lang:'en-US',text:'in English is'}],
    speakText:'Fence', opts:['Fence','Gate','Wall','Barrier'], a:0,
    explanation:'Fence quer dizer cerca.',
    hint:'Divide os campos e segura os animais.',
    teacherHint:'É a estrutura de madeira ou arame que fica em volta dos campos para os animais não fugirem!' },
  { cat:'Ferramentas do Sítio 🔨', emoji:'💦', q:'"Regador" in English is…',
    speechParts:[{lang:'pt-BR',text:'Regador'},{lang:'en-US',text:'in English is'}],
    speakText:'Watering can', opts:['Watering can','Bucket','Hose','Sprinkler'], a:0,
    explanation:'Watering can quer dizer regador.',
    hint:'Serve para regar as plantas da horta.',
    teacherHint:'É o recipiente com bico furado que você usa para molhar as plantas e a horta!' },
  { cat:'Ferramentas do Sítio 🔨', emoji:'🪓', q:'"Machado" in English is…',
    speechParts:[{lang:'pt-BR',text:'Machado'},{lang:'en-US',text:'in English is'}],
    speakText:'Axe', opts:['Axe','Knife','Saw','Hammer'], a:0,
    explanation:'Axe quer dizer machado.',
    hint:'Serve para cortar lenha.',
    teacherHint:'É a ferramenta com lâmina pesada usada para cortar madeira e lenha na fazenda!' },

  // ── LEGUMES E VERDURAS (12) ───────────────────────────────
  { cat:'Horta e Pomar 🥕', emoji:'🥬', q:'"Alface" in English is…',
    speechParts:[{lang:'pt-BR',text:'Alface'},{lang:'en-US',text:'in English is'}],
    speakText:'Lettuce', opts:['Lettuce','Cabbage','Spinach','Kale'], a:0,
    explanation:'Lettuce quer dizer alface.',
    hint:'Vegetal verde folhudo da salada.',
    teacherHint:'É a folha verde e crocante que a família põe na salada. Cresce facilmente na horta!' },
  { cat:'Horta e Pomar 🥕', emoji:'🥕', q:'"Cenoura" in English is…',
    speechParts:[{lang:'pt-BR',text:'Cenoura'},{lang:'en-US',text:'in English is'}],
    speakText:'Carrot', opts:['Potato','Carrot','Turnip','Radish'], a:1,
    explanation:'Carrot quer dizer cenoura.',
    hint:'Laranja, cresce na terra, os coelhos adoram!',
    teacherHint:'É um legume laranja que cresce debaixo da terra. Os coelhos adoram comer cenoura!' },
  { cat:'Horta e Pomar 🥕', emoji:'🍅', q:'"Tomate" in English is…',
    speechParts:[{lang:'pt-BR',text:'Tomate'},{lang:'en-US',text:'in English is'}],
    speakText:'Tomato', opts:['Tomato','Pepper','Onion','Potato'], a:0,
    explanation:'Tomato quer dizer tomate.',
    hint:'Vermelho e suculento, vai na salada!',
    teacherHint:'É o vegetal vermelho e redondo que fica no molho de macarrão e na salada!' },
  { cat:'Horta e Pomar 🥕', emoji:'🥔', q:'"Batata" in English is…',
    speechParts:[{lang:'pt-BR',text:'Batata'},{lang:'en-US',text:'in English is'}],
    speakText:'Potato', opts:['Carrot','Radish','Potato','Turnip'], a:2,
    explanation:'Potato quer dizer batata.',
    hint:'Cresce debaixo da terra e vira fritas!',
    teacherHint:'É o tubérculo que cresce no solo e que você pode comer frita, cozida ou assada!' },
  { cat:'Horta e Pomar 🥕', emoji:'🍠', q:'"Batata-doce" in English is…',
    speechParts:[{lang:'pt-BR',text:'Batata-doce'},{lang:'en-US',text:'in English is'}],
    speakText:'Sweet potato', opts:['Sweet potato','Yam','Cassava','Potato'], a:0,
    explanation:'Sweet potato quer dizer batata-doce.',
    hint:'Como a batata, mas com polpa laranja e mais doce!',
    teacherHint:'É um tubérculo parecido com a batata, mas com polpa laranja e sabor adocicado!' },
  { cat:'Horta e Pomar 🥕', emoji:'🧅', q:'"Cebola" in English is…',
    speechParts:[{lang:'pt-BR',text:'Cebola'},{lang:'en-US',text:'in English is'}],
    speakText:'Onion', opts:['Garlic','Onion','Leek','Chive'], a:1,
    explanation:'Onion quer dizer cebola.',
    hint:'Faz a gente chorar quando cortamos!',
    teacherHint:'É o vegetal redondo que quando você corta, faz a gente chorar de tanto cheirar!' },
  { cat:'Horta e Pomar 🥕', emoji:'🎃', q:'"Abóbora" in English is…',
    speechParts:[{lang:'pt-BR',text:'Abóbora'},{lang:'en-US',text:'in English is'}],
    speakText:'Pumpkin', opts:['Pumpkin','Squash','Cucumber','Melon'], a:0,
    explanation:'Pumpkin quer dizer abóbora.',
    hint:'Grande, laranja e muito comum nas fazendas!',
    teacherHint:'É um vegetal grande e redondo, geralmente laranja, muito comum nas fazendas do sul!' },
  { cat:'Horta e Pomar 🥕', emoji:'🥒', q:'"Pepino" in English is…',
    speechParts:[{lang:'pt-BR',text:'Pepino'},{lang:'en-US',text:'in English is'}],
    speakText:'Cucumber', opts:['Zucchini','Cucumber','Eggplant','Celery'], a:1,
    explanation:'Cucumber quer dizer pepino.',
    hint:'Verde, comprido e refrescante na salada!',
    teacherHint:'É um vegetal verde e comprido com casca dura. Muito refrescante na salada!' },
  { cat:'Horta e Pomar 🥕', emoji:'🌽', q:'"Milho" in English is…',
    speechParts:[{lang:'pt-BR',text:'Milho'},{lang:'en-US',text:'in English is'}],
    speakText:'Corn', opts:['Corn','Wheat','Rice','Barley'], a:0,
    explanation:'Corn quer dizer milho.',
    hint:'Tem grãos amarelos na espiga!',
    teacherHint:'É o cereal muito cultivado no sul do Brasil, em espiga com grãos amarelos e doces!' },
  { cat:'Horta e Pomar 🥕', emoji:'🧄', q:'"Alho" in English is…',
    speechParts:[{lang:'pt-BR',text:'Alho'},{lang:'en-US',text:'in English is'}],
    speakText:'Garlic', opts:['Garlic','Onion','Ginger','Leek'], a:0,
    explanation:'Garlic quer dizer alho.',
    hint:'Tempero forte que vai em quase toda comida!',
    teacherHint:'É o bulbo branco e muito cheiroso que dá sabor às comidas da roça. Quase toda receita usa!' },
  { cat:'Horta e Pomar 🥕', emoji:'🫑', q:'"Pimentão" in English is…',
    speechParts:[{lang:'pt-BR',text:'Pimentão'},{lang:'en-US',text:'in English is'}],
    speakText:'Bell pepper', opts:['Bell pepper','Chili','Pepper','Paprika'], a:0,
    explanation:'Bell pepper quer dizer pimentão.',
    hint:'Pode ser verde, amarelo ou vermelho!',
    teacherHint:'É um vegetal colorido que pode ser verde, amarelo ou vermelho. Vai bem na salada e na pizza!' },
  { cat:'Horta e Pomar 🥕', emoji:'🍆', q:'"Berinjela" in English is…',
    speechParts:[{lang:'pt-BR',text:'Berinjela'},{lang:'en-US',text:'in English is'}],
    speakText:'Eggplant', opts:['Eggplant','Zucchini','Cucumber','Asparagus'], a:0,
    explanation:'Eggplant quer dizer berinjela.',
    hint:'Roxo, comprido e vai bem na frigideira!',
    teacherHint:'É um vegetal roxo e comprido. Pode ser feito na frigideira com azeite. Cresce bem na horta!' },

  // ── COMIDA DA ROÇA (10) ───────────────────────────────────
  { cat:'Alimentos do Sítio 🥚', emoji:'🥚', q:'"Ovo" in English is…',
    speechParts:[{lang:'pt-BR',text:'Ovo'},{lang:'en-US',text:'in English is'}],
    speakText:'Egg', opts:['Egg','Milk','Cheese','Butter'], a:0,
    explanation:'Egg quer dizer ovo.',
    hint:'A galinha bota e você come no café da manhã!',
    teacherHint:'É o alimento que a galinha bota. Pode ser cozido, frito ou mexido no café da manhã!' },
  { cat:'Alimentos do Sítio 🥚', emoji:'🧀', q:'"Queijo" in English is…',
    speechParts:[{lang:'pt-BR',text:'Queijo'},{lang:'en-US',text:'in English is'}],
    speakText:'Cheese', opts:['Butter','Cheese','Yogurt','Cream'], a:1,
    explanation:'Cheese quer dizer queijo.',
    hint:'Feito com leite de vaca, sólido e gostoso!',
    teacherHint:'É feito do leite da vaca. Aqui no RS tem queijo colonial delicioso!' },
  { cat:'Alimentos do Sítio 🥚', emoji:'🍞', q:'"Pão" in English is…',
    speechParts:[{lang:'pt-BR',text:'Pão'},{lang:'en-US',text:'in English is'}],
    speakText:'Bread', opts:['Bread','Cake','Cookie','Biscuit'], a:0,
    explanation:'Bread quer dizer pão.',
    hint:'Feito de farinha, vai bem no café da manhã!',
    teacherHint:'É feito de farinha de trigo, fermento e sal. Vai muito bem com manteiga no café!' },
  { cat:'Alimentos do Sítio 🥚', emoji:'🫘', q:'"Feijão" in English is…',
    speechParts:[{lang:'pt-BR',text:'Feijão'},{lang:'en-US',text:'in English is'}],
    speakText:'Beans', opts:['Rice','Beans','Corn','Wheat'], a:1,
    explanation:'Beans quer dizer feijão.',
    hint:'Combina com arroz no almoço da roça!',
    teacherHint:'É o grão cultivado no Brasil inteiro. Arroz com feijão é o prato típico do almoço!' },
  { cat:'Alimentos do Sítio 🥚', emoji:'🍚', q:'"Arroz" in English is…',
    speechParts:[{lang:'pt-BR',text:'Arroz'},{lang:'en-US',text:'in English is'}],
    speakText:'Rice', opts:['Corn','Wheat','Rice','Barley'], a:2,
    explanation:'Rice quer dizer arroz.',
    hint:'Grão branco que acompanha o feijão!',
    teacherHint:'É o cereal branco do prato junto com o feijão. Muito cultivado no Rio Grande do Sul!' },
  { cat:'Alimentos do Sítio 🥚', emoji:'🧈', q:'"Manteiga" in English is…',
    speechParts:[{lang:'pt-BR',text:'Manteiga'},{lang:'en-US',text:'in English is'}],
    speakText:'Butter', opts:['Butter','Margarine','Cream','Oil'], a:0,
    explanation:'Butter quer dizer manteiga.',
    hint:'Feita de leite, passa no pão!',
    teacherHint:'É feita do creme do leite de vaca. Derrete quando esquenta e é deliciosa no pão quente!' },
  { cat:'Alimentos do Sítio 🥚', emoji:'🍯', q:'"Mel" in English is…',
    speechParts:[{lang:'pt-BR',text:'Mel'},{lang:'en-US',text:'in English is'}],
    speakText:'Honey', opts:['Honey','Sugar','Syrup','Jam'], a:0,
    explanation:'Honey quer dizer mel.',
    hint:'Doce e produzido pelas abelhas!',
    teacherHint:'É o alimento dourado e muito doce que as abelhas produzem nas colmeias!' },
  { cat:'Alimentos do Sítio 🥚', emoji:'🌾', q:'"Farinha" in English is…',
    speechParts:[{lang:'pt-BR',text:'Farinha'},{lang:'en-US',text:'in English is'}],
    speakText:'Flour', opts:['Flour','Sugar','Salt','Starch'], a:0,
    explanation:'Flour quer dizer farinha.',
    hint:'Pó branco usado para fazer pão e bolo!',
    teacherHint:'É o pó branco feito do trigo moído que serve para fazer pão, bolo e massa de macarrão!' },
  { cat:'Alimentos do Sítio 🥚', emoji:'🥛', q:'"Leite" in English is…',
    speechParts:[{lang:'pt-BR',text:'Leite'},{lang:'en-US',text:'in English is'}],
    speakText:'Milk', opts:['Milk','Water','Juice','Tea'], a:0,
    explanation:'Milk quer dizer leite.',
    hint:'Branco, vem da vaca e faz bem à saúde!',
    teacherHint:'É o líquido branco que vem da vaca. Servimos no café da manhã e é cheio de cálcio!' },
  { cat:'Alimentos do Sítio 🥚', emoji:'🫙', q:'"Geleia" in English is…',
    speechParts:[{lang:'pt-BR',text:'Geleia'},{lang:'en-US',text:'in English is'}],
    speakText:'Jam', opts:['Jam','Jelly','Syrup','Cream'], a:0,
    explanation:'Jam quer dizer geleia.',
    hint:'Feita de frutas, passa no pão ou bolacha!',
    teacherHint:'É feita cozinhando frutas com açúcar. Muito gostosa de uva ou morango daqui do RS!' },

  // ── NATUREZA (15) ─────────────────────────────────────────
  { cat:'Natureza 🌿', emoji:'🌳', q:'"Árvore" in English is…',
    speechParts:[{lang:'pt-BR',text:'Árvore'},{lang:'en-US',text:'in English is'}],
    speakText:'Tree', opts:['Tree','Plant','Bush','Flower'], a:0,
    explanation:'Tree quer dizer árvore.',
    hint:'Alta, tem tronco, galhos e folhas!',
    teacherHint:'É a planta grande com tronco grosso, galhos e muitas folhas que dá sombra no campo!' },
  { cat:'Natureza 🌿', emoji:'🏞️', q:'"Rio" in English is…',
    speechParts:[{lang:'pt-BR',text:'Rio'},{lang:'en-US',text:'in English is'}],
    speakText:'River', opts:['Lake','River','Sea','Pond'], a:1,
    explanation:'River quer dizer rio.',
    hint:'A água corre entre as margens.',
    teacherHint:'É um curso de água que corre pela terra. Aqui temos arroios e rios que passam pelas fazendas!' },
  { cat:'Natureza 🌿', emoji:'🌧️', q:'"Chuva" in English is…',
    speechParts:[{lang:'pt-BR',text:'Chuva'},{lang:'en-US',text:'in English is'}],
    speakText:'Rain', opts:['Rain','Storm','Snow','Hail'], a:0,
    explanation:'Rain quer dizer chuva.',
    hint:'Água que cai do céu e molha a terra!',
    teacherHint:'É a água que vem das nuvens e cai sobre a terra. Muito importante para as plantações!' },
  { cat:'Natureza 🌿', emoji:'🪨', q:'"Barro" in English is…',
    speechParts:[{lang:'pt-BR',text:'Barro'},{lang:'en-US',text:'in English is'}],
    speakText:'Mud', opts:['Mud','Sand','Dust','Clay'], a:0,
    explanation:'Mud quer dizer barro ou lama.',
    hint:'A terra misturada com água depois da chuva!',
    teacherHint:'É a mistura de terra com água que fica nos caminhos e campos depois que chove!' },
  { cat:'Natureza 🌿', emoji:'🌉', q:'"Ponte" in English is…',
    speechParts:[{lang:'pt-BR',text:'Ponte'},{lang:'en-US',text:'in English is'}],
    speakText:'Bridge', opts:['Bridge','Tunnel','Road','Path'], a:0,
    explanation:'Bridge quer dizer ponte.',
    hint:'Passagem por cima de rios e arroios!',
    teacherHint:'É a estrutura que atravessa por cima da água para você passar de um lado para o outro!' },
  { cat:'Natureza 🌿', emoji:'🌱', q:'"Semente" in English is…',
    speechParts:[{lang:'pt-BR',text:'Semente'},{lang:'en-US',text:'in English is'}],
    speakText:'Seed', opts:['Seed','Sprout','Root','Leaf'], a:0,
    explanation:'Seed quer dizer semente.',
    hint:'A origem de todas as plantas!',
    teacherHint:'É a parte da planta que, quando plantada na terra, começa a brotar e virar uma nova planta!' },
  { cat:'Natureza 🌿', emoji:'🌸', q:'"Flor" in English is…',
    speechParts:[{lang:'pt-BR',text:'Flor'},{lang:'en-US',text:'in English is'}],
    speakText:'Flower', opts:['Flower','Leaf','Thorn','Bud'], a:0,
    explanation:'Flower quer dizer flor.',
    hint:'Colorida, perfumada e as abelhas adoram!',
    teacherHint:'É a parte mais bonita da planta, colorida e perfumada, que as abelhas visitam para fazer mel!' },
  { cat:'Natureza 🌿', emoji:'💨', q:'"Vento" in English is…',
    speechParts:[{lang:'pt-BR',text:'Vento'},{lang:'en-US',text:'in English is'}],
    speakText:'Wind', opts:['Wind','Breeze','Storm','Rain'], a:0,
    explanation:'Wind quer dizer vento.',
    hint:'O ar que move as folhas e as nuvens!',
    teacherHint:'É o movimento do ar que balança as árvores, move as nuvens e empina a pipa no campo!' },
  { cat:'Natureza 🌿', emoji:'☁️', q:'"Nuvem" in English is…',
    speechParts:[{lang:'pt-BR',text:'Nuvem'},{lang:'en-US',text:'in English is'}],
    speakText:'Cloud', opts:['Cloud','Fog','Smoke','Mist'], a:0,
    explanation:'Cloud quer dizer nuvem.',
    hint:'Branca no céu, carrega a chuva!',
    teacherHint:'É a massa de água que flutua no céu. Quando ela fica escura e pesada, vem a chuva!' },
  { cat:'Natureza 🌿', emoji:'🌲', q:'"Floresta" in English is…',
    speechParts:[{lang:'pt-BR',text:'Floresta'},{lang:'en-US',text:'in English is'}],
    speakText:'Forest', opts:['Forest','Park','Garden','Jungle'], a:0,
    explanation:'Forest quer dizer floresta.',
    hint:'Muitas árvores juntas formam uma floresta!',
    teacherHint:'É um lugar com muitíssimas árvores e plantas. Também chamamos de mata aqui no sul!' },
  { cat:'Natureza 🌿', emoji:'🌾', q:'"Campo" in English is…',
    speechParts:[{lang:'pt-BR',text:'Campo'},{lang:'en-US',text:'in English is'}],
    speakText:'Field', opts:['Field','Meadow','Pasture','Garden'], a:0,
    explanation:'Field quer dizer campo.',
    hint:'Área aberta onde se planta milho, soja e mais!',
    teacherHint:'É a área grande e plana de terra onde os agricultores plantam e criam animais!' },
  { cat:'Natureza 🌿', emoji:'⛰️', q:'"Morro" in English is…',
    speechParts:[{lang:'pt-BR',text:'Morro'},{lang:'en-US',text:'in English is'}],
    speakText:'Hill', opts:['Hill','Mountain','Valley','Cliff'], a:0,
    explanation:'Hill quer dizer morro.',
    hint:'Elevação de terra menor que uma montanha.',
    teacherHint:'É uma elevação de terra que você vê bastante na zona rural do Rio Grande do Sul!' },
  { cat:'Natureza 🌿', emoji:'🦋', q:'"Borboleta" in English is…',
    speechParts:[{lang:'pt-BR',text:'Borboleta'},{lang:'en-US',text:'in English is'}],
    speakText:'Butterfly', opts:['Butterfly','Moth','Dragonfly','Bee'], a:0,
    explanation:'Butterfly quer dizer borboleta.',
    hint:'Inseto colorido que voa de flor em flor!',
    teacherHint:'É um inseto com asas coloridas e lindas. Começa como uma lagarta e se transforma!' },
  { cat:'Natureza 🌿', emoji:'🌊', q:'"Lago" in English is…',
    speechParts:[{lang:'pt-BR',text:'Lago'},{lang:'en-US',text:'in English is'}],
    speakText:'Lake', opts:['Lake','River','Sea','Pond'], a:0,
    explanation:'Lake quer dizer lago.',
    hint:'Grande área de água parada rodeada de terra.',
    teacherHint:'É uma área grande de água parada rodeada de terra. Diferente do rio que corre!' },
  { cat:'Natureza 🌿', emoji:'⚡', q:'"Relâmpago" in English is…',
    speechParts:[{lang:'pt-BR',text:'Relâmpago'},{lang:'en-US',text:'in English is'}],
    speakText:'Lightning', opts:['Lightning','Thunder','Storm','Rain'], a:0,
    explanation:'Lightning quer dizer relâmpago.',
    hint:'A luz que risca o céu durante a tempestade!',
    teacherHint:'É o raio de luz que aparece no céu durante as tempestades. Muito visto na roça à noite!' },

  // ── VIDA RURAL (12) ───────────────────────────────────────
  { cat:'Vida no Sítio 🌾', emoji:'🏡', q:'"Sítio" in English is…',
    speechParts:[{lang:'pt-BR',text:'Sítio'},{lang:'en-US',text:'in English is'}],
    speakText:'Farm', opts:['Farm','Ranch','Estate','Village'], a:0,
    explanation:'Farm quer dizer fazenda ou sítio.',
    hint:'Lugar no interior onde se planta e cria animais.',
    teacherHint:'É o lugar no campo onde a família planta alimentos e cria animais. Vocês moram num lugar assim!' },
  { cat:'Vida no Sítio 🌾', emoji:'🌾', q:'"Colheita" in English is…',
    speechParts:[{lang:'pt-BR',text:'Colheita'},{lang:'en-US',text:'in English is'}],
    speakText:'Harvest', opts:['Harvest','Planting','Pruning','Watering'], a:0,
    explanation:'Harvest quer dizer colheita.',
    hint:'Hora de recolher o que foi plantado!',
    teacherHint:'É o momento de recolher tudo o que foi plantado, como o milho, a soja e o feijão!' },
  { cat:'Vida no Sítio 🌾', emoji:'🌱', q:'"Terra" in English is…',
    speechParts:[{lang:'pt-BR',text:'Terra'},{lang:'en-US',text:'in English is'}],
    speakText:'Soil', opts:['Soil','Sand','Clay','Gravel'], a:0,
    explanation:'Soil quer dizer terra.',
    hint:'O chão escuro e fértil onde as plantas crescem!',
    teacherHint:'É a camada de terra fértil onde plantamos as sementes. Uma boa terra é escura e úmida!' },
  { cat:'Vida no Sítio 🌾', emoji:'🏚️', q:'"Galpão" in English is…',
    speechParts:[{lang:'pt-BR',text:'Galpão'},{lang:'en-US',text:'in English is'}],
    speakText:'Barn', opts:['Barn','Shed','Garage','Stable'], a:0,
    explanation:'Barn quer dizer galpão ou celeiro.',
    hint:'Grande construção da fazenda para guardar tudo!',
    teacherHint:'É a grande construção da fazenda onde guardam o trator, as ferramentas e os animais!' },
  { cat:'Vida no Sítio 🌾', emoji:'🥬', q:'"Horta" in English is…',
    speechParts:[{lang:'pt-BR',text:'Horta'},{lang:'en-US',text:'in English is'}],
    speakText:'Vegetable garden', opts:['Vegetable garden','Orchard','Park','Greenhouse'], a:0,
    explanation:'Vegetable garden quer dizer horta.',
    hint:'Onde a família planta verduras e legumes!',
    teacherHint:'É o canteiro no quintal onde se planta cenoura, alface, tomate e outros legumes!' },
  { cat:'Vida no Sítio 🌾', emoji:'🧑‍🌾', q:'"Agricultor" in English is…',
    speechParts:[{lang:'pt-BR',text:'Agricultor'},{lang:'en-US',text:'in English is'}],
    speakText:'Farmer', opts:['Farmer','Worker','Rancher','Gardener'], a:0,
    explanation:'Farmer quer dizer agricultor ou fazendeiro.',
    hint:'A pessoa que trabalha e cuida da fazenda!',
    teacherHint:'É a pessoa que trabalha na lavoura, planta, colhe e cuida dos animais. Como muitos pais de vocês!' },
  { cat:'Vida no Sítio 🌾', emoji:'🚧', q:'"Porteira" in English is…',
    speechParts:[{lang:'pt-BR',text:'Porteira'},{lang:'en-US',text:'in English is'}],
    speakText:'Gate', opts:['Gate','Door','Fence','Wall'], a:0,
    explanation:'Gate quer dizer porteira ou portão.',
    hint:'A porta de madeira na entrada do sítio!',
    teacherHint:'É a porta grande de madeira ou ferro na entrada do sítio que você abre para entrar!' },
  { cat:'Vida no Sítio 🌾', emoji:'💧', q:'"Poço" in English is…',
    speechParts:[{lang:'pt-BR',text:'Poço'},{lang:'en-US',text:'in English is'}],
    speakText:'Well', opts:['Well','Spring','Tank','Pond'], a:0,
    explanation:'Well quer dizer poço.',
    hint:'Buraco fundo no chão de onde se tira água.',
    teacherHint:'É um buraco profundo no chão de onde os moradores do campo tiram água para beber e regar!' },
  { cat:'Vida no Sítio 🌾', emoji:'🌅', q:'"Pôr do sol" in English is…',
    speechParts:[{lang:'pt-BR',text:'Pôr do sol'},{lang:'en-US',text:'in English is'}],
    speakText:'Sunset', opts:['Sunset','Sunrise','Dusk','Dawn'], a:0,
    explanation:'Sunset quer dizer pôr do sol.',
    hint:'Quando o sol vai embora no final da tarde.',
    teacherHint:'É o momento lindo quando o sol se põe no horizonte. O céu fica todo laranja e rosa!' },
  { cat:'Vida no Sítio 🌾', emoji:'🛣️', q:'"Estrada" in English is…',
    speechParts:[{lang:'pt-BR',text:'Estrada'},{lang:'en-US',text:'in English is'}],
    speakText:'Road', opts:['Road','Path','Trail','Highway'], a:0,
    explanation:'Road quer dizer estrada.',
    hint:'O caminho que o ônibus escolar usa todo dia!',
    teacherHint:'É o caminho de terra ou asfalto que passa pela zona rural e leva até a escola!' },
  { cat:'Vida no Sítio 🌾', emoji:'🌻', q:'"Girassol" in English is…',
    speechParts:[{lang:'pt-BR',text:'Girassol'},{lang:'en-US',text:'in English is'}],
    speakText:'Sunflower', opts:['Sunflower','Daisy','Rose','Tulip'], a:0,
    explanation:'Sunflower quer dizer girassol.',
    hint:'A flor que sempre olha para o sol!',
    teacherHint:'É uma flor enorme e amarela que sempre vira a cabeça para o sol. Lindo nas lavouras!' },
  { cat:'Vida no Sítio 🌾', emoji:'🌈', q:'"Arco-íris" in English is…',
    speechParts:[{lang:'pt-BR',text:'Arco-íris'},{lang:'en-US',text:'in English is'}],
    speakText:'Rainbow', opts:['Rainbow','Clouds','Sunrise','Fog'], a:0,
    explanation:'Rainbow quer dizer arco-íris.',
    hint:'Aparece depois da chuva com várias cores!',
    teacherHint:'É o fenômeno colorido que aparece no céu depois da chuva. Muito bonito de ver no campo!' },
];

/* ── Frases bilíngues dos alunos ──────────────────────────
   Cada aluno tem uma frase em inglês e sua tradução em português.
   Usadas no modal de embarque para ensinar de forma contextual.
   ──────────────────────────────────────────────────────── */
const studentPhrases = {
  Thomas:    { en: "Let's go to school!",      pt: "Vamos para a escola!"           },
  Giovana:   { en: "I am ready!",              pt: "Estou pronto!"                  },
  Manuella:  { en: "Good morning!",            pt: "Bom dia!"                       },
  Nicolas:   { en: "Let's learn English!",     pt: "Vamos aprender inglês!"         },
  Bianca:    { en: "I like school!",           pt: "Eu gosto da escola!"            },
  Ester:     { en: "Hello, friends!",          pt: "Olá, amigos!"                   },
  Weslay:    { en: "The bus is fun!",          pt: "O ônibus é divertido!"          },
  Gabriella: { en: "I have my backpack!",      pt: "Eu tenho minha mochila!"        },
  Amanda:    { en: "Time to learn!",           pt: "Hora de aprender!"              },
  Bernardo:  { en: "Let's play and learn!",    pt: "Vamos brincar e aprender!"      },
  Pedro:     { en: "We are going to school!",  pt: "Nós estamos indo para a escola!"},
};

/* ── Amigos / paradas (11 personagens) ──────────────────── */
const FRIENDS = [
  { name:'Thomas',    initial:'T', color:'#1565C0', score:10,  phrase:"Let's go to school!"       },
  { name:'Giovana',   initial:'G', color:'#AD1457', score:19,  phrase:"I am ready!"               },
  { name:'Manuella',  initial:'M', color:'#6A1B9A', score:28,  phrase:"Good morning!"             },
  { name:'Nicolas',   initial:'N', color:'#2E7D32', score:37,  phrase:"Let's learn English!"      },
  { name:'Bianca',    initial:'B', color:'#BF360C', score:46,  phrase:"I like school!"            },
  { name:'Ester',     initial:'E', color:'#00695C', score:55,  phrase:"Hello, friends!"           },
  { name:'Weslay',    initial:'W', color:'#0277BD', score:64,  phrase:"The bus is fun!"           },
  { name:'Gabriella', initial:'G', color:'#558B2F', score:73,  phrase:"I have my backpack!"       },
  { name:'Amanda',    initial:'A', color:'#EF6C00', score:82,  phrase:"Time to learn!"            },
  { name:'Bernardo',  initial:'B', color:'#283593', score:91,  phrase:"Let's play and learn!"     },
  { name:'Pedro',     initial:'P', color:'#4E342E', score:100, phrase:"We are going to school!"   },
];

/* ── Estado do jogo ──────────────────────────────────────── */
const state = {
  playerName:         '',
  startedAt:          null,   // timestamp (Date.now()) ao iniciar partida
  score:              0,
  correct:            0,
  wrong:              0,
  total:              0,
  helpFriend:         3,
  helpHint:           2,
  helpTeacher:        1,
  boardedCount:       0,
  currentQ:           null,
  pool:               [],
  answered:           false,
  soundEnabled:       true,
  audioCtx:           null,
  boardedThisAnswer:  false,  // true quando um amigo embarcou nesta resposta
  boardedFriend:      null,   // referência ao amigo que embarcou
  lastSpeechParts:    null,   // para o botão 🔊 "Ouvir novamente"
};

const WRONG_PENALTY  = 3;
const TEACHER_NAME   = 'Ana'; // Nome da professora (altere conforme necessário)

/*
 * Validação simples para uso escolar.
 * Em versão futura, usar autenticação mais segura no servidor.
 *
 * Para alterar os códigos: edite os valores abaixo.
 * Os códigos NÃO são registrados no ranking nem enviados ao Supabase.
 */
const studentCodes = {
  Thomas:    '27',
  Giovana:   '64',
  Manuella:  '38',
  Nicolas:   '91',
  Bianca:    '52',
  Ester:     '76',
  Weslay:    '43',
  Gabriella: '85',
  Amanda:    '19',
  Bernardo:  '70',
  Pedro:     '31',
};

// Contador de tentativas erradas consecutivas por sessão
let codeWrongAttempts = 0;

/* ══════════════════════════════════════════════════════════
   PRESENTES DA TURMA
   ──────────────────────────────────────────────────────────
   Esta funcionalidade não permite texto livre.
   As crianças só podem enviar presentes pré-definidos,
   para manter a interação segura e positiva.
   ══════════════════════════════════════════════════════════ */

const GIFTS = [
  { id:'heart',   name:'Coração',     emoji:'❤️',  english:'heart'      },
  { id:'corn',    name:'Milho',       emoji:'🌽',  english:'corn'       },
  { id:'eggs',    name:'Ovos',        emoji:'🥚',  english:'eggs'       },
  { id:'chicken', name:'Galinha',     emoji:'🐔',  english:'chicken'    },
  { id:'cow',     name:'Vaquinha',    emoji:'🐄',  english:'cow'        },
  { id:'rabbit',  name:'Coelho',      emoji:'🐇',  english:'rabbit'     },
  { id:'cheese',  name:'Queijo',      emoji:'🧀',  english:'cheese'     },
  { id:'cuca',    name:'Cuca',        emoji:'🍰',  english:'sweet cake' },
  { id:'milk',    name:'Leite',       emoji:'🥛',  english:'milk'       },
  { id:'tractor', name:'Trator',      emoji:'🚜',  english:'tractor'    },
  { id:'flower',  name:'Flor',        emoji:'🌻',  english:'flower'     },
  { id:'apple',   name:'Maçã',        emoji:'🍎',  english:'apple'      },
  { id:'banana',  name:'Banana',      emoji:'🍌',  english:'banana'     },
  { id:'bee',     name:'Abelha',      emoji:'🐝',  english:'bee'        },
  { id:'quail',   name:'Codorna',     emoji:'🐦',  english:'quail'      },
  { id:'calf',    name:'Bezerro',     emoji:'🐮',  english:'calf'       },
  { id:'bread',   name:'Pão caseiro', emoji:'🍞',  english:'bread'      },
];

const LS_GIFTS_KEY  = 'eba_gifts_v1';        // presentes locais (fallback)
const DAILY_MAX_GIFTS = 3;                   // limite de envios por dia

/* Retorna a chave do dia para contagem de envios diários */
function dailyGiftKey(studentName) {
  const d = new Date();
  const ymd = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
  return `englishBusGiftsSent_${ymd}_${studentName}`;
}

/** Quantos presentes o aluno já enviou hoje (localStorage). */
function getDailyGiftCount(studentName) {
  return parseInt(localStorage.getItem(dailyGiftKey(studentName)) || '0', 10);
}

/** Incrementa contador diário de presentes enviados. */
function incrementDailyGift(studentName) {
  const key = dailyGiftKey(studentName);
  const cur = getDailyGiftCount(studentName);
  localStorage.setItem(key, String(cur + 1));
}

/* ── Persistência local de presentes (fallback) ─────────── */

function saveGiftLocal(giftData) {
  const all = JSON.parse(localStorage.getItem(LS_GIFTS_KEY) || '[]');
  all.push({ ...giftData, created_at: new Date().toISOString() });
  localStorage.setItem(LS_GIFTS_KEY, JSON.stringify(all));
}

function getReceivedGiftsLocal(studentName) {
  const weekId = getWeekId(Date.now());
  return JSON.parse(localStorage.getItem(LS_GIFTS_KEY) || '[]')
    .filter(g => g.to_student === studentName && g.week_id === weekId)
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
}

function getWeeklyGiftsLocal() {
  const weekId = getWeekId(Date.now());
  return JSON.parse(localStorage.getItem(LS_GIFTS_KEY) || '[]')
    .filter(g => g.week_id === weekId);
}

/* ── Supabase – presentes ────────────────────────────────── */

async function sendGiftOnline(giftData) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/student_gifts`, {
      method: 'POST',
      headers: SUPA_HDR,
      body: JSON.stringify({
        from_student: giftData.from_student,
        to_student:   giftData.to_student,
        gift_id:      giftData.gift_id,
        gift_name:    giftData.gift_name,
        gift_emoji:   giftData.gift_emoji,
        week_id:      giftData.week_id,
      }),
    });
    if (!res.ok) { console.warn('Erro ao enviar presente online:', res.status); return false; }
    return true;
  } catch (e) {
    console.warn('Erro ao enviar presente online:', e);
    return false;
  }
}

async function fetchReceivedGiftsOnline(studentName) {
  try {
    const weekId = getWeekId(Date.now());
    const url = `${SUPABASE_URL}/rest/v1/student_gifts`
      + `?to_student=eq.${encodeURIComponent(studentName)}`
      + `&week_id=eq.${encodeURIComponent(weekId)}`
      + `&select=id,from_student,to_student,gift_id,gift_name,gift_emoji,created_at,week_id`
      + `&order=created_at.desc`;
    const res = await fetch(url, { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.warn('Erro ao buscar presentes online:', e);
    return null;
  }
}

async function fetchWeeklyGiftsOnline() {
  try {
    const weekId = getWeekId(Date.now());
    const url = `${SUPABASE_URL}/rest/v1/student_gifts`
      + `?week_id=eq.${encodeURIComponent(weekId)}`
      + `&select=from_student,to_student,gift_id,gift_name,gift_emoji,created_at,week_id`
      + `&order=created_at.desc`;
    const res = await fetch(url, { headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.warn('Erro ao buscar presentes da semana online:', e);
    return null;
  }
}

/* ── Modal: Enviar presente ─────────────────────────────── */

// Estado interno do modal de presente
let giftState = { selectedRecipient: null, selectedGift: null };

function openSendGiftModal() {
  const sender = state.playerName || DOM.playerName.value.trim();
  const modal  = DOM.modalSendGift;
  if (!modal) return;

  if (!sender) {
    alert('Escolha seu nome e digite seu código secreto para enviar presentes.');
    return;
  }

  giftState = { selectedRecipient: null, selectedGift: null };
  renderSendGiftModal(sender);
  modal.classList.remove('hidden');
}

function renderSendGiftModal(sender) {
  const content = DOM.sendGiftContent;
  if (!content) return;

  const dailyCount = getDailyGiftCount(sender);
  const limitReached = dailyCount >= DAILY_MAX_GIFTS;

  content.innerHTML = `
    <div class="gift-sender-tag">Você: <strong>${sender}</strong> · <span class="gift-daily-badge">${dailyCount}/${DAILY_MAX_GIFTS} hoje</span></div>
    ${limitReached ? `<div class="gift-limit-msg">Você já enviou ${DAILY_MAX_GIFTS} presentes hoje. Volte amanhã! 🌻</div>` : ''}

    <div class="gift-section-title">Escolha um amigo:</div>
    <div class="gift-recipients" id="gift-recipients">
      ${FRIENDS.map(f => `
        <button class="gift-recipient-btn${f.name === sender ? ' is-self' : ''}"
                data-name="${f.name}"
                ${f.name === sender || limitReached ? 'disabled' : ''}
                style="--rc:${f.color}">
          <span class="gr-initial">${f.initial}</span>
          <span class="gr-name">${f.name === sender ? f.name + ' (Você)' : f.name}</span>
        </button>`).join('')}
    </div>

    <div class="gift-section-title" id="gift-pick-title" style="display:none">Escolha o presente:</div>
    <div class="gift-grid" id="gift-grid" style="display:none"></div>

    <div id="gift-send-wrap" style="display:none">
      <button id="btn-send-gift" class="btn-send-gift" disabled>🎁 Enviar presente</button>
    </div>
    <div id="gift-confirm-msg" class="gift-confirm-msg" style="display:none"></div>
  `;

  // Eventos dos destinatários
  content.querySelectorAll('.gift-recipient-btn:not([disabled])').forEach(btn => {
    btn.addEventListener('click', () => {
      content.querySelectorAll('.gift-recipient-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      giftState.selectedRecipient = btn.dataset.name;
      giftState.selectedGift = null;
      renderGiftGrid(content, limitReached);
      updateSendBtn(content);
    });
  });
}

function renderGiftGrid(content, limitReached) {
  const grid      = content.querySelector('#gift-grid');
  const title     = content.querySelector('#gift-pick-title');
  const sendWrap  = content.querySelector('#gift-send-wrap');
  if (!grid) return;
  title.style.display    = 'block';
  grid.style.display     = 'grid';
  sendWrap.style.display = 'block';

  grid.innerHTML = GIFTS.map(g => `
    <button class="gift-card-btn" data-id="${g.id}" ${limitReached ? 'disabled' : ''}>
      <span class="gc-emoji">${g.emoji}</span>
      <span class="gc-name">${g.name}</span>
      <span class="gc-english">${g.english}</span>
    </button>`).join('');

  grid.querySelectorAll('.gift-card-btn:not([disabled])').forEach(btn => {
    btn.addEventListener('click', () => {
      grid.querySelectorAll('.gift-card-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      giftState.selectedGift = GIFTS.find(g => g.id === btn.dataset.id);
      updateSendBtn(content);
    });
  });
}

function updateSendBtn(content) {
  const btn = content.querySelector('#btn-send-gift');
  if (!btn) return;
  btn.disabled = !(giftState.selectedRecipient && giftState.selectedGift);
  if (!btn._bound) {
    btn._bound = true;
    btn.addEventListener('click', handleSendGift);
  }
}

async function handleSendGift() {
  const sender = state.playerName || DOM.playerName.value.trim();
  const { selectedRecipient: to, selectedGift: gift } = giftState;
  if (!sender || !to || !gift) return;

  const content = DOM.sendGiftContent;
  const btn     = content && content.querySelector('#btn-send-gift');
  if (btn) btn.disabled = true;

  const giftData = {
    from_student: sender,
    to_student:   to,
    gift_id:      gift.id,
    gift_name:    gift.name,
    gift_emoji:   gift.emoji,
    week_id:      getWeekId(Date.now()),
  };

  // Salvar local + incrementar contador diário
  saveGiftLocal(giftData);
  incrementDailyGift(sender);

  // Tentar online
  const ok = await sendGiftOnline(giftData);

  // Feedback visual + áudio
  const msg = content && content.querySelector('#gift-confirm-msg');
  if (msg) {
    msg.innerHTML = ok
      ? `${gift.emoji} Presente enviado!<br><small>${to} vai ver quando entrar no jogo. 🌐</small>`
      : `${gift.emoji} Presente salvo!<br><small>Não foi possível enviar online agora. 📱</small>`;
    msg.style.display = 'block';
  }
  speakPortuguese(`Presente enviado para ${to}!`);

  // Após 2.5s, fechar e atualizar prévia
  setTimeout(() => {
    DOM.modalSendGift.classList.add('hidden');
    updateGiftPreview(sender);
  }, 2500);
}

/* ── Modal: Presentes recebidos ─────────────────────────── */

async function openReceivedGiftsModal() {
  const student = state.playerName || DOM.playerName.value.trim();
  if (!student) {
    alert('Escolha seu nome e digite seu código secreto para ver seus presentes.');
    return;
  }
  DOM.modalReceivedGifts && DOM.modalReceivedGifts.classList.remove('hidden');
  renderReceivedGiftsModal(student);
}

async function renderReceivedGiftsModal(student) {
  const content = DOM.receivedGiftsContent;
  if (!content) return;
  content.innerHTML = '<div class="gift-loading">🎁 Carregando presentes...</div>';

  // Buscar online, fallback local
  let gifts = await fetchReceivedGiftsOnline(student);
  let source = 'online';
  if (!gifts) { gifts = getReceivedGiftsLocal(student); source = 'local'; }

  const srcLabel = source === 'online'
    ? '<span class="gift-src online">🌐 Ranking online da semana</span>'
    : '<span class="gift-src local">📱 Dados deste aparelho</span>';

  // Total da semana (online se possível)
  let allWeekGifts = await fetchWeeklyGiftsOnline();
  if (!allWeekGifts) allWeekGifts = getWeeklyGiftsLocal();
  const weekTotal = allWeekGifts.length;

  if (!gifts.length) {
    content.innerHTML = `
      ${srcLabel}
      <div class="gift-empty">Você ainda não recebeu presentes esta semana. 🌻</div>
      <div class="gift-week-total">Presentes enviados pela turma esta semana: <strong>${weekTotal}</strong></div>`;
    return;
  }

  content.innerHTML = `
    ${srcLabel}
    <div class="gift-received-count">Presentes recebidos nesta semana: <strong>${gifts.length}</strong></div>
    <div class="gift-week-total">Presentes enviados pela turma esta semana: <strong>${weekTotal}</strong></div>
    <div class="gift-received-list">
      ${gifts.map(g => `
        <div class="gift-received-item">
          <span class="gri-emoji">${g.gift_emoji}</span>
          <div class="gri-info">
            <span class="gri-text"><strong>${g.from_student}</strong> mandou <strong>${g.gift_name}</strong> para você</span>
            <span class="gri-date">${fmtDateTimeBR(g.created_at)}</span>
          </div>
        </div>`).join('')}
    </div>
    <div class="gift-week-total" style="margin-top:8px">Presentes enviados pela turma esta semana: <strong>${weekTotal}</strong></div>`;
}

/* ── Prévia na tela inicial ─────────────────────────────── */

async function updateGiftPreview(studentName) {
  const wrap = DOM.giftPreviewWrap;
  if (!wrap) return;
  let gifts = await fetchReceivedGiftsOnline(studentName);
  if (!gifts) gifts = getReceivedGiftsLocal(studentName);
  const count = gifts.length;
  wrap.innerHTML = count > 0
    ? `🎁 <strong>${count}</strong> presente${count > 1 ? 's' : ''} recebido${count > 1 ? 's' : ''} esta semana!`
    : '🎁 Nenhum presente ainda — jogue e ganhe carinho da turma!';
  wrap.style.display = 'block';
}

/* ── Controle de presentes já vistos ─────────────────────
   Evita repetir a notificação automática para o mesmo presente.
   Chave: englishBusSeenGifts_[studentName]_[weekId]
   Valor: JSON array de identificadores de presente (id ou created_at)
   ──────────────────────────────────────────────────────── */
function seenGiftsKey(studentName) {
  return `englishBusSeenGifts_${studentName}_${getWeekId(Date.now())}`;
}
function getSeenGiftIds(studentName) {
  try { return JSON.parse(localStorage.getItem(seenGiftsKey(studentName)) || '[]'); }
  catch { return []; }
}
function markGiftsAsSeen(studentName, gifts) {
  const ids = gifts.map(g => g.id || g.created_at || '').filter(Boolean);
  const existing = getSeenGiftIds(studentName);
  const merged = [...new Set([...existing, ...ids])];
  localStorage.setItem(seenGiftsKey(studentName), JSON.stringify(merged));
}

/** Retorna lista de presentes recebidos que ainda não foram vistos. */
async function getNewGifts(studentName) {
  let gifts = await fetchReceivedGiftsOnline(studentName);
  let source = 'online';
  if (!gifts) { gifts = getReceivedGiftsLocal(studentName); source = 'local'; }
  if (!gifts || !gifts.length) return { gifts: [], source };

  const seen  = getSeenGiftIds(studentName);
  const newOnes = gifts.filter(g => {
    const uid = g.id || g.created_at || '';
    return uid && !seen.includes(uid);
  });
  return { gifts: newOnes, allGifts: gifts, source };
}

/** Mostra o modal de notificação de presentes novos. */
function showGiftNotification(newGifts, studentName, onPlay) {
  const modal    = DOM.modalGiftNotify;
  const list     = DOM.gnList;
  const subtitle = DOM.gnSubtitle;
  if (!modal || !list) { onPlay(); return; }

  subtitle.textContent = newGifts.length === 1
    ? '1 presente novo esperando por você!'
    : `${newGifts.length} presentes novos esperando por você!`;

  list.innerHTML = newGifts.map(g => `
    <div class="gn-item">
      <span class="gn-emoji">${g.gift_emoji}</span>
      <span class="gn-text"><strong>${g.from_student}</strong> mandou <strong>${g.gift_name}</strong> para você</span>
    </div>`).join('');

  modal.classList.remove('hidden');

  // Marcar como vistos
  markGiftsAsSeen(studentName, newGifts);

  const btnPlay = DOM.btnGnPlay;
  const btnView = DOM.btnGnView;

  // Remover listeners antigos e adicionar novos
  const play = btnPlay.cloneNode(true);
  const view = btnView.cloneNode(true);
  btnPlay.replaceWith(play);
  btnView.replaceWith(view);
  // Atualizar refs
  DOM.btnGnPlay = play;
  DOM.btnGnView = view;

  play.addEventListener('click', () => {
    playClick();
    modal.classList.add('hidden');
    onPlay();
  });
  view.addEventListener('click', () => {
    playClick();
    modal.classList.add('hidden');
    openReceivedGiftsModal();
    // Após fechar "meus presentes", o jogo ainda NÃO iniciou
    // O aluno poderá clicar JOGAR depois
  });
}

/** Atualiza badge de contagem no botão "Meus presentes". */
function updateGiftBadge(studentName) {
  const badge = document.getElementById('btn-my-gifts-badge');
  if (!badge) return;
  // Usa contagem local para ser síncrono (prévia rápida)
  const local = getReceivedGiftsLocal(studentName);
  const seen  = getSeenGiftIds(studentName);
  const newCount = local.filter(g => {
    const uid = g.id || g.created_at || '';
    return uid && !seen.includes(uid);
  }).length;
  if (newCount > 0) {
    badge.textContent = newCount;
    badge.style.display = 'inline-flex';
  } else {
    badge.style.display = 'none';
  }
}

/* ── Formatar data/hora ─────────────────────────────────── */
function fmtDateTimeBR(isoStr) {
  if (!isoStr) return '';
  const d = new Date(isoStr);
  if (isNaN(d)) return '';
  const pad = n => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth()+1)} às ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

/** Retorna emoji e título do nível semanal baseado nos pontos acumulados. */
function getWeeklyLevel(totalScore) {
  if (totalScore >= 1000) return { emoji: '🌟', name: 'Mestre da Escola 25' };
  if (totalScore >= 600)  return { emoji: '🏆', name: 'Campeão da Estrada' };
  if (totalScore >= 300)  return { emoji: '🚀', name: 'Explorador do Inglês' };
  if (totalScore >= 100)  return { emoji: '🚌', name: 'Ajudante do Ônibus' };
  return                         { emoji: '🎒', name: 'Passageiro Iniciante' };
}

/* ══════════════════════════════════════════════════════════
   RANKING SEMANAL – localStorage
   ──────────────────────────────────────────────────────────
   Este ranking usa localStorage e funciona apenas neste
   navegador. Para ranking real entre alunos jogando em casas
   diferentes, será necessário usar banco online como
   Supabase ou Firebase.
   ──────────────────────────────────────────────────────────
   Regra da semana: dom → sáb.
   Cada domingo o weekId muda automaticamente; as partidas
   antigas ficam salvas para o histórico de campeões.
   ══════════════════════════════════════════════════════════ */
const LS_KEY = 'eba_ranking_v1'; // English Bus Adventure – Ranking v1

/* ── Supabase – configuração ───────────────────────────── */
// Usa apenas a publishable key (anon/public). Sem service_role nem secret key.
const SUPABASE_URL = 'https://jichmqxsqxdlphpntqbs.supabase.co';
const SUPABASE_KEY = 'sb_publishable_eZ8CSUI6zvxQJCSjLX9Uvg_2iH4SGxY';
const SUPA_HDR     = {
  'apikey':        SUPABASE_KEY,
  'Authorization': `Bearer ${SUPABASE_KEY}`,
  'Content-Type':  'application/json',
  'Prefer':        'return=minimal',
};

/**
 * Envia o resultado de uma partida para o Supabase via REST.
 * Retorna true se salvou com sucesso, false caso contrário.
 * Nunca lança exceção — erros são silenciados para não quebrar o jogo.
 */
async function saveGameResultOnline(result) {
  try {
    console.log('Salvando pontuação online...');
    const body = {
      student_name:    result.studentName,
      score:           result.score,
      correct_answers: result.correctAnswers,
      wrong_answers:   result.wrongAnswers,
      duration_seconds:result.durationSeconds,
      week_id:         result.weekId,
      week_start:      result.weekStart,
      week_end:        result.weekEnd,
    };
    const res = await fetch(`${SUPABASE_URL}/rest/v1/game_scores`, {
      method:  'POST',
      headers: SUPA_HDR,
      body:    JSON.stringify(body),
    });
    if (!res.ok) {
      console.warn('Erro ao salvar pontuação online:', res.status, await res.text());
      return false;
    }
    console.log('Pontuação online salva com sucesso');
    return true;
  } catch (err) {
    console.warn('Erro ao salvar pontuação online:', err.message);
    return false;
  }
}

/**
 * Busca todas as partidas da semana atual no Supabase.
 * Retorna array de registros ou null se a requisição falhar.
 */
async function fetchCurrentWeekScoresOnline() {
  const weekId = getWeekId(Date.now());
  try {
    console.log('Buscando ranking online da semana...');
    const url = `${SUPABASE_URL}/rest/v1/game_scores`
      + `?week_id=eq.${encodeURIComponent(weekId)}`
      + `&select=student_name,score,correct_answers,wrong_answers,`
      + `duration_seconds,week_id,week_start,week_end,created_at`;
    const res = await fetch(url, {
      headers: {
        'apikey':        SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      },
    });
    if (!res.ok) {
      console.warn('Erro ao buscar ranking online:', res.status, await res.text());
      return null;
    }
    const data = await res.json();
    console.log('Ranking online carregado:', data.length, 'partidas');
    return data;
  } catch (err) {
    console.warn('Erro ao buscar ranking online:', err.message);
    return null;
  }
}

/**
 * Busca partidas de semanas ANTERIORES no Supabase para o histórico.
 * Retorna array ou null se falhar.
 */
async function fetchPastWeeksOnline() {
  const curWeekId = getWeekId(Date.now());
  try {
    const url = `${SUPABASE_URL}/rest/v1/game_scores`
      + `?week_id=neq.${encodeURIComponent(curWeekId)}`
      + `&select=student_name,score,correct_answers,wrong_answers,`
      + `week_id,week_start,week_end&order=week_id.desc`;
    const res = await fetch(url, {
      headers: {
        'apikey':        SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
      },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

/**
 * Agrupa registros do Supabase por aluno e devolve ranking ordenado.
 * Aceita a nomenclatura snake_case da API.
 */
function buildRankingFromScores(scores) {
  const map = {};
  scores.forEach(g => {
    const n = g.student_name;
    if (!map[n]) map[n] = {
      studentName: n, totalScore: 0, gamesPlayed: 0,
      bestScore: 0, totalCorrect: 0, totalWrong: 0,
    };
    const r = map[n];
    r.totalScore   += (g.score            || 0);
    r.gamesPlayed  += 1;
    r.bestScore     = Math.max(r.bestScore, g.score || 0);
    r.totalCorrect += (g.correct_answers  || 0);
    r.totalWrong   += (g.wrong_answers    || 0);
  });
  return Object.values(map)
    .map(r => ({ ...r, averageScore: Math.round(r.totalScore / r.gamesPlayed) }))
    .sort((a, b) =>
      b.totalScore   - a.totalScore   ||
      b.gamesPlayed  - a.gamesPlayed  ||
      b.bestScore    - a.bestScore    ||
      b.averageScore - a.averageScore
    );
}

/** Exibe toast discreto com resultado do envio online. */
function showOnlineSaveStatus(ok) {
  const el = DOM.onlineStatus;
  if (!el) return;
  el.textContent = ok
    ? '🌐 Pontuação enviada para o ranking online!'
    : '📱 Ranking online indisponível. Resultado salvo neste aparelho.';
  el.className = `online-toast ${ok ? 'toast-ok' : 'toast-warn'}`;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 4500);
}

/**
 * Função de teste disponível no console do navegador.
 * Uso: await testSupabaseConnection()
 */
window.testSupabaseConnection = async function () {
  console.log('Testando conexão com Supabase...');
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/game_scores?limit=1&select=id`,
      { headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` } }
    );
    if (res.ok) {
      const data = await res.json();
      console.log('✅ Supabase conectado! Registros encontrados:', data.length);
      return true;
    }
    console.warn('❌ Supabase respondeu com erro:', res.status, await res.text());
    return false;
  } catch (err) {
    console.error('❌ Erro ao conectar Supabase:', err.message);
    return false;
  }
};

/* ── Utilitários de semana ─────────────────────────────── */

/** Retorna { startDate (domingo 00:00), endDate (sábado 23:59) } da semana. */
function getWeekRange(date) {
  const d   = new Date(date || Date.now());
  const day = d.getDay();               // 0 = Dom … 6 = Sáb
  const sun = new Date(d);
  sun.setDate(d.getDate() - day);
  sun.setHours(0, 0, 0, 0);
  const sat = new Date(sun);
  sat.setDate(sun.getDate() + 6);
  sat.setHours(23, 59, 59, 999);
  return { startDate: sun, endDate: sat };
}

/** Retorna o ID único da semana: "YYYY-MM-DD_to_YYYY-MM-DD". */
function getWeekId(date) {
  const { startDate, endDate } = getWeekRange(date);
  const fmt = d => d.toISOString().slice(0, 10);
  return `${fmt(startDate)}_to_${fmt(endDate)}`;
}

/** Formata uma data como DD/MM/YYYY (fuso local). */
function fmtDateBR(date) {
  return new Date(date).toLocaleDateString('pt-BR',
    { day: '2-digit', month: '2-digit', year: 'numeric' });
}

/* ── Persistência ──────────────────────────────────────── */

/** Retorna todas as partidas salvas (array). */
function loadAllGames() {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); }
  catch { return []; }
}

/**
 * Salva o resultado no localStorage (síncrono, sempre funciona).
 * O envio ao Supabase é feito separadamente em showVictory().
 */
function saveGameResult() {
  const { startDate, endDate } = getWeekRange(Date.now());
  const result = {
    studentName:    state.playerName,
    score:          state.score,
    correctAnswers: state.correct,
    wrongAnswers:   state.wrong,
    startedAt:      state.startedAt ? new Date(state.startedAt).toISOString() : null,
    finishedAt:     new Date().toISOString(),
    durationSeconds: state.startedAt
      ? Math.round((Date.now() - state.startedAt) / 1000) : 0,
    weekId:    getWeekId(Date.now()),
    weekStart: startDate.toISOString(),
    weekEnd:   endDate.toISOString(),
  };
  const games = loadAllGames();
  games.push(result);
  try { localStorage.setItem(LS_KEY, JSON.stringify(games)); } catch {}
  return result;
}

/* ── Ranking semanal ───────────────────────────────────── */

/**
 * Ranking da semana atual usando apenas localStorage (síncrono).
 * Usado como fallback quando o Supabase está indisponível.
 */
function getLocalWeekRanking() {
  const curWeekId = getWeekId(Date.now());
  const map       = {};
  loadAllGames()
    .filter(g => g.weekId === curWeekId)
    .forEach(g => {
      const n = g.studentName;
      if (!map[n]) map[n] = {
        studentName: n, totalScore: 0, gamesPlayed: 0,
        bestScore: 0, totalCorrect: 0, totalWrong: 0,
      };
      const r = map[n];
      r.totalScore   += g.score;
      r.gamesPlayed  += 1;
      r.bestScore     = Math.max(r.bestScore, g.score);
      r.totalCorrect += (g.correctAnswers || 0);
      r.totalWrong   += (g.wrongAnswers   || 0);
    });
  return Object.values(map)
    .map(r => ({ ...r, averageScore: Math.round(r.totalScore / r.gamesPlayed) }))
    .sort((a, b) =>
      b.totalScore   - a.totalScore   ||
      b.gamesPlayed  - a.gamesPlayed  ||
      b.bestScore    - a.bestScore    ||
      b.averageScore - a.averageScore
    );
}

/**
 * Ranking da semana atual (async).
 * Tenta Supabase primeiro; cai para localStorage se falhar.
 * Retorna { ranking: Array, source: "online"|"local" }
 */
async function getCurrentWeekRanking() {
  const onlineScores = await fetchCurrentWeekScoresOnline();
  if (onlineScores !== null) {
    return { ranking: buildRankingFromScores(onlineScores), source: 'online' };
  }
  return { ranking: getLocalWeekRanking(), source: 'local' };
}

/**
 * Histórico de campeões de semanas anteriores.
 * Tenta Supabase; fallback para localStorage.
 */
async function getChampionsHistory() {
  const curWeekId = getWeekId(Date.now());

  // Tentativa online
  const onlineScores = await fetchPastWeeksOnline();
  if (onlineScores !== null) {
    const weekMap = {};
    onlineScores.forEach(g => {
      if (!g.week_id) return;
      if (!weekMap[g.week_id]) weekMap[g.week_id] = {
        weekId: g.week_id, weekStart: g.week_start, weekEnd: g.week_end, games: [],
      };
      weekMap[g.week_id].games.push(g);
    });
    return Object.values(weekMap)
      .sort((a, b) => b.weekId.localeCompare(a.weekId))
      .map(week => {
        const rankMap = {};
        week.games.forEach(g => {
          const n = g.student_name;
          if (!rankMap[n]) rankMap[n] = { studentName: n, totalScore: 0, gamesPlayed: 0, bestScore: 0 };
          rankMap[n].totalScore  += (g.score || 0);
          rankMap[n].gamesPlayed += 1;
          rankMap[n].bestScore    = Math.max(rankMap[n].bestScore, g.score || 0);
        });
        const sorted = Object.values(rankMap).sort((a, b) =>
          b.totalScore - a.totalScore || b.gamesPlayed - a.gamesPlayed || b.bestScore - a.bestScore
        );
        return { weekId: week.weekId, weekStart: week.weekStart, weekEnd: week.weekEnd,
                 champion: sorted[0] || null, ranking: sorted };
      });
  }

  // Fallback localStorage
  const weekMap = {};
  loadAllGames().forEach(g => {
    if (!g.weekId || g.weekId === curWeekId) return;
    if (!weekMap[g.weekId]) weekMap[g.weekId] = {
      weekId: g.weekId, weekStart: g.weekStart, weekEnd: g.weekEnd, games: [],
    };
    weekMap[g.weekId].games.push(g);
  });
  return Object.values(weekMap)
    .sort((a, b) => b.weekId.localeCompare(a.weekId))
    .map(week => {
      const rankMap = {};
      week.games.forEach(g => {
        const n = g.studentName;
        if (!rankMap[n]) rankMap[n] = { studentName: n, totalScore: 0, gamesPlayed: 0, bestScore: 0 };
        rankMap[n].totalScore  += g.score;
        rankMap[n].gamesPlayed += 1;
        rankMap[n].bestScore    = Math.max(rankMap[n].bestScore, g.score);
      });
      const sorted = Object.values(rankMap).sort((a, b) =>
        b.totalScore - a.totalScore || b.gamesPlayed - a.gamesPlayed || b.bestScore - a.bestScore
      );
      return { weekId: week.weekId, weekStart: week.weekStart, weekEnd: week.weekEnd,
               champion: sorted[0] || null, ranking: sorted };
    });
}

/* ── Renderização: pódio na tela inicial ───────────────── */
async function renderWelcomePodium() {
  const el = DOM.welcomePodium;
  if (!el) return;
  const { startDate, endDate } = getWeekRange(Date.now());
  const period  = `${fmtDateBR(startDate)} a ${fmtDateBR(endDate)}`;
  // Mostrar estado "carregando" enquanto busca online
  el.innerHTML = `<p class="podium-label">🏆 Ranking da Semana</p>
    <p class="podium-period">${period}</p>
    <p class="podium-empty">🔄 Carregando...</p>`;

  const { ranking, source } = await getCurrentWeekRanking();
  const srcBadge = source === 'online'
    ? '<span class="podium-src-online">🌐 online</span>'
    : '<span class="podium-src-local">📱 local</span>';

  if (ranking.length === 0) {
    el.innerHTML = `
      <p class="podium-label">🏆 Ranking da Semana ${srcBadge}</p>
      <p class="podium-period">${period}</p>
      <p class="podium-empty">Ranking da semana ainda vazio.<br>Seja o primeiro a jogar! 🌟</p>`;
    return;
  }
  const medals  = ['🥇','🥈','🥉'];
  const heights = ['90px','70px','56px'];
  const cls     = ['p-gold','p-silver','p-bronze'];
  const top     = ranking.slice(0, 3);
  const order   = top.length >= 3 ? [1,0,2] : top.length === 2 ? [1,0] : [0];
  let html = `<p class="podium-label">🏆 Ranking da Semana ${srcBadge}</p>
    <p class="podium-period">${period}</p>
    <div class="podium-row">`;
  order.forEach(i => {
    if (!top[i]) return;
    const r = top[i];
    html += `<div class="podium-place ${cls[i]}" style="min-height:${heights[i]}">
      <span class="p-medal">${medals[i]}</span>
      <span class="p-name">${r.studentName}</span>
      <span class="p-score">${r.totalScore} pts</span>
      <span class="p-games">${r.gamesPlayed}× jog.</span>
    </div>`;
  });
  html += `</div>`;
  el.innerHTML = html;
}

/* ── Renderização: modal de ranking ───────────────────── */
async function renderRankingModal() {
  const el = DOM.rankingContent;
  if (!el) return;

  const { startDate, endDate } = getWeekRange(Date.now());
  const period = `${fmtDateBR(startDate)} a ${fmtDateBR(endDate)}`;

  // Estado de carregamento
  el.innerHTML = `<div class="rank-week-header">
    <span class="rank-week-title">📅 Semana de ${period}</span>
  </div><p class="rank-loading">🔄 Buscando ranking online...</p>`;

  const { ranking, source } = await getCurrentWeekRanking();
  const medals = ['🥇','🥈','🥉'];

  const sourceHtml = source === 'online'
    ? `<div class="rank-source rank-source-online">🌐 Ranking online da semana</div>`
    : `<div class="rank-source rank-source-local">📱 Ranking deste aparelho
         <small>(Supabase indisponível – mostrando apenas dados locais)</small>
       </div>`;

  let html = `<div class="rank-week-header">
    <span class="rank-week-title">📅 Semana de ${period}</span>
    ${sourceHtml}
  </div>`;

  if (ranking.length === 0) {
    html += `<p class="rank-empty">Ranking da semana ainda vazio.<br>Seja o primeiro a jogar! 🌟</p>`;
  } else {
    // ── Tabela (visível no desktop, oculta no mobile) ──
    html += `<div class="rank-table-wrap"><table class="rank-table">
      <thead><tr>
        <th>#</th><th>Aluno(a)</th><th>Nível</th><th>Partidas</th>
        <th>Pts semana</th><th>Melhor</th><th>Média</th><th>✓</th><th>✗</th>
      </tr></thead><tbody>`;
    ranking.forEach((r, i) => {
      const pos   = medals[i] || `${i+1}º`;
      const cls   = i === 0 ? 'rank-gold' : i === 1 ? 'rank-silver' : i === 2 ? 'rank-bronze' : '';
      const level = getWeeklyLevel(r.totalScore);
      html += `<tr class="${cls}">
        <td class="rank-pos">${pos}</td>
        <td class="rank-name">${r.studentName}</td>
        <td class="rank-level" title="${level.name}">${level.emoji}</td>
        <td>${r.gamesPlayed}</td>
        <td><strong>${r.totalScore}</strong></td>
        <td>${r.bestScore}</td>
        <td>${r.averageScore}</td>
        <td class="rank-ok">${r.totalCorrect}</td>
        <td class="rank-err">${r.totalWrong}</td>
      </tr>`;
    });
    html += `</tbody></table></div>`;

    // ── Cards (visíveis no mobile, ocultos no desktop) ──
    html += `<div class="rank-cards">`;
    ranking.forEach((r, i) => {
      const medal = medals[i] || `${i+1}º`;
      const level = getWeeklyLevel(r.totalScore);
      const cardCls = i === 0 ? 'rank-card rank-card-gold'
                    : i === 1 ? 'rank-card rank-card-silver'
                    : i === 2 ? 'rank-card rank-card-bronze'
                    : 'rank-card';
      html += `<div class="${cardCls}">
        <div class="rc-header">
          <span class="rc-medal">${medal}</span>
          <div class="rc-info">
            <span class="rc-name">${r.studentName}</span>
            <span class="rc-level">${level.emoji} ${level.name}</span>
          </div>
        </div>
        <div class="rc-stats">
          <div class="rc-stat"><span class="rc-si">🎮</span><span class="rc-sv">${r.gamesPlayed}</span><span class="rc-sl">Partidas</span></div>
          <div class="rc-stat"><span class="rc-si">⭐</span><span class="rc-sv">${r.totalScore}</span><span class="rc-sl">Pts semana</span></div>
          <div class="rc-stat"><span class="rc-si">🏆</span><span class="rc-sv">${r.bestScore}</span><span class="rc-sl">Melhor</span></div>
          <div class="rc-stat"><span class="rc-si">📊</span><span class="rc-sv">${r.averageScore}</span><span class="rc-sl">Média</span></div>
          <div class="rc-stat"><span class="rc-si">✅</span><span class="rc-sv">${r.totalCorrect}</span><span class="rc-sl">Acertos</span></div>
          <div class="rc-stat"><span class="rc-si">❌</span><span class="rc-sv">${r.totalWrong}</span><span class="rc-sl">Erros</span></div>
        </div>
      </div>`;
    });
    html += `</div>
      <div class="rank-champion-btn-wrap">
        <button id="btn-show-champion-cert" class="btn-champion-cert">
          🏆 Ver certificado do campeão da semana
        </button>
      </div>`;
  }

  // ── Campeões anteriores ──
  const history = await getChampionsHistory();
  if (history.length > 0) {
    html += `<div class="champ-history-header">🏅 Campeões Anteriores</div>
      <table class="rank-table champ-table">
        <thead><tr>
          <th>Semana</th><th>Campeão(ã)</th><th>Total pts</th><th>Partidas</th><th>Melhor</th>
        </tr></thead><tbody>`;
    history.forEach(w => {
      if (!w.champion) return;
      const wS = w.weekStart ? fmtDateBR(w.weekStart) : '—';
      const wE = w.weekEnd   ? fmtDateBR(w.weekEnd)   : '—';
      html += `<tr>
        <td class="champ-period">${wS}<br><small>a ${wE}</small></td>
        <td class="rank-name">🏆 ${w.champion.studentName}</td>
        <td><strong>${w.champion.totalScore}</strong></td>
        <td>${w.champion.gamesPlayed}</td>
        <td>${w.champion.bestScore}</td>
      </tr>`;
    });
    html += `</tbody></table>`;
  }

  el.innerHTML = html;

  // rebind do botão gerado dinamicamente
  const btnCC = document.getElementById('btn-show-champion-cert');
  if (btnCC) btnCC.addEventListener('click', openChampionCertificate);
}

/* ── Certificado do campeão da semana ─────────────────── */
async function openChampionCertificate() {
  const { ranking } = await getCurrentWeekRanking();
  if (ranking.length === 0) return;
  const champ  = ranking[0];
  const { startDate, endDate } = getWeekRange(Date.now());
  const period  = `${fmtDateBR(startDate)} a ${fmtDateBR(endDate)}`;
  const today   = new Date().toLocaleDateString('pt-BR',
    { day: '2-digit', month: 'long', year: 'numeric' });

  if (DOM.champCertContent) {
    DOM.champCertContent.innerHTML = `
      <div class="cc-school">🏫 Escola Municipal 25 de Julho<br>
        <small>Picada Verão, Picada São Jacó e Picada Schneider – Sapiranga/RS</small>
      </div>
      <div class="cc-trophy">🏆</div>
      <h2 class="cc-title">Certificado de Campeão da Semana</h2>
      <div class="cc-rule">✦ ✦ ✦ ✦ ✦</div>
      <p class="cc-text">A Escola 25 de Julho parabeniza o(a) aluno(a)</p>
      <div class="cc-name">${champ.studentName}</div>
      <p class="cc-text">
        por conquistar o <strong>1º lugar</strong> no ranking semanal do jogo<br>
        <strong>English Bus Adventure</strong> 🚌
      </p>
      <p class="cc-text">
        Você estudou inglês, ajudou o ônibus escolar<br>
        e chegou mais perto da Escola 25 de Julho!
      </p>
      <div class="cc-rule">✦ ✦ ✦ ✦ ✦</div>
      <div class="cc-stats">
        <div class="ccs-box"><span class="ccs-num">${champ.totalScore}</span><span class="ccs-lbl">pts na semana</span></div>
        <div class="ccs-box"><span class="ccs-num">${champ.gamesPlayed}</span><span class="ccs-lbl">partidas</span></div>
        <div class="ccs-box"><span class="ccs-num">${champ.bestScore}</span><span class="ccs-lbl">melhor</span></div>
      </div>
      <div class="cc-period">📅 Semana: ${period}</div>
      <div class="cc-rule">✦ ✦ ✦ ✦ ✦</div>
      <div class="cc-footer-sig">
        <div class="cc-sig-line"></div>
        <span>Professora / Teacher</span>
      </div>
      <div class="cc-footer-date">${today}</div>
    `;
  }
  DOM.modalChampCert.classList.remove('hidden');
}

/* ── Referências DOM ─────────────────────────────────────── */
const $ = id => document.getElementById(id);

const DOM = {
  screens: {
    welcome: $('screen-welcome'),
    game:    $('screen-game'),
    victory: $('screen-victory'),
  },
  playerName:      $('player-name'),
  studentGrid:     $('student-grid'),
  btnPlay:         $('btn-play'),
  btnSound:        $('btn-sound'),
  scoreVal:        $('score-val'),
  progressFill:    $('progress-fill'),
  progressBus:     $('progress-bus'),
  friendsBar:      $('friends-bar'),
  gameBus:         $('game-bus'),
  sceneRoad:       $('scene-road'),
  sceneTrees:      $('scene-trees'),
  friendPopup:     $('friend-popup'),
  fpBubble:        $('fp-bubble'),
  fpName:          $('fp-name'),
  qCatBadge:       $('q-cat-badge'),
  qNum:            $('q-num'),
  qEmoji:          $('q-emoji'),
  qText:           $('q-text'),
  opts:            [0,1,2,3].map(i => $(`opt${i}`)),
  feedbackMsg:     $('feedback-msg'),
  hBtnFriend:      $('hbtn-friend'),
  hBtnHint:        $('hbtn-hint'),
  hBtnTeacher:     $('hbtn-teacher'),
  hcFriend:        $('hc-friend'),
  hcHint:          $('hc-hint'),
  hcTeacher:       $('hc-teacher'),
  helpBar:         $('help-bar'),
  modalBoarded:    $('modal-boarded'),
  mbAvatar:        $('mb-avatar'),
  mbTitle:         $('mb-title'),
  mbPhraseEn:      $('mb-phrase-en'),
  mbPhrasePt:      $('mb-phrase-pt'),
  mbSpeakEn:       $('mb-speak-en'),
  mbSpeakPt:       $('mb-speak-pt'),
  btnContinue:     $('btn-continue'),
  modalFriendHelp: $('modal-friend-help'),
  friendHintsRow:  $('friend-hints-row'),
  btnCloseFH:      $('btn-close-fh'),
  btnSpeakQ:         $('btn-speak-q'),
  // painel de resultado
  answerResult:      $('answer-result'),
  arIcon:            $('ar-icon'),
  arTitle:           $('ar-title'),
  arPoints:          $('ar-points'),
  arFriend:          $('ar-friend'),
  arFriendPhrase:    $('ar-friend-phrase'),
  arCorrect:         $('ar-correct'),
  arExplanation:     $('ar-explanation'),
  btnRepeatSpeech:   $('btn-repeat-speech'),
  btnNextStop:       $('btn-next-stop'),
  // modal de amigos
  btnSpeakAllHints:  $('btn-speak-all-hints'),
  scoreDelta:      $('score-delta'),
  // victory
  certName:        $('cert-name'),
  certPts:         $('cert-pts'),
  certCorrect:     $('cert-correct'),
  certStars:       $('cert-stars'),
  certDate:        $('cert-date'),
  certRankInfo:    $('cert-rank-info'),
  confettiLayer:   $('confetti-layer'),
  btnReplay:       $('btn-replay'),
  // ranking semanal
  welcomePodium:    $('welcome-podium'),
  studentGrid:      $('student-grid'),
  btnRanking:       $('btn-ranking'),
  btnRankingV:      $('btn-ranking-v'),
  modalRanking:     $('modal-ranking'),
  rankingContent:   $('ranking-content'),
  btnCloseRanking:  $('btn-close-ranking'),
  btnClearRanking:  $('btn-clear-ranking'),
  // certificado do campeão
  modalChampCert:   $('modal-champ-cert'),
  champCertContent: $('champ-cert-content'),
  btnCloseChampCert:$('btn-close-champ-cert'),
  btnPrintChampCert:$('btn-print-champ-cert'),
  // toast de status online
  onlineStatus:        $('online-status'),
  // código secreto
  secretCodeWrap:      $('secret-code-wrap'),
  secretCodeLabel:     $('secret-code-label'),
  secretCodeInput:     $('secret-code-input'),
  secretCodeError:     $('secret-code-error'),
  // presentes da turma
  giftPreviewWrap:         $('gift-preview-wrap'),
  welcomeGiftActions:      $('welcome-gift-actions'),
  btnSendGiftWelcome:      $('btn-send-gift-welcome'),
  btnMyGiftsWelcome:       $('btn-my-gifts-welcome'),
  btnSendGiftVictory:      $('btn-send-gift-victory'),
  modalSendGift:           $('modal-send-gift'),
  sendGiftContent:         $('send-gift-content'),
  btnCloseSendGift:        $('btn-close-send-gift'),
  modalReceivedGifts:      $('modal-received-gifts'),
  receivedGiftsContent:    $('received-gifts-content'),
  btnCloseReceivedGifts:   $('btn-close-received-gifts'),
  // notificação de presentes novos
  modalGiftNotify:         $('modal-gift-notify'),
  gnList:                  $('gn-list'),
  gnSubtitle:              $('gn-subtitle'),
  btnGnPlay:               $('btn-gn-play'),
  btnGnView:               $('btn-gn-view'),
  // área adm
  btnAdmin:                $('btn-admin'),
  modalAdminLogin:         $('modal-admin-login'),
  admPassword:             $('adm-password'),
  btnAdmLoginSubmit:       $('btn-adm-login-submit'),
  btnAdmLoginCancel:       $('btn-adm-login-cancel'),
  admLoginError:           $('adm-login-error'),
  modalAdminPanel:         $('modal-admin-panel'),
  btnAdmPanelClose:        $('btn-adm-panel-close'),
  admWeekLabel:            $('adm-week-label'),
  admMainSection:          $('adm-main-section'),
  admStudentsSection:      $('adm-students-section'),
  admAddSection:           $('adm-add-section'),
  admStudentsList:         $('adm-students-list'),
  btnAdmStudents:          $('btn-adm-students'),
  btnAdmAddStudent:        $('btn-adm-add-student'),
  btnAdmResetScores:       $('btn-adm-reset-scores'),
  btnAdmResetGifts:        $('btn-adm-reset-gifts'),
  btnAdmResetAll:          $('btn-adm-reset-all'),
  admActionFeedback:       $('adm-action-feedback'),
  btnAdmBackStudents:      $('btn-adm-back-students'),
  btnAdmBackAdd:           $('btn-adm-back-add'),
  admNewName:              $('adm-new-name'),
  admNewCode:              $('adm-new-code'),
  admAddError:             $('adm-add-error'),
  admAddSuccess:           $('adm-add-success'),
  btnAdmSaveStudent:       $('btn-adm-save-student'),
};

/* ══════════════════════════════════════════════════════════
   ÁUDIO (Web Audio API – sem arquivos externos)
   ══════════════════════════════════════════════════════════ */

function ensureAudio() {
  if (!state.audioCtx) {
    state.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (state.audioCtx.state === 'suspended') state.audioCtx.resume();
}

function playTone(freq, dur, type = 'sine', vol = 0.25, startOffset = 0) {
  if (!state.soundEnabled || !state.audioCtx) return;
  const ctx  = state.audioCtx;
  const t    = ctx.currentTime + startOffset;
  const osc  = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  osc.frequency.setValueAtTime(freq, t);
  gain.gain.setValueAtTime(vol, t);
  gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
  osc.start(t);
  osc.stop(t + dur + 0.05);
}

function playCorrect() {
  ensureAudio();
  playTone(523, 0.12, 'sine', 0.28, 0);
  playTone(659, 0.12, 'sine', 0.28, 0.10);
  playTone(784, 0.25, 'sine', 0.28, 0.20);
}

function playWrong() {
  ensureAudio();
  playTone(220, 0.3, 'sawtooth', 0.2, 0);
  playTone(165, 0.3, 'sawtooth', 0.18, 0.20);
}

function playClick() {
  ensureAudio();
  playTone(800, 0.06, 'square', 0.1, 0);
}

function playFriendBoarded() {
  ensureAudio();
  const notes = [523, 587, 659, 784, 880];
  notes.forEach((f, i) => playTone(f, 0.15, 'sine', 0.25, i * 0.08));
}

function playBusHorn() {
  ensureAudio();
  playTone(440, 0.14, 'square', 0.18, 0);
  playTone(440, 0.28, 'square', 0.18, 0.22);
}

function playHelpSound() {
  ensureAudio();
  playTone(660, 0.1, 'sine', 0.2, 0);
  playTone(880, 0.15, 'sine', 0.2, 0.12);
}

function playVictory() {
  ensureAudio();
  const melody = [
    [523,0.18],[523,0.08],[587,0.28],[523,0.28],[698,0.28],[659,0.55],
    [523,0.18],[523,0.08],[587,0.28],[523,0.28],[784,0.28],[698,0.55],
  ];
  let t = 0;
  melody.forEach(([f, d]) => { playTone(f, d * 0.85, 'sine', 0.3, t); t += d; });
}

/* ══════════════════════════════════════════════════════════
   FALA (Web Speech API – sem arquivos externos)
   ══════════════════════════════════════════════════════════ */

let _voiceCache = {};   // { 'en-US': VoiceObj, 'pt-BR': VoiceObj }

function _getVoice(lang) {
  if (!window.speechSynthesis) return null;
  if (_voiceCache[lang]) return _voiceCache[lang];
  const voices = window.speechSynthesis.getVoices();
  let found = null;
  if (lang === 'pt-BR') {
    found = voices.find(v => v.lang === 'pt-BR')
         || voices.find(v => v.lang.startsWith('pt'))
         || null;
  } else {
    found = voices.find(v => v.lang === 'en-US')
         || voices.find(v => v.lang === 'en-GB')
         || voices.find(v => v.lang.startsWith('en'))
         || null;
  }
  if (found) _voiceCache[lang] = found;
  return found;
}
if (window.speechSynthesis) {
  window.speechSynthesis.addEventListener('voiceschanged', () => { _voiceCache = {}; });
}

function _makeUtter(text, lang) {
  const u   = new SpeechSynthesisUtterance(text);
  u.lang    = lang;
  u.rate    = lang === 'pt-BR' ? 0.9 : 0.82;
  u.pitch   = 1.05;
  const v   = _getVoice(lang);
  if (v) u.voice = v;
  return u;
}

function stopSpeech() {
  if (window.speechSynthesis) window.speechSynthesis.cancel();
}

function speakPortuguese(text) {
  if (!state.soundEnabled || !window.speechSynthesis) return;
  stopSpeech();
  window.speechSynthesis.speak(_makeUtter(text, 'pt-BR'));
}

function speakEnglish(text) {
  if (!state.soundEnabled || !window.speechSynthesis) return;
  stopSpeech();
  window.speechSynthesis.speak(_makeUtter(text, 'en-US'));
}

/* speakMixed: fala partes em sequência, cada uma com seu idioma.
   parts = [{ lang:'pt-BR'|'en-US', text:'...' }, …] */
function speakMixed(parts) {
  if (!state.soundEnabled || !window.speechSynthesis) return;
  if (!parts || parts.length === 0) return;
  stopSpeech();
  let idx = 0;
  function next() {
    if (idx >= parts.length || !state.soundEnabled) return;
    const p = parts[idx++];
    const u = _makeUtter(p.text, p.lang || 'en-US');
    u.onend   = next;
    u.onerror = next;
    window.speechSynthesis.speak(u);
  }
  next();
}

/* getSpeechParts: decide o que falar para o botão da pergunta.
   Prioridade: speechParts > auto-detect '"X" in English is…' > speakText > q */
function getSpeechParts(q) {
  if (q.speechParts) return q.speechParts;
  const m = q.q.match(/^"([^"]+)"\s+in\s+English\s+is/i);
  if (m) return [
    { lang: 'pt-BR', text: m[1] },
    { lang: 'en-US', text: 'in English is' }
  ];
  if (q.speakText) return [{ lang: 'en-US', text: q.speakText }];
  return [{ lang: 'en-US', text: q.q }];
}

/* ══════════════════════════════════════════════════════════
   CONSTRUÇÃO DA CENA
   ══════════════════════════════════════════════════════════ */

function buildScene() {
  buildTrees();
  buildStopMarkers();
}

function buildTrees() {
  const container = DOM.sceneTrees;
  container.innerHTML = '';
  const positions = [4, 14, 27, 40, 52, 63, 76, 88];
  positions.forEach(pct => {
    const sz   = 22 + Math.random() * 18;
    const tree = document.createElement('div');
    tree.className = 's-tree';
    tree.style.left = pct + '%';
    const top   = document.createElement('div');
    top.className = 's-tree-top';
    top.style.width  = sz + 'px';
    top.style.height = sz + 'px';
    const trunk = document.createElement('div');
    trunk.className = 's-tree-trunk';
    trunk.style.width  = Math.round(sz * 0.22) + 'px';
    trunk.style.height = Math.round(sz * 0.4)  + 'px';
    tree.appendChild(top);
    tree.appendChild(trunk);
    container.appendChild(tree);
  });
}

function buildStopMarkers() {
  DOM.sceneRoad.querySelectorAll('.stop-marker').forEach(el => el.remove());
  FRIENDS.forEach((f, i) => {
    const pct    = busLeftPct(f.score);
    const marker = document.createElement('div');
    marker.className = 'stop-marker';
    marker.id        = `marker-${i}`;
    marker.style.left = pct + '%';
    const house  = document.createElement('div');
    house.className  = 'sm-house';
    house.textContent = '🏠';
    const flag   = document.createElement('div');
    flag.className   = 'sm-flag';
    const nameEl = document.createElement('div');
    nameEl.className  = 'sm-name';
    nameEl.textContent = f.name;
    marker.appendChild(house);
    marker.appendChild(flag);
    marker.appendChild(nameEl);
    DOM.sceneRoad.appendChild(marker);
  });
}

function buildFriendsBar() {
  DOM.friendsBar.innerHTML = '';
  FRIENDS.forEach((f, i) => {
    const chip   = document.createElement('div');
    chip.className = 'friend-chip';
    chip.id        = `chip-${i}`;
    const avatar = document.createElement('div');
    avatar.className  = 'friend-avatar';
    avatar.style.background = f.color;
    avatar.textContent = f.initial;
    const name   = document.createElement('div');
    name.className  = 'friend-chip-name';
    name.textContent = f.name;
    chip.appendChild(avatar);
    chip.appendChild(name);
    DOM.friendsBar.appendChild(chip);
  });
}

/* ══════════════════════════════════════════════════════════
   INICIAR JOGO
   ══════════════════════════════════════════════════════════ */

/* ── Validação do código secreto ──────────────────────────── */
function showCodeError(msg) {
  if (!DOM.secretCodeError) return;
  DOM.secretCodeError.textContent = msg;
  DOM.secretCodeError.style.display = 'block';
  DOM.secretCodeInput && DOM.secretCodeInput.classList.add('code-shake');
  setTimeout(() => DOM.secretCodeInput && DOM.secretCodeInput.classList.remove('code-shake'), 450);
}
function clearCodeError() {
  if (DOM.secretCodeError) DOM.secretCodeError.style.display = 'none';
}

// Aceitar apenas dígitos
DOM.secretCodeInput && DOM.secretCodeInput.addEventListener('input', () => {
  DOM.secretCodeInput.value = DOM.secretCodeInput.value.replace(/\D/g, '').slice(0, 2);
  clearCodeError();
  // Habilitar JOGAR provisoriamente só depois de 2 dígitos (validação final é no click)
  DOM.btnPlay.disabled = DOM.secretCodeInput.value.length < 2;
});

// Enter no campo de código dispara o jogo
DOM.secretCodeInput && DOM.secretCodeInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') { ensureAudio(); startGame(); }
});

DOM.btnPlay.addEventListener('click', () => { ensureAudio(); playClick(); startGame(); });

/** Inicializa e inicia o jogo para o aluno já validado. */
function doStartGame(name) {
  state.playerName    = name;
  state.startedAt     = Date.now();
  state.score         = 0;
  state.correct       = 0;
  state.wrong         = 0;
  state.total         = 0;
  state.helpFriend    = 3;
  state.helpHint      = 2;
  state.helpTeacher   = 1;
  state.boardedCount  = 0;
  state.answered      = false;
  state.pool          = shuffle([...QUESTIONS]);

  buildFriendsBar();
  buildScene();
  updateScoreUI(0, null);
  updateHelpCounts();

  showScreen('game');
  setTimeout(() => { playBusHorn(); nextQuestion(); }, 400);
}

/**
 * Valida nome + código e:
 *  - se houver presentes novos → mostra notificação antes de iniciar
 *  - caso contrário → inicia imediatamente
 */
async function startGame() {
  const name = DOM.playerName.value.trim();

  // 1. Nenhum aluno selecionado
  if (!name) {
    DOM.studentGrid.classList.add('shake');
    setTimeout(() => DOM.studentGrid.classList.remove('shake'), 500);
    showCodeError('Escolha seu nome para começar.');
    if (DOM.secretCodeWrap) DOM.secretCodeWrap.style.display = 'none';
    return;
  }

  // 2. Campo de código vazio
  const typed = DOM.secretCodeInput ? DOM.secretCodeInput.value.trim() : '';
  if (!typed) {
    showCodeError('Digite seu código secreto.');
    DOM.secretCodeInput && DOM.secretCodeInput.focus();
    return;
  }

  // 3. Código errado
  const expected = studentCodes[name];
  if (typed !== expected) {
    codeWrongAttempts++;
    if (codeWrongAttempts >= 3) {
      showCodeError('Confira seu código com a professora. 📞');
    } else {
      showCodeError('Ops! Esse código não combina com esse aluno. Peça seu código para a professora.');
    }
    DOM.secretCodeInput && (DOM.secretCodeInput.value = '');
    DOM.secretCodeInput && DOM.secretCodeInput.focus();
    DOM.btnPlay.disabled = true;
    return;
  }

  // 4. Código correto — resetar UI
  codeWrongAttempts = 0;
  if (DOM.secretCodeWrap)  DOM.secretCodeWrap.style.display = 'none';
  if (DOM.secretCodeInput) DOM.secretCodeInput.value = '';
  clearCodeError();

  // Mostrar botões de presentes e prévia
  if (DOM.welcomeGiftActions) DOM.welcomeGiftActions.style.display = 'flex';
  updateGiftPreview(name);
  updateGiftBadge(name);

  // 5. Verificar presentes novos antes de iniciar
  const { gifts: newGifts } = await getNewGifts(name);
  if (newGifts.length > 0) {
    // Mostrar notificação; onPlay() iniciará o jogo quando a criança clicar
    showGiftNotification(newGifts, name, () => doStartGame(name));
  } else {
    doStartGame(name);
  }
}

/* ══════════════════════════════════════════════════════════
   LÓGICA DAS PERGUNTAS
   ══════════════════════════════════════════════════════════ */

function nextQuestion() {
  if (state.pool.length === 0) state.pool = shuffle([...QUESTIONS]);
  state.currentQ          = state.pool.pop();
  state.answered          = false;
  state.boardedThisAnswer = false;
  state.boardedFriend     = null;

  console.log('Pergunta renderizada:', state.currentQ.q);

  DOM.qCatBadge.textContent   = state.currentQ.cat;
  DOM.qNum.textContent        = `Pergunta ${state.total + 1}`;
  DOM.qEmoji.textContent      = state.currentQ.emoji;
  DOM.qText.textContent       = state.currentQ.q;
  DOM.feedbackMsg.textContent = '';
  DOM.feedbackMsg.className   = '';

  // ocultar painel de resultado – via style direto (não depende de CSS)
  DOM.answerResult.style.display = 'none';
  DOM.answerResult.className     = '';

  // botão de fala da pergunta – respeita idioma misto
  const qParts = getSpeechParts(state.currentQ);
  DOM.btnSpeakQ.onclick = function() { speakMixed(qParts); };
  DOM.btnSpeakQ.setAttribute('aria-label', 'Ouvir pergunta em inglês');

  // restaurar alternativas – nova estrutura answer-row / answer-main / answer-audio
  DOM.opts.forEach((row, i) => {
    const optText = state.currentQ.opts[i];

    row.innerHTML  = '';
    row.className  = 'answer-row';
    row.style.opacity = '';

    // Botão principal (responde)
    const mainBtn   = document.createElement('button');
    mainBtn.className   = 'answer-main';
    mainBtn.type        = 'button';
    mainBtn.textContent = optText;
    mainBtn.disabled    = false;
    mainBtn.onclick = (function(index) {
      return function() {
        console.log('Resposta clicada', index);
        selectAnswer(index);
      };
    })(i);

    // Botão de áudio (apenas fala – NUNCA responde)
    const audioBtn  = document.createElement('button');
    audioBtn.className  = 'answer-audio';
    audioBtn.type       = 'button';
    audioBtn.textContent = '🔊';
    audioBtn.setAttribute('aria-label', `Ouvir alternativa ${optText}`);
    const _txt = optText;
    audioBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      e.preventDefault();
      speakEnglish(_txt);
    });

    row.appendChild(mainBtn);
    row.appendChild(audioBtn);
  });

  console.log('Botões criados', DOM.opts.length);

  // mostrar barra de ajudas
  DOM.helpBar.style.visibility    = '';
  DOM.helpBar.style.pointerEvents = '';

  updateHelpCounts();
  updateFriendPopup();
}

function selectAnswer(idx) {
  console.log('selectAnswer chamada', idx);
  if (state.answered) return;
  ensureAudio();
  state.answered = true;
  state.total++;

  const q       = state.currentQ;
  const correct = (idx === q.a);

  // desabilitar todas as alternativas imediatamente
  DOM.opts.forEach(row => {
    const mb = row.querySelector('.answer-main');
    if (mb) mb.disabled = true;
    row.classList.add('disabled');
    row.style.opacity = '.75';
  });
  // destacar correta e incorreta (opacidade total nelas)
  DOM.opts[q.a].classList.add('correct');
  DOM.opts[q.a].classList.remove('disabled');
  DOM.opts[q.a].style.opacity = '1';
  if (!correct) {
    DOM.opts[idx].classList.add('wrong');
    DOM.opts[idx].classList.remove('disabled');
    DOM.opts[idx].style.opacity = '1';
  }

  // ocultar barra de ajudas enquanto resultado está visível
  DOM.helpBar.style.visibility   = 'hidden';
  DOM.helpBar.style.pointerEvents = 'none';
  // ocultar dica de help
  DOM.feedbackMsg.textContent = '';
  DOM.feedbackMsg.className   = '';

  if (correct) {
    state.correct++;
    playCorrect();
    showScoreDelta('+10', true);
    updateScoreUI(state.score + 10, '+10');
    showAnswerResult(true, q, 0);
  } else {
    state.wrong++;
    playWrong();
    const penalty = Math.min(WRONG_PENALTY, state.score);
    if (penalty > 0) showScoreDelta(`-${penalty}`, false);
    updateScoreUI(Math.max(0, state.score - penalty), null);
    showAnswerResult(false, q, penalty);
  }
}

window.selectAnswer = selectAnswer;

/* Preencher e exibir o painel de resultado */
function showAnswerResult(correct, q, penalty) {
  const ar = DOM.answerResult;
  ar.removeAttribute('hidden');
  ar.style.display = 'block';
  ar.className     = correct ? 'result-correct' : 'result-wrong';

  DOM.arIcon.textContent  = correct ? '✅' : '❌';
  DOM.arTitle.textContent = correct
    ? 'Muito bem! Você acertou! 🎉'
    : 'Ops! Vamos aprender juntos.';
  DOM.arPoints.textContent = correct
    ? `⭐ +10 pts — total: ${state.score}`
    : (penalty > 0 ? `⬇️ -${penalty} pts — total: ${state.score}` : `total: ${state.score}`);

  // Info do amigo (se embarcou nesta resposta)
  const f = state.boardedFriend;
  if (correct && f) {
    DOM.arFriend.textContent       = `🚌 ${f.name} subiu no ônibus!`;
    DOM.arFriendPhrase.textContent = `💬 ${f.name} diz: "${f.phrase}"`;
  } else {
    DOM.arFriend.textContent       = '';
    DOM.arFriendPhrase.textContent = '';
  }

  DOM.arCorrect.textContent    = correct
    ? ''
    : `✏️ A resposta certa era: "${q.opts[q.a]}"`;
  // Prioridade: explanation > hint (para compatibilidade com questões antigas)
  const explText = q.explanation || q.hint || '';
  DOM.arExplanation.textContent = explText ? `💡 ${explText}` : '';

  console.log('Feedback renderizado –', correct ? 'CERTO' : 'ERRADO');

  // Montar partes de fala para este feedback
  let parts;
  if (correct) {
    if (f) {
      // boarding já foi falado em boardFriend; reutilizar lastSpeechParts
      parts = state.lastSpeechParts;
    } else {
      parts = [{ lang: 'pt-BR', text: `Muito bem! Você acertou. Você tem ${state.score} pontos!` }];
      state.lastSpeechParts = parts;
      setTimeout(() => speakMixed(parts), 200);
    }
  } else {
    parts = [
      { lang: 'pt-BR', text: 'Ops! Vamos aprender juntos. A resposta certa era:' },
      { lang: 'en-US', text: q.opts[q.a] }
    ];
    state.lastSpeechParts = parts;
    setTimeout(() => speakMixed(parts), 200);
  }

  // Rolar o botão para a tela no celular
  setTimeout(() => {
    DOM.btnNextStop.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 80);
}

function advanceAfterAnswer() {
  if (state.score >= 100) showVictory();
  else nextQuestion();
}

// Botão "Próxima Parada"
DOM.btnNextStop.addEventListener('click', () => {
  playClick();
  stopSpeech();
  advanceAfterAnswer();
});

// Botão 🔊 "Ouvir novamente" no painel de resultado
DOM.btnRepeatSpeech.addEventListener('click', (e) => {
  e.stopPropagation();
  if (state.lastSpeechParts) speakMixed(state.lastSpeechParts);
});

/* ── Delta flutuante de pontuação ──────────────────────── */
function showScoreDelta(text, isGood) {
  const el = DOM.scoreDelta;
  if (!el) return;
  el.textContent = text;
  el.className   = 'score-delta-anim ' + (isGood ? 'delta-up' : 'delta-down');
  // resetar animação
  void el.offsetWidth;
  el.style.animation = 'none';
  void el.offsetWidth;
  el.style.animation = '';
  el.className = 'score-delta-anim ' + (isGood ? 'delta-up' : 'delta-down');
}

/* ══════════════════════════════════════════════════════════
   PONTUAÇÃO E PROGRESSO
   ══════════════════════════════════════════════════════════ */

function updateScoreUI(newScore, _delta) {
  const oldScore = state.score;
  state.score    = Math.max(0, Math.min(newScore, 100));

  DOM.scoreVal.textContent = state.score;

  const pct = (state.score / 100) * 100;
  DOM.progressFill.style.width = pct + '%';
  DOM.progressBus.style.left   = pct + '%';

  moveBus(state.score);
  checkFriendMilestones(oldScore, state.score);
}

function busLeftPct(score) {
  return 3 + (score / 100) * 80;
}

function moveBus(score) {
  const pct = busLeftPct(score);
  DOM.gameBus.style.left = `calc(${pct}% - 41px)`;
}

function checkFriendMilestones(oldScore, newScore) {
  FRIENDS.forEach((f, i) => {
    if (oldScore < f.score && newScore >= f.score) boardFriend(i);
    const marker = document.getElementById(`marker-${i}`);
    if (marker) {
      marker.classList.toggle('visited', newScore >= f.score);
      marker.classList.toggle('current',
        newScore >= f.score &&
        (i === FRIENDS.length - 1 || newScore < FRIENDS[i + 1].score)
      );
    }
  });
}

function boardFriend(idx) {
  const f      = FRIENDS[idx];
  const chip   = document.getElementById(`chip-${idx}`);
  if (chip) chip.classList.add('boarded');
  state.boardedCount++;
  state.boardedThisAnswer = true;
  state.boardedFriend     = f;
  playFriendBoarded();

  const phrases = studentPhrases[f.name] || { en: f.phrase, pt: '...' };

  // Preencher o modal bilíngue
  DOM.mbAvatar.textContent   = getBigEmoji(f.name);
  DOM.mbTitle.textContent    = `${f.name} subiu no ônibus! 🚌`;
  if (DOM.mbPhraseEn) DOM.mbPhraseEn.textContent = `"${phrases.en}"`;
  if (DOM.mbPhrasePt) DOM.mbPhrasePt.textContent = `"${phrases.pt}"`;

  // aria-labels dinâmicos
  if (DOM.mbSpeakEn) DOM.mbSpeakEn.setAttribute('aria-label', `Ouvir em inglês: ${phrases.en}`);
  if (DOM.mbSpeakPt) DOM.mbSpeakPt.setAttribute('aria-label', `Ouvir em português: ${phrases.pt}`);

  DOM.modalBoarded.classList.remove('hidden');

  // Áudio automático: PT → EN → PT
  const boardParts = [
    { lang: 'pt-BR', text: `${f.name} subiu no ônibus!` },
    { lang: 'en-US', text: phrases.en },
    { lang: 'pt-BR', text: phrases.pt },
  ];
  state.lastSpeechParts = boardParts;
  setTimeout(() => speakMixed(boardParts), 200);
}

// Botões de áudio do modal de embarque (não fecham o modal)
DOM.mbSpeakEn && DOM.mbSpeakEn.addEventListener('click', e => {
  e.stopPropagation(); e.preventDefault();
  ensureAudio();
  const phrases = studentPhrases[state.boardedFriend?.name];
  if (phrases) speakEnglish(phrases.en);
});
DOM.mbSpeakPt && DOM.mbSpeakPt.addEventListener('click', e => {
  e.stopPropagation(); e.preventDefault();
  ensureAudio();
  const phrases = studentPhrases[state.boardedFriend?.name];
  if (phrases) speakPortuguese(phrases.pt);
});

// "Continuar" fecha o modal; a navegação fica com o botão "Próxima Parada"
DOM.btnContinue.addEventListener('click', () => {
  playClick();
  DOM.modalBoarded.classList.add('hidden');
});

function updateFriendPopup() {
  const next = FRIENDS.find(f => state.score < f.score);
  if (!next) { DOM.friendPopup.classList.add('hidden'); return; }
  DOM.fpBubble.textContent    = getBigEmoji(next.name);
  DOM.fpName.textContent      = next.name;
  DOM.friendPopup.classList.remove('hidden');
  const pct = busLeftPct(next.score);
  DOM.friendPopup.style.left     = `calc(${pct}% - 18px)`;
  DOM.friendPopup.style.bottom   = '42px';
  DOM.friendPopup.style.position = 'absolute';
}

/* ══════════════════════════════════════════════════════════
   SISTEMA DE AJUDAS
   ══════════════════════════════════════════════════════════ */

DOM.hBtnFriend.addEventListener('click',  () => useHelp('friend'));
DOM.hBtnHint.addEventListener('click',    () => useHelp('hint'));
DOM.hBtnTeacher.addEventListener('click', () => useHelp('teacher'));
window.useHelp = useHelp;

function useHelp(type) {
  if (state.answered) return;
  ensureAudio();
  playHelpSound();

  const q = state.currentQ;

  if (type === 'friend') {
    if (state.helpFriend <= 0) return;
    state.helpFriend--;
    DOM.hcFriend.textContent = state.helpFriend;
    if (state.helpFriend === 0) DOM.hBtnFriend.disabled = true;
    showFriendHelpModal(q);

  } else if (type === 'hint') {
    if (state.helpHint <= 0) return;
    state.helpHint--;
    DOM.hcHint.textContent = state.helpHint;
    if (state.helpHint === 0) DOM.hBtnHint.disabled = true;
    DOM.feedbackMsg.textContent = `📝 Dica: ${q.hint}`;
    DOM.feedbackMsg.className   = '';

  } else if (type === 'teacher') {
    if (state.helpTeacher <= 0) return;
    state.helpTeacher--;
    DOM.hcTeacher.textContent = state.helpTeacher;
    if (state.helpTeacher === 0) DOM.hBtnTeacher.disabled = true;

    const hint = q.teacherHint;
    const speakText = `Professora ${TEACHER_NAME} diz: ${hint}`;

    // Reconstruir com botão de fala inline
    DOM.feedbackMsg.innerHTML = '';
    DOM.feedbackMsg.className = 'teacher-hint';

    const textNode = document.createElement('span');
    textNode.innerHTML = `<span class="th-label">📞 Profª ${TEACHER_NAME}:</span> <em class="th-text">"${hint}"</em>`;

    const speakBtn = document.createElement('button');
    speakBtn.className   = 'speak-btn speak-inline';
    speakBtn.setAttribute('aria-label', 'Ouvir dica da professora');
    speakBtn.textContent = '🔊';
    speakBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      speakPortuguese(speakText);
    });

    DOM.feedbackMsg.appendChild(textNode);
    DOM.feedbackMsg.appendChild(speakBtn);

    // Auto-falar (há interação do usuário garantida neste ponto)
    speakPortuguese(speakText);
  }
}

/* ── Modal ajuda dos amigos ──────────────────────────────── */
function showFriendHelpModal(q) {
  // Escolher 3 amigos (dos embarcados ou aleatórios da lista)
  const boarded = FRIENDS.filter((_, i) => i < state.boardedCount);
  const pool    = boarded.length >= 3
    ? [...boarded]
    : shuffle([...FRIENDS]).slice(0, 3);
  const chosen  = shuffle([...pool]).slice(0, 3);

  // Montar sugestões: 2 corretas e 1 errada (ou 1 correta e 2 erradas, 70% vs 30%)
  const correctOpt = q.opts[q.a];
  const wrongOpts  = q.opts.filter((_, i) => i !== q.a);
  shuffle(wrongOpts);

  // 70% chance de 2 amigos apontarem a certa
  const majorityCorrect = Math.random() < 0.70;
  const suggestions = majorityCorrect
    ? [correctOpt, correctOpt, wrongOpts[0]]
    : [correctOpt, wrongOpts[0], wrongOpts[1]];
  shuffle(suggestions);

  // Guardar para o "Ouvir todos"
  const hintsForSpeech = chosen.map((fr, i) => ({ name: fr.name, suggestion: suggestions[i] }));

  // Preencher modal
  DOM.friendHintsRow.innerHTML = '';
  chosen.forEach((friend, i) => {
    const wrap   = document.createElement('div');
    wrap.className = 'friend-hint';

    // Balão com texto + botão 🔊
    const bubble  = document.createElement('div');
    bubble.className = 'fh-bubble';

    const bubbleTxt = document.createElement('span');
    bubbleTxt.textContent = suggestions[i];

    const speakBubble = document.createElement('button');
    speakBubble.className = 'speak-btn speak-opt fh-speak';
    speakBubble.setAttribute('aria-label', `Ouvir palpite: ${suggestions[i]}`);
    speakBubble.textContent = '🔊';
    const _sug  = suggestions[i];
    const _nome = friend.name;
    speakBubble.addEventListener('click', function(e) {
      e.stopPropagation();
      speakMixed([
        { lang: 'pt-BR', text: `${_nome} acha que é` },
        { lang: 'en-US', text: _sug }
      ]);
    });

    bubble.appendChild(bubbleTxt);
    bubble.appendChild(speakBubble);

    const avatar = document.createElement('div');
    avatar.className = 'fh-avatar';
    avatar.style.background = friend.color;
    avatar.textContent = friend.initial;

    const name   = document.createElement('div');
    name.className = 'fh-name';
    name.textContent = friend.name;

    wrap.appendChild(bubble);
    wrap.appendChild(avatar);
    wrap.appendChild(name);
    DOM.friendHintsRow.appendChild(wrap);
  });

  // Botão "Ouvir todos" — fala PT+EN: "Nome acha que é" + palavra em inglês
  if (DOM.btnSpeakAllHints) {
    DOM.btnSpeakAllHints.onclick = function(e) {
      e.stopPropagation();
      const parts = [];
      hintsForSpeech.forEach(h => {
        parts.push({ lang: 'pt-BR', text: `${h.name} acha que é` });
        parts.push({ lang: 'en-US', text: h.suggestion });
      });
      speakMixed(parts);
    };
  }

  DOM.modalFriendHelp.classList.remove('hidden');
}

DOM.btnCloseFH.addEventListener('click', () => {
  playClick();
  DOM.modalFriendHelp.classList.add('hidden');
});

function updateHelpCounts() {
  DOM.hcFriend.textContent  = state.helpFriend;
  DOM.hcHint.textContent    = state.helpHint;
  DOM.hcTeacher.textContent = state.helpTeacher;
  DOM.hBtnFriend.disabled   = state.helpFriend  === 0;
  DOM.hBtnHint.disabled     = state.helpHint    === 0;
  DOM.hBtnTeacher.disabled  = state.helpTeacher === 0;
}

/* ══════════════════════════════════════════════════════════
   VITÓRIA
   ══════════════════════════════════════════════════════════ */

async function showVictory() {
  playVictory();
  spawnConfetti();

  // 1. Salvar localmente (sempre, síncrono)
  const result = saveGameResult();

  // 2. Preencher certificado imediatamente com dados locais
  DOM.certName.textContent    = state.playerName;
  DOM.certPts.textContent     = state.score;
  DOM.certCorrect.textContent = state.correct;
  DOM.certStars.textContent   = starsForScore(state.correct, state.total);
  DOM.certDate.textContent    = new Date().toLocaleDateString('pt-BR', {
    day:'2-digit', month:'long', year:'numeric',
  });
  if (DOM.certRankInfo) {
    DOM.certRankInfo.innerHTML =
      `<div class="cri-item">⏳ Calculando posição no ranking...</div>`;
  }
  showScreen('victory');

  // 3. Enviar ao Supabase (async) e mostrar toast
  const savedOnline = await saveGameResultOnline(result);
  showOnlineSaveStatus(savedOnline);

  // 4. Buscar ranking atualizado (online se possível, local se fallback)
  const { startDate, endDate } = getWeekRange(Date.now());
  const period = `${fmtDateBR(startDate)} a ${fmtDateBR(endDate)}`;
  const { ranking, source } = await getCurrentWeekRanking();
  const myName  = state.playerName;
  const idx     = ranking.findIndex(r => r.studentName === myName);
  const rankInfo = idx >= 0 ? { position: idx + 1, data: ranking[idx] } : null;
  const srcLabel = source === 'online' ? '🌐 Ranking online' : '📱 Ranking local';

  if (DOM.certRankInfo) {
    if (rankInfo) {
      const { position, data } = rankInfo;
      const posLabel = position === 1 ? '🥇 1º lugar'
                     : position === 2 ? '🥈 2º lugar'
                     : position === 3 ? '🥉 3º lugar'
                     : `${position}º lugar`;
      DOM.certRankInfo.innerHTML = `
        <div class="cri-item">📅 Semana: <strong>${period}</strong></div>
        <div class="cri-item">🏆 Ranking da semana: <strong>${posLabel}</strong></div>
        <div class="cri-item">⭐ Pontos na semana: <strong>${data.totalScore}</strong></div>
        <div class="cri-item">📊 Partidas na semana: <strong>${data.gamesPlayed}</strong></div>
        <div class="cri-item">🌟 Melhor pontuação: <strong>${data.bestScore}</strong></div>
        <div class="cri-source">${srcLabel}</div>
      `;
    } else {
      const lv0 = getWeeklyLevel(state.score);
      DOM.certRankInfo.innerHTML = `
        <div class="cri-item">📅 Semana: <strong>${period}</strong></div>
        <div class="cri-item">${lv0.emoji} Nível: <strong>${lv0.name}</strong></div>
      `;
    }
  }

  // 5. Atualizar pódio da tela inicial em background
  renderWelcomePodium();
}

function starsForScore(correct, total) {
  if (total === 0) return '⭐';
  const pct = correct / total;
  if (pct >= 0.85) return '⭐⭐⭐';
  if (pct >= 0.65) return '⭐⭐';
  return '⭐';
}

function spawnConfetti() {
  DOM.confettiLayer.innerHTML = '';
  const colors = ['#FFD700','#FF6B6B','#3DCDC7','#6BCB77','#A78BFA','#F472B6','#60A5FA'];
  for (let i = 0; i < 70; i++) {
    const el    = document.createElement('div');
    el.className = 'conf-piece';
    const color = colors[i % colors.length];
    const size  = 7 + Math.random() * 10;
    const left  = Math.random() * 100;
    const delay = Math.random() * 1.8;
    const dur   = 1.8 + Math.random() * 2;
    el.style.cssText = `background:${color};width:${size}px;height:${size}px;left:${left}%;
      animation-duration:${dur}s;animation-delay:${delay}s;
      border-radius:${Math.random() > .5 ? '50%' : '3px'};`;
    DOM.confettiLayer.appendChild(el);
  }
}

/* ── Jogar de novo ───────────────────────────────────────── */
DOM.btnReplay.addEventListener('click', () => {
  playClick();
  DOM.confettiLayer.innerHTML = '';
  showScreen('welcome');
  // Se o aluno ainda está autenticado, garantir que botões de presente fiquem visíveis
  if (state.playerName) {
    if (DOM.welcomeGiftActions) DOM.welcomeGiftActions.style.display = 'flex';
    updateGiftPreview(state.playerName);
  }
});

/* ══════════════════════════════════════════════════════════
   SOM ON/OFF
   ══════════════════════════════════════════════════════════ */
DOM.btnSound.addEventListener('click', () => {
  ensureAudio();
  state.soundEnabled = !state.soundEnabled;
  DOM.btnSound.textContent = state.soundEnabled ? '🔊' : '🔇';
  if (!state.soundEnabled && window.speechSynthesis) window.speechSynthesis.cancel();
  if (state.soundEnabled) playClick();
});

/* ══════════════════════════════════════════════════════════
   UTILITÁRIOS
   ══════════════════════════════════════════════════════════ */

function showScreen(name) {
  Object.values(DOM.screens).forEach(s => s.classList.remove('active'));
  DOM.screens[name].classList.add('active');
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getBigEmoji(name) {
  const map = {
    Thomas:'👦', Giovana:'👧', Manuella:'👧', Nicolas:'👦',
    Bianca:'👧', Ester:'👧', Weslay:'👦', Gabriella:'👧',
    Amanda:'👧', Bernardo:'👦', Pedro:'👦',
  };
  return map[name] || '🙂';
}

/* ══════════════════════════════════════════════════════════
   RANKING – handlers dos botões
   ══════════════════════════════════════════════════════════ */

function openRankingModal() {
  playClick();
  renderRankingModal();
  DOM.modalRanking.classList.remove('hidden');
}

DOM.btnRanking.addEventListener('click', openRankingModal);
DOM.btnRankingV.addEventListener('click', openRankingModal);

DOM.btnCloseRanking.addEventListener('click', () => {
  playClick();
  DOM.modalRanking.classList.add('hidden');
});

DOM.btnClearRanking.addEventListener('click', () => {
  if (confirm('Tem certeza que deseja apagar o ranking local deste navegador?\n\nEssa ação não pode ser desfeita.')) {
    localStorage.removeItem(LS_KEY);
    renderRankingModal();
    renderWelcomePodium();
  }
});

// Certificado do campeão
DOM.btnCloseChampCert.addEventListener('click', () => {
  playClick();
  DOM.modalChampCert.classList.add('hidden');
});

DOM.btnPrintChampCert.addEventListener('click', () => {
  document.body.classList.add('printing-champion');
  window.print();
  setTimeout(() => document.body.classList.remove('printing-champion'), 800);
});

/* ══════════════════════════════════════════════════════════
   ÁREA ADMINISTRATIVA – PROFESSORA
   ──────────────────────────────────────────────────────────
   Área ADM simples para piloto escolar.
   A senha não fica no JavaScript como única segurança.
   As ações administrativas são validadas por funções RPC
   no Supabase (SECURITY DEFINER), que verificam o código
   admin_code no servidor.
   Em versão futura, usar autenticação real (Supabase Auth).
   ══════════════════════════════════════════════════════════ */

/** Estado da sessão administrativa (apenas em memória — limpo ao recarregar). */
let adminSession = { authenticated: false, password: '' };

/** Abre o modal de login administrativo. */
function openAdminLogin() {
  DOM.admPassword.value = '';
  hideElem(DOM.admLoginError);
  DOM.modalAdminLogin.classList.remove('hidden');
  setTimeout(() => DOM.admPassword.focus(), 100);
}

/** Esconde elemento com display:none. */
function hideElem(el) { if (el) el.style.display = 'none'; }
function showElem(el, d = 'block') { if (el) el.style.display = d; }

/** Valida senha via RPC do Supabase (admin_code não está no JS). */
async function validateAdminAndOpenPanel() {
  const pwd = DOM.admPassword.value.trim();
  if (!pwd) {
    showElem(DOM.admLoginError);
    DOM.admLoginError.textContent = 'Digite a senha.';
    return;
  }
  hideElem(DOM.admLoginError);
  DOM.btnAdmLoginSubmit.disabled = true;
  DOM.btnAdmLoginSubmit.textContent = '⏳ Verificando...';

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/admin_validate_code`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ p_admin_code: pwd }),
    });
    const valid = res.ok ? await res.json() : false;

    if (valid === true) {
      adminSession = { authenticated: true, password: pwd };
      DOM.modalAdminLogin.classList.add('hidden');
      renderAdminPanel();
    } else {
      showElem(DOM.admLoginError);
      DOM.admLoginError.textContent = 'Senha incorreta.';
    }
  } catch (e) {
    showElem(DOM.admLoginError);
    DOM.admLoginError.textContent = 'Erro ao conectar. Verifique a internet.';
    console.warn('ADM login error:', e);
  } finally {
    DOM.btnAdmLoginSubmit.disabled = false;
    DOM.btnAdmLoginSubmit.textContent = 'Entrar';
  }
}

/** Renderiza/abre o painel ADM (requer sessão autenticada). */
function renderAdminPanel() {
  if (!adminSession.authenticated) { openAdminLogin(); return; }

  // Semana atual
  const { startDate, endDate } = getWeekRange(Date.now());
  if (DOM.admWeekLabel) {
    DOM.admWeekLabel.textContent =
      `Semana atual: ${fmtDateBR(startDate)} a ${fmtDateBR(endDate)}`;
  }

  // Mostrar seção principal, ocultar sub-seções
  showAdmSection('main');
  hideElem(DOM.admActionFeedback);

  DOM.modalAdminPanel.classList.remove('hidden');
}

/** Alterna qual sub-seção do painel ADM está visível. */
function showAdmSection(which) {
  ['main','students','add'].forEach(s => {
    const el = DOM[`adm${s.charAt(0).toUpperCase()+s.slice(1)}Section`]
            || document.getElementById(`adm-${s}-section`);
    if (el) el.classList.add('hidden');
  });
  const target = document.getElementById(`adm-${which}-section`);
  if (target) target.classList.remove('hidden');
}

/** Exibe mensagem de feedback no painel (ok ou err). */
function admFeedback(msg, type = 'ok') {
  const el = DOM.admActionFeedback;
  if (!el) return;
  el.textContent = msg;
  el.className   = `adm-feedback ${type}`;
  showElem(el);
  if (type === 'ok') setTimeout(() => hideElem(el), 4000);
}

/* ─── Buscar alunos ──────────────────────────────────────── */

/**
 * Busca lista de alunos na tabela public.students do Supabase.
 * Retorna array de { name, access_code, active } ou null se falhar.
 */
async function fetchStudentsOnline() {
  try {
    const url = `${SUPABASE_URL}/rest/v1/students`
      + `?select=id,name,access_code,active&order=name.asc`;
    const res = await fetch(url, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (e) {
    console.warn('ADM: erro ao buscar alunos:', e);
    return null;
  }
}

/** Renderiza a lista de alunos no painel ADM. */
async function renderStudentsList() {
  showAdmSection('students');
  const list = DOM.admStudentsList;
  if (!list) return;
  list.innerHTML = '<div class="adm-loading">⏳ Carregando alunos...</div>';

  const rows = await fetchStudentsOnline();

  if (!rows) {
    // fallback: usar dados hardcoded do jogo
    const fallback = Object.entries(studentCodes).map(([name, code]) => ({
      name, access_code: code, active: true,
    }));
    list.innerHTML = `
      <div class="adm-error" style="display:block;margin-bottom:8px">
        Tabela <em>students</em> ainda não configurada no Supabase.<br>Exibindo dados locais.
      </div>` + fallback.map(s => buildStudentRow(s, true)).join('');
    return;
  }

  if (!rows.length) {
    list.innerHTML = '<div class="adm-loading">Nenhum aluno cadastrado.</div>';
    return;
  }

  list.innerHTML = rows.map(s => buildStudentRow(s)).join('');

  // Ligar botões de desativar
  list.querySelectorAll('.btn-adm-deactivate').forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      if (confirm(`Desativar o aluno "${name}"?\n\nO histórico será preservado.`)) {
        adminDeactivateStudent(name);
      }
    });
  });
}

function buildStudentRow(s, readOnly = false) {
  const isActive = s.active !== false;
  const statusLabel = isActive
    ? '<span class="adm-student-status active">Ativo</span>'
    : '<span class="adm-student-status inactive-badge">Inativo</span>';
  const deactivateBtn = isActive && !readOnly
    ? `<button class="btn-adm-deactivate" data-name="${s.name}">Desativar</button>`
    : '';
  return `
    <div class="adm-student-row${isActive ? '' : ' inactive'}">
      <div class="adm-student-info">
        <div class="adm-student-name">${s.name}</div>
        <div class="adm-student-code">Código: ${s.access_code}</div>
      </div>
      ${statusLabel}
      ${deactivateBtn}
    </div>`;
}

/* ─── Adicionar aluno ────────────────────────────────────── */

async function adminAddStudent() {
  const name = (DOM.admNewName.value || '').trim();
  const code = (DOM.admNewCode.value || '').trim();

  hideElem(DOM.admAddError);
  hideElem(DOM.admAddSuccess);

  if (!name) {
    showElem(DOM.admAddError);
    DOM.admAddError.textContent = 'Nome obrigatório.';
    return;
  }
  if (!/^\d{2}$/.test(code)) {
    showElem(DOM.admAddError);
    DOM.admAddError.textContent = 'O código deve ter exatamente 2 dígitos.';
    return;
  }

  DOM.btnAdmSaveStudent.disabled = true;
  DOM.btnAdmSaveStudent.textContent = '⏳ Salvando...';

  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/admin_add_student`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ p_admin_code: adminSession.password, p_name: name, p_access_code: code }),
    });
    const result = res.ok ? await res.json() : { success: false, error: 'Erro de conexão' };

    if (result && result.success) {
      showElem(DOM.admAddSuccess);
      DOM.admAddSuccess.textContent = `✅ Aluno "${name}" adicionado com sucesso!`;
      DOM.admNewName.value = '';
      DOM.admNewCode.value = '';
      // Atualizar lista dinâmica do seletor de alunos
      await refreshStudentSelector();
    } else {
      showElem(DOM.admAddError);
      DOM.admAddError.textContent = result.error || 'Erro ao salvar aluno.';
    }
  } catch (e) {
    showElem(DOM.admAddError);
    DOM.admAddError.textContent = 'Erro ao conectar ao servidor.';
    console.warn('ADM add student error:', e);
  } finally {
    DOM.btnAdmSaveStudent.disabled = false;
    DOM.btnAdmSaveStudent.textContent = '💾 Salvar aluno';
  }
}

/* ─── Desativar aluno ────────────────────────────────────── */

async function adminDeactivateStudent(name) {
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/admin_deactivate_student`, {
      method: 'POST',
      headers: {
        apikey: SUPABASE_KEY,
        Authorization: `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ p_admin_code: adminSession.password, p_name: name }),
    });
    const result = res.ok ? await res.json() : { success: false };
    if (result && result.success) {
      admFeedback(`✅ Aluno "${name}" desativado.`);
      await refreshStudentSelector();
      renderStudentsList(); // atualizar a lista exibida
    } else {
      admFeedback(`Erro ao desativar "${name}".`, 'err');
    }
  } catch (e) {
    admFeedback('Erro ao conectar ao servidor.', 'err');
    console.warn('ADM deactivate error:', e);
  }
}

/* ─── Resetar ranking da semana ─────────────────────────── */

async function adminResetWeekScores() {
  if (!confirm('Tem certeza que deseja apagar o ranking desta semana?\n\nIsso não pode ser desfeito.')) return;
  const weekId = getWeekId(Date.now());
  showAdmSection('main');
  admFeedback('⏳ Resetando ranking...', 'ok');
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/admin_reset_week_scores`, {
      method: 'POST',
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_admin_code: adminSession.password, p_week_id: weekId }),
    });
    const result = res.ok ? await res.json() : { success: false };
    if (result && result.success) {
      // Limpar também o localStorage da semana
      const lsGames = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
      localStorage.setItem(LS_KEY, JSON.stringify(lsGames.filter(g => g.weekId !== weekId)));
      admFeedback('✅ Ranking da semana apagado!');
      renderWelcomePodium();
    } else {
      admFeedback(result.error || 'Erro ao resetar ranking.', 'err');
    }
  } catch (e) {
    admFeedback('Erro ao conectar ao servidor.', 'err');
    console.warn('ADM reset scores error:', e);
  }
}

/* ─── Resetar presentes da semana ───────────────────────── */

async function adminResetWeekGifts() {
  if (!confirm('Tem certeza que deseja apagar os presentes desta semana?')) return;
  const weekId = getWeekId(Date.now());
  showAdmSection('main');
  admFeedback('⏳ Resetando presentes...', 'ok');
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/admin_reset_week_gifts`, {
      method: 'POST',
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_admin_code: adminSession.password, p_week_id: weekId }),
    });
    const result = res.ok ? await res.json() : { success: false };
    if (result && result.success) {
      // Limpar gifts locais da semana
      localStorage.removeItem(`${LS_GIFTS_KEY}_${weekId}`);
      admFeedback('✅ Presentes da semana apagados!');
    } else {
      admFeedback(result.error || 'Erro ao resetar presentes.', 'err');
    }
  } catch (e) {
    admFeedback('Erro ao conectar ao servidor.', 'err');
    console.warn('ADM reset gifts error:', e);
  }
}

/* ─── Resetar tudo da semana ─────────────────────────────── */

async function adminResetWeekAll() {
  if (!confirm('ATENÇÃO!\n\nIsso apagará o ranking E os presentes desta semana.\n\nTem certeza?')) return;
  const weekId = getWeekId(Date.now());
  showAdmSection('main');
  admFeedback('⏳ Resetando tudo...', 'ok');
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/admin_reset_week_all`, {
      method: 'POST',
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ p_admin_code: adminSession.password, p_week_id: weekId }),
    });
    const result = res.ok ? await res.json() : { success: false };
    if (result && result.success) {
      const lsGames = JSON.parse(localStorage.getItem(LS_KEY) || '[]');
      localStorage.setItem(LS_KEY, JSON.stringify(lsGames.filter(g => g.weekId !== weekId)));
      localStorage.removeItem(`${LS_GIFTS_KEY}_${weekId}`);
      admFeedback('✅ Ranking e presentes da semana apagados!');
      renderWelcomePodium();
    } else {
      admFeedback(result.error || 'Erro ao resetar.', 'err');
    }
  } catch (e) {
    admFeedback('Erro ao conectar ao servidor.', 'err');
    console.warn('ADM reset all error:', e);
  }
}

/* ─── Atualizar seletor de alunos dinamicamente ─────────── */

/**
 * Busca alunos ativos do Supabase e recarrega o seletor de alunos
 * na tela inicial, além de atualizar studentCodes e FRIENDS.
 */
async function refreshStudentSelector() {
  const rows = await fetchStudentsOnline();
  if (!rows) return; // manter dados locais

  const activeRows = rows.filter(r => r.active !== false);
  if (!activeRows.length) return;

  // Atualizar studentCodes em memória
  activeRows.forEach(r => { studentCodes[r.name] = r.access_code; });
  // Remover alunos desativados do studentCodes
  rows.filter(r => r.active === false).forEach(r => { delete studentCodes[r.name]; });

  // Atualizar FRIENDS (preservar color e initial se já existir)
  const COLORS = ['#FF6B6B','#4ECDC4','#45B7D1','#96CEB4','#FECA57','#FF9FF3','#54A0FF','#5F27CD','#00D2D3','#FF9F43','#1DD1A1'];
  FRIENDS.length = 0; // limpar array preservando a referência
  activeRows.forEach((r, i) => {
    FRIENDS.push({
      name:    r.name,
      initial: r.name.charAt(0),
      color:   COLORS[i % COLORS.length],
    });
  });

  // Re-renderizar a grade de alunos na tela inicial
  rebuildStudentGrid();
}

/** Reconstrói a grade de botões de seleção de aluno na tela inicial. */
function rebuildStudentGrid() {
  const grid = DOM.studentGrid;
  if (!grid) return;
  grid.innerHTML = '';

  // Resetar seleção corrente
  DOM.playerName.value = '';
  DOM.btnPlay.disabled = true;
  hideElem(DOM.secretCodeWrap);
  hideElem(DOM.welcomeGiftActions);

  FRIENDS.forEach(f => {
    const btn = document.createElement('button');
    btn.className   = 'student-btn';
    btn.type        = 'button';
    btn.textContent = f.name;
    btn.style.setProperty('--sc', f.color);
    btn.addEventListener('click', () => {
      document.querySelectorAll('.student-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      DOM.playerName.value = f.name;
      DOM.btnPlay.disabled = true;
      ensureAudio(); playClick();

      // Resetar estado do código ao trocar de aluno
      codeWrongAttempts = 0;
      if (DOM.secretCodeInput)  { DOM.secretCodeInput.value = ''; }
      if (DOM.secretCodeError)  { DOM.secretCodeError.style.display = 'none'; }
      if (DOM.secretCodeLabel)  {
        DOM.secretCodeLabel.textContent = `🔐 Olá, ${f.name}! Digite seu código secreto:`;
      }
      if (DOM.secretCodeWrap)   { DOM.secretCodeWrap.style.display = 'block'; }

      // Ocultar botões de presentes até novo código válido
      hideElem(DOM.welcomeGiftActions);
      hideElem(DOM.giftPreviewWrap);

      // Focar no campo de código automaticamente
      setTimeout(() => { if (DOM.secretCodeInput) DOM.secretCodeInput.focus(); }, 120);

      // Mostrar nível do aluno
      const levelPreviewEl = document.getElementById('student-level-preview');
      if (levelPreviewEl) {
        const localRanking = getLocalWeekRanking();
        const entry = localRanking.find(r => r.studentName === f.name);
        const pts   = entry ? entry.totalScore : 0;
        const lv    = getWeeklyLevel(pts);
        levelPreviewEl.innerHTML = pts > 0
          ? `${lv.emoji} <strong>${f.name}</strong> · ${lv.name} · ${pts} pts esta semana`
          : `${lv.emoji} <strong>${f.name}</strong> · ${lv.name} · Primeira vez? Bora jogar!`;
        levelPreviewEl.style.display = 'block';
      }
    });
    grid.appendChild(btn);
  });
}

/* ─── Event listeners ADM ────────────────────────────────── */

DOM.btnAdmin && DOM.btnAdmin.addEventListener('click', () => openAdminLogin());

DOM.btnAdmLoginCancel && DOM.btnAdmLoginCancel.addEventListener('click', () => {
  DOM.modalAdminLogin.classList.add('hidden');
});

DOM.btnAdmLoginSubmit && DOM.btnAdmLoginSubmit.addEventListener('click', () => {
  validateAdminAndOpenPanel();
});

DOM.admPassword && DOM.admPassword.addEventListener('keydown', e => {
  if (e.key === 'Enter') validateAdminAndOpenPanel();
});

DOM.btnAdmPanelClose && DOM.btnAdmPanelClose.addEventListener('click', () => {
  DOM.modalAdminPanel.classList.add('hidden');
  adminSession = { authenticated: false, password: '' }; // encerrar sessão ao fechar
});

DOM.btnAdmStudents    && DOM.btnAdmStudents.addEventListener('click',    () => renderStudentsList());
DOM.btnAdmAddStudent  && DOM.btnAdmAddStudent.addEventListener('click',  () => showAdmSection('add'));
DOM.btnAdmResetScores && DOM.btnAdmResetScores.addEventListener('click', () => adminResetWeekScores());
DOM.btnAdmResetGifts  && DOM.btnAdmResetGifts.addEventListener('click',  () => adminResetWeekGifts());
DOM.btnAdmResetAll    && DOM.btnAdmResetAll.addEventListener('click',    () => adminResetWeekAll());
DOM.btnAdmBackStudents && DOM.btnAdmBackStudents.addEventListener('click', () => showAdmSection('main'));
DOM.btnAdmBackAdd      && DOM.btnAdmBackAdd.addEventListener('click',     () => showAdmSection('main'));
DOM.btnAdmSaveStudent  && DOM.btnAdmSaveStudent.addEventListener('click', () => adminAddStudent());

// Fechar modal ADM clicando no fundo
DOM.modalAdminPanel && DOM.modalAdminPanel.addEventListener('click', e => {
  if (e.target === DOM.modalAdminPanel) {
    DOM.modalAdminPanel.classList.add('hidden');
    adminSession = { authenticated: false, password: '' };
  }
});

/* ── Presentes da turma – event listeners ───────────────── */
DOM.btnSendGiftWelcome  && DOM.btnSendGiftWelcome.addEventListener('click',  () => { ensureAudio(); playClick(); openSendGiftModal(); });
DOM.btnMyGiftsWelcome   && DOM.btnMyGiftsWelcome.addEventListener('click',   () => { ensureAudio(); playClick(); openReceivedGiftsModal(); });
DOM.btnSendGiftVictory  && DOM.btnSendGiftVictory.addEventListener('click',  () => { ensureAudio(); playClick(); openSendGiftModal(); });
DOM.btnCloseSendGift    && DOM.btnCloseSendGift.addEventListener('click',    () => { playClick(); DOM.modalSendGift.classList.add('hidden'); });
DOM.btnCloseReceivedGifts && DOM.btnCloseReceivedGifts.addEventListener('click', () => { playClick(); DOM.modalReceivedGifts.classList.add('hidden'); });

// Fechar modais de presente ao clicar no fundo
DOM.modalSendGift && DOM.modalSendGift.addEventListener('click', e => {
  if (e.target === DOM.modalSendGift) DOM.modalSendGift.classList.add('hidden');
});
DOM.modalReceivedGifts && DOM.modalReceivedGifts.addEventListener('click', e => {
  if (e.target === DOM.modalReceivedGifts) DOM.modalReceivedGifts.classList.add('hidden');
});
// Modal de notificação não fecha ao clicar no fundo (exige ação explícita)


/* ══════════════════════════════════════════════════════════
   INICIALIZAÇÃO
   ══════════════════════════════════════════════════════════ */

// Construir a grade inicial com dados locais (FRIENDS hardcoded)
rebuildStudentGrid();

showScreen('welcome');
renderWelcomePodium();

// Em paralelo, tentar carregar alunos do Supabase (tabela public.students)
// Se existir e retornar dados, recarrega a grade dinamicamente
(async () => {
  try {
    const rows = await fetchStudentsOnline();
    if (rows && rows.length > 0) {
      const COLORS = ['#FF6B6B','#4ECDC4','#45B7D1','#96CEB4','#FECA57','#FF9FF3',
                      '#54A0FF','#5F27CD','#00D2D3','#FF9F43','#1DD1A1'];
      const active = rows.filter(r => r.active !== false);
      if (active.length > 0) {
        // Atualizar FRIENDS e studentCodes a partir do Supabase
        FRIENDS.length = 0;
