import styled from 'styled-components/native';
import {RectButton} from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 64px;
  background-color: #48c9b0;
  border-radius: 10px;
  margin-top: 10px;

  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  color: #312e38;
  font-family: 'RobotoSlab-Medium';
`;
