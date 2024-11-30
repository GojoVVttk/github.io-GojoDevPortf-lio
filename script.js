document.getElementById('form-contato').addEventListener('submit', async function (event) {
    event.preventDefault(); // Impede o envio real do formulário

    // Exibe o loader durante a verificação
    const loader = document.getElementById('loader');
    const statusIcon = document.getElementById('status-icon');
    loader.style.display = 'block';
    statusIcon.style.display = 'none';

    // Coleta os valores do formulário
    const nome = event.target.nome.value;
    const username = event.target.username.value;
    const proposta = event.target.proposta.value;

    try {
        // Verifique se o username não está vazio
        if (!username || !nome || !proposta) {
            throw new Error("Todos os campos devem ser preenchidos");
        }

        // Mensagem a ser enviada para o Webhook
        const webhookMessage = {
            content: `**Nova solicitação recebida!**\n\n**Nome:** ${nome}\n**Usuário:** ${username}\n**Proposta:** ${proposta}\n\n_Entre em contato com o solicitante o mais breve possível!_`,
        };

        // URL do Webhook do Discord (o que você forneceu anteriormente)
        const webhookURL = "https://discord.com/api/webhooks/1311711421616361512/yyNbz1eDSPo5fCS860S-V0k97QbfKfiGZPf3qAj1d_YEs8L5nGZydkcHCN1X25E0pA0R";

        // Envia a mensagem para o Webhook
        const response = await fetch(webhookURL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(webhookMessage),
        });

        if (!response.ok) {
            throw new Error("Erro ao enviar mensagem para o webhook");
        }

        // Sucesso
        loader.style.display = 'none';
        statusIcon.src = 'https://cdn-icons-png.freepik.com/512/5735/5735786.png?uid=R172902090&ga=GA1.1.747911804.1724635896'; // Ícone de sucesso
        statusIcon.style.display = 'block';

        // Exibe a mensagem de sucesso para o usuário
        document.getElementById('mensagem-sucesso').style.display = 'block';
        event.target.reset(); // Limpa o formulário após o envio
    } catch (error) {
        // Erro
        loader.style.display = 'none';
        statusIcon.src = 'https://cdn-icons-png.freepik.com/512/3032/3032283.png?uid=R172902090&ga=GA1.1.747911804.1724635896'; // Ícone de erro
        statusIcon.style.display = 'block';
        console.error("Erro:", error);
    }
});
