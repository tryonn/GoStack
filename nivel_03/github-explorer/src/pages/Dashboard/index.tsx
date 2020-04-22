import React, { useState, FormEvent } from 'react';
import api from '../../services/api'
import { FiChevronRight } from 'react-icons/fi';
import { Title, Form, Repositories, Error } from './styles';
import logoGit from '../../assets/github-logo.svg';

interface Repository {
  full_name: string,
  description: string,
  owner: {
    login: string,
    avatar_url: string,
  };
}



const Dashboard: React.FC = () => {

  const [newRepo, setNewRepo] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [inputErro, setInputErro] = useState('');

  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!newRepo){
      setInputErro('Digite o autor/nome do repository');
      return;
    }
    try {

      const response = await api.get<Repository>(`repos/${newRepo}`);
      const repository = response.data;
      setRepositories([...repositories, repository]);
      setNewRepo('');
      setInputErro('');

    } catch (error) {
      setInputErro('Error ao buscar repository');
    }

  }

  return(
    <>
      <img src={logoGit} alt="GitHub Explorer" />
      <Title>Explore repositórios no GitHub</Title>

      <Form hasError={!!inputErro} onSubmit={handleAddRepository}>
          <input
            value={newRepo}
            onChange={ (e) => setNewRepo(e.target.value)}
            placeholder="Digite o Nome do repositório"
            />
          <button type="submit">Pesquisar</button>
      </Form>
      { inputErro && <Error>{inputErro}</Error>}

      <Repositories>
        {repositories.map((repository) =>
          <a key={repository.full_name} href="teste">
            <img src={repository.owner.avatar_url} alt={repository.owner.login}/>
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
              <FiChevronRight size={20} />
          </a>
        )}

      </Repositories>
    </>
  );
};

export default Dashboard;
