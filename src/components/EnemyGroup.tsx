import styled from 'styled-components';
import Window from './Window';

const EnemyGroupContainer = styled.div`
  width: 35%;
  display: flex;
  justify-content: flex-end;
`;

const EnemyMessage = styled(Window)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 150px;
`;

const EnemyName = styled(Window)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75%;
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
