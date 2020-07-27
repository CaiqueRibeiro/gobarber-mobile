import styled from 'styled-components/native';
import {Platform} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 150 : 40}px;
`;

export const Title = styled.Text`
  color: #f4ede8;
  font-size: 24px;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 24px 0;
`;

export const BackToLogon = styled.TouchableOpacity`
  position: absolute;
  bottom: 0;
  right: 0%;
  left: 0;
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;
  padding: 16px 0 ${14 + getBottomSpace()}px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const BackToLogonText = styled.Text`
  color: #fff;
  font-family: 'RobotoSlab-Regular';
  font-size: 18px;
  margin-left: 15px;
`;
