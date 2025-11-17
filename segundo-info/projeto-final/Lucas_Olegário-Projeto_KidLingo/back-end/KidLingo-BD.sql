
-- Execute este script para garantir todas as 12 lições e 12 atividades.

CREATE DATABASE IF NOT EXISTS KidLingo;
USE KidLingo;

-- TABELA LICOES: Conteúdo Completo (12 Lições no Total)

DROP DATABASE kidlingo;
DROP TABLE IF EXISTS atividades;
DROP TABLE IF EXISTS licoes;
DROP TABLE IF EXISTS conquistas;
DROP TABLE IF EXISTS progresso;


-- Recria as tabelas (opcional, mas recomendado se for rodar o script do zero)
CREATE TABLE IF NOT EXISTS licoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  idioma VARCHAR(50) NOT NULL,
  titulo VARCHAR(100) NOT NULL,
  conteudo TEXT,
  exemplo TEXT,
  imagem VARCHAR(255)
);

-- Lições (Inglês) - 4 Lições
INSERT INTO licoes (idioma, titulo, conteudo, exemplo, imagem)
VALUES
(
  'Inglês', 
  'Saudações', 
  'Aprenda a dizer olá, tchau, sim e não em inglês.', 
  'Hello (Olá), No (Não), Yes (Sim), Goodbye (Tchau)', 
  'img/hello.png'
),
(
  'Inglês', 
  'Números (1-10)', 
  'Aprenda a contar de um a dez e as pronúncias corretas.', 
  'One, two, three, four, five...', 
  'img/numbers.png'
),
(
  'Inglês', 
  'Animais da Fazenda', 
  'Aprenda os nomes dos animais e seus sons.', 
  'Dog (cachorro), Cat (Gato), Cow (Vaca), Pig (Porco).', 
  'img/animals.png'
),

(
  'Inglês', 
  'Minha Casa', 
  'Vocabulário sobre cômodos e objetos da casa.', 
  'Bedroom (Quarto), Kitchen (Cozinha), Table (Mesa), Chair (Cadeira).', 
  'img/house.png'
);

-- Lições (Espanhol) - 4 Lições
INSERT INTO licoes (idioma, titulo, conteudo, exemplo, imagem)
VALUES
(
  'Espanhol', 
  'Cores Básicas', 
  'Aprenda as cores em espanhol.', 
  'Rojo (Vermelho), Azul (Azul), Amarilo (Amarelo), Verde (Verde)', 
  'img/cores.png'
),
(
  'Espanhol', 
  'Minha Família', 
  'Vocabulário básico para apresentar seus familiares.', 
  'Madre (Mãe), Padre (Pai), Hermano (Irmão), Hermana (Irmã).', 
  'img/familia.png'
),
(
  'Espanhol', 
  'Frutas e Vegetais', 
  'Vocabulário básico de alimentos saudáveis.', 
  'Manzana (Maçã), Plátano (Banana), Zanahoria (Cenoura), Fresca (Morango).', 
  'img/fruits.png'
),
(
  'Espanhol', 
  'Roupas', 
  'Nomes das roupas que vestimos no dia a dia.', 
  'Camisa (Camisa), Pantalón (Calça), Zapato (Sapato), Vestido (Vestido).', 
  'img/roupa.png'
);

-- Lições (Francês) - 4 Lições
INSERT INTO licoes (idioma, titulo, conteudo, exemplo, imagem)
VALUES
(
  'Francês', 
  'Saudações Básicas', 
  'Aprenda a dizer olá, tchau, bom dia e por favor em francês.', 
  'Bonjour (Olá), Au revoir (Tchau), Merci (Obrigado), Sil vous plait (Por favor).', 
  'img/bonjour.png'
), 
(
  'Francês', 
  'Comidas Favoritas', 
  'Vocabulário básico de alimentos e bebidas.', 
  'Pain (Pão), Fromage (Queijo), Eau (Água), Lait (Leite).', 
  'img/comida.png'
),
(
  'Francês', 
  'Família', 
  'Como apresentar seus parentes em francês.', 
  'Mère (Mãe), Père (Pai), Frère (Irmão), Sœur (Irmã).', 
  'img/familia_fr.png'
),
(
  'Francês', 
  'Animais', 
  'Aprenda o nomes de alguns animais de estimação.', 
  'Chien (Cachorro), Chat (Gato), Oiseau (Pássaro), Poisson (Peixe).', 
  'img/animais_fr.png'
);

-- TABELA ATIVIDADES: Implementação do Quiz (AGORA 12 Atividades)

CREATE TABLE IF NOT EXISTS atividades (
  id INT AUTO_INCREMENT PRIMARY KEY,
  licao_id INT NOT NULL, 
  tipo VARCHAR(50) NOT NULL,
  pergunta TEXT,
  dados JSON, 
  FOREIGN KEY (licao_id) REFERENCES licoes(id)
);

-- Inserir Atividades Originais (IDs de Lição são sequenciais: 1 a 12)
INSERT INTO atividades (licao_id, tipo, pergunta, dados)
VALUES
-- INGLÊS (Lições 1, 3, 4)
(1, 'pareamento', 'Ligue a palavra em inglês à sua tradução em português.',
  '[{"Hello": "Olá"}, {"Goodbye": "Tchau"}, {"Yes": "Sim"}, {"No": "Não"}]'), 
