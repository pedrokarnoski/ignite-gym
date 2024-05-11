![Imagem do Projeto](/mobile/src/assets/logo.svg)

# Ignite Gym - Rocketseat Ignite

Este é um projeto de um aplicativo para auxiliar pessoas em academias, desenvolvido como parte do curso Ignite da Rocketseat. Trilha React Native.

A API necessária para integração com o aplicativo está incluída neste repositório. Consulte o arquivo README dentro da pasta 'API' para instruções sobre como iniciar.

## Descrição

O Ignite Gym é uma aplicação simples para gerenciar seus treinos. Ele permite que você visualize sua ficha de treino, marque exercícios como concluído e visualize seu histórico, também é possível editar seu perfil.

## Tecnologias utilizadas

- **Expo**: O projeto foi criado utilizando o Expo, uma plataforma que simplifica o desenvolvimento de aplicativos móveis, permitindo a construção rápida e eficiente de apps para Android e iOS utilizando JavaScript e React Native.

- **React Navigation**: Biblioteca de navegação para aplicativos React Native, que facilita a implementação de navegação entre telas e fluxos de aplicativos móveis.

- **NativeWind**: Uma tecnologia de estilização inovadora que combina a simplicidade do desenvolvimento web com a performance nativa. Esta abordagem oferece portabilidade entre plataformas e uma experiência de desenvolvimento fluida e eficiente.

- **Yup e React Hook Fom**: Duas ferramentas populares frequentemente combinadas para lidar com validação de formulários em projetos React. Enquanto o Yup é uma biblioteca de validação de esquema poderosa e flexível, o React Hook Form é uma biblioteca de gerenciamento de formulários.
  
- **TypeScript**: A linguagem TypeScript foi incorporada para fornecer tipagem estática ao JavaScript, tornando o código mais robusto e fácil de entender.

## Como executar o projeto

1. Instalação do Expo CLI:

Certifique-se de ter o Node.js instalado em seu sistema.
Instale o Expo CLI globalmente via npm, executando o seguinte comando no terminal:

```bash
npm install -g expo-cli
```

2. Clone o repositório para sua máquina local:

```bash
git clone https://github.com/pedrokarnoski/ignite-gym.git
```

3. Navegue até o diretório do projeto:

```bash
cd ignite-gym
```

**Para obter instruções detalhadas sobre como iniciar a API, consulte o arquivo README dentro da pasta 'API'.**

4. Navegue até mobile:

```bash
cd mobile
```

5. Instale as dependências:

```bash
npm install
```

6. Inicie o servidor de desenvolvimento:

```bash
npm run android
```

Ou 

```bash
npm run ios
```

Lembre-se de iniciar a API, para isso, siga o mesmo procedimento executando 'npm install' na pasta correspondente.

Para visualizar o aplicativo no dispositivo físico, escaneie o código QR usando o aplicativo Expo Go, disponível na App Store (iOS) ou Google Play Store (Android).
Para visualizar o aplicativo no emulador, você pode clicar na opção adequada exibida na página do terminal após iniciar o servidor de desenvolvimento.
