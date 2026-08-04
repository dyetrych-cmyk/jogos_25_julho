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
  { cat:'Colors 🎨', emoji:'🌤️', q:'What color is the sky?',
    opts:['Blue','Red','Green','Yellow'], a:0,
    hint:'Look up on a sunny day!',
    teacherHint:'Pensa no oceano, no mar e no céu num dia de sol... é a mesma cor!' },
  { cat:'Colors 🎨', emoji:'🌿', q:'What color is grass?',
    opts:['Orange','Blue','Green','Pink'], a:2,
    hint:'Think of a field near the school.',
    teacherHint:'Olha pela janela para o campo perto da escola. Que cor você vê?' },
  { cat:'Colors 🎨', emoji:'☀️', q:'What color is the sun?',
    opts:['Purple','Yellow','White','Black'], a:1,
    hint:'It shines and gives us light!',
    teacherHint:'É a mesma cor de uma banana madura e de um girassol!' },
  { cat:'Colors 🎨', emoji:'🍎', q:'What color is a red apple?',
    opts:['Blue','Green','Red','Yellow'], a:2,
    hint:'This apple is the color of fire!',
    teacherHint:'É a cor do fogo, dos bombeiros e das rosas do jardim!' },
  { cat:'Colors 🎨', emoji:'🍊', q:'What color is an orange?',
    opts:['Orange','Purple','White','Blue'], a:0,
    hint:'Same name as the fruit!',
    teacherHint:'Curiosidade: o nome da cor é exatamente igual ao nome da fruta!' },
  { cat:'Colors 🎨', emoji:'🥛', q:'What color is milk?',
    opts:['Red','White','Blue','Yellow'], a:1,
    hint:'It is very light, like snow.',
    teacherHint:'É a cor da neve, das nuvens e do papel em branco!' },
  { cat:'Colors 🎨', emoji:'🍌', q:'What color is a banana?',
    opts:['Pink','White','Yellow','Green'], a:2,
    hint:'Bright like the sun.',
    teacherHint:'É a cor do ouro, dos pintinhos e do sol no céu!' },
  { cat:'Colors 🎨', emoji:'🍓', q:'What color is a strawberry?',
    opts:['Red','Orange','Purple','Blue'], a:0,
    hint:'Same color as fire trucks!',
    teacherHint:'Pensa nos carros de bombeiro, nas rosas e no coração... qual cor é essa?' },
  { cat:'Colors 🎨', emoji:'🍇', q:'What color is a grape?',
    opts:['Yellow','Red','Purple','White'], a:2,
    hint:'A mix of blue and red.',
    teacherHint:'Se você misturar azul com vermelho, que cor fica? É essa!' },
  { cat:'Colors 🎨', emoji:'🐸', q:'What color is a frog?',
    opts:['Red','Green','Blue','Yellow'], a:1,
    hint:'Same color as the grass it jumps on.',
    teacherHint:'É a cor das folhas, da grama e das árvores da fazenda!' },

  // ── NÚMEROS (10) ──────────────────────────────────────────
  { cat:'Numbers 🔢', emoji:'1️⃣', q:'How do you say "1" in English?',
    opts:['One','Two','Three','Four'], a:0,
    hint:'The very first number!',
    teacherHint:'Um, dois, três... qual é o PRIMEIRO número que você conta?' },
  { cat:'Numbers 🔢', emoji:'2️⃣', q:'How do you say "2" in English?',
    opts:['Five','Two','Seven','Nine'], a:1,
    hint:'Two eyes, two hands…',
    teacherHint:'Olha para os seus dois olhos, suas duas mãos... que número é esse?' },
  { cat:'Numbers 🔢', emoji:'3️⃣', q:'How do you say "3" in English?',
    opts:['One','Four','Three','Eight'], a:2,
    hint:'Triangle has this many sides.',
    teacherHint:'Um triângulo tem este número de lados: conta 1, 2, ___!' },
  { cat:'Numbers 🔢', emoji:'4️⃣', q:'How do you say "4" in English?',
    opts:['Four','Six','Two','Ten'], a:0,
    hint:'A car has this many wheels.',
    teacherHint:'Uma mesa tem este número de pernas: 1, 2, 3, ___!' },
  { cat:'Numbers 🔢', emoji:'5️⃣', q:'How do you say "5" in English?',
    opts:['Three','Eight','Five','One'], a:2,
    hint:'Count the fingers on one hand!',
    teacherHint:'Levanta uma mão só e conta os seus dedos! Quantos são?' },
  { cat:'Numbers 🔢', emoji:'6️⃣', q:'How do you say "6" in English?',
    opts:['Nine','Seven','Six','Two'], a:2,
    hint:'An insect has this many legs.',
    teacherHint:'Uma formiga tem este número de perninhas. Conta: 1,2,3,4,5,___!' },
  { cat:'Numbers 🔢', emoji:'7️⃣', q:'How do you say "7" in English?',
    opts:['Seven','Four','Two','Eight'], a:0,
    hint:'Days of the week = this number.',
    teacherHint:'Quantos dias tem uma semana? Dom, Seg, Ter, Qua, Qui, Sex, Sáb...' },
  { cat:'Numbers 🔢', emoji:'8️⃣', q:'How do you say "8" in English?',
    opts:['Three','Six','One','Eight'], a:3,
    hint:'A spider has this many legs.',
    teacherHint:'Uma aranha tem este número de pernas. Seis mais dois é igual a ___!' },
  { cat:'Numbers 🔢', emoji:'9️⃣', q:'How do you say "9" in English?',
    opts:['Five','Nine','Two','Four'], a:1,
    hint:'One less than ten.',
    teacherHint:'É o número que vem antes do 10: 7, 8, ___, 10!' },
  { cat:'Numbers 🔢', emoji:'🔟', q:'How do you say "10" in English?',
    opts:['Ten','Two','Six','Three'], a:0,
    hint:'All fingers on both hands!',
    teacherHint:'Conta TODOS os seus dedos das duas mãos juntas: 1 até ___!' },

  // ── FRUTAS (10) ───────────────────────────────────────────
  { cat:'Fruits 🍎', emoji:'🍎', q:'"Maçã" in English is…',
    opts:['Apple','Mango','Pear','Plum'], a:0,
    hint:'Famous fruit that Newton saw fall!',
    teacherHint:'É redonda, pode ser vermelha ou verde, e cai das macieiras!' },
  { cat:'Fruits 🍎', emoji:'🍌', q:'"Banana" in English is…',
    opts:['Cherry','Grape','Banana','Lemon'], a:2,
    hint:'It is yellow and monkeys love it!',
    teacherHint:'Amarela, curva, os macacos adoram. Parece igual em português!' },
  { cat:'Fruits 🍎', emoji:'🍊', q:'"Laranja" in English is…',
    opts:['Apple','Orange','Peach','Kiwi'], a:1,
    hint:'Its name is also a color!',
    teacherHint:'O nome desta fruta é igual ao nome de uma cor! (a cor laranja = orange)' },
  { cat:'Fruits 🍎', emoji:'🍓', q:'"Morango" in English is…',
    opts:['Strawberry','Blueberry','Cherry','Peach'], a:0,
    hint:'Red, small and sweet!',
    teacherHint:'Pequena, vermelha, com sementes por fora. Cresce rente ao chão!' },
  { cat:'Fruits 🍎', emoji:'🍇', q:'"Uva" in English is…',
    opts:['Melon','Grape','Plum','Mango'], a:1,
    hint:'Grows in clusters on a vine.',
    teacherHint:'Cresce em cachos na parreira. Pode ser roxa, verde ou vermelha!' },
  { cat:'Fruits 🍎', emoji:'🍍', q:'"Abacaxi" in English is…',
    opts:['Papaya','Coconut','Pineapple','Mango'], a:2,
    hint:'Spiky top, sweet inside!',
    teacherHint:'Tem uma coroa de folhas espetadas em cima e é muito doce por dentro!' },
  { cat:'Fruits 🍎', emoji:'🍉', q:'"Melancia" in English is…',
    opts:['Watermelon','Cantaloupe','Lemon','Lime'], a:0,
    hint:'Big, green outside and red inside!',
    teacherHint:'Enorme, verde por fora, vermelha por dentro, cheia de água!' },
  { cat:'Fruits 🍎', emoji:'🍋', q:'"Limão" in English is…',
    opts:['Apple','Banana','Lemon','Grape'], a:2,
    hint:'Very sour and yellow!',
    teacherHint:'Amarelo ou verde, muito azedo. Faz limonada! Rima com "demon".' },
  { cat:'Fruits 🍎', emoji:'🥭', q:'"Manga" in English is…',
    opts:['Melon','Peach','Plum','Mango'], a:3,
    hint:'Tropical and very sweet!',
    teacherHint:'Fruta tropical muito doce, laranja por dentro. Quase soa igual em português!' },
  { cat:'Fruits 🍎', emoji:'🍑', q:'"Pêssego" in English is…',
    opts:['Cherry','Peach','Plum','Apple'], a:1,
    hint:'Soft, round and pink-orange.',
    teacherHint:'Macia, redonda, cor de rosa-alaranjado. Cresce em regiões mais frias do RS!' },

  // ── TRANSPORTES (8) ───────────────────────────────────────
  { cat:'Transport 🚌', emoji:'🚌', q:'"Ônibus" in English is…',
    opts:['Car','Bus','Train','Boat'], a:1,
    hint:'It takes you to school every day!',
    teacherHint:'É grande, tem várias fileiras de bancos e te traz para a escola! Pensa bem...' },
  { cat:'Transport 🚌', emoji:'🚗', q:'"Carro" in English is…',
    opts:['Bike','Car','Truck','Bus'], a:1,
    hint:'Four wheels, a family uses it.',
    teacherHint:'Tem 4 rodas, motor, 4 ou 5 lugares. Sua família usa para passear!' },
  { cat:'Transport 🚌', emoji:'🚲', q:'"Bicicleta" in English is…',
    opts:['Motorcycle','Tractor','Bicycle','Bus'], a:2,
    hint:'Two wheels, you pedal it.',
    teacherHint:'Tem 2 rodas, você pedala com as pernas. Não tem motor!' },
  { cat:'Transport 🚌', emoji:'🚂', q:'"Trem" in English is…',
    opts:['Bus','Car','Train','Boat'], a:2,
    hint:'Runs on rails and whistles!',
    teacherHint:'Anda sobre trilhos de ferro, faz fila de vagões e apita!' },
  { cat:'Transport 🚌', emoji:'✈️', q:'"Avião" in English is…',
    opts:['Airplane','Helicopter','Rocket','Boat'], a:0,
    hint:'It flies very high in the sky.',
    teacherHint:'Voa bem alto no céu, mais alto que os pássaros e as nuvens!' },
  { cat:'Transport 🚌', emoji:'⛵', q:'"Barco" in English is…',
    opts:['Train','Bicycle','Car','Boat'], a:3,
    hint:'It floats on water.',
    teacherHint:'Flutua na água e leva pessoas pelos rios, lagos e oceanos!' },
  { cat:'Transport 🚌', emoji:'🚜', q:'"Trator" in English is…',
    opts:['Truck','Tractor','Bus','Car'], a:1,
    hint:'Farmers use it on the field!',
    teacherHint:'É usado na fazenda para arar a terra e plantar. Os agricultores adoram!' },
  { cat:'Transport 🚌', emoji:'🏍️', q:'"Moto" in English is…',
    opts:['Motorcycle','Bicycle','Scooter','Bus'], a:0,
    hint:'Two wheels, but has an engine.',
    teacherHint:'Tem 2 rodas como a bicicleta, mas tem motor. Faz barulho!' },

  // ── SALA DE AULA (10) ─────────────────────────────────────
  { cat:'Classroom 🏫', emoji:'📚', q:'"Livro" in English is…',
    opts:['Pencil','Book','Ruler','Pen'], a:1,
    hint:'You read stories inside it.',
    teacherHint:'Tem capa, folhas e páginas. Você lê histórias dentro dele!' },
  { cat:'Classroom 🏫', emoji:'✏️', q:'"Lápis" in English is…',
    opts:['Pencil','Eraser','Pen','Ruler'], a:0,
    hint:'You draw and write with it.',
    teacherHint:'É de madeira por fora, grafite por dentro. Serve para escrever e desenhar!' },
  { cat:'Classroom 🏫', emoji:'🧹', q:'"Borracha" in English is…',
    opts:['Glue','Ruler','Eraser','Scissors'], a:2,
    hint:'It removes pencil marks.',
    teacherHint:'Serve para apagar o que você escreveu a lápis. Ela "apaga" os erros!' },
  { cat:'Classroom 🏫', emoji:'📓', q:'"Caderno" in English is…',
    opts:['Book','Notebook','Folder','Album'], a:1,
    hint:'You write your lessons here.',
    teacherHint:'Tem muitas folhas pautadas onde você escreve a lição da professora!' },
  { cat:'Classroom 🏫', emoji:'🖊️', q:'"Caneta" in English is…',
    opts:['Pen','Pencil','Marker','Brush'], a:0,
    hint:'Uses ink, not graphite.',
    teacherHint:'Usa tinta (não grafite como o lápis). Difícil de apagar!' },
  { cat:'Classroom 🏫', emoji:'📏', q:'"Régua" in English is…',
    opts:['Scissors','Glue','Pencil','Ruler'], a:3,
    hint:'Straight tool used to draw lines.',
    teacherHint:'É reta, comprida e usada para traçar linhas direitinhas e medir!' },
  { cat:'Classroom 🏫', emoji:'✂️', q:'"Tesoura" in English is…',
    opts:['Glue','Scissors','Tape','Ruler'], a:1,
    hint:'Two sharp blades for cutting.',
    teacherHint:'Tem duas lâminas que se cruzam e servem para cortar papel e tecido!' },
  { cat:'Classroom 🏫', emoji:'🎒', q:'"Mochila" in English is…',
    opts:['Backpack','Bag','Box','Folder'], a:0,
    hint:'You carry it on your back to school.',
    teacherHint:'Você carrega nas costas, com alças nos dois ombros, cheia de livros!' },
  { cat:'Classroom 🏫', emoji:'👩‍🏫', q:'"Professora" in English is…',
    opts:['Student','Teacher','Principal','Doctor'], a:1,
    hint:'She teaches you every day!',
    teacherHint:'É a pessoa que ensina toda a turma, explica as lições e corrige os cadernos!' },
  { cat:'Classroom 🏫', emoji:'🪑', q:'"Cadeira" in English is…',
    opts:['Table','Door','Chair','Window'], a:2,
    hint:'You sit on it in class.',
    teacherHint:'É o móvel com pernas onde você SENTA para estudar na sala!' },

  // ── BRINQUEDOS (8) ────────────────────────────────────────
  { cat:'Toys 🎲', emoji:'⚽', q:'"Bola" in English is…',
    opts:['Bat','Ball','Rope','Kite'], a:1,
    hint:'Round – you kick it!',
    teacherHint:'É redonda, você chuta, arremessa ou quica no chão ao brincar!' },
  { cat:'Toys 🎲', emoji:'🪆', q:'"Boneca" in English is…',
    opts:['Robot','Car','Doll','Bear'], a:2,
    hint:'A toy that looks like a person.',
    teacherHint:'Brinquedo com formato humano, que parece uma menininha ou bebê!' },
  { cat:'Toys 🎲', emoji:'🪁', q:'"Pipa" in English is…',
    opts:['Ball','Rope','Kite','Puzzle'], a:2,
    hint:'You fly it in the wind!',
    teacherHint:'Você segura num fio e ela voa lá no alto quando tem vento!' },
  { cat:'Toys 🎲', emoji:'🧸', q:'"Urso de pelúcia" in English is…',
    opts:['Toy Car','Kite','Puppet','Teddy Bear'], a:3,
    hint:'A soft huggable bear!',
    teacherHint:'É macio, fofinho, em forma de urso. Todo mundo quer dar abraço nele!' },
  { cat:'Toys 🎲', emoji:'🧩', q:'"Quebra-cabeça" in English is…',
    opts:['Game','Puzzle','Doll','Ball'], a:1,
    hint:'You put the pieces together.',
    teacherHint:'Tem muitas peças que você encaixa para formar uma imagem completa!' },
  { cat:'Toys 🎲', emoji:'🪢', q:'"Corda de pular" in English is…',
    opts:['Jump Rope','Kite','Bat','Ball'], a:0,
    hint:'You jump over it!',
    teacherHint:'Duas crianças seguram as pontas e você pula por cima enquanto ela gira!' },
  { cat:'Toys 🎲', emoji:'🚗', q:'"Carrinho de brinquedo" in English is…',
    opts:['Toy Car','Doll','Kite','Ball'], a:0,
    hint:'A small car you play with.',
    teacherHint:'É uma versão pequenininha de um veículo. Você faz "vrummm" com ele!' },
  { cat:'Toys 🎲', emoji:'🎮', q:'"Brinquedo" in English is…',
    opts:['School','Toy','Play','Game'], a:1,
    hint:'Something fun to play with!',
    teacherHint:'Qualquer objeto com que você se diverte e brinca nas horas livres!' },

  // ── AÇÕES (10) ────────────────────────────────────────────
  { cat:'Actions 🏃', emoji:'🏃', q:'"Correr" in English is…',
    opts:['Jump','Walk','Run','Swim'], a:2,
    hint:'Move very fast on your feet!',
    teacherHint:'É mover as pernas muito rapidamente – mais rápido que andar!' },
  { cat:'Actions 🏃', emoji:'🤸', q:'"Pular" in English is…',
    opts:['Run','Jump','Fly','Swim'], a:1,
    hint:'Leave the ground with both feet!',
    teacherHint:'É sair do chão com força, como um canguru ou uma rã!' },
  { cat:'Actions 🏃', emoji:'🎵', q:'"Cantar" in English is…',
    opts:['Dance','Draw','Sing','Write'], a:2,
    hint:'Make music with your voice.',
    teacherHint:'É usar a voz para fazer música, com melodia e palavras!' },
  { cat:'Actions 🏃', emoji:'💃', q:'"Dançar" in English is…',
    opts:['Sing','Dance','Run','Jump'], a:1,
    hint:'Move your body to music.',
    teacherHint:'É mover o corpo seguindo o ritmo e a batida da música!' },
  { cat:'Actions 🏃', emoji:'📖', q:'"Ler" in English is…',
    opts:['Write','Draw','Read','Paint'], a:2,
    hint:'What you do with a book.',
    teacherHint:'É olhar para as letras e entender o que está escrito no livro!' },
  { cat:'Actions 🏃', emoji:'✍️', q:'"Escrever" in English is…',
    opts:['Read','Draw','Paint','Write'], a:3,
    hint:'You put letters on paper.',
    teacherHint:'É fazer letras, palavras e frases no papel com caneta ou lápis!' },
  { cat:'Actions 🏃', emoji:'🎉', q:'"Brincar" in English is…',
    opts:['Eat','Sleep','Play','Run'], a:2,
    hint:'What you do at recess!',
    teacherHint:'É se divertir com brinquedos ou amigos. Você faz isso no recreio!' },
  { cat:'Actions 🏃', emoji:'🍽️', q:'"Comer" in English is…',
    opts:['Drink','Eat','Sleep','Run'], a:1,
    hint:'Food goes in your mouth.',
    teacherHint:'É pegar o alimento, mastigar e engolir. O almoço é quando você ___!' },
  { cat:'Actions 🏃', emoji:'💧', q:'"Beber" in English is…',
    opts:['Eat','Play','Drink','Run'], a:2,
    hint:'Water goes in your mouth.',
    teacherHint:'É colocar líquido na boca e engolir. Você ___ água quando está com sede!' },
  { cat:'Actions 🏃', emoji:'😴', q:'"Dormir" in English is…',
    opts:['Eat','Run','Play','Sleep'], a:3,
    hint:'Close your eyes and rest.',
    teacherHint:'É fechar os olhos, deitar na cama e descansar à noite!' },

  // ── ANIMAIS DA FAZENDA (9) ────────────────────────────────
  { cat:'Animals 🐄', emoji:'🐶', q:'"Cachorro" in English is…',
    opts:['Cat','Dog','Bird','Fish'], a:1,
    hint:"Man's best friend!",
    teacherHint:'É o animal de estimação que late, abana o rabo e é muito fiel!' },
  { cat:'Animals 🐄', emoji:'🐱', q:'"Gato" in English is…',
    opts:['Dog','Rabbit','Cat','Horse'], a:2,
    hint:'It says "meow"!',
    teacherHint:'É o animal que mia, ronrona e adora dormir no sol!' },
  { cat:'Animals 🐄', emoji:'🐄', q:'"Vaca" in English is…',
    opts:['Pig','Sheep','Horse','Cow'], a:3,
    hint:'It gives us milk!',
    teacherHint:'É o animal da fazenda que dá leite e faz "muuuu"!' },
  { cat:'Animals 🐄', emoji:'🐴', q:'"Cavalo" in English is…',
    opts:['Horse','Donkey','Cow','Pig'], a:0,
    hint:'You can ride it on the farm.',
    teacherHint:'É o animal grande que você pode montar e cavalgar pela fazenda!' },
  { cat:'Animals 🐄', emoji:'🐔', q:'"Galinha" in English is…',
    opts:['Duck','Turkey','Chicken','Goose'], a:2,
    hint:'It lays eggs and says "cluck"!',
    teacherHint:'Ela bota ovos, vive no galinheiro e faz "cocoricó"!' },
  { cat:'Animals 🐄', emoji:'🐟', q:'"Peixe" in English is…',
    opts:['Bird','Fish','Snake','Frog'], a:1,
    hint:'It lives in water and swims.',
    teacherHint:'Vive dentro da água, tem barbatanas e escamas, e nada!' },
  { cat:'Animals 🐄', emoji:'🐦', q:'"Pássaro" in English is…',
    opts:['Bird','Fish','Bug','Worm'], a:0,
    hint:'It has wings and can fly!',
    teacherHint:'Tem asas, bico e penas. A maioria sabe voar alto!' },
  { cat:'Animals 🐄', emoji:'🐰', q:'"Coelho" in English is…',
    opts:['Mouse','Hamster','Rabbit','Pig'], a:2,
    hint:'Long ears, hops around!',
    teacherHint:'Tem orelhas longas, fica pulando e adora cenoura!' },
  { cat:'Animals 🐄', emoji:'🐷', q:'"Porco" in English is…',
    opts:['Cow','Pig','Goat','Sheep'], a:1,
    hint:'It says "oink oink"!',
    teacherHint:'Animal rosado da fazenda que vive na pocilga e diz "oinc oinc"!' },

  // ── CUMPRIMENTOS E BÁSICO (10) ────────────────────────────
  { cat:'Greetings 👋', emoji:'👋', q:'"Olá" in English is…',
    opts:['Bye','Hello','Thanks','Sorry'], a:1,
    hint:'What you say when you meet someone!',
    teacherHint:'É o cumprimento que você usa ao ENCONTRAR alguém. Igual ao "oi" em inglês!' },
  { cat:'Greetings 👋', emoji:'👋', q:'"Tchau" in English is…',
    opts:['Hello','Yes','Goodbye','No'], a:2,
    hint:'What you say when you leave.',
    teacherHint:'É o que você diz ao IR EMBORA, ao final do dia na escola!' },
  { cat:'Greetings 👋', emoji:'✅', q:'"Sim" in English is…',
    opts:['No','Maybe','Yes','Please'], a:2,
    hint:'Nod your head up and down.',
    teacherHint:'Quando você CONCORDA, balança a cabeça para cima e para baixo. Qual palavra é essa?' },
  { cat:'Greetings 👋', emoji:'❌', q:'"Não" in English is…',
    opts:['No','Yes','Please','Thanks'], a:0,
    hint:'Shake your head side to side.',
    teacherHint:'Quando você NÃO QUER algo, balança a cabeça para os lados. Qual palavra é essa?' },
  { cat:'Greetings 👋', emoji:'🙏', q:'"Por favor" in English is…',
    opts:['Thank you','Sorry','Please','Hello'], a:2,
    hint:'You say this when you ask for something.',
    teacherHint:'É a palavra de educação que usamos ao PEDIR algo. "Pode me ajudar, ___?"' },
  { cat:'Greetings 👋', emoji:'😊', q:'"Obrigado/a" in English is…',
    opts:['Please','Thank you','Sorry','Hi'], a:1,
    hint:'You say this after receiving help.',
    teacherHint:'É o que você fala DEPOIS de receber um presente ou ajuda de alguém!' },
  { cat:'Greetings 👋', emoji:'☀️', q:'"Bom dia" in English is…',
    opts:['Good night','Good afternoon','Good morning','Goodbye'], a:2,
    hint:'You say this in the morning!',
    teacherHint:'É o cumprimento de MANHÃ, antes do almoço, quando você chega na escola!' },
  { cat:'Greetings 👋', emoji:'🌅', q:'"Boa tarde" in English is…',
    opts:['Good morning','Good afternoon','Good night','Hello'], a:1,
    hint:'After lunchtime greeting.',
    teacherHint:'É o cumprimento depois do almoço, no período da TARDE!' },
  { cat:'Greetings 👋', emoji:'🌙', q:'"Boa noite" in English is…',
    opts:['Good morning','Good day','Good night','Goodbye'], a:2,
    hint:'You say this before going to bed.',
    teacherHint:'É o cumprimento antes de dormir, quando o céu já está escuro e cheio de estrelas!' },
  { cat:'Greetings 👋', emoji:'🗣️', q:"How do you ask someone's name?",
    opts:['What is your name?','How old are you?','Where do you live?','How are you?'], a:0,
    hint:'Qual é o seu nome?',
    teacherHint:'Em português é "Qual é o seu nome?". Começa com "What is your ___?"' },
];

