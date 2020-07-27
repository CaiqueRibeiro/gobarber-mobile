/* eslint-disable react/jsx-closing-bracket-location */
import React, {useCallback, useRef} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Image,
  View,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {FormHandles} from '@unform/core';
import {Form} from '@unform/mobile';
import {useNavigation} from '@react-navigation/native';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';
import {useAuth} from '../../hooks/auth';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccount,
  CreateAccountText,
} from './styles';

interface SignInProps {
  email: string;
  password: string;
}

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const navigation = useNavigation();

  const {signIn, user} = useAuth();

  const handleSignIn = useCallback(async (data: SignInProps) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string().required('Digite a senha'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await signIn({
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        formRef.current?.setErrors(errors);

        return;
      }

      Alert.alert(
        'Erro na autenticação',
        'Ocorreu um erro com suas credenciais',
      );
    }
  }, []);

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{flex: 1}}>
        <Container>
          <Image source={logoImg} />
          <View>
            <Title>Faça seu logon</Title>
          </View>
          <Form ref={formRef} onSubmit={handleSignIn}>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              keyboardType="email-address"
              name="email"
              icon="mail"
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />
            <Input
              ref={passwordInputRef}
              name="password"
              icon="lock"
              placeholder="Senha"
              secureTextEntry
              returnKeyType="send"
              onSubmitEditing={() => formRef.current?.submitForm()}
            />

            <Button
              onPress={() => {
                formRef.current?.submitForm();
              }}>
              Entrar
            </Button>
          </Form>
          <ForgotPassword
            onPress={() => {
              console.log('Zica');
            }}>
            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
          </ForgotPassword>
        </Container>
        <CreateAccount onPress={() => navigation.navigate('SignUp')}>
          <Icon name="log-in" size={20} color="#48c9b0" />
          <CreateAccountText>Criar conta</CreateAccountText>
        </CreateAccount>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
