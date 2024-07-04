# Rodando Testes

Este documento explica como executar os testes unitários no projeto **Cadê a Dengue**.

## Pré-requisitos

Antes de rodar os testes, certifique-se de ter Python e pip instalados no seu sistema.

## Configuração


1. **Instale as Dependências:**

   Instale as dependências necessárias do projeto:

   ```bash
   pip install -r requirements.txt
   ```

## Executando os Testes

Para executar os testes unitários:

```bash
python -m unittest discover -s tests
```

## Executando os Testes

Para executar os testes unitários:

```bash
python -m unittest discover -s tests
```

Para verificar a cobertura dos testes no seu projeto Python, você pode seguir os passos abaixo:

### Passos para Verificar a Cobertura dos Testes

1. **Instale o pacote `coverage`:**

   Certifique-se de que o pacote `coverage` está instalado. Se ainda não estiver instalado, você pode instalá-lo usando o `pip`:

   ```bash
   pip install coverage
   ```

2. **Execute os Testes com o `coverage`:**

   Para executar seus testes e medir a cobertura de código, use o comando `coverage run` seguido do comando usado normalmente para executar seus testes. No seu caso, é o comando `unittest discover`:

   ```bash
   coverage run -m unittest discover -s tests
   ```

   Este comando executa todos os testes no diretório `tests` e coleta dados de cobertura.

3. **Visualize o Relatório de Cobertura:**

   Após a execução dos testes com o `coverage`, você pode gerar um relatório detalhado de cobertura usando o comando `coverage report`. Isso mostrará a porcentagem de linhas de código executadas durante os testes:

   ```bash
   coverage report
   ```

   O relatório será exibido no terminal, indicando a cobertura para cada arquivo e o total geral.

4. **Gerar um Relatório HTML (opcional):**

   Se preferir um relatório mais visual, você pode gerar um relatório HTML usando o comando `coverage html`. Isso cria um diretório `htmlcov` com arquivos HTML que você pode abrir em um navegador para visualizar a cobertura detalhada:

   ```bash
   coverage html
   ```