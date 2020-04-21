import React from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { Title, Form, Repositories } from './styles';

import logoGit from '../../assets/github-logo.svg';



const Dashboard: React.FC = () => {
  return(
    <>
      <img src={logoGit} alt="GitHub Explorer" />
      <Title>Explore repositórios no GitHub</Title>

      <Form>
          <input placeholder="Digite o Nome do repositório" />
          <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="teste">
          <img src="https://avatars3.githubusercontent.com/u/625433?s=60&u=b0337e631cf4bfa4444b999dec6c0e2db1f37983&v=4" alt="Tryonneto"/>
          <div>
            <strong>simaomenezes/unity3d</strong>
            <p>Games dev...</p>
          </div>
            <FiChevronRight size={20} />
        </a>

      </Repositories>
    </>
  );
};

export default Dashboard;
