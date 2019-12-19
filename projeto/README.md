# Installation



run cmd
cd project
npm install


And start the program

npm start


access at
http://localhost:3000/

username: marcelorosa1978@gmail.com
passwd: 123


# Rules




FRONT END 
Requisitos de front-end: 
• Tela de cadastro de um novo revendedor(a) solicitando Nome completo, CPF, email e senha; OK =>Reseller
• Tela de login para informar e-mail e senha; OK
• Tela de cadastro de compras onde deverá ser informado o código, valor e data; OK =>Cadastro Purchase
• Tela de listagem das compras cadastradas exibindo as informações de código da compra, valor, data, % de cashback aplicado, valor do cashback e status do cadastro; OK =>Lista Purchase
• O status do cadastro poderá ser “Em validação”, “Reprovado” e “Aprovado”; OK
• Ter opções para editar e excluir uma compra caso ele esteja “Em Validação”; OK=>Disabled button
• Tela para exibir o valor de cashback acumulado até o momento, esta informação virá de uma das APIs do boticário, que é um outro sistema que agrupa e consolida todas as vendas do revendedor(a); OK=>BUTTON COM SERVICO DE CONSULTA
• Tela de informações do sistema, nesta tela terá nome, e-mail e outros dados do desenvolvedor, no caso seus dados 😉 OK=> Menu About




Requisitos técnicos obrigatórios: 
• Utilize um destes framework: React, Angular ou Vue.js OK=>Angular
• Você pode utilizar um framework de UI. Exemplo: bootstrap, material-ui, bulma, etc OK=>BOOTSTRAP 4
 
Diferenciais (opcional): 
• Fazer a magia do HTML/CSS puro não utilizando frameworks com descrito acima OK=> COnstrução de telas em HTML mas sem  muito css. 
• Interface responsiva OK=>Menu resposivo, telas responsivas com limitação pelo tamanho da grid.
• Testes de Interface (80%)OK=>Purchase-controller-test


BACK-END 
Requisitos back-end: 
• Rota para cadastrar um novo revendedor(a) exigindo no mínimo nome completo, CPF, email e senha; OK
• Rota para validar um login de um revendedor(a); OK=>A rota de login é chamada pelo login-controller
• Rota para cadastrar uma nova compra exigindo no mínimo código, valor, data e CPF do revendedor(a). Todos os cadastros são salvos com o status “Em validação” exceto quando o CPF do revendedor(a) for 153.509.460-56, neste caso o status é salvo como “Aprovado”; 
• Rota para editar uma compra, permitir editar apenas se o status da venda for “Em validação”; OK=>Foram criadas rotas de edição  Exite validação no button para a regra de negócio. 
• Rota para excluir uma compra, permitir exclusão apenas se o status da venda for “Em validação”; OK=>Foram criadas rotas de exclusão no backend. Exite validação no button para a regra de negócio.
• Rota para listar as compras cadastradas retornando código, valor, data, % de cashback aplicado para esta compra, valor de cashback para esta compra e status; OK
• Rota para exibir o acumulado de cashback até o momento, essa rota irá consumir essa informação de uma API externa disponibilizada pelo Boticário. OK=>button na tela.
API externa GET https://mdaqk8ek5j.execute-api.us-east1.amazonaws.com/v1/cashback?cpf=12312312323 
headers { token: 'ZXPURQOARHiMc6Y0flhRC1LVlZQVFRnm' }  
OK

Premissas do caso de uso:  
• Os critérios de bonificação são: o Para até 1.000 reais em compras, o revendedor(a) receberá 10% de cashback do valor vendido no período; o Entre 1.000 e 1.500 reais em compras, o revendedor(a) receberá 15% de cashback do valor vendido no período; OK
• Acima de 1.500 reais em compras, o revendedor(a) receberá 20% de cashback do valor vendido no período.  OK
Requisitos técnicos obrigatórios: 
• Utilize umas destas linguagens: Nodejs, Python ou .NET Core; • Banco de dados relacional ou não relacional; OK=> Nodejs e BD MySQL
 
Diferenciais (opcional): 
• Testes unitários; NOK
• Testes de integração; OK
• Autenticação JWT; OK=>JWT envio no login e captura na lista de Resellers.




