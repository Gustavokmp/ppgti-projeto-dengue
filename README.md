# ppgti-projeto-dengue
Projeto utilizado para as diciplinas de Engenharia de software e Banco de Dados



## Rodando o Projeto com Docker Compose

### Pré-requisitos

- Docker
- Docker Compose

### Passos

1. **Clonar o Repositório**

   ```bash
   git clone https://github.com/Gustavokmp/ppgti-projeto-dengue.git
   cd ppgti-projeto-dengue
   ```

2. **Subir os Contêineres com Docker Compose**

   Execute o seguinte comando para construir e iniciar os contêineres:

   ```bash
   docker-compose up --build -d
   ```

   Este comando irá:
   - Construir as imagens Docker para o frontend e backend.
   - Iniciar o contêiner do MongoDB e carregar os arquivos de dump.
   - Iniciar os contêineres do backend e frontend.

3. **Acessar a Aplicação**

   - **Frontend**: Abra seu navegador e navegue até `http://localhost`
   - **Backend**: A API do backend estará disponível em `http://localhost:5000`

### Parando os Contêineres

Para parar os contêineres em execução, execute:

```bash
docker-compose down
```


