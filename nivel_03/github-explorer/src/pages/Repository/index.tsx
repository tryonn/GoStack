import React from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { Header, RepositoryInfo, Issues } from './styles';

import logoImg from '../../assets/github-logo.svg';


interface RepositoryParams {
  repository: string;
}
const Repository: React.FC = () => {
  const { params } = useRouteMatch<RepositoryParams>();

  return(
    <>
      <Header>
        <img src={logoImg} alt="GitHub Explorer"/>
        <Link to="/dashboard">
          <FiChevronLeft size={16}/>
            voltar
        </Link>
      </Header>

      <RepositoryInfo>
        <header>
          <img src="https://avatars0.githubusercontent.com/u/1?v=4" alt="guthub-repository"/>
          <div>
            <strong>dadasjdas/adsa</strong>
            <p>anfasdna</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>1212</strong>
            <span>stars</span>
          </li>
          <li>
            <strong>78</strong>
            <span>Issues</span>
          </li>

          <li>
            <strong>78</strong>
            <span>Issues</span>
          </li>
        </ul>
      </RepositoryInfo>

      <Issues>
          <Link to="wdeqwe">
            <div>
              <strong>eqwewq</strong>
              <p>rqweqwe</p>
            </div>
              <FiChevronRight size={20} />
          </Link>
      </Issues>
    </>
  );
};

export default Repository;
