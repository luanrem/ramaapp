const mockUser = {
  id: 1,
  username: 'John',
  email: 'user@gmail.com',
  provider: 'local',
  confirmed: true,
  blocked: false,
  role: {
    id: 1,
    name: 'Authenticated',
    description: 'Default role given to authenticated user.',
    type: 'authenticated'
  },
  ex_participante: false,
  funcao: {
    id: 1,
    Funcao: 'Administrador',
    published_at: '2022-07-09T19:40:28.602Z',
    created_at: '2022-07-09T19:39:58.482Z',
    updated_at: '2022-07-09T19:40:28.638Z'
  },
  nome_completo: 'John Doe',
  telefone: null,
  grupo: {
    id: 1,
    nome: 'Curitiba 1',
    data_inicial: '2017-11-11',
    nome_abreviado: 'CTB1',
    whatsapp_link: null,
    published_at: '2022-07-09T19:38:16.673Z',
    created_at: '2022-07-09T19:38:15.001Z',
    updated_at: '2022-07-09T19:38:16.758Z',
    picture: null
  },
  Cidade: null,
  Estado: null,
  Nacimento: new Date('2020-01-01'),
  sobre_mim: 'Sobre Mim',
  endereco: null,
  endereco_adicional: null,
  created_at: '2022-07-07T01:35:44.458Z',
  updated_at: '2022-07-12T22:36:26.254Z',
  avatar: {
    id: 12,
    name: 'profile.jpeg',
    alternativeText: null,
    caption: null,
    width: 225,
    height: 224,
    formats: {
      thumbnail: {
        ext: '.jpeg',
        url: '/uploads/thumbnail_profile_4acef5549b.jpeg',
        hash: 'thumbnail_profile_4acef5549b',
        mime: 'image/jpeg',
        name: 'thumbnail_profile.jpeg',
        path: null,
        size: 6.13,
        width: 157,
        height: 156
      }
    },
    hash: 'profile_4acef5549b',
    ext: '.jpeg',
    mime: 'image/jpeg',
    size: 6.51,
    url: '/uploads/profile_4acef5549b.jpeg',
    previewUrl: null,
    provider: 'local',
    provider_metadata: null,
    created_at: '2022-07-12T23:49:45.565Z',
    updated_at: '2022-07-12T23:49:45.565Z'
  }
}

const mockToken = {
  jwt:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjYxOTU2OTY3LCJleHAiOjE2NjQ1NDg5Njd9.7B6P7Jjrp1ylB1Ylr1k6r-ndimKFgH9gcHKkpQy8uYg'
}

const mockMenus = {
  id: 1,
  Funcao: 'Administrador',
  published_at: '2022-07-09T19:40:28.602Z',
  created_at: '2022-07-09T19:39:58.482Z',
  updated_at: '2022-07-09T19:40:28.638Z',
  menus: [
    {
      id: 1,
      Name: 'Dashboard',
      Ativo: true,
      path: '/dashboard',
      published_at: '2022-07-07T01:25:58.435Z',
      created_at: '2022-07-07T01:25:44.853Z',
      updated_at: '2022-07-11T22:02:11.633Z'
    },
    {
      id: 2,
      Name: 'Administração',
      Ativo: true,
      path: '/facilitacao',
      published_at: '2022-07-07T01:26:15.882Z',
      created_at: '2022-07-07T01:26:14.403Z',
      updated_at: '2022-07-11T22:01:37.421Z'
    },
    {
      id: 3,
      Name: 'Coordenação',
      Ativo: true,
      path: '/coordenacao',
      published_at: '2022-07-07T01:26:29.984Z',
      created_at: '2022-07-07T01:26:27.501Z',
      updated_at: '2022-07-11T22:02:05.110Z'
    },
    {
      id: 4,
      Name: 'Atas',
      Ativo: true,
      path: '/atas',
      published_at: '2022-07-07T01:26:42.737Z',
      created_at: '2022-07-07T01:26:40.059Z',
      updated_at: '2022-07-11T22:01:44.449Z'
    },
    {
      id: 5,
      Name: 'Materiais',
      Ativo: true,
      path: '/materiais',
      published_at: '2022-07-07T01:26:59.159Z',
      created_at: '2022-07-07T01:26:53.014Z',
      updated_at: '2022-07-11T22:02:27.332Z'
    },
    {
      id: 6,
      Name: 'Calendário',
      Ativo: true,
      path: '/calendario',
      published_at: '2022-07-07T01:27:19.061Z',
      created_at: '2022-07-07T01:27:14.692Z',
      updated_at: '2022-07-11T22:01:57.920Z'
    },
    {
      id: 7,
      Name: 'Fórum',
      Ativo: true,
      path: '/forum',
      published_at: '2022-07-07T01:27:28.268Z',
      created_at: '2022-07-07T01:27:25.961Z',
      updated_at: '2022-07-11T22:02:19.506Z'
    },
    {
      id: 8,
      Name: 'Relatos',
      Ativo: true,
      path: '/relatos',
      published_at: '2022-07-07T01:27:41.166Z',
      created_at: '2022-07-07T01:27:37.555Z',
      updated_at: '2022-07-11T22:02:41.460Z'
    },
    {
      id: 9,
      Name: 'Perfil',
      Ativo: true,
      path: '/perfil',
      published_at: '2022-07-09T19:40:20.605Z',
      created_at: '2022-07-07T01:27:48.415Z',
      updated_at: '2022-07-11T22:02:34.499Z'
    }
  ]
}

