const express = require('express');

const app = express();
const PORT= 3000;

// Dados em memória
let imoveis = [
    { id: 1, titulo: 'Apartamento em São Paulo', descricao: '2 quartos, 1 banheiro', preco: 300000, localizacao: 'São Paulo', tipo: 'Apartamento'},
    {id: 2, titulo: 'Casa em Curitiba', descricao: '3 quartos, 2 banheiros', preco: 500000, localizacao: 'Curitiba', tipo: 'Casa'}
];

// Middleware para ´permitir o uso de da JSON para
app.use(express.json());
//Rotas padrão
app.get('/', (req, res) => {
    res.send('API de Imoboliária');
});
//Obter todos os imóveis
app.get('/api/imoveis', (req, res) => {
    res.json(imoveis);

});
//Criar um novo imóvel
app.post('/api/imoveis', (req, res) => {
    const { titulo, descricao, preco, localizacao, tipo } = req.body;
    const novoImovel = { id: imoveis.length + 1, titulo, descricao, preco, localizacao, tipo };
    imoveis.push(novoImovel);
    res.status(201).json(novoImovel);
});

//Obter um imóvel por ID
app.get('/api/imoveis/:id', (req, res) => {
    const imovel = imoveis.find(i => i.id === parseInt(req.params.id));
    if (!imovel) return res.status(404).json({ message: 'Imovel não encontrado' });
    res.json(imovel);
});

//Atualizar um imóvel
app.put('/api/imoveis/:id', (req, res) => {
    const  imovel = imoveis.find(i => i.id === parseInt(req.params.id));
    if (!imovel) return res.status(404).json({ message: 'Imovel não encontrado' });
    const { titulo, descricao, preco, localizacao, tipo } = req.body;
    imovel.titulo = titulo;
    imovel.descricao = descricao;
    imovel.preco = preco;
    imovel.localizacao = localizacao;
    imovel.tipo = tipo;
    res.json(imovel);
});
//Excluir um imóvel
app.delete('/api/imoveis/:id', (req, res) => {
    const imovelindex = imoveis.findIndex(i => i.id === parseInt(req.params.id));
    if (imovelindex === -1) return res.status(404).json({ message: 'Imovel não encontrado' });
    imoveis.splice(imovelindex, 1);
    res.status(204).send();
});
// Obter imóveis por tipo 
app.get('/api/imoveis/tipo/:tipo', (req, res) => {
    const tipo = req.params.tipo;
    const imoveisFiltrados = imoveis.filter(i => i.id === tipo.tolowerCase());

    if (imoveisFiltrados.length === 0) {
        return res.status(404).json({ message: 'Nenhum imóvel encontrado para este tipo'});
    }

    res.json(imoveisFiltrados);

});

//Inica o servidor:
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});