(3, 'pareamento', 'Combine o animal em inglês com seu nome em português.',
  '[{"Dog": "Cachorro"}, {"Cat": "Gato"}, {"Cow": "Vaca"}, {"Pig": "Porco"}]'),
(4, 'pareamento', 'Ligue o objeto da casa em inglês à tradução.',
  '[{"Table": "Mesa"}, {"Chair": "Cadeira"}, {"Bed": "Cama"}, {"Door": "Porta"}]'),
  
-- ESPANHOL (Lições 5, 7, 8)
(5, 'pareamento', 'Ligue a cor em espanhol à sua tradução em português.',
  '[{"Rojo": "Vermelho"}, {"Azul": "Azul"}, {"Amarillo": "Amarelo"}, {"Verde": "Verde"}]'),
(7, 'pareamento', 'Ligue a fruta/vegetal em espanhol à tradução.',
  '[{"Manzana": "Maçã"}, {"Plátano": "Banana"}, {"Zanahoria": "Cenoura"}, {"Fresa": "Morango"}]'),
(8, 'pareamento', 'Combine a roupa em espanhol com a tradução.',
  '[{"Camisa": "Camisa"}, {"Pantalón": "Calça"}, {"Zapato": "Sapato"}, {"Vestido": "Vestido"}]'),
  
-- FRANCÊS (Lições 9, 11, 12)
(9, 'pareamento', 'Ligue a saudação em francês à sua tradução.',
  '[{"Bonjour": "Olá"}, {"Au revoir": "Tchau"}, {"Merci": "Obrigado"}, {"S\'il vous plaît": "Por favor"}]'),
(11, 'pareamento', 'Ligue o membro da família em francês à tradução.',
  '[{"Mère": "Mãe"}, {"Père": "Pai"}, {"Frère": "Irmão"}, {"Sœur": "Irmã"}]'),
(12, 'pareamento', 'Combine o animal em francês com seu nome em português.',
  '[{"Chien": "Cachorro"}, {"Chat": "Gato"}, {"Oiseau": "Pássaro"}, {"Poisson": "Peixe"}]'); 

-- CORREÇÃO: Adicionando atividades faltantes para as Lições 2 de cada idioma (IDs 2, 6, 10)

-- INGLÊS (Lição ID 2: Números 1-10)
INSERT INTO atividades (licao_id, tipo, pergunta, dados)
VALUES
(2, 'pareamento', 'Ligue o número em inglês ao algarismo.',
  '[{"One": "1"}, {"Two": "2"}, {"Three": "3"}, {"Four": "4"}]');
  
-- ESPANHOL (Lição ID 6: Minha Família)
INSERT INTO atividades (licao_id, tipo, pergunta, dados)
VALUES
(6, 'pareamento', 'Ligue o membro da família em espanhol à tradução.',
  '[{"Madre": "Mãe"}, {"Padre": "Pai"}, {"Hermano": "Irmão"}, {"Hermana": "Irmã"}]');
  
-- FRANCÊS (Lição ID 10: Comidas Favoritas)
INSERT INTO atividades (licao_id, tipo, pergunta, dados)
VALUES
(10, 'pareamento', 'Ligue a palavra em francês à sua tradução em português.',
  '[{"Pain": "Pão"}, {"Fromage": "Queijo"}, {"Eau": "Água"}, {"Lait": "Leite"}]');



-- TABELAS DE GAMIFICAÇÃO (MANTIDAS)


-- 1. Tabela para gerenciar conquistas disponíveis
CREATE TABLE IF NOT EXISTS conquistas (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao VARCHAR(255),
  requisito INT NOT NULL, 
  tipo VARCHAR(50) NOT NULL -- 'licoes', 'pontos', 'tempo'
);

-- 2. Tabela para rastrear o progresso do usuário 
CREATE TABLE IF NOT EXISTS progresso (
  id INT AUTO_INCREMENT PRIMARY KEY,
  usuario_simulado_id INT UNIQUE DEFAULT 1, 
  tempo_total_seg INT DEFAULT 0, -- Tempo total de estudo em segundos
  pontos_total INT DEFAULT 0,
  licoes_completadas INT DEFAULT 0, 
  conquistas_desbloqueadas JSON
);

-- 3. Inserir definições de conquistas
INSERT INTO conquistas (nome, descricao, requisito, tipo) VALUES
('Primeiros Passos', 'Complete 1 lição.', 1, 'licoes'),
('Mestre das Cores', 'Complete 4 lições no total.', 4, 'licoes'),
('Novato Pontuador', 'Alcance 50 pontos.', 50, 'pontos'),
('Aprendiz Veloz', 'Acumule 10 minutos (600s) de estudo.', 600, 'tempo');

-- 4. Inserir um registro inicial de progresso 
INSERT INTO progresso (usuario_simulado_id, tempo_total_seg, pontos_total, licoes_completadas, conquistas_desbloqueadas) 
VALUES (1, 0, 0, 0, '{}');