const mockUserList = [
  {
    id: 2,
    username: 'camila',
    email: 'camilacvberti@gmail.com',
    provider: 'local',
    confirmed: true,
    blocked: false,
    role: {
      id: 1,
      name: 'Authenticated',
      description: 'Default role given to authenticated user.',
      type: 'authenticated'
    },
    ex_participante: false,
    funcao: null,
    nome_completo: 'Camila Cristi Vieira Berti',
    telefone: null,
    grupo: {
      id: 1,
      nome: 'Curitiba 1',
      data_inicial: '2017-11-11',
      nome_abreviado: 'CTB1',
      whatsapp_link: null,
      published_at: '2022-07-09T19:38:16.673Z',
      created_at: '2022-07-09T19:38:15.001Z',
      updated_at: '2022-07-09T19:38:16.758Z',
      picture: null
    },
    Cidade: 'Curitiba',
    Estado: 'Paraná',
    Nacimento: '2015-03-04',
    sobre_mim: 'Sobre Mim',
    endereco: null,
    endereco_adicional: null,
    created_at: '2022-07-09T19:39:17.031Z',
    updated_at: '2022-07-09T19:39:17.042Z',
    avatar: null
  },
  {
    id: 3,
    username: 'Flávia',
    email: 'flavia@gmail.com',
    provider: 'local',
    confirmed: true,
    blocked: false,
    role: {
      id: 1,
      name: 'Authenticated',
      description: 'Default role given to authenticated user.',
      type: 'authenticated'
    },
    ex_participante: false,
    funcao: {
      id: 3,
      Funcao: 'Integrante',
      published_at: '2022-07-09T19:41:22.195Z',
      created_at: '2022-07-09T19:41:20.647Z',
      updated_at: '2022-07-09T19:41:22.232Z'
    },
    nome_completo: 'Flavia Vidal',
    telefone: null,
    grupo: {
      id: 4,
      nome: 'Curitiba 3',
      data_inicial: '2020-09-14',
      nome_abreviado: 'CTB3',
      whatsapp_link: null,
      published_at: '2022-07-12T22:18:52.256Z',
      created_at: '2022-07-12T22:18:49.704Z',
      updated_at: '2022-07-12T22:18:52.338Z',
      picture: null
    },
    Cidade: null,
    Estado: null,
    Nacimento: '2020-01-01',
    sobre_mim: 'Sobre Mim',
    endereco: null,
    endereco_adicional: null,
    created_at: '2022-07-12T22:17:11.730Z',
    updated_at: '2022-07-12T22:18:49.727Z',
    avatar: null
  },
  {
    id: 7,
    username: 'teste1',
    email: 'teste1@gmail.com',
    provider: 'local',
    confirmed: true,
    blocked: null,
    role: {
      id: 1,
      name: 'Authenticated',
      description: 'Default role given to authenticated user.',
      type: 'authenticated'
    },
    ex_participante: null,
    funcao: {
      id: 3,
      Funcao: 'Integrante',
      published_at: '2022-07-09T19:41:22.195Z',
      created_at: '2022-07-09T19:41:20.647Z',
      updated_at: '2022-07-09T19:41:22.232Z'
    },
    nome_completo: 'teste1',
    telefone: null,
    grupo: null,
    Cidade: null,
    Estado: null,
    Nacimento: '2020-01-01',
    sobre_mim: 'Sobre Mim',
    endereco: null,
    endereco_adicional: null,
    created_at: '2022-07-12T22:28:53.942Z',
    updated_at: '2022-07-12T22:28:53.951Z',
    avatar: null
  },
  {
    id: 1,
    username: 'Luan',
    email: 'luanrem@gmail.com',
    provider: 'local',
    confirmed: true,
    blocked: false,
    role: {
      id: 1,
      name: 'Authenticated',
      description: 'Default role given to authenticated user.',
      type: 'authenticated'
    },
    ex_participante: false,
    funcao: {
      id: 1,
      Funcao: 'Administrador',
      published_at: '2022-07-09T19:40:28.602Z',
      created_at: '2022-07-09T19:39:58.482Z',
      updated_at: '2022-07-09T19:40:28.638Z'
    },
    nome_completo: 'Luan Roberto Estrada Martins',
    telefone: null,
    grupo: {
      id: 1,
      nome: 'Curitiba 1',
      data_inicial: '2017-11-11',
      nome_abreviado: 'CTB1',
      whatsapp_link: null,
      published_at: '2022-07-09T19:38:16.673Z',
      created_at: '2022-07-09T19:38:15.001Z',
      updated_at: '2022-07-09T19:38:16.758Z',
      picture: null
    },
    Cidade: null,
    Estado: null,
    Nacimento: '2020-01-01',
    sobre_mim: 'Sobre Mim',
    endereco: null,
    endereco_adicional: null,
    created_at: '2022-07-07T01:35:44.458Z',
    updated_at: '2022-07-12T22:36:26.254Z',
    avatar: {
      id: 12,
      name: 'profile.jpeg',
      alternativeText: null,
      caption: null,
      width: 225,
      height: 224,
      formats: {
        thumbnail: {
          ext: '.jpeg',
          url: '/uploads/thumbnail_profile_4acef5549b.jpeg',
          hash: 'thumbnail_profile_4acef5549b',
          mime: 'image/jpeg',
          name: 'thumbnail_profile.jpeg',
          path: null,
          size: 6.13,
          width: 157,
          height: 156
        }
      },
      hash: 'profile_4acef5549b',
      ext: '.jpeg',
      mime: 'image/jpeg',
      size: 6.51,
      url: '/uploads/profile_4acef5549b.jpeg',
      previewUrl: null,
      provider: 'local',
      provider_metadata: null,
      created_at: '2022-07-12T23:49:45.565Z',
      updated_at: '2022-07-12T23:49:45.565Z'
    }
  }
]

