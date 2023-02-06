# Avaliação Join

- [Instalação](#instalação)
- [API](#api)

***

## Instalação

* Baixe os arquivos repositório. Ex: `git clone https://github.com/eduardoesr/join-ap`.
* Crie um ambiente virtual: `python3 -m venv env` (ou `python -m venv env`).
* Ative o ambiente virtual: `source env/bin/activate`.
* Entre na pasta do repositório. Ex: `cd join-ap`.
* Instale as dependências: `pip install -r requirements.txt`.
* Configure o banco de dados:
    * Inicialize o PostgreSQL ([guia para instalação](https://www.postgresql.org/docs/current/tutorial-install.html)) e substitua os dados no `settings.py` (em `DB["postgresql"]`) conforme a sua configuração.
    * Alternativamente, no `settings.py`, renomeie `DB['postgresql']` para `DB['sqlite']` em `DATABASES` para utilizar SQLite. 
* Faça a migração caso estiver utilizando o site pela primeira vez: `python manage.py migrate`.
* Inicie o site: `python manage.py runserver 8000`.

Observação 1: A API pode ser acessada diretamente em `http://localhost:8000/api/map/` (criar), e em `http://localhost:8000/api/map/<id>` (alterar/deletar).

Observação 2: Por padrão o settings.py está configurado para utilizar PostgreSQL.

***

## API

Observações:
* `<id>` se refere a um número inteiro.
* Request `PATCH` não exige envio de todos os parâmetros.

Os endpoints `POST api/map/` (necessita de todos) e `PATCH /api/map/<id>` (aceita parcial) recebem os seguintes parâmetros:

| Parâmetro | Tipo |
|-|-|
| name | String |
| latitude | Decimal (até 4 casas decimais) |
| longitude | Decimal (até 4 casas decimais) |
| expiration_date | Date "YYYY-MM-DD" |

Exemplo de envio:
  ```
    {
        "name": "Teste",
        "latitude": -50,
        "longitude": -50,
        "expiration_date": "2023-02-06"
    }
  ```

<br>

### Criar

| Método | URL | Ação |
|-|-|-|
| GET | /api/map/ | Lista todos os alvos disponíveis. |
| POST | /api/map/ | Cria um novo alvo. |

<br>

### Atualizar/Apagar

| Método | URL | Ação |
|-|-|-|
| GET | /api/map/\<id>/ | Lista o alvo especificado. |
| PATCH | /api/map/\<id>/ | Atualiza o alvo específico. |
| DELETE | /api/map/\<id>/ | Apaga o alvo especificado. |