/* ── Amigos / paradas (11 personagens) ──────────────────── */
const FRIENDS = [
  { name:'Thomas',    initial:'T', color:'#1565C0', score:10  },
  { name:'Giovana',   initial:'G', color:'#AD1457', score:19  },
  { name:'Manuella',  initial:'M', color:'#6A1B9A', score:28  },
  { name:'Nicolas',   initial:'N', color:'#2E7D32', score:37  },
  { name:'Bianca',    initial:'B', color:'#BF360C', score:46  },
  { name:'Ester',     initial:'E', color:'#00695C', score:55  },
  { name:'Weslay',    initial:'W', color:'#0277BD', score:64  },
  { name:'Gabriella', initial:'G', color:'#558B2F', score:73  },
  { name:'Amanda',    initial:'A', color:'#EF6C00', score:82  },
  { name:'Bernardo',  initial:'B', color:'#283593', score:91  },
  { name:'Pedro',     initial:'P', color:'#4E342E', score:100 },
];

/* ── Estado do jogo ──────────────────────────────────────── */
const state = {
  playerName:      '',
  score:           0,
  correct:         0,
  wrong:           0,
  total:           0,
  helpFriend:      3,
  helpHint:        2,
  helpTeacher:     1,
  boardedCount:    0,
  currentQ:        null,
  pool:            [],
  answered:        false,
  soundEnabled:    true,
  audioCtx:        null,
};

