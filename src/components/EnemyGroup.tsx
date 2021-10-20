import styled from 'styled-components';

const EnemyGroupContainer = styled.div`
  width: 30%;
  display: flex;
  justify-content: flex-end;
  border: 8px solid #e5e4e2;
`;

const EnemyMessage = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  padding: 0 40px;
  border: 3px solid #e5e4e2;
  border-bottom-width: 1px;
  border-top-width: 1px;
  border-left-width: 9px;
`;

const EnemyName = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  width: 50%;
`;

interface EnemyGroupProps {
  name: string;
  message: string | number;
}

const EnemyGroup = (props: EnemyGroupProps) => {
  const { name, message } = props;

  return (
    <EnemyGroupContainer>
      <EnemyName>{name}</EnemyName>
      <EnemyMessage>{message}</EnemyMessage>
    </EnemyGroupContainer>
  );
};

export default EnemyGroup;
