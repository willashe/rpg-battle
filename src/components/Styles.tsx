import React from 'react';
import styled from 'styled-components';

export const BattleContainer = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  top: 0;
  align-items: stretch;
`;
export const MainBattleSection = styled.div`
  flex: 0 1 100%;
  background-color: dodgerblue;
`;

export const MainPartyMenu = styled.div`
  display: flex;
  justify-content: center;
`;

export const MonsterContent = styled.div`
  width: 30%;
  display: flex;
  justify-content: flex-end;
  border: 1px solid black;
`;

export const MonsterDmg = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  padding: 0 40px;
  border: 3px solid darkgrey;
  border-bottom-width: 1px;
  border-top-width: 1px;
  border-left-width: 9px;
`;

export const MonsterName = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.4rem;
  width: 50%;
`;

export const MonsterSection = styled.div`
  flex: 0 1 200px;
  backgroundcolor: red;
  height: 100%;
  display: flex;
  top: 0;
  justify-content: space-around;
`;

export const PlayerButton = styled.button`
  background-color: red;
  padding: 10px;
`;

export const PlayerInfoSection = styled.div`
  backgroundcolor: lime;
  flex: 0 1 200px;
`;