const WRONG_PENALTY = 3;

/* ── Referências DOM ─────────────────────────────────────── */
const $ = id => document.getElementById(id);

const DOM = {
  screens: {
    welcome: $('screen-welcome'),
    game:    $('screen-game'),
    victory: $('screen-victory'),
  },
  playerName:      $('player-name'),
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
  modalBoarded:    $('modal-boarded'),
  mbAvatar:        $('mb-avatar'),
  mbTitle:         $('mb-title'),
  mbMsg:           $('mb-msg'),
  btnContinue:     $('btn-continue'),
  modalFriendHelp: $('modal-friend-help'),
  friendHintsRow:  $('friend-hints-row'),
  btnCloseFH:      $('btn-close-fh'),
  questionCard:    $('question-card'),
  scoreDelta:      $('score-delta'),
  // victory
  certName:        $('cert-name'),
  certPts:         $('cert-pts'),
  certCorrect:     $('cert-correct'),
  certStars:       $('cert-stars'),
  certDate:        $('cert-date'),
  confettiLayer:   $('confetti-layer'),
  btnReplay:       $('btn-replay'),
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

DOM.btnPlay.addEventListener('click', () => { ensureAudio(); playClick(); startGame(); });
DOM.playerName.addEventListener('keydown', e => { if (e.key === 'Enter') { ensureAudio(); startGame(); } });

function startGame() {
  const name          = DOM.playerName.value.trim() || 'Aluno(a)';
  state.playerName    = name;
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

/* ══════════════════════════════════════════════════════════
   LÓGICA DAS PERGUNTAS
   ══════════════════════════════════════════════════════════ */

function nextQuestion() {
  if (state.pool.length === 0) state.pool = shuffle([...QUESTIONS]);
  state.currentQ = state.pool.pop();
  state.answered = false;

  DOM.qCatBadge.textContent   = state.currentQ.cat;
  DOM.qNum.textContent        = `Pergunta ${state.total + 1}`;
  DOM.qEmoji.textContent      = state.currentQ.emoji;
  DOM.qText.textContent       = state.currentQ.q;
  DOM.feedbackMsg.textContent = '';
  DOM.feedbackMsg.className   = '';
  DOM.questionCard.className  = 'card-neutral';

  DOM.opts.forEach((btn, i) => {
    btn.textContent = state.currentQ.opts[i];
    btn.className   = 'opt';
    btn.disabled    = false;
  });

  // reabilitar ajudas se não foram usadas
  updateHelpCounts();
  updateFriendPopup();
}

function selectAnswer(idx) {
  if (state.answered) return;
  ensureAudio();
  state.answered = true;
  state.total++;

  const q       = state.currentQ;
  const correct = (idx === q.a);

  DOM.opts.forEach(b => b.disabled = true);

  if (correct) {
    DOM.opts[idx].classList.add('correct');
    state.correct++;
    playCorrect();

    DOM.feedbackMsg.innerHTML = `✅ <strong>Certo!</strong> +10 pontos! 🎉`;
    DOM.feedbackMsg.className = 'ok';
    DOM.questionCard.classList.add('card-correct');
    showScoreDelta('+10', true);
    updateScoreUI(state.score + 10, '+10');

  } else {
    DOM.opts[idx].classList.add('wrong');
    DOM.opts[q.a].classList.add('correct');
    state.wrong++;
    playWrong();

    const penalty    = Math.min(WRONG_PENALTY, state.score);
    const newScore   = state.score - penalty;
    const penaltyStr = penalty > 0 ? `-${penalty} pontos` : 'sem pontos';
    DOM.feedbackMsg.innerHTML = `❌ <strong>Ops!</strong> ${penaltyStr}. A resposta certa era: <em>${q.opts[q.a]}</em>`;
    DOM.feedbackMsg.className = 'bad';
    DOM.questionCard.classList.add('card-wrong');
    if (penalty > 0) showScoreDelta(`-${penalty}`, false);
    updateScoreUI(newScore, penalty > 0 ? `-${penalty}` : null);
  }

  setTimeout(advanceAfterAnswer, correct ? 1400 : 2200);
}

window.selectAnswer = selectAnswer;

function advanceAfterAnswer() {
  DOM.questionCard.classList.remove('card-correct', 'card-wrong', 'card-neutral');
  if (state.score >= 100) {
    showVictory();
  } else {
    nextQuestion();
  }
}

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
  const f    = FRIENDS[idx];
  const chip = document.getElementById(`chip-${idx}`);
  if (chip) chip.classList.add('boarded');
  state.boardedCount++;
  playFriendBoarded();

  DOM.mbAvatar.textContent = getBigEmoji(f.name);
  DOM.mbTitle.textContent  = `${f.name} subiu no ônibus! 🚌`;
  DOM.mbMsg.textContent    = `Muito bem! ${f.name} diz: "Let's go to school!" — Você tem ${state.score} pontos!`;
  DOM.modalBoarded.classList.remove('hidden');
}

DOM.btnContinue.addEventListener('click', () => {
  playClick();
  DOM.modalBoarded.classList.add('hidden');
  if (state.score >= 100) showVictory();
  else nextQuestion();
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
    setFeedback(`📝 Dica: ${q.hint}`, '');

  } else if (type === 'teacher') {
    if (state.helpTeacher <= 0) return;
    state.helpTeacher--;
    DOM.hcTeacher.textContent = state.helpTeacher;
    if (state.helpTeacher === 0) DOM.hBtnTeacher.disabled = true;
    setFeedback(`📞 Professora diz: "${q.teacherHint}"`, 'teacher-hint');
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

  // Preencher modal
  DOM.friendHintsRow.innerHTML = '';
  chosen.forEach((friend, i) => {
    const wrap   = document.createElement('div');
    wrap.className = 'friend-hint';

    const bubble = document.createElement('div');
    bubble.className = 'fh-bubble';
    bubble.textContent = suggestions[i];

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

  DOM.modalFriendHelp.classList.remove('hidden');
}

DOM.btnCloseFH.addEventListener('click', () => {
  playClick();
  DOM.modalFriendHelp.classList.add('hidden');
});

/* ── Helpers de feedback ─────────────────────────────────── */
function setFeedback(msg, cls) {
  DOM.feedbackMsg.innerHTML  = msg;
  DOM.feedbackMsg.className  = cls || '';
}

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

function showVictory() {
  playVictory();
  spawnConfetti();
  DOM.certName.textContent    = state.playerName;
  DOM.certPts.textContent     = state.score;
  DOM.certCorrect.textContent = state.correct;
  DOM.certStars.textContent   = starsForScore(state.correct, state.total);
  DOM.certDate.textContent    = new Date().toLocaleDateString('pt-BR', {
    day:'2-digit', month:'long', year:'numeric',
  });
  showScreen('victory');
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
});

/* ══════════════════════════════════════════════════════════
   SOM ON/OFF
   ══════════════════════════════════════════════════════════ */
DOM.btnSound.addEventListener('click', () => {
  ensureAudio();
  state.soundEnabled = !state.soundEnabled;
  DOM.btnSound.textContent = state.soundEnabled ? '🔊' : '🔇';
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
   INICIALIZAÇÃO
   ══════════════════════════════════════════════════════════ */
showScreen('welcome');
DOM.playerName.focus();