const mockGroups = [
  {
    id: 1,
    nome: 'Curitiba 1',
    data_inicial: '2017-11-11',
    nome_abreviado: 'CTB1',
    whatsapp_link: null,
    published_at: '2022-07-09T19:38:16.673Z',
    created_at: '2022-07-09T19:38:15.001Z',
    updated_at: '2022-07-09T19:38:16.758Z',
    picture: null,
    users: [
      {
        id: 1,
        username: 'Luan',
        email: 'luanrem@gmail.com',
        provider: 'local',
        confirmed: true,
        blocked: false,
        role: 1,
        ex_participante: false,
        funcao: 1,
        nome_completo: 'Luan Roberto Estrada Martins',
        telefone: null,
        grupo: 1,
        Cidade: null,
        Estado: null,
        Nacimento: '2020-01-01',
        sobre_mim: 'Sobre Mim',
        endereco: null,
        endereco_adicional: null,
        created_at: '2022-07-07T01:35:44.458Z',
        updated_at: '2022-07-12T22:36:26.254Z',
        avatar: {
          id: 12,
          name: 'profile.jpeg',
          alternativeText: null,
          caption: null,
          width: 225,
          height: 224,
          formats: {
            thumbnail: {
              ext: '.jpeg',
              url: '/uploads/thumbnail_profile_4acef5549b.jpeg',
              hash: 'thumbnail_profile_4acef5549b',
              mime: 'image/jpeg',
              name: 'thumbnail_profile.jpeg',
              path: null,
              size: 6.13,
              width: 157,
              height: 156
            }
          },
          hash: 'profile_4acef5549b',
          ext: '.jpeg',
          mime: 'image/jpeg',
          size: 6.51,
          url: '/uploads/profile_4acef5549b.jpeg',
          previewUrl: null,
          provider: 'local',
          provider_metadata: null,
          created_at: '2022-07-12T23:49:45.565Z',
          updated_at: '2022-07-12T23:49:45.565Z'
        }
      },
      {
        id: 2,
        username: 'camila',
        email: 'camilacvberti@gmail.com',
        provider: 'local',
        confirmed: true,
        blocked: false,
        role: 1,
        ex_participante: false,
        funcao: null,
        nome_completo: 'Camila Cristi Vieira Berti',
        telefone: null,
        grupo: 1,
        Cidade: 'Curitiba',
        Estado: 'Paraná',
        Nacimento: '2015-03-04',
        sobre_mim: 'Sobre Mim',
        endereco: null,
        endereco_adicional: null,
        created_at: '2022-07-09T19:39:17.031Z',
        updated_at: '2022-07-09T19:39:17.042Z',
        avatar: null
      }
    ],
    facilitadores: [],
    atas: []
  },
  {
    id: 2,
    nome: 'Curitiba 2',
    data_inicial: '2021-12-06',
    nome_abreviado: 'CTB2',
    whatsapp_link: null,
    published_at: '2022-07-09T19:42:05.118Z',
    created_at: '2022-07-09T19:42:03.406Z',
    updated_at: '2022-07-09T19:42:05.155Z',
    picture: null,
    users: [],
    facilitadores: [],
    atas: []
  },
  {
    id: 3,
    nome: 'Belo Horizonte 1',
    data_inicial: '2018-06-05',
    nome_abreviado: 'BH1',
    whatsapp_link: null,
    published_at: '2022-07-09T19:42:34.726Z',
    created_at: '2022-07-09T19:42:33.006Z',
    updated_at: '2022-07-09T19:42:34.766Z',
    picture: null,
    users: [],
    facilitadores: [],
    atas: []
  },
  {
    id: 4,
    nome: 'Curitiba 3',
    data_inicial: '2020-09-14',
    nome_abreviado: 'CTB3',
    whatsapp_link: null,
    published_at: '2022-07-12T22:18:52.256Z',
    created_at: '2022-07-12T22:18:49.704Z',
    updated_at: '2022-07-12T22:18:52.338Z',
    picture: null,
    users: [
      {
        id: 3,
        username: 'Flávia',
        email: 'flavia@gmail.com',
        provider: 'local',
        confirmed: true,
        blocked: false,
        role: 1,
        ex_participante: false,
        funcao: 3,
        nome_completo: 'Flavia Vidal',
        telefone: null,
        grupo: 4,
        Cidade: null,
        Estado: null,
        Nacimento: '2020-01-01',
        sobre_mim: 'Sobre Mim',
        endereco: null,
        endereco_adicional: null,
        created_at: '2022-07-12T22:17:11.730Z',
        updated_at: '2022-07-12T22:18:49.727Z',
        avatar: null
      }
    ],
    facilitadores: [],
    atas: []
  },
  {
    id: 5,
    nome: 'Curitiba 4',
    data_inicial: '2022-04-03',
    nome_abreviado: 'CTB4',
    whatsapp_link: null,
    published_at: '2022-07-12T22:19:16.973Z',
    created_at: '2022-07-12T22:19:15.425Z',
    updated_at: '2022-07-12T22:19:17.019Z',
    picture: null,
    users: [],
    facilitadores: [],
    atas: []
  }
]

export { mockUser, mockToken, mockMenus, mockUserList, mockGroups }
